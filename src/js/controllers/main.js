angular
  .module('spotlightApp')
  .controller('MainCtrl', MainCtrl);

MainCtrl.$inject = ['$rootScope', '$state' , '$auth', '$transitions'];
function MainCtrl($rootScope, $state , $auth, $transitions) {
  const vm = this;
  vm.isAuthenticated = $auth.isAuthenticated;

  $rootScope.$on('error', (e, err) => {
    console.log(e, err);
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
  });

  function logout() {
    $auth.logout();
    $state.go('home');
  }
  vm.logout = logout;
}
