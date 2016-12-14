app

  .controller('GrupoController', function ($state, Facebook, $rootScope, $scope) {

    if (!$rootScope.logado) {
      $state.go('login');
    } else {
      carregarPerfil();
    }

    $scope.logout = function () {
      Facebook.logout(function () {
        $scope.$apply(function () {
          $rootScope.logado = false;
          $state.go('login');
        });
      });
    };

    var carregarPerfil = function () {
      Facebook.api('/me', function (response) {
        $scope.$apply(function () {
          $rootScope.usuario = response;
          getGroups();
        });
      });
    };

    var getGroups = function () {
      Facebook.api('/me/groups', function (response) {
        $scope.$apply(function () {
          $rootScope.usuario.grupos = response.data;
          $scope.grupos = response.data;
        });
      });
    };

    $scope.selecionarGrupo = function (id) {
      for (grupo in $scope.usuario.grupos) {
        if (grupo.id === id) {
          $scope.grupo = grupo;
        }
      }
    };
  })
;
