import { connectFormData } from '../utility.js';
import { deposit } from '../functions.js';
import { withdraw } from '../functions.js';
import { send } from '../functions.js';
import { Alert } from './alerts.js';
import { UserAuthData } from '../database/user_auth_table.js';

// functions
import { passwordLengthInputValidator } from '../utility.js'
import { passwordValueInputValidator } from '../utility.js'
import { encrypt, decrypt } from '../secure.js'


export function Forms() {
    this.Alert = new Alert;

    this.btnPressed;
    this.currentUser;

    //Dom Elements
    this.formId = "FormId"

    /*
        Methods.
    */

    this.addListeners = function(){
        // Add event listeners =
        this.submitBtn = document.getElementById("SubmitButtonId")
        this.submitBtn.onclick = (event) => this.submitMethod(event);
        console.log(this.Auth)
    }
    
    this.submitMethod = function(event){
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
                actionFunction = this.settingsFunction.bind(this.Auth);
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
        console.log(this)
        console.log(inputObj)
    
        let {
            img,
            old_password,
            password, 
            confirm_password
        } = inputObj;

        if (old_password == "" && password == "" && confirm_password == "" && img.name == ""){
            return `No changes made.`
        }

        // if img is present.. do something
        // if (img){
        //     console.log(img)
        // } else {
        //     console.log(img)
        // }

        
        if (old_password == "" && password == "" && confirm_password == "" ){
            return `Profile picture was updated`
        }
        
        //check if password or confirm password is missing
        passwordValueInputValidator(inputObj["old_password"],
            `"Old Password" is required in order to proceed.`)

        passwordValueInputValidator(inputObj["password"],
            `"New Password" is required in order to proceed.`)

        passwordValueInputValidator(inputObj["confirm_password"],
            `"Confirm Password" is required in order to proceed.`)

        //Check if password is <8
        passwordLengthInputValidator(inputObj["password"], 8,
            `"Password" length must not be less than 8 characters.`)


        
        let currentUser = this.state.userAuthData.current_user.user_name
        let dbPassword = this.state.userAuthData.users[currentUser].password

        const newDbPassword= decrypt("ebanko", String(dbPassword));

        // check if old password is the same in the database
        if (old_password != newDbPassword){
            throw Error (`Old password does not match with existing credentials.`)
        }

        if (old_password === password ){
            throw Error (`New password should not be the same with the old password.`)
        }

        if (password === confirm_password){

            
            // encrypt password
            const newPassword = encrypt("ebanko", password);

            // Auth.userAuth
            // console.log( userAuth)
            // console.log( this.state.userAuthData.users[currentUser].password)
            // console.log( newPassword)
            try {
                this.state.userAuthData.users[currentUser].password = newPassword;
                this.state.updateLocalStorage()

            } catch (error) {
                console.log(error.message)
            }
            
            return "Success!"
        } else {
            throw Error (`Passwords do not match.`)
        }

    }
}