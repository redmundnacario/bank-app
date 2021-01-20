
export function AccountUser(first_name, last_name, balance, account_id, date_created){

    this.first_name =  first_name
    this.last_name = last_name
    this.account_name = this.first_name + " " + this.last_name

    this.accounts = {
            [ account_id ] : {
                balance : balance
            }
    }
    this.history = [] // Use array
    this.date_created = date_created
}


export function AccountUserData(user_name) {
    /*
        user_name : string
    */

    // main data
    this.current_user = user_name;
    this.accountUserData;

    this.initialize = function() {
        if (Object.keys(localStorage).includes(this.current_user)){
            this.getLocalStorage()
        } else {
            throw Error (this.current_user+ " does not exist in the database.")
        }
    }

    this.initializeLocalStorage = function(){
        localStorage.setItem(this.current_user,
            JSON.stringify(this.accountUserData));
    }

    this.getLocalStorage = function(){
        this.accountUserData = JSON.parse(localStorage.getItem(this.current_user));
    }

    this.updateLocalStorage = function() {
        localStorage.setItem(this.current_user, 
            JSON.stringify(this.accountUserData));
    }

    // this.initialize()

}