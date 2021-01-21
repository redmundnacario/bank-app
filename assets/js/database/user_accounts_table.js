
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
                            action : `Account Creation (${account_id})`,
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

// Transaction constructor
export function Transaction(inputObj){
    this.action = inputObj["action"];
    this.date = new Date().toISOString();
    this.amount = inputObj["amount"];
    this.remaining_balance = inputObj["remaining_balance"];
    this.status = inputObj["status"];

    this.sender = inputObj["sender"];
    this.sender_account = inputObj["sender_account"]
    this.receiver = inputObj["receiver"];
    this.receiver_account = inputObj["receiver_account"];
} 


export function AccountUserData(user_name) {
    /*
        user_name : string
    */

    // main data
    this.current_user = user_name;
    this.accountUserData;

    this.initialize = function() {
        let bankData = JSON.parse(localStorage.getItem("bank"));

        if (Object.keys(bankData.users).includes(this.current_user)){
            this.getLocalStorage(bankData)
        } else {
            throw Error (this.current_user+ " does not exist in the database.")
        }
    }

    this.getLocalStorage = function(bankData){
        this.accountUserData  = bankData.users[this.current_user]
    }

    this.updateLocalStorage = function(bankData) {
        bankData.users[this.current_user] = this.accountUserData

        localStorage.setItem("bank", 
            JSON.stringify(bankData));
    }

    this.initialize()

}