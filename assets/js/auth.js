import { connectFormData } from './utility.js'
import { strictAllInputValidator } from './utility.js'
import { passwordLengthInputValidator } from './utility.js'
import { passwordValueInputValidator } from './utility.js'


// User Constructor - Creates new instance of User
const User = function(first_name, last_name, password, user_level = "basic") {
    this.first_name =  first_name;
    this.last_name = last_name;
    this.user_name = this.first_name + " " + this.last_name;
    this.password = password;
    this.user_level = user_level;
}


// Authenticate Constructor
export const Authenticate = function() {

    // Global variables
    this.currentUser = null;
    this.state;

    // Dom elements

    this.registerBtn = document.getElementById("registerToAppId")
    this.loginBtn = document.getElementById("loginToAppId")


    /*
        LOCAL STORAGE
    */

    // initialize local storage. do this only once , can be used to load initial sample data
    this.initializeLocalStorage = function() {
        let state = {
            name : "eBanko User Auth Database",
            users : {
                "Redmund Nacario": {
                    first_name : "Redmund",
                    last_name : "Nacario",
                    user_name : "Redmund Nacario",
                    password: "admin123",
                    user_level : "admin",
                },
                "John Doe": {
                    first_name : "John",
                    last_name : "Doe",
                    user_name : "John Doe",
                    password: "johndoe1",
                    user_level : "basic",
                }
            },
        }
        localStorage.setItem("auth", JSON.stringify(state));
    }
    
    this.getLocalStorage = function(){
        this.state = JSON.parse(localStorage.getItem("auth"));
    }

    this.updateLocalStorage = function() {
        localStorage.setItem("auth",JSON.stringify(this.state));
    }

    /*
        METHODS
    */ 

    // initialize Auth
    this.initialize = function() {
        this.getLocalStorage()
    }


    // login the existing user
    this.loginUser = function(inputObj) {

        if (this.currentUser){
            throw Error("Current session is still active.");
            // return "Current session is still active."
        }

        let user_name = String(inputObj["log-username"]);
        let password = String(inputObj["log-password"]);

        // check if user name exist, check ifpoassword is correct , then login, return success
        if (Object.keys(this.state.users).includes(user_name)) {

            let existingUser = this.state.users[user_name];

            if (String(existingUser.password) !== password){
                throw Error("Username or password are incorrect.");
                // return "Username or password are incorrect."
            }

            this.currentUser = { 
                user_name : existingUser.user_name,
                user_level : existingUser.user_level
            };
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
        let newUser = new User(first_name, last_name, password);

        if (password === confirm_password){

            // check if user exist and compare password ... return err message
            if (Object.keys(this.state.users).includes(newUser.user_name)) {
                throw Error(`User already exists!`);
                // return "User already exists!";
            };

            // update this.state
            this.state.users[newUser.user_name] = newUser;
            // update localstorage
            this.updateLocalStorage();
            // return success
            return `Successfully registered with user name: "${newUser.user_name}".`;
        } else {
            throw Error(`Passwords do not match!`);
            // return `Passwords does not match!`;
        };

    }


    // logout user
    this.logoutUser = function() {
        this.currentUser = null;
        // console.log(this.currentUser)
        return "Successfully logged out."
    }

    // for testing
    // this.initializeLocalStorage();

    // initialize the contents when this constructor is called
    this.initialize();

    // ADD event listeners
    // this.registerBtn.onclick = (event) => {
    //     connectFormData(
    //         event,
    //         this.registerUser.bind(this),                                    
    //         "formRegisterId",
    //         document.getElementById("regAlert"),
    //         document.getElementById("regErrorMessageId"),
    //         document.getElementById("regSuccessMessageId")
    //     )
    // };

    // this.loginBtn.onclick = (event) => {
    //     connectFormData(
    //         event,
    //         this.loginUser.bind(this),                                    
    //         "formLoginId",
    //         document.getElementById("logAlert"),
    //         document.getElementById("logErrorMessageId"),
    //         document.getElementById("logSuccessMessageId")
    //     )
    // };
}

