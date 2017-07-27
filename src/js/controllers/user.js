angular
.module('spotlightApp')
.controller('UsersShowCtrl', UsersShowCtrl);


UsersShowCtrl.$inject = ['User', '$stateParams', '$state', '$auth', 'Topic'];
function UsersShowCtrl(User, $stateParams, $state, $auth, Topic) {

  const vm = this;
  vm.topics = Topic.query();


  User.get($stateParams)
  .$promise
  .then((user) => {
    vm.user = user;
  });

  function usersUpdate() {
    User
    .update({ id: vm.user.id }, vm.user)
    .$promise
    .then(() => $state.go('postsIndex'));
  }
  vm.update = usersUpdate;


  function usersDelete() {

    User
    .remove({ id: vm.user.id })
    .$promise
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
