
// Function to check letters and numbers
export function detectCharacterStringOnly(inputtxt){
    var letterNumber = /^[a-zA-Z]+$/;
    
    if(inputtxt.match(letterNumber)) {
        return true; // if character string
    } else { 
        return false; // if caharacter number
    }
}


// Extracting data from forms - used in forms in modal and log in and register
export function extractFormData(formData) {
    const result = {};

    [...formData].forEach(value => {
        result[value[0]] = value[1]
    });

    return result;
}
//
export function connectFormData(
                                event, 
                                actionFunction,
                                formId, 
                                alertBox,
                                alertWarningText, 
                                alertSuccessText
                                ){
    /*
    event : event
    actionFunction : External function
    formId : String, Id of a form
    alertBox : DOM element of alert text container
    alertWarningText : Dom element of alert warning text
    alertSuccessText : Dom element of alert success text
    */

    event.preventDefault();

    // reset
    if (alertBox) { alertBox.classList.add("hidden")};
    if (alertSuccessText) { alertSuccessText.innerText = ""};
    if (alertWarningText) { alertWarningText.innerText = ""};

    let form = document.forms[formId];
    const form_data = new FormData(form)
    let result = extractFormData(form_data);

    // console.log(result)

    try {
        let success_msg = actionFunction(result)
        // console.log(success_msg)

        if (alertBox) { alertBox.classList.remove("hidden")};
        if (alertSuccessText) { alertSuccessText.innerText = success_msg};
    }
        catch (error) {
        // console.log(error)

        if (alertBox) { alertBox.classList.remove("hidden")};
        if (alertWarningText) { alertWarningText.innerText = error.message};
    }

}

/*
    Input Validators
*/ 
//
export function strictAllInputValidator(inputObj, ErrorMessage) {
    Object.entries(inputObj).forEach(value => {
        if(value[1] === ""){
            if(value[0].includes("password")) { return; }
            throw Error(ErrorMessage)
        }
    })
}

// password length checker
export function passwordLengthInputValidator(inputObjValue, limit, ErrorMessage) {
    if( inputObjValue.length < limit) {
        throw Error(ErrorMessage)
    }
}
// password value checker if missing
export function passwordValueInputValidator(inputObjValue, ErrorMessage) {
    if( inputObjValue === "") {
        throw Error(ErrorMessage)
    }
}