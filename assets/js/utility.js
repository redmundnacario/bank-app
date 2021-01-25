/* 
    STRING OPERATIONS
*/ 

// Function to check letters and numbers
export function detectCharacterStringOnly(inputtxt){
    var letterNumber = /^[a-zA-Z]+$/;
    
    if(inputtxt.match(letterNumber)) {
        return true; // if character string
    } else { 
        return false; // if caharacter number
    }
}

//
export function convertFloatNumberToString(inputNumber){
    return String(inputNumber).replace(/^\d+/,
        inputNumber => [...inputNumber].map(
            (digit, index, digits) => (
                !index || (digits.length - index) % 3 ? '' : ','
            ) + digit
        ).join('')
    );
}

// Generate 12 digit account number
export function generate12DigitAccountNumber(){
    return Math.floor(Math.random() * 900000000000) + 100000000000;
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
                                resetAlert,
                                alertWarningfx, 
                                alertSuccessfx,
                                preventDefault = true,
                                formReset = true){
    /*
    event : event
    actionFunction : External function
    formId : String, Id of a form
    alertBox : DOM element of alert text container
    alertWarningText : Dom element of alert warning text
    alertSuccessText : Dom element of alert success text
    */

    if (preventDefault) { 
        event.preventDefault()
    };

    // reset
    if (resetAlert) {resetAlert()}

    let form = document.forms[formId];
    const form_data = new FormData(form)
    let result = extractFormData(form_data);

    console.log(result)

    try {
        let success_msg = actionFunction(result)
        // console.log(success_msg)

        if (alertSuccessfx) {alertSuccessfx(success_msg)}

        // removes values in the inputs
        if (formReset == true ) { form.reset() }

        return true
    }
        catch (error) {
        // console.log(error)

        if (alertWarningfx){alertWarningfx(error.message)}
        // removes values in the inputs
        if (formReset == true ) { form.reset() }
        return false
    }

}

/*
    Input Validators
*/ 

// check if a variable is missing in the form except password
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

/*
    Float Operations
*/ 

export function numMult100(num){
    return num * 100;
}

export function numDiv100(num){
    return num / 100;
}

/*
    DATE OPERATIONS
*/ 

export function sortByDate(a, b) {
    if (a.date < b.date) {
        return 1;
    }
    if (a.date > b.date) {
        return -1;
    }
    return 0;
}

