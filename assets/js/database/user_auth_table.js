// User Constructor - Creates new instance of User
export function UserAuth(first_name, last_name, password, user_level = "basic") {
    this.first_name =  first_name;
    this.last_name = last_name;
    this.user_name = this.first_name + " " + this.last_name;
    this.password = password;
    this.user_level = user_level;
    this.date_created = new Date().toISOString();
}



export function UserAuthData() {
    // main data
    this.userAuthData;

    /*
        Local Storage methods
    */ 
    this.initialize = function() {
        this.getLocalStorage()
    }

    // initialize local storage. do this only once , can be used to load initial sample data
    this.initializeLocalStorage = function() {
        let person1 = new UserAuth("Redmund", "Nacario", "admin123", "admin")
        let person2 = new UserAuth("John", "Doe", "johndoe1")

        let state = {
            name : "eBanko User Auth Database",
            users : {
                [ person1.user_name ] : person1,
                [ person2.user_name ] : person2
            },
            current_user: null
        }
        localStorage.setItem("auth", JSON.stringify(state));
    }
    
    this.getLocalStorage = function(){
        this.userAuthData = JSON.parse(localStorage.getItem("auth"));
    }

    this.updateLocalStorage = function() {
        localStorage.setItem("auth",JSON.stringify(this.userAuthData));
    }

    /*
        SCRIPT
    */ 

    // for testing
    // this.initializeLocalStorage();

    // initialize the contents when this constructor is called
    this.initialize();
}