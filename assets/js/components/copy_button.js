

export function CopyButton() {

    this.Alert
    //copy buttons
    this.btn = document.querySelectorAll(".copy-button")

    // console.log(this.btn)
    this.btn.forEach(value => {
        value.onclick = (event) => this.onClickFunction(event)
    })

    this.onClickFunction = function(event) {
        // console.log(event.currentTarget)
        console.log(event.currentTarget.nextSibling)

        var copyText = event.currentTarget.nextSibling
        copyText.select();
        copyText.setSelectionRange(0, 99999);
        document.execCommand("copy");

        this.Alert.resetAlerts()
        this.Alert.showSuccess("Copied")
      }
      
}