// Transaction constructor
export function Transaction(inputObj){
    this.action = inputObj["action"];
    this.date = new Date().toISOString();
    this.amount = inputObj["amount"];
    this.remaining_balance = inputObj["remaining_balance"];
    this.status = inputObj["status"];
    this.account_number = inputObj["account_number"];
    this.sender = inputObj["sender"];
    this.sender_account = inputObj["sender_account"]
    this.receiver = inputObj["receiver"];
    this.receiver_account = inputObj["receiver_account"];
} 