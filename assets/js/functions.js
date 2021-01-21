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
    let bank = new BankData(); 
    accountUser.updateLocalStorage(bank.bankData);
}


// Deposit
export function deposit(inputObject){
    let user_name = inputObject["account_name"]
    let account_id = inputObject["account_id"]
    let amount = inputObject["amount"]

    // access data in local storage
    let accountUser = new AccountUserData(user_name)
    let bank = new BankData(); 
    //filter
    if (Object.keys(accountUser.accountUserData.accounts).includes(account_id) == false){
        throw Error(`The wallet with id "${account_id}" does not exist.`)
    } 
    
    accountUser.accountUserData.accounts[account_id].balance += parseFloat(amount);
    
    let inputObj = {
        action : "Online Deposit",
        amount : parseFloat(amount),
        remaining_balance : accountUser.accountUserData.accounts[account_id].balance,
        status : "Completed"
    }

    accountUser.accountUserData.accounts[account_id].history.push(
        new Transaction(inputObj)
    )
    // update localstorage
    accountUser.updateLocalStorage(bank.bankData);
    
    return `Tansaction succeed!`
}

// Withdraw
export function withdraw(inputObject){
    let user_name = inputObject["account_name"]
    let account_id = inputObject["account_id"]
    let amount = inputObject["amount"]
    
    let accountUser = new AccountUserData(user_name)
    let bank = new BankData(); 

    //filter
    if (Object.keys(accountUser.accountUserData.accounts).includes(account_id) == false){
        throw Error(`The wallet with id "${account_id}" does not exist.`)
    } 

    if (accountUser.accountUserData.accounts[account_id].balance < parseFloat(amount)) {
        throw Error("Cannot proceed withdrawal: Requested amount is greater than current balance.");

    } else{
        accountUser.accountUserData.accounts[account_id].balance -= parseFloat(amount);

        let inputObj = {
            action : "Online Withdraw",
            amount : parseFloat("-"+amount),
            remaining_balance : accountUser.accountUserData.accounts[account_id].balance,
            status : "Completed"
        }
        
        accountUser.accountUserData.accounts[account_id].history.push(
            new Transaction(inputObj)
        )

        // update local storage
        accountUser.updateLocalStorage(bank.bankData);
        
    }
    return `Tansaction succeed!`
}

// Fund Transfer
export function send(inputObject){

    let from_user = inputObject["sender_account_name"]
    let from_user_account_id = inputObject["sender_account_id"]
    let to_user = inputObject["recipient_account_name"]
    let to_user_account_id = inputObject["recipient_account_id"]
    let amount = inputObject["amount"]

    let userIdGroup = [from_user_account_id, to_user_account_id]
    let AccountUsers = new AccountUserData([from_user,to_user])
    console.log(AccountUsers)
    // let ToAccountUser = new AccountUserData(to_user)
    let bank = new BankData(); 

    
    //filter
    let ctr = 0;
    for (const value in AccountUsers.accountUserData) {
        if (Object.keys(AccountUsers.accountUserData[value].accounts).includes(userIdGroup[ctr]) == false){
            throw Error(`The wallet with id "${userIdGroup[ctr]}" does not exist.`)
        }
        ctr++
    }

    if (AccountUsers.accountUserData[from_user].accounts[from_user_account_id].balance < parseFloat(amount) ) {
        throw Error("Cannot proceed fund transfer: Requested amount is greater than current balance.");

    } else{
        
        AccountUsers.accountUserData[from_user].accounts[from_user_account_id].balance -= parseFloat(amount);
        let inputObj = {
            action : "Online Fund Transfer",
            amount : parseFloat("-" + amount),
            remaining_balance : AccountUsers.accountUserData[from_user].accounts[from_user_account_id].balance,
            status : "Completed",
            sender : from_user, 
            sender_account : from_user_account_id,
            receiver : to_user,
            receiver_account : to_user_account_id
        }
        
        AccountUsers.accountUserData[from_user].accounts[from_user_account_id].history.push(
            new Transaction(inputObj)
        )
    


        AccountUsers.accountUserData[to_user].accounts[to_user_account_id].balance += parseFloat(amount);
        let inputObj2 = {
            action : "Online Fund Transfer",
            amount : parseFloat(amount),
            remaining_balance : AccountUsers.accountUserData[to_user].accounts[to_user_account_id].balance,
            status : "Completed",
            sender : from_user, 
            sender_account : from_user_account_id,
            receiver : to_user,
            receiver_account : to_user_account_id
        }
        
        AccountUsers.accountUserData[to_user].accounts[to_user_account_id].history.push(
            new Transaction(inputObj2)
        )


        AccountUsers.updateLocalStorage(bank.bankData); 
    }
    
    
    return `Tansaction succeed!`
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