import { accordion_html } from '../components_html/accordion.js'

export function Accordion() {
    // console.log(document.getElementById("app"))
    this.appSection = document.getElementById("app");

    // create element 
    this.tableCont = document.createElement("div");
    this.tableCont.classList.add("table-container");
    this.tableCont.innerHTML = accordion_html;

    this.appSection.appendChild(this.tableCont);
    // this.tableCont = document.getElementsByClassName("table-container");

    this.accordion = document.getElementsByClassName("accordion");
   
    this.addFunctionality = function() {
        var i
        for ( i = 0; i < this.accordion.length; i++) {
            this.accordion[i].addEventListener("click", function() {
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

    this.addFunctionality()
}