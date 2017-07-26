angular
.module('spotlightApp')
.controller('PostsIndexCtrl', PostsIndexCtrl)
.controller('PostsNewCtrl', PostsNewCtrl)
.controller('PostsShowCtrl', PostsShowCtrl)
.controller('PostsEditCtrl', PostsEditCtrl);


PostsIndexCtrl.$inject = ['Post', 'Topic','User', '$scope', 'filterFilter', '$auth'];
function PostsIndexCtrl(Post, Topic, User, $scope, filterFilter, $auth) {
  const vm = this;
  vm.user = User.get({ id: $auth.getPayload().id });
  Post.query()
  .$promise
  .then((posts) => {
    vm.all = posts;
    filterPosts();
  });
  vm.topics = Topic.query();

  function myTopicsFilter(post) {
    return post.topics.find((topic) => {
      return vm.user.topics.find((userTopic) => {
        return userTopic.id === topic.id;
      });
    });
  }

  function filterPosts() {
    if (vm.filter === 'My Tags') {
      vm.filtered = filterFilter(vm.filtered, myTopicsFilter);
    } else {
      const params = { topics: { name: vm.filter }};
      vm.filtered = filterFilter(vm.all, params);
    }
  }

  $scope.$watchGroup([
    () => vm.filter
  ], filterPosts);
}


PostsNewCtrl.$inject = ['Post', '$state','Topic'];
function PostsNewCtrl(Post, $state, Topic) {
  const vm = this;
  vm.post = {};
  vm.all = Post.query();
  vm.topics = Topic.query();

  function postsCreate() {
    if(vm.newForm.$valid) {
      Post
      .save(vm.post)
      .$promise
      .then(() => $state.go('postsIndex'));
    }
  }
  vm.create = postsCreate;
}


PostsShowCtrl.$inject = ['Post', 'User', 'Comment', '$stateParams', '$state', '$auth', '$scope', 'Notification'];
function PostsShowCtrl(Post, User, Comment, $stateParams, $state, $auth, $scope, Notification) {
  const vm = this;
  if ($auth.getPayload()) vm.currentUser = User.get({ id: $auth.getPayload().id });

  vm.mentions = [];
  vm.users = User.query();
  vm.post = Post.get($stateParams);

  function postsDelete() {
    vm.post
    .$remove()
    .then(() => $state.go('postsIndex'));
  }

  vm.delete = postsDelete;

  function addComment() {
    vm.comment.post_id = vm.post.id;
    vm.comment.user_id = vm.currentUser_id;
    vm.comment.mention_ids = vm.mentions.map(user => user.id);

    Comment
    .save(vm.comment)
    .$promise
    .then((comment) => {
      // console.log(comment);
      vm.post.comments.push(comment);
      // console.log('This is the comment id', vm.comment);
      vm.comment = {};
    });
  }

  vm.addComment = addComment;


  function deleteComment(comment) {
    Comment
    .delete({ id: comment.id })
    .$promise
    .then(() => {
      const index = vm.post.comments.indexOf(comment);
      vm.post.comments.splice(index, 1);
    });
  }

  vm.deleteComment = deleteComment;




}

PostsEditCtrl.$inject = ['Post', 'User', '$stateParams', '$state', 'Topic'];
function PostsEditCtrl(Post, User, $stateParams, $state, Topic) {
  const vm = this;
  vm.topics = Topic.query();

  Post.get($stateParams).$promise.then((post) => {
    vm.post = post;
  });

  vm.users = User.query();

  function postsUpdate() {
    Post
    .update({ id: vm.post.id }, vm.post)
    .$promise
    .then(() => $state.go('postsShow', { id: vm.post.id }));
  }

  vm.update = postsUpdate;
}
