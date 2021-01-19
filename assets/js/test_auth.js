import { Authenticate } from './auth.js';

const Auth = new Authenticate();
console.log(Auth.currentUser)

// initialize local storage
// Auth.initializeLocalStorage();

// initialize auth
// Auth.initialize();

// Register
// console.log(Auth.registerUser("rc", "ocarion", "123", "123"))
// console.log(Auth.registerUser("jc", "ocarion", "123", "1234"))

// Login
// console.log(Auth.loginUser("rc ocarion", "123"))
// console.log(Auth.loginUser("John Doe", "123"))

// Logout
// console.log(Auth.logoutUser())

// console.log(JSON.parse(localStorage.getItem("auth")))