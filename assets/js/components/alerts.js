import { alert_html } from '../components_html/alerts.js'
export function Alert() {
    this.window = window;

    // Selectors
    // this.alertBox =  document.getElementById("alertMessageId")
    // this.alertSuccess =  document.getElementById("alertMessageSuccessId")
    // this.alertWarning =  document.getElementById("alertMessageWarningId")
    
    // methods
    this.initialize = function(){
        let mainSection = document.querySelector("main")
        let alert = document.createElement("div")
        alert.id = "alertMessageId"
        
        alert.innerHTML = alert_html
        alert.classList.add("hidden")
        mainSection.appendChild(alert)

    }

    // reset to default -> hidden
    this.resetAlerts = function() {
        this.alertBox =  document.getElementById("alertMessageId")
        this.alertSuccess =  document.getElementById("alertMessageSuccessId")
        this.alertWarning =  document.getElementById("alertMessageWarningId")

        if (this.alertBox) { this.alertBox.classList.add("hidden") };
        if (this.alertSuccess ) { 
            this.alertSuccess.innerHTML = "";
            this.alertSuccess.classList.add("hidden");
        };
        if (this.alertWarning) { 
            this.alertWarning.innerHTML = "";
            this.alertWarning.classList.add("hidden")
        };
    }


    // Success
    this.showSuccess = function(success_msg) {
        console.log(success_msg)
        console.log(this.alertBox)
        console.log(this.alertSuccess)
        if (this.alertBox) { this.alertBox.classList.remove("hidden")};
        if (this.alertSuccess) { 
            this.alertSuccess.innerHTML = `<h2>${success_msg}</h2>`;
            this.alertSuccess.classList.remove("hidden");
        };
        setTimeout(() => this.resetAlerts()
        , 2000)
    }

    // warning
    this.showWarning = function(error_message) {
        // console.log(error_message)
        if (this.alertBox) { this.alertBox.classList.remove("hidden")};
        if (this.alertWarning) { 
            this.alertWarning.innerHTML = `<h2>${error_message}</h2>`;
            this.alertWarning.classList.remove("hidden");
        };
        setTimeout(() => this.resetAlerts()
        , 5000)
    }

}