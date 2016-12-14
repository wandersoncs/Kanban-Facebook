app

  .controller('LoginController', function (Facebook, $rootScope, $state) {

    $rootScope.logado = false;

    $scope.logar = function () {
      Facebook.login(function (response) {
        if (response.status == 'connected') {
          $rootScope.logado = true;
          $state.go('groups');
        }
      }, {scope: 'user_managed_groups, publish_actions'});
    };
    
  })
;
