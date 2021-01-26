// Constructors
import { Navigation } from './components/navigation.js';
import { Authenticate } from './auth.js';
import { AccountUserData } from './database/user_accounts_table.js';
import { Accordion } from './components/accordion.js';
import { Modal } from './components/modal.js';
import { Alert } from './components/alerts.js';
import { CopyButton } from './components/copy_button.js';


// Function
import { connectFormData, convertFloatNumberToString} from './utility.js';
import { convertDateReadable } from './utility.js';
// Template 
import { add_new_account_btn_html, copy_btn_html, del_btn_html } from './components_html/app.js';



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

    /*
        GETTERS
    */ 

    // current user
    this.getCurrentUser = function() {
        return this.userData.accountUserData.account_name
    }
    this.getCurrentFullName = function() {
        let {first_name , last_name} = this.userData.accountUserData
        let fname = first_name.charAt(0).toUpperCase() + first_name.slice(1) + " " +
                    last_name.charAt(0).toUpperCase() + last_name.slice(1)
        return fname
    }
    // account history and balance per account
    this.getAccounts = function(){
        return this.userData.accountUserData.accounts
    }

    this.getAccountNumbers = function(){
        return Object.keys(this.userData.accountUserData.accounts)
    }

    // get total balance
    this.getTotalbalance = function(){
        let totalBalance = Object.entries(this.getAccounts())
            .reduce((total, value) => {
                return total + value[1].balance
        }, 0 )
        return convertFloatNumberToString(totalBalance.toFixed(2))
    }

    this.updateAppDomData = function(){
        try {
        

        // other dom elements
        this.greetingsH1 = document.getElementById("greetingsH1Id")
        this.totalBalance = document.getElementById("totalBalanceId")
        this.lastActivity = document.getElementById("lastActivityDateId")
        this.totalUniqueAccounts = document.getElementById("totalUniqueAccountsId")
        this.totalTransactions = document.getElementById("totalTransactionsId")
        this.perAccountsOverview = document.getElementsByClassName("per-accounts-overview")[0]

        let uniqueAccounts = this.getAccounts()

        //ACCORDION get history
        this.Accordion.accounts = uniqueAccounts
        this.Accordion.getHistoryAll()
        let historyAll = this.Accordion.historyAll

        this.greetingsH1.innerText = `Hello ${this.getCurrentFullName()}!`
        // account boxes and balance per box

        //resets the list of accounts in the dom
        this.perAccountsOverview.innerHTML = "";
        
        let ctr = 1;
        for (const value in uniqueAccounts) {
            this.perAccountsOverview.appendChild(this.createUniqueAccountBox(
                value, uniqueAccounts[value].balance, ctr
            ))
            ctr++
        }
        this.CopyButton = new CopyButton()
        this.CopyButton.Alert = this.Alert
        
        let addAccountBtn = document.createElement("div")
        addAccountBtn.id = "addAccountId"
        addAccountBtn.innerHTML = add_new_account_btn_html
        this.perAccountsOverview.appendChild(addAccountBtn)
       

        // Overview - total balance, no of money accounts, no. transaction hisotry all
        this.totalBalance.innerHTML = `<span class="php-sign">PHP </span>` + this.getTotalbalance()
        this.totalUniqueAccounts.innerText = Object.entries(uniqueAccounts).length
        this.totalTransactions.innerText = historyAll.length
        this.lastActivity.innerText = convertDateReadable(historyAll[0].date)

        // Accordion
        this.Accordion.accountList = this.getAccountNumbers()
        this.Accordion.accounts = uniqueAccounts
        this.Accordion.updateAccountSelect()
        }
        catch (error) {
            console.log(error)
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
        h5_acc.innerText = "Account#"+index
        h4.innerText = "**** **** " + account_id.slice(8,12)
        h5.innerHTML = `<span class="php-sign">PHP </span>` + convertFloatNumberToString(balance.toFixed(2))
        h5.classList.add("unique-account-amount")

        let copy_btn = document.createElement("button")
        copy_btn.innerHTML = copy_btn_html
        copy_btn.className = "copy-button"
        // copy_btn.setAttribute("data-account", account_id)

        // create input invisible
        let input = document.createElement("input")
        input.type = "text"
        input.value = account_id
        input.classList.add("target-input-copy")

        // let del_btn = document.createElement("button")
        // del_btn.innerHTML = del_btn_html
        // del_btn.id = "delBtnId"
        // del_btn.innerText = "✕"
        // del_btn.setAttribute("data-account", account_id)

        container.appendChild(h5_acc)
        container.appendChild(h4)
        container.appendChild(h5)
        container.appendChild(copy_btn)
        container.appendChild(input)
        return container
    }
    
    /*
        Methods
    */

    // Initialize this application
    this.initialize = function() {
        this.Alert = new Alert;
        this.Alert.initialize();
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
                // this.Modal.updateAppDomData = this.updateAppDomData
                this.Modal.App = this
                this.Modal.Auth = this.Auth;
                this.Modal.accountList = this.getAccountNumbers()

            }
        }
    }

    this.updateAppDomDataReload = function (){

        // remove history, modal
        document.querySelector(".table-container").remove()
        document.getElementById("ModalId").remove()

        // Get user data
        this.userData = new AccountUserData(this.currentUser.user_name);
        // setup the simple Accordion function
        this.Accordion = new Accordion();

        // update data in dom elements
        this.updateAppDomData()

        // modal constructor is incharge od dynamic display of forms
        this.Modal = new Modal();
        this.Modal.currentUser = this.currentUser.user_name;
        // this.Modal.updateAppDomData = this.updateAppDomData
        this.Modal.App = this
        this.Modal.Auth = this.Auth;
        this.Modal.accountList = this.getAccountNumbers()
    }

    // Fires when login button within the login form is pressed.
    this.loginSeries = function(event){
        event.preventDefault();
        
        // Submits form data for validation, then assign this.Auth.currentUser
        connectFormData(
            event,
            this.Auth.loginUser.bind(this.Auth),                                    
            "formLoginId",
            this.Alert.resetAlerts.bind(this.Alert),
            this.Alert.showWarning.bind(this.Alert) ,
            this.Alert.showSuccess.bind(this.Alert) ,
        )
           
        // update this.currentUser fr0m this.Auth.currentUser
        this.currentUser = this.Auth.currentUser
        
        // Will proceed to login and shift page if this.currentUser has value
        this.loginInitialize()
        
    }

    // After successfull registraion in authentication side...
    // Create new account in Application side.
    this.registerSeries = function(event){
        event.preventDefault()
        
        connectFormData(
            event,
            this.Auth.registerUser.bind(this.Auth),                                    
            "formRegisterId",
            this.Alert.resetAlerts.bind(this.Alert),
            this.Alert.showWarning.bind(this.Alert) ,
            this.Alert.showSuccess.bind(this.Alert) ,
        )

        // update this.currentUser fr0m this.Auth.currentUser
        this.currentUser = this.Auth.currentUser
        
        // Will proceed to login and shift page if this.currentUser has value
        this.loginInitialize()

    }

}
