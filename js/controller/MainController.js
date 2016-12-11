angular.module('Kanban')

  .controller('MainController', function ($scope, Facebook, $timeout) {

    $scope.logado = false;
    usuario = {};
    $scope.grupo = {};

    $scope.todo = {};
    $scope.doing = {};
    $scope.done = {};

    var feed = {};
    var usuarioConectado = false;

    // Facebook.getLoginStatus(function (response) {
    //   if (response.status == 'connected')
    //     usuarioConectado = true;
    // });

    $sope.logar = function () {
      Facebook.login(function (response) {
        if (response.status == 'connected') {
          $scope.logado = true;
          carregarPerfil();
        }
      }, {scope: 'user_managed_groups, publish_actions'});
    };

    carregarPerfil = function () {
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
          usuario.grupos = response;
        });
      });
    };

    // getFriends = function () {
    //   Facebook.api('/me/friends', function (response) {
    //     $scope.$apply(function () {
    //       usuario.friends = response;
    //     });
    //   });
    // };

    $scope.selecionarGrupo = function (id) {
      if (usuario.hasOwnProperty('grupos'))
        for (var grupo in usuario.grupos)
          if (grupo.id === id)
            $scope.grupo = grupo;
    };

    $scope.publicar = function (mensagem) {
      var url = '/' + $scope.grupo.id + '/feed';
      Facebook.api(url, 'POST', {message: mensagem}, function (response) {
        getFeedGrupo();
      });
    };

    $scope.alterarTarefa = function (tarefa) {
      var url = ''
    };

    $scope.getFeedGrupo = function () {
      var url = '/' + $scope.grupo.id + '/feed';
      Facebook.api(url, function (response) {
        feed = response;
        getTarefas();
      });
    }

    var getTarefas = function () {

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
          var msg = mensagem.replace('#todo', '');
          elem.message = msg;
          return elem;
        }
      });

      doing = tarefas.filter(function (elem) {
        var mensagem = elem.message;
        if (mensagem.indexOf('#doing') !== -1) {
          var msg = mensagem.replace('#doing', '');
          elem.message = msg;
          return elem;
        }
      });

      done = tarefas.filter(function (elem) {
        var mensagem = elem.message;
        if (mensagem.indexOf('#done') !== -1) {
          var msg = mensagem.replace('#done', '');
          elem.message = msg;
          return elem;
        }
      });

      $scope.todo = todo.;
      $scope.doing = doing;
      $scope.done = done;
    }

    setTarefa = function () {

    };

  });
