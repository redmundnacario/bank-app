export function Modal(){

    this.currentUser;

    this.action_requirements = {
        depositBtnId : {
            ActionNameId : "Add Funds",
            ActionPurposeId : "Deposit money of any amount to your account.",
        },
        withdrawBtnId : {
            ActionNameId : "Withdraw",
            ActionPurposeId : "Get money of any amount from your account.",
        },
        tranferFundsBtnId : {
            ActionNameId : "Transfer Funds",
            ActionPurposeId : "Send money of any amount to your other account or to someone with FreeBank account.",
        },
        settingsBtnId : {
            ActionNameId : "Settings",
            ActionPurposeId : "Basic configurations of your account.",
        },
    }

    // Window
    this.window = window;
    this.btnPressed;
    
    // Get the modal
    this.modal = document.getElementById("ModalId");// initial is undefined
    this.modalContent = document.getElementById("ModalContentId").children[0];

    // Get the button that opens the modal
    this.btnD = document.getElementById("depositBtnId");
    this.btnW = document.getElementById("withdrawBtnId");
    this.btnT = document.getElementById("tranferFundsBtnId");
    this.btnS = document.getElementById("settingsBtnId");

    // Get the button element that closes the modal
    this.btnCancel = document.getElementById("CancelButtonId");

    // Get the submit button in the form inside the modal
    // this.btnSubmit = document.getElementById("SubmitButtonId");

    // put event listener in our action buttons to return the action
    this.btnD.onclick  = (event) => this.modalCallback(event);
    this.btnW.onclick  = (event) => this.modalCallback(event);
    this.btnT.onclick  = (event) => this.modalCallback(event);
    this.btnS.onclick  = (event) => this.modalCallback(event);

    //Action form;
    this.form;

    // When the user clicks on <span> (x), close the modal
    this.btnCancel.onclick = () => this.closeModal();

    //When the user clicks anywhere outside of the modal, close it
    this.window.onclick = (event) => this.closeModalv2(event, 
        this.modal, this.modalContent);


    /*
        METHODS
    */ 

    // When the user clicks the button, open the modal and load depends on Id
    this.modalCallback = function(event) {
        this.btnPressed = event.currentTarget.id;
        this.actionButtonFx(this.btnPressed);
        this.modal.style.visibility = "visible";
    }
    
    // Close the modal functions
    this.closeModal = function() {
        this.modal.style.visibility = "hidden";
        this.modalContent.removeChild(this.form)
    }
    this.closeModalv2 = function(event , modal, modalContent) {
        if (event.target == modal) {
            modal.style.visibility = "hidden";
            modalContent.removeChild(this.form)
        }
    }

    // Set the Modal Contents
    this.actionButtonFx = function(actionId) {

        this.modalContent.children["ActionNameId"].innerText = 
            this.action_requirements[actionId].ActionNameId;

        this.modalContent.children["ActionPurposeId"].innerText = 
            this.action_requirements[actionId].ActionPurposeId;

        this.form = document.createElement("form");
        this.form.id = "FormId";

        switch (actionId) {
            case "depositBtnId":
            case "withdrawBtnId":
                this.form.appendChild(this.createInputText("text", 
                                "account_name", 
                                "Account Name",
                                null,
                                true,
                                this.currentUser))

                this.form.appendChild(this.createInputText("text", 
                                "account_id", 
                                "Account Id"))
                this.form.appendChild(this.createInputText("number", 
                                         "amount", 
                                         "Amount"))
                break

            case "tranferFundsBtnId":
                this.form.appendChild(this.createInputText("text", 
                                "sender_account_name", 
                                "Account Name",
                                "Sender",
                                true,
                                this.currentUser))
                this.form.appendChild(this.createInputText("text", 
                                "sender_account_id", 
                                "Account Id"))

                this.form.appendChild(this.createInputText("text", 
                                "recipient_account_name", 
                                "Account Name",
                                "Recipient"))
                this.form.appendChild(this.createInputText("text", 
                                "recipient_account_id", 
                                "Account Id"))

                this.form.appendChild(this.createInputText("number", 
                                         "amount", 
                                         "Amount"))

                break
            case "settingsBtnId":
                this.form.appendChild(this.createInputText("img", 
                                "inmg", 
                                "Select Image",
                                "Change Profile Picture", false))

                this.form.appendChild(this.createInputText("password", 
                                "password", 
                                "Password",
                                "Change Password", false))
                this.form.appendChild(this.createInputText("password", 
                                "confirm_password", 
                                "Confirm Password", false))
                break
            default:
                //
                return
        }
        
        this.modalContent.appendChild(this.form)
    }

    this.createInputText= function(inputType,
                                   inputId,
                                   labelText,
                                   sectionLabelText,
                                   required = true,
                                   value) {
        let inputElement = document.createElement("input");
        if (inputType == "img"){
            inputElement.type = "file";
            inputElement.id = inputId;
            inputElement.name= inputId;
            inputElement.attributes["accept"]="image/*"

        } else {
            inputElement.type = inputType;
            inputElement.id = inputId;
            inputElement.name= inputId;
            if (value) {
                inputElement.value = value;
                inputElement.disabled = true;
            }

        }
        
        if (required){
            inputElement.attributes["required"] = "required";
        }
        
        
        let label = document.createElement("label");
        label.setAttribute("for", inputId);
        label.innerText = labelText;

        let inputContainer = document.createElement("div");
        inputContainer.setAttribute("class", "input-container")

        inputContainer.appendChild(label);
        inputContainer.appendChild(inputElement);

        if(sectionLabelText){
            let sectionLabel = document.createElement("h2");
            sectionLabel.setAttribute("class", "input-group-h2")
            sectionLabel.innerText = sectionLabelText;
            
            let inputContainer2 = document.createElement("div");
            inputContainer2.appendChild(sectionLabel);
            inputContainer2.appendChild(inputContainer);

            return inputContainer2 
        };
        
        return inputContainer;
    }
}