// Constructors
import { Modal } from './components/modal.js'
import { Navigation } from './components/navigation.js'

import { Authenticate } from './auth.js'
// import { AccountUserData } from './database/user_accounts_table.js'

// Functions
import { accordion } from './components/accordion.js';
import { connectFormData } from './utility.js'



export function Application() {

    this.currentUser;
    this.Nav;
    this.Modal;

    // Dom elements

    this.registerBtn = document.getElementById("registerToAppId")
    this.loginToAppBtn = document.getElementById("loginToAppId")
    this.logoutBtn = document.getElementById("logoutBtnId")
    

    this.loginToAppBtn.onclick = (event) => this.loginSeries(event);
    this.registerBtn.onclick = (event) => this.registerSeries(event);
    this.logoutBtn.onclick = (event) => [this.Auth.logoutUser(), 
                                         this.Nav.shiftPage(
                                            event.currentTarget)];

    /*
        Methods
    */

    // Initialize this application
    this.initialize = function() {

        this.Auth = new Authenticate();
        this.currentUser = this.Auth.currentUser
        
        this.Nav = new Navigation();

        this.loginInitialize();
    }

    // After successfull loggin in, go to app page and initialize accordion and
    // the modal
    this.loginInitialize = function(){
        if (this.currentUser){

            // change view to app
            this.Nav.shiftPage(this.loginToAppBtn)

            // modal constructor is incharge od dynamic display of forms
            this.Modal = new Modal();
    
            // setup the simple accordion function
            accordion();
        }
    }

    // Fires when login button within the login form is pressed.
    this.loginSeries = function(event){
        event.preventDefault();
        
        // Submits form data for validation, then assign this.Auth.currentUser
        connectFormData(
            event,
            this.Auth.loginUser.bind(this.Auth),                                    
            "formLoginId",
            document.getElementById("logAlert"),
            document.getElementById("logErrorMessageId")
            // document.getElementById("logSuccessMessageId")//left undefined
        )
           
        // update this.currentUser fr0m this.Auth.currentUser
        this.currentUser = this.Auth.currentUser
        
        // Will proceed to login and shift page if this.currentUser has value
        this.loginInitialize()
        
    }

    // After successfull registraion in authentication side...
    // Create new account in Application side.
    this.registerSeries = function(event){
        connectFormData(
            event,
            this.Auth.registerUser.bind(this.Auth),                                    
            "formRegisterId",
            document.getElementById("regAlert"),
            document.getElementById("regErrorMessageId"),
            document.getElementById("regSuccessMessageId")
        )
    }


}
