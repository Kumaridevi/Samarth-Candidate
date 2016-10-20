/* RegisterCtrl controller -> responsible for authentication and hhaving $state, $auth as dependencies*/
angular.module('sm-candidateprofile').controller('RegisterCtrl', function($state, $auth) {
    var vm = this;
    vm.user = {};
    /*Login() function which will be actually called in the associated view for 
    registering the user*/
    vm.register = function __register() {

        /*$auth.signup() is a predefined function provided by satellizer for initiating registration
        of the user . This returns a promise and accepts an object with all the required fields which 
        needs to be sent to the api for registration
        
        NOTE :- To change the registration api endpoint/URI , please override $authProvider.signupUrl with new 
        value in candidatehome/candidatehomemodule.js */
        $auth.signup({

            name: vm.user.name,
            email: vm.user.email,
            password: vm.user.password

        }).then(function(response) {

            $state.go('dashboard'); // redirects to a mentioned state if successfull

        }).catch(function(response) {
            
            window.alert('Error: Register failed');// alert msg on error 
            //@Todo Logic to handle error

        });// $auth.signup ends
    };
})
