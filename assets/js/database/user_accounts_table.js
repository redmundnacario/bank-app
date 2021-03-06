import { sample_bank_users_data } from '../sample_data/sample_bank_users_data.js';
import { Bank } from './bank_table.js';
import { Transaction } from './transaction_table.js';

export function AccountUser(first_name, last_name, balance, account_id, date_created){

    this.first_name =  first_name
    this.last_name = last_name
    this.account_name = this.first_name + " " + this.last_name

    this.accounts = {
            [ account_id ] : {
                balance : balance,
                history :  [
                    new Transaction(
                        {
                            action : `Created`,
                            account_number : account_id,
                            amount : balance,
                            remaining_balance : balance,
                            status : "Completed"
                        }
                    )
                ],
                date_created : date_created
            }
    }
    this.date_created = date_created
}


export function AccountUserData(user_name) {
    /*
        user_name : string
    */

    // main data
    this.current_user = user_name;
    this.accountUserData;

    // Run this once to set the data in the localStorage
    this.initializeLocalStorage = function() {
        let bankData = new Bank()
        bankData.users = sample_bank_users_data
        localStorage.setItem("bank", JSON.stringify(bankData));
    }

    this.initialize = function() {
        let bankData = JSON.parse(localStorage.getItem("bank"));

        if (Array.isArray(this.current_user)){
            this.current_user.forEach(value => {
                if (Object.keys(bankData.users).includes(value)){
                    // do nothing
                } else {
                    throw Error (`Ebanko account with user name ${value} does not exist.`)
                }
                this.getLocalStorage(bankData)
            })
        } else {
            if (Object.keys(bankData.users).includes(this.current_user)){
                this.getLocalStorage(bankData)
            } else {
                throw Error (`Ebanko account with user name ${this.current_user} does not exist.`)
            }
        }
    }

    this.getLocalStorage = function(bankData){
        if (Array.isArray(this.current_user)){
            this.accountUserData = {};
            this.current_user.forEach(value => {
                this.accountUserData[value] = bankData.users[value]
            })
        } else {
            this.accountUserData  = bankData.users[this.current_user]
        }
    }

    this.updateLocalStorage = function(bankData) {
        if (Array.isArray(this.current_user)){
            this.current_user.forEach(value => {
                bankData.users[value] = this.accountUserData[value]
            })
        } else {
            bankData.users[this.current_user] = this.accountUserData
        }

        localStorage.setItem("bank", 
            JSON.stringify(bankData));
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