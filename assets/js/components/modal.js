export function Modal(){
    this.window = window;
    // Get the modal
    this.modal = document.getElementById("ModalId");// initial is undefined
    this.modalContent = document.getElementById("ModalContentId");

    // Get the button that opens the modal
    this.btnD = document.getElementById("depositBtnId");
    this.btnW = document.getElementById("withdrawBtnId");
    this.btnT = document.getElementById("tranferFundsBtnId");
    this.btnS = document.getElementById("settingsBtnId");

    // Get the button element that closes the modal
    this.btnCancel = document.getElementById("CancelButtonId");

    // Get the submit button in the form inside the modal
    this.btnSubmit = document.getElementById("SubmitButtonId");

    // put event listener in our action buttons to return the action
    this.btnD.onclick  = () => this.modalCallback();
    this.btnW.onclick  = () => this.modalCallback();
    this.btnT.onclick  = () => this.modalCallback();
    this.btnS.onclick  = () => this.modalCallback();

    // When the user clicks on <span> (x), close the modal
    this.btnCancel.onclick = () => this.closeModal();

    // When the user clicks the button, open the modal
    this.modalCallback = function() {
      this.modal.style.visibility = "visible";
    }
    
    this.closeModal = function() {
        this.modal.style.visibility = "hidden";
    }

    //When the user clicks anywhere outside of the modal, close it
    this.window.onclick = (event) => this.closeModalv2(event, this.modal);

    this.closeModalv2 = function(event , modal) {
        if (event.target == modal) {
            modal.style.visibility = "hidden";
        }
    }

}