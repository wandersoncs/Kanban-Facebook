app

  .controller('MainController', function ($rootScope, $scope, Facebook, $timeout) {

    if (!$rootScope.logado || !$rootScope.grupo) {
      $state.go('login');
    }
    // else {
    //   carregarPerfil();
    // }

    $scope.grupo = {};
    $scope.todo = [];
    $scope.doing = [];
    $scope.done = [];

    var feed = {};
    var usuarioConectado = false;

    $scope.logout = function () {
      Facebook.logout(function () {
        $scope.$apply(function () {
          $rootScope.usuario = {};
          $rootScope.logado = false;
        });
      });
    };

    $scope.logout = function () {
      Facebook.logout(function () {
        $scope.$apply(function () {
          $rootScope.usuario = {};
          $rootScope.logado = false;
          $state.go('login');
        });
      });
    };

    $scope.criarTarefa = function (mensagem) {
      var url = '/' + $scope.grupo.id + '/feed';
      mensagem = mensagem + ' #todo';
      Facebook.api(url, 'POST', {message: mensagem}, function (response) {
        getFeedGrupo();
      });
    };

    $scope.alterarTarefa = function (tarefa, tipo) {
      var url = '/' + tarefa.id;
      var mensagem = tarefa.message + ' ' + tipo;
      Facebook.api(url, 'POST', {message: mensagem}, function (response) {
        if (response && !response.error) {
          getFeedGrupo();
        }
      });
    };

    $scope.deletarTarefa = function (tarefa) {
      var url = '/' + tarefa.id;
      Facebook.api(url, 'DELETE', function (response) {
        if (response && !response.error) {
          getFeedGrupo();
        }
      });
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

      $scope.todo = todo;
      $scope.doing = doing;
      $scope.done = done;
    };

  })
;
