// Constructors
import { Navigation } from './components/navigation.js';
import { Authenticate } from './auth.js';
import { AccountUserData } from './database/user_accounts_table.js';
import { Forms } from './components/forms.js';
import { Accordion } from './components/accordion.js';
import { Modal } from './components/modal.js';
// Function
import { connectFormData, convertFloatNumberToString} from './utility.js';
// Template 
import { add_new_account_btn_html } from './components_html/app.js';



export function Application() {

    this.currentUser;
    this.userData;

    /* 
        Dom elements
    */

    // Register, Login, and Logout
    this.Nav = new Navigation();
    this.registerBtn = document.getElementById("registerToAppId")
    this.loginToAppBtn = document.getElementById("loginToAppId")
    this.logoutBtn = document.getElementById("logoutBtnId")
    

    this.loginToAppBtn.onclick = (event) => this.loginSeries(event);
    this.registerBtn.onclick = (event) => this.registerSeries(event);
    this.logoutBtn.onclick = (event) => [this.Auth.logoutUser(),
                                         location.reload(), 
                                         this.Nav.shiftPage(
                                            event.currentTarget)];

    // other dom elements
    this.greetingsH1 = document.getElementById("greetingsH1Id")
    this.totalBalance = document.getElementById("totalBalanceId")
    this.totalUniqueAccounts = document.getElementById("totalUniqueAccountsId")
    this.totalTransactions = document.getElementById("totalTransactionsId")
    this.perAccountsOverview = document.getElementsByClassName("per-accounts-overview")[0]

    /*
        GETTERS
    */ 

    // current user
    this.getCurrentUser = function() {
        return this.userData.accountUserData.account_name
    }
    // account history and balance per account
    this.getAccounts = function(){
        return this.userData.accountUserData.accounts
    }

    // get total balance
    this.getTotalbalance = function(){
        let totalBalance = Object.entries(this.getAccounts())
            .reduce((total, value) => {
                return total + value[1].balance
        }, 0 )
        return convertFloatNumberToString(totalBalance.toFixed(2))
    }

    // get history All
    this.getHistoryAll = function(){
        let historyAll = Object.entries(this.getAccounts())
            .reduce((total, value) => {
                return total.concat(value[1].history)
        }, [] )
        return historyAll
    }

    this.updateAppDomData = function(){
        let uniqueAccounts = this.getAccounts()
        let historyAll = this.getHistoryAll()

        this.greetingsH1.innerText = `Hello ${this.getCurrentUser()}!`
        // account boxes and balance per box

        //resets the list of accounts in the dom
        console.log("trigger")
        console.log(this.perAccountsOverview)
        this.perAccountsOverview.innerHTML = "";
        
        let ctr = 1;
        for (const value in uniqueAccounts) {
            this.perAccountsOverview.appendChild(this.createUniqueAccountBox(
                value, uniqueAccounts[value].balance, ctr
            ))
            ctr++
        }
        
        let addAccountBtn = document.createElement("div")
        addAccountBtn.id = "addAccountId"
        addAccountBtn.innerHTML = add_new_account_btn_html
        this.perAccountsOverview.appendChild(addAccountBtn)
        console.log(this.perAccountsOverview)

        // Overview - total balance, no of money accounts, no. transaction hisotry all
        this.totalBalance.innerHTML = `<span class="php-sign">PHP </span>` + this.getTotalbalance()
        this.totalUniqueAccounts.innerText = Object.entries(uniqueAccounts).length
        this.totalTransactions.innerText = historyAll.length

        // history - must be based on the account number active/selected,
        this.historyPanel = document.getElementsByClassName("panel")[0]
        for (const value of historyAll){
            this.historyPanel.appendChild(this.addTransactionInDom(value))
        }
        
    }

    this.createUniqueAccountBox = function(account_id, balance, index){
        let container = document.createElement("div")
        container.classList.add("account-box")
        let h5_acc = document.createElement("h5")
        h5_acc.className = "account-number-h5"
        let h4 = document.createElement("h4")
        let h5 = document.createElement("h5")
        account_id = String(account_id)
        account_id = "**** **** " + account_id.slice(8,12)

        h5_acc.innerText = "Account#"+index
        h4.innerText = account_id
        h5.innerHTML = `<span class="php-sign">PHP </span>` + convertFloatNumberToString(balance.toFixed(2))
        h5.classList.add("unique-account-amount")
        container.appendChild(h5_acc)
        container.appendChild(h4)
        container.appendChild(h5)
        return container
    }
    
    this.addTransactionInDom = function(inputObj){
        let containerTr = document.createElement("tr")
        let th = document.createElement("th")
        let td1 = document.createElement("td")
        let td2 = document.createElement("td")
        let td3 = document.createElement("td")
        let td4 = document.createElement("td")
        th.innerText = inputObj["action"]
        td1.innerText = inputObj["date"]
        td2.innerHTML = `<span class="php-sign-table">PHP </span>` + convertFloatNumberToString(inputObj["amount"].toFixed(2))
        td3.innerHTML = `<span class="php-sign-table">PHP </span>` + convertFloatNumberToString(inputObj["remaining_balance"].toFixed(2))
        td4.innerText = inputObj["status"]
        containerTr.appendChild(th)
        containerTr.appendChild(td1)
        containerTr.appendChild(td2)
        containerTr.appendChild(td3)
        containerTr.appendChild(td4)
        return containerTr
    }
    
    /*
        Methods
    */

    // Initialize this application
    this.initialize = function() {

        this.Auth = new Authenticate();
        this.currentUser = this.Auth.currentUser

        this.loginInitialize();
    }

    // After successfull loggin in, go to app page and initialize Accordion and
    // the modal
    this.loginInitialize = function(){

        if (this.currentUser){
            // this.Auth.logoutUser()
            if (this.currentUser.user_level === "basic"){

                // Get user data
                this.userData = new AccountUserData(this.currentUser.user_name);

                // change view to app
                this.Nav.shiftPage(this.loginToAppBtn)

                // setup the simple Accordion function
                this.Accordion = new Accordion();
                // update data in dom elements
                this.updateAppDomData()

                // modal constructor is incharge od dynamic display of forms
                this.Modal = new Modal();
                this.Modal.currentUser = this.currentUser.user_name;
                this.Modal.updateAppDomData = this.updateAppDomData.bind(this)

            }
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
