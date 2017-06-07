angular.module('myApp').controller('signupCtrl',function ($http,$state,$localStorage,authService) {
    var vm = this;

    vm.signUp = function (name,password) {
        authService.signup(name,password);
    };
});
