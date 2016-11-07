/* DashboardCtrl controller -> responsible for dashboard and having $state,
 $auth and $rootScope as dependencies*/
angular.module('sm-candidateprofile')
.controller('DashboardCtrl', [
  '$auth', 
  '$rootScope', 
  '$scope', 
  function(  
    $auth, 
    $rootScope, 
    $scope) {
    $scope.uname = $auth.getPayload().uname;
    /* =============================================
    =  Checking whether the user is authenticated
       or not.Based on user's authenticity .

           if return of $auth.isAuthenticated() is->
               "true" ->   signout flag in root
                           scope is set to true
                           i.e signout button is
                           will be displayed in
                           the navbar .
               "false" ->  signout flag in root scope
                           is set to false i.e signout
                           button is will be hidden in
                           the navbar .

       NOTE :- to check the sign declaration in rootscope
               , check applayout/controllers/navctr =
    =============================================*/

    if ($auth.isAuthenticated()) {
        // set to true if authenticated
        $rootScope.signout = true; 
        // set to loggedinbackground if authenticated i.e set the background as white
        $rootScope.loggedinbackground = 'loggedinbackground';
    } else {
        // set to false if not authenticated ex: in case session expiration
        $rootScope.signout = false; 
        // set to loggedoutbackground if not authenticated
        $rootScope.loggedinbackground = 'loggedoutbackground';
    }

    /* =====  End of Section comment block  ======*/
}]);
