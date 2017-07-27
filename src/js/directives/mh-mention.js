angular
.module('spotlightApp')
.directive('mhMentions', mhMentions); //mike hayden memoirs

mhMentions.$inject = ['filterFilter', '$rootScope']; //injecting filter filter
function mhMentions(filterFilter, $rootScope) {
  return {
    replace: true,
    restrict: 'E',
    templateUrl: 'js/views/static/mentions.html',
    scope: {
      users: '=', // users = whatever we put in the speechmarks in html, this is main.users, which is defined further down in the mainctrl
      mentions: '=', //allows for a mentions attribute
      body: '=ngModel'
    },
    link($scope, $element) { //all funcitonality is contained in the link for this directive
      $scope.body = $scope.body || '';
      $scope.mentions = $scope.mentions || []; //pulls the mentions from the html to the scope, or notthing, if there is nothing to attach


      // find index of the start of the last word
      function getIndexOfLastWord(str) {
        const lastSpace = str.lastIndexOf(' ') + 1; //find the start of the next word by looking for the spaces and adding 1 to their index, this works after one word is selected from the dropdown, as it adds a space and then can move on to the next word
        const lastNewline = str.lastIndexOf('\n') + 1; // allows for a carrage return to be considered also as a space , otherwise the regex will not read the next word
        return lastSpace > lastNewline ? lastSpace : lastNewline; //if lastspace is bigger than last new line, return last space, if not, return last new line
      }

      // keyCodes use for selecting users (tab, enter, up, down)
      const specialKeyCodes = [9,13,38,40];

      // regex for finding username in body text
      const regex = /[^\s]*@\b[\.a-z0-9_-]+\b/gi; //find anything with whitespace -\s, this is the beginning of the word- \b, then an @ then any characters (a-z 09), end of the word -b, globally - g and case insensitive- i
      // in regex \ means the next character has a purpose, and is not literally the typed char.
      //therefore \s = whitespace

      // add mouseover events to user selection
      function addMouseEvents() {
        const $lis = $element.find('ol').children(); //once the dropdown is populated, find the ol's children (lis- mentions)

        $lis.on('mouseover', function() { //on rollover of mouse
          $scope.selectedIndex = Array.from($lis).indexOf(this); //find the index of the child in the array and attach it to the selected index scope
          //array.from passes in the lis in the dom  and forms them into an array, otherwise they would just be lone lis
          $scope.$apply(); //updates the view dynamically as the change occurs, then fires the 'digest cycle'
        });
      }

      $scope.$watch('body', (val) => { //watch for changes in the text area (body)
        // find mentions in body text
        const usernames = (val.match(regex)||[]).map(match => match.substr(1));
        // take the array of matches [@mike, @dave] and return them, or an empty array to the map function,
        // then with those matches, take off the first letter at index 0, ei. the @ symbol
        $scope.mentions = filterFilter($scope.users, (user => {
          return usernames.some(username => username === user.username);
        }));

        // find options based on current input after @ symbol
        //gives the option of having additional @s in a post, finding the index of the last word typed and ignors everything before it
        let searchString = (val.substr(getIndexOfLastWord(val)).match(regex) || [])[0];
        searchString = searchString ? searchString.substr(1) : null;
        //take the @ symbol off

        $scope.options = filterFilter($scope.users, { username: searchString });
        $scope.selectedIndex = 0;

        // allow user selection with mouse once <ol> has been populated
        $scope.$$postDigest(addMouseEvents); //fires a callback after the digest cycle- in this case the population of the ols
      });

      // allow user selection with keyboard
      $element.on('keydown', (e) => { //when any key is pressed

        if($scope.options.length > 0) { //if the ol is populated
          console.log('beanz');
          if(specialKeyCodes.includes(e.keyCode)) e.preventDefault(); //if the key matches one of the special keys defined above
          // tab or enter, pass in the user that is in the ol to the mention function below
          if(e.keyCode === 9 || e.keyCode === 13) $scope.mention($scope.options[$scope.selectedIndex]);
          if(e.keyCode === 38) { //up key
            $scope.selectedIndex -= 1;
            if($scope.selectedIndex < 0) $scope.selectedIndex = $scope.options.length - 1; //move selector up 1 space
          }
          if(e.keyCode === 40) { // down
            $scope.selectedIndex += 1;
            if($scope.selectedIndex > $scope.options.length - 1) $scope.selectedIndex = 0; //selector down
          }

          if(specialKeyCodes.includes(e.keyCode)) $scope.$apply();
        }
      });

      // add user to body and re-focus on the textarea in case user was selected with the mouse
      $scope.mention = function mention(user) {
        $scope.body = $scope.body.substring(0, getIndexOfLastWord($scope.body)); //replace what the user began typing from the @ symbol
        $scope.body += `@${user.username} `; //with what we have passed in from the populated ol
        $element.find('textarea')[0].focus(); //refocus on the text area




      };



    }
  };
}
