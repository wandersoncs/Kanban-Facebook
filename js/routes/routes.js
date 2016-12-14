app

  .config(function ($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.otherwise('/');

    $stateProvider

      .state('login', {
        url: '/'
        , templateUrl: 'views/login.html'
        , controller: 'LoginController'
      })

      .state('grupos', {
        url: '/grupos'
        , templateUrl: 'views/grupos.html'
        , controller: 'GrupoController'
      })

      .state('home', {
        url: '/home'
        , templateUrl: 'views/home.html'
        , controller: 'MainController'
      })

      .state('privacidade', {
        url: '/privacidade'
        , templateUrl: 'views/privacidade.html'
      })
      ;
  })
;
