angular
.module('spotlightApp')
.directive('shout', shout);


function shout() {
  return {
    replace: true,
    restrict: 'E',
    scope: {
      choices: '='
    },
    templateUrl: '../views/statics/shout.html',

    link: function link($scope, $element, $attrs, uiMention) {

      uiMention.findChoices = function (match) {
        return $scope.choices
        .filter(function (choice) {
          return ~(choice.username).indexOf(match[1]);
        });
      };
    }
  };
}
