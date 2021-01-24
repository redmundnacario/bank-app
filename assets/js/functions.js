// Constructor
import { AccountUser, AccountUserData } from './database/user_accounts_table.js';
import { BankData } from './database/bank_table.js';
import { Transaction } from './database/transaction_table.js';

// Functions
import { detectCharacterStringOnly } from './utility.js'
import { numMult100 } from './utility.js'
import { numDiv100 } from './utility.js'
import { generate12DigitAccountNumber } from './utility.js'

// Creates user
export function create_user(first_name, last_name,
                            balance, date_created){
    // filter
    if (!detectCharacterStringOnly(first_name)|| 
        !detectCharacterStringOnly(last_name)) {

        throw Error("Cannot create new user: first or last name should not starts with number.");

    } else {
        let account_id = generate12DigitAccountNumber()

        let user = new AccountUser(first_name, last_name,
                                    balance, account_id, date_created);
        let bank = new BankData(); 
        
        // check if account number exist

        bank.bankData.users[user.account_name] = user;
        bank.updateLocalStorage(); 
    }
}

// create account (add)

export function addAccount(user_name, balance = 0){
    try{
        let accountUser = new AccountUserData(user_name)

        let accountsObj = accountUser.accountUserData.accounts
        // let accountArray = Object.entries(accountsObj)
        let newAccountName = generate12DigitAccountNumber();
        
        let inputObj = {
            action : `Created`,
            account_number : newAccountName,
            amount : balance,
            remaining_balance : balance,
            status : "Completed"
        }

        accountsObj[newAccountName] = {
            balance : balance,
            history : [
                new Transaction(inputObj)
            ], 
            date_created : new Date().toISOString()
        }
        let bank = new BankData(); 
        accountUser.updateLocalStorage(bank.bankData);
    }
    catch (error) {
        console.log(error)
    }
}

// Remove an account
export function removeAccount(user_name, account_id){
    try{
        let accountUser = new AccountUserData(user_name)

        delete accountUser.accountUserData.accounts[account_id]
        
        let bank = new BankData(); 
        accountUser.updateLocalStorage(bank.bankData);
    }
    catch (error) {
        console.log(error)
    }
}


// Deposit
export function deposit(inputObject){

    let user_name;
    if (this.currentUser){
        user_name = this.currentUser 
    } else {
        user_name = inputObject["account_name"]
    }

    let account_id = inputObject["account_id"]
    let amount = inputObject["amount"]

    // access data in local storage
    let accountUser = new AccountUserData(user_name)
    let bank = new BankData(); 
    //filter
    if (Object.keys(accountUser.accountUserData.accounts).includes(account_id) == false){
        throw Error(`The wallet with id "${account_id}" does not exist.`)
    } 
    if (amount <= 0){
        throw Error(`Amount less than and equal to zero is not allowed.`)
    }

    let objectValholder = accountUser.accountUserData.accounts[account_id].balance
    
    objectValholder = numMult100(objectValholder) + numMult100(parseFloat(amount));
    objectValholder = numDiv100(objectValholder)

    accountUser.accountUserData.accounts[account_id].balance = objectValholder
    
    let inputObj = {
        action : "Deposited",
        account_number : account_id,
        amount : parseFloat(amount),
        remaining_balance : objectValholder,
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
    let user_name;
    if (this.currentUser){
        user_name = this.currentUser 
    } else {
        user_name = inputObject["account_name"]
    }
    let account_id = inputObject["account_id"]
    let amount = inputObject["amount"]
    
    let accountUser = new AccountUserData(user_name)
    let bank = new BankData(); 

    //filter
    if (Object.keys(accountUser.accountUserData.accounts).includes(account_id) == false){
        throw Error(`The wallet with id "${account_id}" does not exist.`)
    } 

    if (amount <= 0){
        throw Error(`Amount less than and equal to zero is not allowed.`)
    }

    let objectValholder = accountUser.accountUserData.accounts[account_id].balance

    if (objectValholder < parseFloat(amount)) {
        throw Error("Cannot proceed withdrawal: Requested amount is greater than current balance.");

    } else{

        objectValholder = numMult100(objectValholder) - numMult100(parseFloat(amount));
        objectValholder = numDiv100(objectValholder)

        accountUser.accountUserData.accounts[account_id].balance = objectValholder

        let inputObj = {
            action : "Withdrew",
            account_number : account_id,
            amount : parseFloat("-"+amount),
            remaining_balance : objectValholder,
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

    let from_user;
    if (this.currentUser){
        from_user = this.currentUser 
    } else {
        from_user = inputObject["sender_account_name"]
    }

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

    if (amount <= 0){
        throw Error(`Amount less than and equal to zero is not allowed.`)
    }

    let objectValholder = AccountUsers.accountUserData[from_user].accounts[from_user_account_id].balance
    let objectValholder2 = AccountUsers.accountUserData[to_user].accounts[to_user_account_id].balance
    
    // numMult100(objectValholder) += numMult100(parseFloat(amount));
    // objectValholder = numDiv100(objectValholder)

    // accountUser.accountUserData.accounts[account_id].balance = objectValholder

    if (objectValholder < parseFloat(amount) ) {
        throw Error("Cannot proceed fund transfer: Requested amount is greater than current balance.");

    } else{
        
        objectValholder = numMult100(objectValholder) - numMult100(parseFloat(amount));
        objectValholder = numDiv100(objectValholder);
        AccountUsers.accountUserData[from_user].accounts[from_user_account_id].balance = objectValholder

        let inputObj = {
            action : "Sent",
            account_number : from_user_account_id,
            amount : parseFloat("-" + amount),
            remaining_balance : objectValholder,
            status : "Completed",
            sender : from_user, 
            sender_account : from_user_account_id,
            receiver : to_user,
            receiver_account : to_user_account_id
        }
        
        AccountUsers.accountUserData[from_user].accounts[from_user_account_id].history.push(
            new Transaction(inputObj))
    
        objectValholder2 = numMult100(objectValholder2) + numMult100(parseFloat(amount));
        objectValholder2 = numDiv100(objectValholder2);
        AccountUsers.accountUserData[to_user].accounts[to_user_account_id].balance = objectValholder2

        let inputObj2 = {
            action : "Received",
            account_number : to_user_account_id,
            amount : parseFloat(amount),
            remaining_balance : objectValholder2,
            status : "Completed",
            sender : from_user, 
            sender_account : from_user_account_id,
            receiver : to_user,
            receiver_account : to_user_account_id
        }
        
        AccountUsers.accountUserData[to_user].accounts[to_user_account_id].history.push(
            new Transaction(inputObj2))


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