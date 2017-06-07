var myApp = angular.module('myApp', ['ui.router','ngAnimate','ngMaterial','ngCookies','ngStorage'])
    .run(function ($rootScope,$localStorage,authService,$state) {
    console.log('app started');
    $rootScope.$on('$stateChangeStart',
        function (event, toState, toParams, fromState, fromParams) {
            if($localStorage.user){
                if(toState.name=='login'||toState.name=='signup'){
                    event.preventDefault();
                    window.history.forward();
                }
            }
        }
    );
});

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

angular.module('myApp').factory('authService', function ($q, $http,$state,$localStorage) {

            // return available functions for use in the controllers
            return ({
                isLoggedIn: isLoggedIn,
                login: login,
                logout: logout,
                signup: signup
            });

            function isLoggedIn() {
                $http.post('/auth/api/status')
                    .success(function (data) {
                        if(!data.status) $state.go('login');
                    })
                    // handle error
                    .error(function (err) {
                        console.log(err);
                    });
            }

            function login(name, password) {
                $http.post("/auth/api/login",{name:name,password:password})
                    .success(function(response){
                        console.log(response);
                        $localStorage.user = response;
                        $state.go('home');
                    })
                    .error(function(err){
                        console.log(err);
                    });
            }

            function logout() {
                $localStorage.user = undefined;
                console.log("logout user",$localStorage.user);
                $http.post("auth/api/logout")
                    .success(function(response){
                        console.log(response);
                    })
                    .error(function(err){
                        console.log(err);
                    });
                $state.go('login');
            }

            function signup(name, password) {
                $http.post("/auth/api/signup",{name:name,password:password})
                    .success(function(response){
                        console.log(response);
                        $localStorage.user = response;
                        $state.go('home');
                    })
                    .error(function(err){
                        console.log(err);
                    });
            }

        });

angular.module('myApp').controller('homeCtrl',function ($http,$cookies,$state,$localStorage,authService) {
    var vm = this;

    authService.isLoggedIn();

    $http.get("/api/users")
        .success(function(response){
           console.log(response);
            vm.users = response;
            vm.user = $localStorage.user;
            console.log("home",$localStorage.user);
        })
        .error(function(err){
            console.log(err);
        });

    vm.logout = function () {
      authService.logout();
    };

});

angular.module('myApp').controller('loginCtrl',function ($http, $localStorage,$state,authService) {
    var vm = this;

    vm.login = function (name,password) {
        authService.login(name,password);
    };
});

angular.module('myApp').controller('signupCtrl',function ($http,$state,$localStorage,authService) {
    var vm = this;

    vm.signUp = function (name,password) {
        authService.signup(name,password);
    };
});
