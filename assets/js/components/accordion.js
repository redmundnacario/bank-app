import { accordion_html, initial_tr_html } from '../components_html/accordion.js'
import { connectFormData } from '../utility.js'
import { convertFloatNumberToString } from '../utility.js';
import { sortByDate } from '../utility.js';

export function Accordion() {

    //
    this.accounts
    this.accountList;
    this.activeSelectAccountValue;
    this.activeSelectTransactionValue;

    // console.log(document.getElementById("app"))
    this.appSection = document.getElementById("app");

    // create element 
    this.tableCont = document.createElement("div");
    this.tableCont.classList.add("table-container");
    this.tableCont.innerHTML = accordion_html;

    this.appSection.appendChild(this.tableCont);

    this.accordionHead = document.getElementById("accordionHeadingId");
    this.panel = document.getElementById("accordionPanelId")
    this.accordion = document.getElementById("accordionId");
    this.accordionForm = document.getElementById("accordionFormId");
    this.accordionSymb = document.getElementById("accordionSymbol")

    // Select element in the accordion
    this.accountNoSelect = document.getElementById("accountNoIdSelect")
    this.transactionSelect = document.getElementById("transactionTypeIdSelect")
    
    // Add event
    this.accordionHead.onclick = (event) => this.toggleAccordion(event);
    this.accordionSymb.onclick = (event) => this.toggleAccordion(event);


    // GETTERS

    this.getHistoryAll = function(inputObj){
        try {
            let historyAll;
            // this.accordion.classList.toggle("accordion-active");

            if (inputObj){
                this.activeSelectAccountValue = inputObj.accountNoIdSelect
                this.activeSelectTransactionValue = inputObj.transactionTypeIdSelect
            }



            if (inputObj && this.activeSelectAccountValue != "All"){
                historyAll = this.accounts[this.activeSelectAccountValue].history
            } else {
                // console.log("here")
                historyAll = Object.entries(this.accounts)
                    .reduce((total, value) => {
                        return total.concat(value[1].history)
                }, [] )
            }
            
            // Sort descendeing, from latest to old
            historyAll.sort(sortByDate);
            
            // filter by transaction type
            if (inputObj && this.activeSelectTransactionValue != "All"){
                console.log("here")
                historyAll = historyAll.map(value => {
                    if(value["action"] === this.activeSelectTransactionValue ){
                        console.log("true")
                        return value
                    }
                }).filter(Boolean)
            }


            // history - must be based on the account number active/selected,
            this.panel.innerHTML = initial_tr_html
            for (const value of historyAll){
                this.panel.appendChild(this.addTransactionInDom(value))
            }

            //Assign value
            this.historyAll = historyAll
        }
        catch (error) {
            console.log(error)
        }

    }

    //  Method
    this.toggleAccordion = function(event) {
        // console.log(event.currentTarget)
        this.accordion.classList.toggle("accordion-active");
        
        if (this.panel.style.display === "table-row-group") {
            this.panel.style.display = "none";
            this.accordionSymb.innerText = "+"
        } else {
            this.panel.style.display = "table-row-group";
            this.accordionSymb.innerText = "-"
        }

    }

    // Add account numbers in form select
    this.updateAccountSelect = function(){
        this.accountList.forEach(value => {
            let option = document.createElement("option");
            option.value = value;
            option.innerText = "**** **** "+value.slice(8,12);
            this.accountNoSelect.appendChild(option);
        });
    }

    // creates entries of transaction
    this.addTransactionInDom = function(inputObj){
        
        let days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    
        let containerTr = document.createElement("tr")
        let th = document.createElement("th")
        let td = document.createElement("td")
        let td1 = document.createElement("td")
        let td2 = document.createElement("td")
        let td3 = document.createElement("td")
        let td4 = document.createElement("td")
        th.innerText = inputObj["action"]
        let account_id = inputObj["account_number"]
        td.innerText =  "**** **** " + String(account_id).slice(8,12)
        let dateObj = new Date(inputObj["date"]);
        td1.innerText = days[dateObj.getDay()] + ", "+ dateObj.toLocaleDateString() +" at "+ dateObj.toLocaleTimeString();
        td2.innerHTML = convertFloatNumberToString(inputObj["amount"].toFixed(2))
        td3.innerHTML = convertFloatNumberToString(inputObj["remaining_balance"].toFixed(2))
        td2.className = "right-align"
        td3.className = "right-align"

        td4.innerText = inputObj["status"]
        containerTr.appendChild(th)
        containerTr.appendChild(td)
        containerTr.appendChild(td1)
        containerTr.appendChild(td2)
        containerTr.appendChild(td3)
        containerTr.appendChild(td4)
        return containerTr
    }
 
    this.accordionForm.onchange = (event) => {
        connectFormData(
            event,
            this.getHistoryAll.bind(this),
            "accordionFormId",
            null,
            null,
            null,
            true,
            false
            )
    }
}