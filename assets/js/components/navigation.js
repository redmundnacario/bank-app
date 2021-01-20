export const Navigation = function(){
    // main data
    this.activeSectionPage;
    this.activeId;

    this.activeView;
    this.activeBtn;

    // Dom Elements
    this.homeBtn = document.getElementById("homeBtnId")
    this.loginBtn = document.getElementById("registerBtnId")
    this.registerBtn = document.getElementById("loginBtnId")
    // this.logoutBtn = document.getElementById("logoutBtnId")

    this.homeLandingPage = document.getElementById("homeContainerId");
    this.homeSectionPage = document.getElementById("homeIdDiv");

    // this.loginToAppBtn = document.getElementById("loginToAppId");


     /*
        Methods
    */

    // Methods
    this.initialize = function(){
        this.homeBtn.classList.add("active");
        this.homeLandingPage.classList.remove("hidden");
        this.activeBtn = this.homeBtn;
        this.activeView = this.homeLandingPage;

        this.homeSectionPage.classList.remove("hidden");
        this.activeSectionPage = this.homeSectionPage ;
        this.activeId = "logoutBtnId";
    }

    this.shiftView = function(event){
        //filter
        if(this.activeBtn == event.currentTarget){return}

        let targetView = document.querySelector(`[data-view=${event.currentTarget.id}]`);
        
        targetView.classList.remove("hidden");
        event.currentTarget.classList.add("active");

        if (this.activeView) {this.activeView.classList.add("hidden")};
        if (this.activeBtn) {this.activeBtn.classList.remove("active")};

        this.activeView = targetView;
        this.activeBtn = event.currentTarget;
    }

    this.shiftPage = function(eventCurrentTarget){
        

        let targetElementsShow = document.querySelectorAll(`[data-view=${eventCurrentTarget.id}]`);

        targetElementsShow.forEach(value => {
            value.classList.remove("hidden");
        })

        let targetElementsHide = document.querySelectorAll(`[data-view=${ this.activeId }]`);
        targetElementsHide.forEach(value => {
            value.classList.add("hidden");
        })

        this.activeSectionPage = targetElementsShow[1];
        this.activeId = eventCurrentTarget.id
    }

    /*
        SCRIPT
    */ 

    // initialize
    this.initialize();

    // Add event listeners
    this.homeBtn.onclick = (event) => this.shiftView(event);
    this.loginBtn.onclick = (event) => this.shiftView(event);
    this.registerBtn.onclick = (event) => this.shiftView(event);

    // this.loginToAppBtn.onclick = (event) => this.shiftPage(event);
    // this.logoutBtn.onclick = (event) => this.shiftPage(event.currentTarget);
}