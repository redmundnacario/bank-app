export const navigation_html = `
<div>
    <h1 class="appName-navbar">
        <span>e</span>Bank<span>o</span>
    </h1>
</div>
<div class="landing-nav-buttons" data-view="logoutBtnId">
    <button id="homeBtnId" class="nav-buttons"><h2>Home</h2></button>
    <button id="registerBtnId" class="nav-buttons"><h2>Sign Up</h2></button>
    <button id="loginBtnId" class="nav-buttons"><h2>Sign In</h2></button>
</div>
<div class="landing-nav-buttons hidden" data-view="loginToAppId">
    <!-- add profile picture here -->
    <button id="logoutBtnId" class="nav-buttons nav-in-app"><h2>Logout</h2></button>
    <button class="nav-buttons nav-in-app" id="settingsBtnId">
        <div>
            <img id="settingsLogoId" src="./assets/img/settings.gif"/>
        </div>
    </button>
</div>`