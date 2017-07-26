angular
.module('spotlightApp')
.controller('MainCtrl', MainCtrl);

MainCtrl.$inject = ['$rootScope', '$state' , '$auth', '$scope', 'User', '$transitions', '$stateParams', 'Notification'];
function MainCtrl($rootScope, $state , $auth, $scope, User, $transitions, $stateParams, Notification ) {
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
      const activeNotifications = [];


      for(let i = 0; i < allNotifications.length; i++){
        if(allNotifications[i].read === false) {
          activeNotifications.push(allNotifications[i]);
        }
      }
      vm.activeNotifications = activeNotifications;
      vm.notify = activeNotifications.length;
    });
  });




  function notificationsUpdate(id) {
    Notification.get({id})
    .$promise
    .then((notification) => {
      vm.notification = notification;
      vm.notification.read = true;
      Notification
      .update({ id: vm.notification.id }, vm.notification)
      .$promise
      .then(() => {
        $state.go('postsShow', ({ id: notification.post_id }));
      });
    });

  }

  vm.notificationsUpdate = notificationsUpdate;

  function logout() {
    $auth.logout();
    $state.go('home');
  }
  vm.logout = logout;

}
