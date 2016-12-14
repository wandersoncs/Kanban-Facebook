app

  .controller('LoginController', function (Facebook, $rootScope, $state, $scope) {

    $rootScope.logado = false;

    $scope.logar = function () {
      Facebook.login(function (response) {
        if (response.status == 'connected') {
          $rootScope.logado = true;
          $state.go('grupos');
        }
      }, {scope: 'user_managed_groups, publish_actions'});
    };

  })
;
