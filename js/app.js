    var myApp = angular.module('myApp',[]);
    myApp.controller('RegController',function ($scope, $http) {
        $scope.sendREG = function () {
            var user = {user_id: $scope.stdID, first_name: $scope.stdFirstName, last_name: $scope.stdLastName};
            console.log(user);
            $http.post("http://172.20.40.172:3000/user/create", angular.toJson(user), {
                transformRequest: angular.identity,
            }).then(function successCallback(response) {
                var data = response.data;
                console.log(response);
                window.location.href = "login.html";
            }, function errorCallback(response) {
                var data = response.data;
                console.log(response);
                alert("ไม่สามารถลงทะเบียนได้");
            })
        }
    });

    myApp.controller("LoginController", function ($scope, $http){
        $scope.login = function() {
            var user_id = $scope.userID;
            console.log(user_id);
            $http.get("http://172.20.40.172:3000/user/"+user_id,{
                transformRequest: angular.identity,
            }).then(function successCallback(response) {
                var data = response.data;
                if(data.length == 0) {
                    alert("No " + user_id + " in database");
                } else {
                    localStorage.setItem("user_id", user_id);
                    window.location.href="question.html";
                }
            }),function errorCallBack(response) {
                alert("Cannot connect to data base or somthing was wrong");
            }
        }
    });




