/* sm-candidateprofile Module is in root folder in smcandidateprofile.js */
angular.module("sm-candidateprofile")
    .config(function($stateProvider, $urlRouterProvider, $authProvider) {

        /* skipIfLoggedIn() function redirects user to a particular page based on its authentication status i.e if user is logged in he will be automatically redirected to a defined state in this case it is "/dashboard" and hence skipping the view where it is called */
        var skipIfLoggedIn = ['$q', '$auth', '$location', function($q, $auth, $location) {
            var deferred = $q.defer();
            if ($auth.isAuthenticated()) {
                console.log('from inside helper');
                $location.path('/dashboard');
            } else {
                deferred.resolve();
            }
            return deferred.promise;
        }];
        //skipIfLoggedIn ends


        /* loginRequired() function redirects user to login page based on its authentication status i.e if user is not logged in he will be automatically redirected to login state wherever he may be , in this case it is the view where this function is called . */
        var loginRequired = ['$q', '$location', '$auth', function($q, $location, $auth) {
            var deferred = $q.defer();
            if ($auth.isAuthenticated()) {
                deferred.resolve();
            } else {
                $location.path('/login');
            }
            return deferred.promise;
        }];
        //loginRequired ends


        // Url routing starts here
        $stateProvider
            .state('login', {
                url: '/login',
                views: {
                    "content": {
                        templateUrl: '/candidatelogin/templates/login.html',
                        controller: 'LoginCtrl',
                        controllerAs: 'login',
                        resolve: {
                            skipIfLoggedIn: skipIfLoggedIn /*passing skipIfLoggedIn function here enables skipping login view if the user is already authenticated*/
                        }

                    }
                }
            })
            .state('register', {
                url: '/register',
                views: {
                    "content": {
                        templateUrl: 'registercandidate/templates/register.html',
                        controller: 'RegisterCtrl as register',
                        resolve: {
                            skipIfLoggedIn: skipIfLoggedIn /*passing skipIfLoggedIn function here enables skipping login view if the user is already authenticated*/
                        }
                    }
                }
            })
            .state('dashboard', {
                url: '/dashboard',

                views: {
                    "content": {
                        templateUrl: 'candidatehome/templates/dashboard.html',
                        controller: 'DashboardCtrl',
                        controllerAs: 'dashboard',
                        resolve: {
                            loginRequired: loginRequired /*passing loginRequired function here enables redirecting user to the login view if the user is not authenticated . This will prevent user form accessing this state*/
                        }
                    }
                }
            });

        // redirects to login page if user request a non-existing state
        $urlRouterProvider.otherwise('/login');

    });
