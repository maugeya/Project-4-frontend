angular
.module('spotlightApp')
.controller('UsersShowCtrl', UsersShowCtrl)
.controller('UsersEditCtrl', UsersEditCtrl)
.controller('UsersDeleteCtrl', UsersDeleteCtrl);


UsersShowCtrl.$inject = ['User', '$stateParams'];
function UsersShowCtrl(User, $stateParams) {

  const vm = this;


  vm.user = User.get($stateParams);
  console.log(vm.user);

}

UsersEditCtrl.$inject = ['User', '$stateParams', '$state'];
function UsersEditCtrl(User, $stateParams, $state) {
  const vm = this;

  vm.user = User.get($stateParams);

  function usersUpdate() {
    vm.user
    .$update()
    .then(() => $state.go('usersShow', $stateParams));
  }

  vm.update = usersUpdate;
}

UsersDeleteCtrl.$inject = ['$uibModalInstance', 'currentUser', '$state', '$auth'];
function UsersDeleteCtrl($uibModalInstance, currentUser, $state, $auth) {
  const vm = this;
  vm.user = currentUser;

  function closeModal() {
    $uibModalInstance.close();
    // console.log(currentUser.username);
  }

  vm.close = closeModal;

  function usersDelete() {

    vm.user
      .$remove()
      .then(() => {
        $auth.logout();
        $state.go( 'postsIndex' );
        $uibModalInstance.close();
      });
  }

  vm.delete = usersDelete;
}
