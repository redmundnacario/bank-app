// Constructor
import { AccountUser, AccountUserData, Transaction } from './database/user_accounts_table.js';
import { BankData } from './database/bank_table.js';
// Functions
import { detectCharacterStringOnly } from './utility.js'

// Creates user
export function create_user(first_name, last_name,
                            balance, account_id, date_created){
    // filter
    if (!detectCharacterStringOnly(first_name)|| 
        !detectCharacterStringOnly(last_name)) {

        throw Error("Cannot create new user: first or last name should not starts with number.");

    } else {
        let user = new AccountUser(first_name, last_name,
                                    balance, account_id, date_created);
        let bank = new BankData(); 

        bank.bankData.users[user.account_name] = user;
        bank.updateLocalStorage(); 
    }
}

// create account (add)

export function addAccount(user_name, balance = 0){
    let accountUser = new AccountUserData(user_name)

    let accountsObj = accountUser.accountUserData.accounts
    let accountArray = Object.entries(accountsObj)
    let newAccountName = "Account_" + (accountArray.length + 1);
    
    let inputObj = {
        action : `Account Creation (${newAccountName})`,
        amount : balance,
        remaining_balance : balance,
        status : "Completed"
    }

    accountsObj[newAccountName] = {
        balance : balance,
        history : [
            new Transaction(inputObj)
        ], 
        date_created : date_created
    }
    
    accountUser.updateLocalStorage();
}


// Deposit
export function deposit(user_name, account_id, amount){

    // access data in local storage
    let accountUser = new AccountUserData(user_name)

    accountUser.accountUserData.accounts[account_id].balance += amount;

    let inputObj = {
        action : "Online Deposit",
        amount : amount,
        remaining_balance : accountUser.accountUserData.accounts[account_id].balance,
        status : "Completed"
    }

    accountUser.accountUserData.accounts[account_id].history.push(
        new Transaction(inputObj)
    )
    // update localstorage
    accountUser.updateLocalStorage();
    
}

// Withdraw
export function withdraw(user_name, account_id, amount){
    //filter
    let accountUser = new AccountUserData(user_name)
    

    if (accountUser.accountUserData.accounts[account_id].balance < amount ) {
        throw Error("Cannot proceed withdrawal: Requested amount is greater than current balance.");

    } else{
        accountUser.accountUserData.accounts[account_id].balance -= amount;

        let inputObj = {
            action : "Online Withdraw",
            amount : "-"+amount,
            remaining_balance : accountUser.accountUserData.accounts[account_id].balance,
            status : "Completed"
        }
        
        accountUser.accountUserData.accounts[account_id].history.push(
            new Transaction(inputObj)
        )


        // update local storage
        accountUser.updateLocalStorage();
        
    }

}

// Fund Transfer
export function send(from_user, from_user_account_id ,
                     to_user, to_user_account_id,
                     amount){

    let fromAccountUser = new AccountUserData(from_user)
    let ToAccountUser = new AccountUserData(to_user)

    //filter
    if (fromAccountUser.accountUserData.accounts[from_user_account_id].balance < amount ) {
        throw Error("Cannot proceed fund transfer: Requested amount is greater than current balance.");

    } else{
        fromAccountUser.accountUserData.accounts[from_user_account_id].balance -= amount;
        let inputObj = {
            action : "Online Fund Transfer",
            amount : "-" + amount,
            remaining_balance : fromAccountUser.accountUserData.accounts[from_user_account_id].balance,
            status : "Completed",
            sender : fromAccountUser.account_name, 
            sender_account : from_user_account_id,
            receiver : ToAccountUser.account_name,
            receiver_account : to_user_account_id
        }
        
        fromAccountUser.accountUserData.accounts[from_user_account_id].history.push(
            new Transaction(inputObj)
        )
        fromAccountUser.updateLocalStorage();


        ToAccountUser.accountUserData.accounts[to_user_account_id].balance += amount;
        let inputObj2 = {
            action : "Online Fund Transfer",
            amount : amount,
            remaining_balance : ToAccountUser.accountUserData.accounts[to_user_account_id].balance,
            status : "Completed",
            sender : fromAccountUser.account_name, 
            sender_account : from_user_account_id,
            receiver : ToAccountUser.account_name,
            receiver_account : to_user_account_id
        }
        
        ToAccountUser.accountUserData.accounts[to_user_account_id].history.push(
            new Transaction(inputObj2)
        )
        ToAccountUser.updateLocalStorage(); 
    }
}

// Get the balance
export function get_balance(user_name, account_id){
    let accountUser = new AccountUserData(user_name)

    let bank = new BankData();

    return bank.currency +" "+ accountUser.accountUserData.accounts[account_id].balance
}

// Get list of users
export function list_users(){
    let bank = new BankData();
    return bank.users;
}