angular.module('myApp')
    .config(function($stateProvider, $urlRouterProvider) {
        $stateProvider
            .state('login', {
                url: '/login',
                templateUrl: 'login/login.html',
                controller:'loginCtrl',
                controllerAs:'vm',
                access:false
            })
            .state('signup', {
                url: '/signup',
                templateUrl: 'signup/signup.html',
                controller:'signupCtrl',
                controllerAs:'vm',
                access:false
            })
            .state('home', {
                url: '/home',
                templateUrl: 'home/home.html',
                controller:'homeCtrl',
                controllerAs:'vm',
                access:true
            });
        $urlRouterProvider.otherwise('/home');
    });
