    var myApp = angular.module('myApp',[]);

    var address = "http://tg-2017.herokuapp.com";
    myApp.controller('RegController',function ($scope, $http) {
        $scope.sendREG = function () {
            var user = {user_id: $scope.stdID, first_name: $scope.stdFirstName, last_name: $scope.stdLastName};
            console.log(user);
            $http.post(address + "/user/create", angular.toJson(user), {
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
            $http.get(address + "/user/"+user_id,{
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
        $http.get(address + "/problem", {
        }).then(function successCallback(response) {
            $scope.questions = response.data;
            console.log($scope.questions);
            for(var i = 0; i < $scope.questions.length; ++i){
                $scope.questions[i].solved = false;
                if(typeof $scope.questions[i].user_id_solved !== 'undefined'){
                    for(var j = 0; j < $scope.questions[i].user_id_solved.length; ++j){
                        if(user_id == $scope.questions[i].user_id_solved[j] ){
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
        $http.get(address + "/problem/" + sessionStorage.getItem('id'), {
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
                $http.patch(address + "/problem/answer", angular.toJson(problem_solve), {
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

    myApp.controller('ScoreboardController',function ($scope,$http) {
        $scope.per = [{user_id: '5', status: [], score: 0}];
        var pro = {};
        var sum = 0;
        var check = false;
        $http.get(address + "/problem",{
        }).then(function successCallback (response) {
            $scope.NumProblem = response.data;
            $http.get(address + "/user",{
            }).then(function successCallback (response) {
                $scope.numPerson = response.data;
                for(var i = 0; i < $scope.numPerson.length; i++) {
                    $scope.numPerson[i].status = [];
                    $scope.numPerson[i].score = 0;
                    for(var j = 0; j < $scope.NumProblem.length; j++) {
                        pro = $scope.NumProblem[j];
                        $scope.numPerson[i].status[j] = false;
                        if(typeof pro.user_id_solved !== 'undefined'){
                            for(var k = 0; k < pro.user_id_solved.length; ++k){
                                if($scope.numPerson[i].user_id == pro.user_id_solved[k]) {
                                    $scope.numPerson[i].status[j] = true;
                                    $scope.numPerson[i].score += parseInt(pro.problems_score);
                                    break;
                                }
                            }
                        }
                    }
                }
            }),function errorCallback (response) {
                console.log(response.data);
            }

        }),function errorCallback (response) {
            console.log(response.data);
        }







    });



