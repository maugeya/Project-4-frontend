angular
.module('spolightApp')
.controller('PostsIndexCtrl', PostsIndexCtrl)
.controller('PostsNewCtrl', PostsNewCtrl)
.controller('PostsShowCtrl', PostsShowCtrl)
.controller('PostsEditCtrl', PostsEditCtrl)
.controller('PostsDeleteCtrl', PostsDeleteCtrl);


PostsIndexCtrl.$inject = ['Post'];
function PostsIndexCtrl(Post) {
  const vm = this;
  vm.all = Post.query();
}


PostsNewCtrl.$inject = ['Post', '$state'];
function PostsNewCtrl(Post, $state) {
  const vm = this;
  vm.post = {};

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

PostsShowCtrl.$inject = ['Post', '$stateParams', '$state', '$http', '$uibModal'];
function PostsShowCtrl(Post, $stateParams, $state, $http, $uibModal) {
  const vm = this;

  Post.get($stateParams)
  .$promise
  .then((post) => {
    vm.post = post;
  });


  // function openModal() {
  //   $uibModal.open({
  //     templateUrl: 'js/views/partials/postDeleteModal.html',
  //     controller: 'PostsDeleteCtrl as postsDelete',
  //     resolve: {
  //       currentPost: () => {
  //         return vm.post;
  //       }
  //     }
  //   });
  // }

  // vm.openModal = openModal;

}

PostsEditCtrl.$inject = ['Post', '$stateParams', '$state'];
function PostsEditCtrl(Post, $stateParams, $state) {

  const vm = this;
  vm.post.createdBy.id = vm.post.createdBy._id;
  vm.post = Post.get($stateParams);
  vm.update = postsUpdate;

  function postsUpdate() {

    vm.post
    .$update()
    .then(() => $state.go('postsShow', $stateParams));
  }
}

PostsDeleteCtrl.$inject = ['$uibModalInstance', 'currentPost', '$state'];
function PostsDeleteCtrl($uibModalInstance, currentPost, $state) {
  const vm = this;
  vm.post = currentPost;

 


  function postsDelete() {

    vm.post
    .$remove()
    .then(() => {

      $state.go( 'postsIndex' );

      $uibModalInstance.close();
    });
  }

  vm.delete = postsDelete;
}
