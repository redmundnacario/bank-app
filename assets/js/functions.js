// Constructor
import { AccountUser, AccountUserData } from './database/user_accounts_table.js';
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

        // update local storage
        let accountUser = new AccountUserData(user.account_name)
        accountUser.accountUserData = user;
        accountUser.updateLocalStorage(); 

        bank.bankData.users[user.account_name] = user;
        bank.updateLocalStorage(); 
    }
}

// Deposit
export function deposit(user_name, account_id, amount){

    // access data in local storage
    let accountUser = new AccountUserData(user_name)
    accountUser.initialize()
    let bank = new BankData();

    accountUser.accounts[account_id].balance += amount;

    // update localstorage
    accountUser.updateLocalStorage();

    bank.bankData.users[user_name] = accountUser.accountUserData
    bank.updateLocalStorage(); 
    
}

// Withdraw
export function withdraw(user_name, account_id, amount){
    //filter
    let accountUser = new AccountUserData(user_name)
    accountUser.initialize()
    let bank = new BankData();

    if (accountUser.accounts[account_id].balance < amount ) {
        throw Error("Cannot proceed withdrawal: Requested amount is greater than current balance.");

    } else{
        accountUser.accounts[account_id].balance -= amount;

        // update local storage
        accountUser.updateLocalStorage();

        bank.bankData.users[user_name] = accountUser.accountUserData
        bank.updateLocalStorage(); 
        
    }

}

// Fund Transfer
export function send(from_user, from_user_account_id ,
                     to_user, to_user_account_id,
                     amount){

    let fromAccountUser = new AccountUserData(from_user)
    fromAccountUser.initialize()

    let ToAccountUser = new AccountUserData(to_user)
    ToAccountUser.initialize()

    let bank = new BankData();

    //filter
    if (fromAccountUser.accounts[account_id].balance < amount ) {
        throw Error("Cannot proceed fund transfer: Requested amount is greater than current balance.");

    } else{
        fromAccountUser.accounts[account_id].balance -= amount;
        ToAccountUser.accounts[account_id].balance += amount;

        fromAccountUser.updateLocalStorage();
        bank.bankData.users[from_user] = fromAccountUser.accountUserData
        bank.updateLocalStorage(); 


        ToAccountUser.updateLocalStorage();
        bank.bankData.users[to_user] = ToAccountUser.accountUserData
        bank.updateLocalStorage(); 
    }
}

export function get_balance(user_name, account_id){
    let accountUser = new AccountUserData(user_name)
    accountUser.initialize()

    let bank = new BankData();

    return bank.currency +" "+ accountUser.accounts[account_id].balance
}

// Get list of users
export function list_users(){
    let bank = new BankData();
    return bank.users;
}