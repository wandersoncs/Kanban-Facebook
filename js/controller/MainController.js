angular.module('Kanban')

  .controller('MainController', function ($scope, Facebook) {

    $scope.usuario = {};
    $scope.logado = false;
    $scope.grupos = [];
    $scope.grupo = {}

    var usuarioConectado = false;

    Facebook.getLoginStatus(function (response) {
      if (response.status == 'connected')
        userIsConnected = true;
    });

    $scope.logar = function () {
      if (!usuarioConectado) {
        login();
      } else {
        me();
      }
    };

    login = function () {
      Facebook.login(function (response) {
        if (response.status == 'connected') {
          $scope.logado = true;
          me();
        }
      }, {scope: 'user_managed_groups', 'publish_actions'});
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

    $scope.getGroups = function () {
      Facebook.api('/me/groups', function (response) {
        $scope.$apply(function () {
          $scope.grupos = response;

          $scope.grupo = {'id': $scope.grupos[0].id, 'name': $scope.grupos[0].name};

        });
      });
    };

    $scope.publicar = function (messagem, grupo) {

      var grupo = grupos[0].id;

      var url = grupo.id;
      Facebook.api(url, 'post', {message: messagem});
    }

  });
