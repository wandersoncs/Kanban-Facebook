angular.module('Kanban')

  .controller('MainController', function ($scope, Facebook, $timeout) {

    $scope.usuario = {};
    $scope.logado = false;
    $scope.grupos = {};
    $scope.grupo = {};
    $scope.feed = {};

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
      }, {scope: 'user_managed_groups, publish_actions'});
    };

    me = function () {
      Facebook.api('/me', function (response) {
        $scope.$apply(function () {
          $scope.usuario = response;
          getGroups();
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

    getGroups = function () {
      Facebook.api('/me/groups', function (response) {
        $scope.$apply(function () {
          $scope.grupos = response;
        });
      });
    };

    $scope.selecionarGrupo = function () {
      $scope.grupo = $scope.grupos.data[0];
    };

    $scope.publicar = function (mensagem) {
      var url = '/' + $scope.grupo.id + '/feed';
      Facebook.api(url, 'POST', {message: mensagem}, function (response) {
        
      });
    };

    $scope.getFeedGrupo = function () {
      var url = '/' + $scope.grupo.id + '/feed';
      Facebook.api(url, function (response) {
        $scope.feed = response;
      });
    }
  });
