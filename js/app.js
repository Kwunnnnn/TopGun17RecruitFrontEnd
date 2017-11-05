    var myApp = angular.module('myApp',[]);
    myApp.controller('RegController',function ($scope, $http) {
        $scope.id = parseInt("07570555");
        $scope.firstname = "aaaaaaaa";
        $scope.last = "bbbbbbb";
        var user = {user_id : $scope.id, first_name : $scope.firstname, last_name: $scope.last};
        console.log(user);


        $scope.sendREG = function () {
            console.log(user);
            $http.post("http://172.20.40.172:3000/user/create", angular.toJson(user), {
                transformRequest: angular.identity,
            }).then(function (data,status,headers,config) {
                    window.location.href = "home.html";
                }).error(function (data, status, headers, config) {
                    console.log(data);
                })
        }
    });


