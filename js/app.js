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

    myApp.controller('QuestionController',function ($scope, $http) {
        var user_id = localStorage.getItem('user_id');
        $http.get("http://172.20.40.172:3000/problem", {
        }).then(function successCallback(response) {
            $scope.questions = response.data;
            console.log($scope.questions);
            for(var i = 0; i < $scope.questions.length; ++i){
                $scope.questions[i].solved = false;
                if(typeof $scope.questions[i].user_id_solved !== 'undefined'){
                    for(var j = 0; j < $scope.questions[i].user_id_solved.length; ++j){
                        if(user_id === $scope.questions[i].user_id_solved[j] ){
                            $scope.questions[i].solved = true;
                        }
                    }
                }
            }
        }, function errorCallback(response) {
            console.log(response.data);
        });

        
        $scope.solveProblem = function (id) {
            sessionStorage.setItem('id', id);
            window.location.href = "problem.html";
        }
    });

    myApp.controller('ProblemController',function ($scope, $http) {
        $scope.showFile = true;
        $http.get("http://172.20.40.172:3000/problem/" + sessionStorage.getItem('id'), {
        }).then(function successCallback(response) {
            $scope.problem = response.data;
            if($scope.problem.problems_file === ""){
                $scope.showFile = false;
            }
        }, function errorCallback(response) {
            console.log(response.data);
        });
        
        $scope.submit = function () {
            var problem_solve = {problem_id: $scope.problem._id, user_id: localStorage.getItem('user_id')};
            if($scope.answer === $scope.problem.problems_result){
                $http.patch("http://172.20.40.172:3000/problem/answer", angular.toJson(problem_solve), {
                }).then(function successCallback(response) {
                    window.location.href = "question.html";
                }, function errorCallback(response) {
                    console.log(response.data);
                });
            }
            else{
                alert("ตอบผิดนะครับ");
            }
        }
        
        

    });



