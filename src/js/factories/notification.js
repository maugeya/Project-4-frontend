angular
  .module('spotlightApp')
  .factory('Notification', Notification);

Notification.$inject = ['$resource', 'API_URL'];
function Notification($resource, API_URL) {
  return new $resource(`${API_URL}/notifications/:id`, { id: '@id' }, {
    update: { method: 'PUT' }
  });
}
