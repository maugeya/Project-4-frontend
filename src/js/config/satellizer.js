angular
  .module('spotlightApp')
  .config(Auth);


Auth.$inject = ['$authProvider', 'API_URL'];
function Auth($authProvider, API_URL) {
  $authProvider.signupUrl = `${API_URL}/register`;
  $authProvider.loginUrl = `${API_URL}/login`;


  $authProvider.facebook({
    clientId: '482550242088565',
    url: `${API_URL}/oauth/facebook`
  });

}
