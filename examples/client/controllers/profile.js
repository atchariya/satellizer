angular.module('MyApp')
  .controller('ProfileCtrl', function($scope, $http, $auth, $alert) {

    console.log($scope.currentUser);


    $scope.updateProfile = function() {
      var profileData = {
        displayName: $scope.currentUser.displayName,
        email: $scope.currentUser.email
      };

      $http.put('/api/me', profileData)
        .then(function(response) {
          $auth.updateToken(response.data.token);
          $alert({
            content: 'Profile has been updated',
            animation: 'fadeZoomFadeDown',
            type: 'material',
            duration: 3
          });
        });
    };

    $scope.link = function(provider) {
      $auth.link(provider)
        .then(function() {
          $alert({
            content: 'You have successfully linked ' + provider + ' account',
            animation: 'fadeZoomFadeDown',
            type: 'material',
            duration: 3
          });
        })
        .catch(function(response) {
          $alert({
            content: response.data.message,
            animation: 'fadeZoomFadeDown',
            type: 'material',
            duration: 3
          });
        });
    };

    $scope.unlink = function(provider) {
      $auth.unlink(provider)
        .then(function() {
          $alert({
            content: 'You have successfully unlinked ' + provider + ' account',
            animation: 'fadeZoomFadeDown',
            type: 'material',
            duration: 3
          });
        })
        .catch(function() {
          $alert({
            content: 'Could not unlink ' + provider + ' account',
            animation: 'fadeZoomFadeDown',
            type: 'material',
            duration: 3
          });
        });
    };
  });