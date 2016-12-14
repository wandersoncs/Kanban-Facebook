app

  .controller('GrupoController', function ($state, Facebook, $rootScope, $scope) {

    var carregarPerfil = function () {
      Facebook.api('/me', function (response) {
        $scope.$apply(function () {
          $scope.usuario = response;
          getGroups();
        });
      });
    };

    var getGroups = function () {
      Facebook.api('/me/groups', function (response) {
        $scope.$apply(function () {
          $scope.usuario.grupos = response.data;
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
