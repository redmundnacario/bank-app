import { connectFormData } from '../utility.js';
import { deposit } from '../functions.js';
import { withdraw } from '../functions.js';
import { send } from '../functions.js';
import { Alert } from './alerts.js';
import { UserAuthData } from '../database/user_auth_table.js';

// functions
import { passwordLengthInputValidator } from '../utility.js'
import { passwordValueInputValidator } from '../utility.js'
import { encrypt } from '../secure.js'


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
                actionFunction = this.settingsFunction;
                break
            default:
                //
                return
            
        }
        // console.log(this.Alert)
        let resultBool = connectFormData(
            event,
            actionFunction,                                    
            this.formId,
            this.Alert.resetAlerts.bind(this.Alert),
            this.Alert.showWarning.bind(this.Alert),
            this.Alert.showSuccess.bind(this.Alert),
            true,
            false
        )

        // Close modal , update dom thru refresh
        // if (resultBool){
        //     this.closeModal()
        //     setTimeout(() => {
        //         location.reload()
        //     }, 2000)
        // } 
    }

    // Methods

    this.settingsFunction = function(inputObj) {
        console.log(inputObj)
        //check if password or confirm password is missing
        passwordValueInputValidator(inputObj["password"],
            `"Password" is required in order to proceed.`)

        passwordValueInputValidator(inputObj["confirm-password"],
            `"Confirm Password" is required in order to proceed.`)

        //Check if password is <8
        passwordLengthInputValidator(inputObj["password"], 8,
            `"Password" length must not be less than 8 characters.`)

        let {
            img, 
            password, 
            confirm_password
        } = inputObj;

        if (password === confirm_password){

            // if img is present.. do something
            if (img){
                console.log(img)
            } else {
                console.log(img)
            }
            
            
            let userAuth = new UserAuthData();
            let currentUser = userAuth.userAuthData.current_user.user_name
            // encrypt password
            const newPassword = encrypt("ebanko", password);

            // Auth.userAuth
            // console.log( userAuth)
            // console.log(userAuth.userAuthData.users[currentUser].password)
            // console.log(newPassword)
            try {
                userAuth.userAuthData.users[currentUser].password = newPassword;
                userAuth.updateLocalStorage()

            } catch (error) {
                console.log(error.message)
            }
            
            return "Success!"
        } else {
            throw Error (`Passwords do not match.`)
        }

    }
}