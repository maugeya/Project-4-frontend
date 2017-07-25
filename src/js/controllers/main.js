angular
.module('spotlightApp')
.controller('MainCtrl', MainCtrl);

MainCtrl.$inject = ['$rootScope', '$state' , '$auth', '$scope', 'User', '$transitions'];
function MainCtrl($rootScope, $state , $auth, $scope, User, $transitions ) {
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

  vm.users = User.query();



  $scope.$watch(() => vm.mentions, (val) => { //watch the mentions, as they change return their values and map over the users and match any with the matching ids
    vm.mention_ids = (val || []).map(user => user.id);
  });

}
