angular.module('Kanban')

  .controller('MainController', function ($scope, Facebook, $timeout) {

    $scope.logado = false;
    $scope.usuario = {};

    $scope.grupos = {};
    $scope.grupo = {};

    $scope.todo = {};
    $scope.doing = {};
    $scope.done = {};

    var feed = {};
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

    publicar = function (mensagem) {
      var url = '/' + $scope.grupo.id + '/feed';
      Facebook.api(url, 'POST', {message: mensagem}, function (response) {
        getFeedGrupo();
      });
    };

    $scope.getFeedGrupo = function () {
      var url = '/' + $scope.grupo.id + '/feed';
      Facebook.api(url, function (response) {
        feed = response;
        getTarefas();
      });
    }

    getTarefas = function () {

      var tarefas = {};
      var todo = {};
      var doing = {};
      var done = {};

      tarefas = feed.data;
      tarefas = tarefas.filter(function (elem) {
        if ('message' in elem) {
          return elem;
        }
      });

      todo = tarefas.filter(function (elem) {
        var mensagem = elem.message;
        if (mensagem.indexOf('#todo') !== -1) {
          return elem;
        }
      });

      doing = tarefas.filter(function (elem) {
        var mensagem = elem.message;
        if (mensagem.indexOf('#doing') !== -1) {
          return elem;
        }
      });

      done = tarefas.filter(function (elem) {
        var mensagem = elem.message;
        if (mensagem.indexOf('#done') !== -1) {
          return elem;
        }
      });

      $scope.todo = todo.;
      $scope.doing = doing;
      $scope.done = done;
    }

    setTarefa = function () {

    }
  });
