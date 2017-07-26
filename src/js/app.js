angular
  .module('spotlightApp', ['ngResource', 'ui.router', 'satellizer', 'checklist-model', 'ngMessages', 'angular-notification-icons'])
  .constant('API_URL', 'http://localhost:3000/api');
