import { Application } from './functions.js'
import { Authenticate } from './auth.js';

const App = new Application();
App.initialize();
let result;

const Auth = new Authenticate();
Auth.initialize();
console.log(Auth.currentUser)


// set local storage: Do this once
// App.initializeLocalStorage();

// set local storage: Do this once
// Auth.initializeLocalStorage();

// Login
console.log(Auth.loginUser("John Doe", "123"))
console.log(Auth.currentUser)

// local storage
// App.initializeLocalStorage()
// App.getLocalStorage()

// Add user
// App.create_user("Red", "Nacario", 200)
// App.create_user("JC", "Ferrer", 5000)

// console.log(App.list_users())

// App.deposit("Red Nacario",  800) // 1000
// App.deposit("JC Ferrer",  500)//5500

// App.withdraw("Red Nacario",  2000) //-1000
// App.withdraw("JC Ferrer",  1000) //4500

// App.send("Red Nacario", "JC Ferrer",  2000) //
// App.send("JC Ferrer", "Red Nacario",  500) //4600 -> 4K

// // list users
// App.list_users()
// App.displayBank()
