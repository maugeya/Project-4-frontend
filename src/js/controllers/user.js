angular
.module('spotlightApp')
.controller('UsersShowCtrl', UsersShowCtrl);


UsersShowCtrl.$inject = ['User', '$stateParams', '$state', '$auth', 'Topic'];
function UsersShowCtrl(User, $stateParams, $state, $auth, Topic) {

  const vm = this;
  vm.topics = Topic.query();


  vm.user = User.get($stateParams);

  function usersUpdate() {
    User
    .$update(vm.user)
    .then(() => $state.go('home'));
  }
  vm.update = usersUpdate;


  function usersDelete() {

    User
    .remove({ id: vm.user.id })
    .then(() => {
      $auth.logout();
      $state.go('home');
    });
  }
  function logout() {
    $auth.logout();
    $state.go('home');
  }
  vm.logout = logout;

  vm.usersDelete = usersDelete;
}
