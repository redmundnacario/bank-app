const User = function(first_name, last_name, password, user_level = "basic") {
    this.first_name =  first_name;
    this.last_name = last_name;
    this.user_name = this.first_name + " " + this.last_name;
    this.password = password;
    this.user_level = user_level;
}

export const Authenticate = function() {

    // Global variables
    this.currentUser = null;
    this.state;

    // Dom elements

    this.registerBtn = document.getElementById("registerBtnId")
    this.loginBtn = document.getElementById("loginBtnId")

    this.registerForm = document.getElementById("formRegisterId")
    this.loginForm = document.getElementById("formLoginId")


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
                    password: "123",
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
    this.initialize = function() {
        this.getLocalStorage()
    }


    // login the existing user
    this.loginUser = function(user_name, password) {

        if (this.currentUser){
            throw Error("Current session is still active.");
            // return "Current session is still active."
        }

        user_name = String(user_name);
        password = String(password);

        // check if user name exist, check ifpoassword is correct , then login, return success
        if (Object.keys(this.state.users).includes(user_name)) {

            let existingUser = this.state.users[user_name];

            if (String(existingUser.password) !== password){
                // throw Error("Username or password are incorrect.");
                return "Username or password are incorrect."
            }

            this.currentUser = existingUser.user_name;
            // console.log(this.currentUser)
            return "Successfully logged in."
        };
        // throw Error("Username or password are incorrect.");
        return "Username or password are incorrect."
    }

    // create new user
    this.registerUser = function(first_name, last_name, password, confirm_password) {

        first_name = String(first_name);
        last_name = String(last_name);
        password = String(password);
        confirm_password = String(password);

        // else create new user..
        let newUser = new User(first_name, last_name, password);

        // check if user exist and compare password ... return err message
        if (Object.keys(this.state.users).includes(newUser.user_name)) {
            // throw Error(`User already exists!`);
            return "User already exists!";
        };

        if (password === confirm_password){
            // update state
            this.state.users[newUser.user_name] = newUser;
            // update localstorage
            this.updateLocalStorage();
            // return success
            return `Successfully registered with username: "${newUser.user_name}".`;
        } else {
            // throw Error(`Passwords does not match!`);
            return `Passwords does not match!`;
        };

    }

    // logout user
    this.logoutUser = function() {
        this.currentUser = null;
        // console.log(this.currentUser)
        return "Successfully logged out."
    }
}