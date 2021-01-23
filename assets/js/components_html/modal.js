export const modal_html =`
    <!-- Modal content -->
    <div id="ModalContentId" class="modal-content">

        <div class="card">

            <h1 id="ActionNameId">Action type</h1>
            <h3 id="ActionPurposeId">Where is the meta tag only found?</h3>

        </div>
        <div class="card-bottom">
            <div id="formAlert" class="alert-text hidden">
                <p id="formSuccessMessageId" class="alert-text-success" ></p>
                <p id="formErrorMessageId" class="alert-text-warning" ></p>
            </div>
            <div class="card-bottom-buttons">
                <input id="CancelButtonId" type="submit" value="Cancel">
                <input id="SubmitButtonId" type="submit" value="Submit">
            </div>
        </div>
    </div>
`

export const add_new_account_html = `
<!-- Modal content -->
<div id="ModalContentId" class="modal-content">
    <div class="card card-add-new-account">
        <h1 id="ActionNameId">Create new Ebanko wallet account?</h1>
    </div>
    <br>
    <div class="card-bottom">
        <div class="card-add-new-account">
            <button id="CancelButtonId"><p>No</p></button>
            <button id="SubmitButtonId"><p>Yes</p></button>
        </div>
    </div>
</div>
`