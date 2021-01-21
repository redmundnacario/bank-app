// Constructor
import { UserAuthData, UserAuth } from './database/user_auth_table.js';

// Functions
import { strictAllInputValidator } from './utility.js'
import { passwordLengthInputValidator } from './utility.js'
import { passwordValueInputValidator } from './utility.js'
import { create_user } from './functions.js'



// Authenticate Constructor
export const Authenticate = function() {

    // Global variables
    this.currentUser = null;
    this.newUser = null;

    this.state;


    /*
        Local storage methods METHODS
    */ 

    // initialize Auth
    this.initialize = function() {
        this.state = new UserAuthData();
        this.state.getLocalStorage();
        this.currentUser = this.state.userAuthData.current_user;
    }

    /*
        METHODS
    */ 

    // login the existing user
    this.loginUser = function(inputObj) {

        // Check if one of the requirements is empty
        strictAllInputValidator(inputObj,
            "Logging-in cannot proceed if all requirements are not complete.")
        
         //check if password or confirm password is missing
        passwordValueInputValidator(inputObj["log-password"],
            `"Password" is required in order to proceed.`)

        if (this.currentUser){
            throw Error("Current session is still active.");
            // return "Current session is still active."
        }

        let user_name = String(inputObj["log-username"]);
        let password = String(inputObj["log-password"]);

        // check if user name exist, check ifpoassword is correct , then login, return success
        if (Object.keys(this.state.userAuthData.users).includes(user_name)) {

            let existingUser = this.state.userAuthData.users[user_name];

            if (String(existingUser.password) !== password){
                throw Error("Username or password are incorrect.");
                // return "Username or password are incorrect."
            }

            this.currentUser = { 
                user_name : existingUser.user_name,
                user_level : existingUser.user_level
            };

            this.state.userAuthData.current_user = this.currentUser;
            this.state.updateLocalStorage()

            // console.log(this.currentUser)
            return "Successfully logged in."
        };
        throw Error("Username or password are incorrect.");
        // return "Username or password are incorrect."
    }

    // create new user
    this.registerUser = function(inputObj) {

        // Check if one of the requirements is empty
        strictAllInputValidator(inputObj,
            "Registration cannot proceed if all requirements are not complete.")

        //check if password or confirm password is missing
        passwordValueInputValidator(inputObj["reg-password"],
            `"Password" is required in order to proceed.`)

        passwordValueInputValidator(inputObj["reg-confirm-password"],
            `"Confirm Password" is required in order to proceed.`)

        //Check if password is <8
        passwordLengthInputValidator(inputObj["reg-password"], 8,
            `"Password" length must not be less than 8 characters.`)


        let first_name = String(inputObj["reg-firstname"]);
        let last_name = String(inputObj["reg-lastname"]);
        let password = String(inputObj["reg-password"]);
        let confirm_password = String(inputObj["reg-confirm-password"]);

        // else create new user..
        let newUser = new UserAuth(first_name, last_name, password);

        if (password === confirm_password){

            // check if user exist and compare password ... return err message
            if (Object.keys(this.state.userAuthData.users).includes(newUser.user_name)) {
                throw Error(`User already exists!`);
                // return "User already exists!";
            };

            // update this.state
            this.state.userAuthData.users[newUser.user_name] = newUser;

            // update this.newUser
            this.newUser = {
                first_name : newUser.first_name,
                last_name : newUser.last_name,
                date_created : newUser.date_created,
            }

            this.createUserAccountThroughRegistration()

            // update localstorage
            this.state.updateLocalStorage();
            // return success
            return `Successfully registered with user name: "${newUser.user_name}".`;
        } else {
            throw Error(`Passwords do not match!`);
            // return `Passwords does not match!`;
        };

    }

    this.createUserAccountThroughRegistration = function(
                                                         balance = 0.00,
                                                         account_id = "Account_1" 
                                                        ) {
        let { first_name, last_name, date_created } = this.newUser;

        create_user(first_name, last_name, 
                    balance, account_id, date_created )
    }

    // logout user
    this.logoutUser = function() {

        this.currentUser = null;
        this.state.userAuthData.current_user = this.currentUser;
        this.state.updateLocalStorage()
        // return "Successfully logged out."
    }

    // initialize the contents when this constructor is called
    this.initialize();

}

