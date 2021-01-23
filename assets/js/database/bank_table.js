import { sample_bank_users_data } from '../sample_data/sample_bank_users_data.js'


export function Bank() {
    this.bank_name =  "Ebanko"
    this.users = {}
    this.currency = "&#8369;"
    this.transactions = []
}



export function BankData() {
    // main data
    this.bankData;

    /*
        Local Storage Methods
    */

    this.initialize = function() {
        this.getLocalStorage();
    }

    // Run this once to set the data in the localStorage
    this.initializeLocalStorage = function() {
        let bankData = new Bank()
        // bankData.users = sample_bank_users_data
        localStorage.setItem("bank", JSON.stringify(bankData));
    }

    // get data from local storage
    this.getLocalStorage = function(){
        this.bankData = JSON.parse(localStorage.getItem("bank"));
    }

    // update the local storage data
    this.updateLocalStorage = function() {
        localStorage.setItem("bank",JSON.stringify(this.bankData));
    }

    /*
        SCRIPT
    */ 

    // for testing, run this once
    if(Object.keys(localStorage).includes("bank") == false) {
        this.initializeLocalStorage();
    }

    this.initialize()
}