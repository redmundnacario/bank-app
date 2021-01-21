import { connectFormData } from '../utility.js';
import { deposit } from '../functions.js';
import { withdraw } from '../functions.js';
import { send } from '../functions.js';

export function Forms() {

    this.btnPressed;

    //Dom Elements
    this.formId = "FormId"
    this.submitBtn = document.getElementById("SubmitButtonId")
    // this.cancelBtn = document.getElementById("CancelButtonId")

    // Add event listeners =
    this.submitBtn.onclick = (event) => {

        let actionFunction;
        switch(this.btnPressed){
            case ("depositBtnId"):
                actionFunction = deposit
                break
            case ("withdrawBtnId"):
                actionFunction = withdraw
                break
            case ("tranferFundsBtnId"):
                actionFunction = send
                break
            case ("settingsBtnId"):
                actionFunction = null;
                break
            default:
                //
                return
            
        }

        connectFormData(
            event,
            actionFunction,                                    
            this.formId,
            document.getElementById("formAlert"),
            document.getElementById("formErrorMessageId"),
            document.getElementById("formSuccessMessageId")
        )

        // location.reload()    
    }

    
}