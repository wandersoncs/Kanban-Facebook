app

  .controller('MainController', function ($rootScope, $scope, Facebook, $timeout) {

    $scope.usuario = {};
    $scope.grupo = {};

    $scope.todo = [];
    $scope.doing = [];
    $scope.done = [];

    var feed = {};
    var usuarioConectado = false;

    if ($rootScope.logado) {
      carregarPerfil();
    }

    // $scope.logar = function () {
    //   Facebook.login(function (response) {
    //     if (response.status == 'connected') {
    //       $rootScope.logado = true;
    //       carregarPerfil();
    //     }
    //   }, {scope: 'user_managed_groups, publish_actions'});
    // };

    $scope.logout = function () {
      Facebook.logout(function () {
        $scope.$apply(function () {
          $scope.usuario = {};
          $rootScope.logado = false;
        });
      });
    };

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
