angular
.module('spotlightApp')
.controller('MainCtrl', MainCtrl);

MainCtrl.$inject = ['$rootScope', '$state' , '$auth', '$scope', 'User', '$transitions'];
function MainCtrl($rootScope, $state , $auth, $scope, User, $transitions ) {
  const vm = this;
  vm.isAuthenticated = $auth.isAuthenticated;

  $rootScope.$on('error', (e, err) => {
    // console.log(e, err);
    vm.message = err.data.message;

    if(err.status === 401) {
      vm.stateHasChanged = false;
      $state.go('login');
    }

  });


  $transitions.onSuccess({}, (transition) => {

    if(vm.stateHasChanged) vm.message = null;
    if(!vm.stateHasChanged) vm.stateHasChanged = true;
    if($auth.getPayload()) vm.currentUser = $auth.getPayload();
    vm.pageName = transition.$to().name;

    User
    .get({ id: vm.currentUser.id })
    .$promise
    .then((user) => {
      const allNotifications = user.notifications;

      vm.notify = 0;

      for(let i = 0; i < allNotifications.length; i++){
        if(allNotifications[i].read === false) {
          vm.notify += 1;
        }

      }
      console.log(allNotifications);
    });
  });

  function logout() {
    $auth.logout();
    $state.go('home');
  }
  vm.logout = logout;

}
