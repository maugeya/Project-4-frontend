angular
.module('spotlightApp')
.controller('RegisterCtrl', RegisterCtrl)
.controller('LoginCtrl', LoginCtrl);

RegisterCtrl.$inject = ['$auth', '$state', '$rootScope', 'Topic'];
function RegisterCtrl($auth, $state, $rootScope, Topic) {
  const vm = this;
  vm.user = {};
  vm.topic = Topic.query();

  function submit() {
    console.log(vm.user);
    if (vm.registerForm.$valid) {
      $auth.signup(vm.user)
      .then((res) => {

        $rootScope.$broadcast('message', res.data.message);
        $state.go('login');
      })
      .catch(() => $state.go('register'));
    }
  }

  vm.submit = submit;
}

LoginCtrl.$inject = ['$auth', '$state', '$rootScope'];
function LoginCtrl($auth, $state, $rootScope ) {
  const vm = this;
  vm.credentials = {};

  function submit() {
    if (vm.loginForm.$valid) {
      $auth.login(vm.credentials)
      .then((res) => {
        $rootScope.$broadcast('message', res.data.message);
        $state.go('postsIndex');
      })
      .catch(() => $state.go('login'));

    }
  }

  function authenticate(provider) {
    $auth.authenticate(provider)
      .then(() => $state.go('postsIndex'));
  }
  vm.submit = submit;
  vm.authenticate = authenticate;

}
