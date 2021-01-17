export function accordion() {
    
    var acc = document.getElementsByClassName("accordion");
    var i;

    for (i = 0; i < acc.length; i++) {
        acc[i].addEventListener("click", function() {
            this.classList.toggle("accordion-active");
            var panel = this.nextElementSibling;
            if (panel.style.display === "table-row-group") {
                panel.style.display = "none";
            } else {
                panel.style.display = "table-row-group";
            }
        });
    }
}