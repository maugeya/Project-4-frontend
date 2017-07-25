angular
.module('spotlightApp')
.controller('PostsIndexCtrl', PostsIndexCtrl)
.controller('PostsNewCtrl', PostsNewCtrl)
.controller('PostsShowCtrl', PostsShowCtrl)
.controller('PostsEditCtrl', PostsEditCtrl);


PostsIndexCtrl.$inject = ['Post'];
function PostsIndexCtrl(Post) {
  const vm = this;
  vm.all = Post.query();
}


PostsNewCtrl.$inject = ['Post', '$state','Topic'];
function PostsNewCtrl(Post, $state, Topic) {
  const vm = this;
  vm.post = {};
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


PostsShowCtrl.$inject = ['Post', 'User', 'Comment', '$stateParams', '$state', '$auth'];
function PostsShowCtrl(Post, User, Comment, $stateParams, $state, $auth) {
  const vm = this;
  if ($auth.getPayload()) vm.currentUser = User.get({ id: $auth.getPayload().id });



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

    Comment
      .save(vm.comment)
      .$promise
      .then((comment) => {
        console.log(comment);
        vm.post.comments.push(comment);
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

PostsEditCtrl.$inject = ['Post', 'User', '$stateParams', '$state'];
function PostsEditCtrl(Post, User, $stateParams, $state) {
  const vm = this;

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
