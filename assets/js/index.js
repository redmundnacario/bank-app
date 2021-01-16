import { Application } from './functions.js'

const App = new Application();
let result;

// local storage
// App.initializeLocalStorage()
App.getLocalStorage()

// Add user
App.create_user("Red", "Nacario", 200)
App.create_user("JC", "Ferrer", 5000)

console.log(App.list_users())

App.deposit("Red Nacario",  800) // 1000
App.deposit("JC Ferrer",  500)//5500

// App.withdraw("Red Nacario",  2000) //-1000
App.withdraw("JC Ferrer",  1000) //4500

// App.send("Red Nacario", "JC Ferrer",  2000) //
App.send("JC Ferrer", "Red Nacario",  500) //4600 -> 4K

// // list users
// App.list_users()
// App.displayBank()
