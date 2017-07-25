angular
  .module('spotlightApp')
  .factory('Topic', Topic);

Topic.$inject = ['$resource', 'API_URL'];
function Topic($resource, API_URL) {
  return new $resource(`${API_URL}/topics/:id`, { id: '@id' }, {
    update: { method: 'PUT' }
  });
}
