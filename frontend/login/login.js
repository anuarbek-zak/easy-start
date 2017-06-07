angular.module('myApp').controller('loginCtrl',function ($http, $localStorage,$state,authService) {
    var vm = this;

    vm.login = function (name,password) {
        authService.login(name,password);
    };
});
