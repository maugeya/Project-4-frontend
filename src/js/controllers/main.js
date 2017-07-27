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


  const protectedStates = ['postsNew', 'postsEdit'];


  $transitions.onSuccess({}, (transition) => {
    if((!$auth.isAuthenticated() && protectedStates.includes(transition.$to().name))) {
      vm.message = 'You must be logged in to access this page.';
      return $state.go('login');
    }

    if(vm.stateHasChanged) vm.message = null;
    if(!vm.stateHasChanged) vm.stateHasChanged = true;
    if($auth.getPayload()) vm.currentUser = $auth.getPayload();
    console.log(vm.currentUser.id);
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

      function hasNotifictions(){
        if(activeNotifications.length === 0){
          return true;
        }
      }
      vm.hasNotifictions = hasNotifictions;
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



  function openModal(){
    const modal = document.querySelector('.modal');
    modal.classList.add('is-active');

  }

  vm.openModal = openModal;

  function closeModal(){
    const modal = document.querySelector('.modal');
    modal.classList.remove('is-active');
  }

  vm.closeModal = closeModal;


  function logout() {
    $auth.logout();
    $state.go('home');
  }
  vm.logout = logout;




}
