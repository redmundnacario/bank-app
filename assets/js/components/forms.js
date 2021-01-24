import { connectFormData } from '../utility.js';
import { deposit } from '../functions.js';
import { withdraw } from '../functions.js';
import { send } from '../functions.js';
import { Alert } from './alerts.js';

export function Forms() {
    this.Alert = new Alert;

    this.btnPressed;
    this.currentUser;
    // this.updateAppDomData;

    //Dom Elements
    this.formId = "FormId"
    this.submitBtn = document.getElementById("SubmitButtonId")
    // this.cancelBtn = document.getElementById("CancelButtonId")

    // Add event listeners =
    this.submitBtn.onclick = (event) => {
        // console.log(this.currentUser)
        let actionFunction;
        switch(this.btnPressed){
            case ("depositBtnId"):
                actionFunction = deposit.bind(this)
                break
            case ("withdrawBtnId"):
                actionFunction = withdraw.bind(this)
                break
            case ("tranferFundsBtnId"):
                actionFunction = send.bind(this)
                break
            case ("settingsBtnId"):
                actionFunction = null;
                break
            default:
                //
                return
            
        }
        console.log(this.Alert)
        let resultBool = connectFormData(
            event,
            actionFunction,                                    
            this.formId,
            this.Alert.resetAlerts.bind(this.Alert),
            this.Alert.showWarning.bind(this.Alert),
            this.Alert.showSuccess.bind(this.Alert),
        )

        // Close modal , update dom thru refresh
        if (resultBool){
            this.closeModal()
            setTimeout(() => {
                location.reload()
            }, 2000)
        } 
    }
}