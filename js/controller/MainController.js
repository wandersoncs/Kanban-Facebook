angular.module('Kanban')

  .controller('MainController', function ($scope, Facebook) {

    $scope.usuario = {};
    $scope.logado = false;

    var usuarioConectado = false;

    Facebook.getLoginStatus(function (response) {
      if (response.status == 'connected')
        userIsConnected = true;
    });

    $scope.logar = function () {
      if (!usuarioConectado) {
        login();
      }
    };

    login = function () {
      Facebook.login(function (response) {
        if (response.status == 'connected') {
          $scope.logado = true;
          me(); //meu perfil
        }
      });
    };

    me = function () {
      Facebook.api('/me', function (response) {
        $scope.$apply(function () {
          $scope.usuario = response;
        });
      });
    };

    $scope.logout = function () {
      Facebook.logout(function () {
        $scope.$apply(function () {
          $scope.usuario  = {};
          $scope.logado   = false;
        });
      });
    };

  });
