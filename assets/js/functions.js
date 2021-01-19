// Constructors
import { Authenticate } from './auth.js';
import { Modal } from './components/modal.js'
import { Navigation } from './components/navigation.js'
// Functions
import { accordion } from './components/accordion.js';



function AccountUser(first_name, last_name, balance, account_id) {
   this.first_name =  first_name
   this.last_name = last_name
   this.account_name = this.first_name + " " + this.last_name
   this.balance = balance
   this.accounts = {}
   this.history = {}
}

export function Application() {

    this.current_user;
    this.state;
    this.Nav;
    this.Modal;

    // Dom elements

    this.loginToAppBtn = document.getElementById("loginToAppId");

    // Methods

    this.initialize = function() {

        this.Nav = new Navigation();
        this.Auth = new Authenticate();

        if (!this.current_user){

            // change view to app
            this.Nav.shiftPage(this.loginToAppBtn)

            // gets the local storage and updates the state
            this.getLocalStorage();
    
            // modal constructor is incharge od dynamic display of forms
            this.Modal = new Modal();
    
            // setup the simple accordion function
            accordion();
        }
    }


    // initialize local storage. do this only once
    this.initializeLocalStorage = function() {
        let state = {
            name : "Ebanko",
            users : {},
            currency : "Php"
        }
        localStorage.setItem("state", JSON.stringify(state));
    }
    
    this.getLocalStorage = function(){
        this.state = JSON.parse(localStorage.getItem("state"));
    }

    this.updateLocalStorage = function() {
        localStorage.setItem("state",JSON.stringify(this.state));
    }

    this.create_user = function(first_name, last_name, balance){
        // filter
        if (!this.detectCharacterStringOnly(first_name)|| 
            !this.detectCharacterStringOnly(last_name)) {
            
            throw Error("Cannot create new user: first or last name should not starts with number.");
            
        } else {
            let user = new AccountUser(first_name, last_name, balance);
            this.state.users[user.account_name] = user;
            this.updateLocalStorage();
        }
    }

    // Deposit
    this.deposit = function(user, amount){
        this.state.users[user].balance += amount;
        this.updateLocalStorage();
        return this.get_balance(user)
    }

    // Withdraw
    this.withdraw = function(user, amount){
        //filter
        if (this.state.users[user].balance < amount ) {
            throw Error("Cannot proceed withdrawal: Requested amount is greater than current balance.");

        } else{
            this.state.users[user].balance -= amount;
            this.updateLocalStorage();
            return this.get_balance(user)
        }

    }

    // Fund Transfer
    this.send = function(from_user, to_user, amount){
        //filter
        if (this.state.users[from_user].balance < amount ) {
            throw Error("Cannot proceed fund transfer: Requested amount is greater than current balance.");

        } else{
            this.state.users[from_user].balance -= amount;
            this.state.users[to_user].balance += amount;
            this.updateLocalStorage();

            return {
                        from_user : this.get_balance(from_user), 
                        to_user : this.get_balance(from_user)
                    }
        }
    }

    this.get_balance = function(user){
        return this.state.currency +" "+this.state.users[user].balance
    }

    this.list_users = function(){
        return this.state.users;
    }

    // utility functions

    // Function to check letters and numbers
    this.detectCharacterStringOnly = function(inputtxt){
        var letterNumber = /^[a-zA-Z]+$/;
        
        if(inputtxt.match(letterNumber)) {
            return true; // if character string
        } else { 
            return false; // if caharacter number
        }
    }
}
