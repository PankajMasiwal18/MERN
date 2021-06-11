const express = require('express');
const cors = require('cors');
const { Router } = require('express');

require('./config/db');


//imports routes
var SignUp = require('./routers/signUpRouter');
var SignIn = require('./routers/signInRouter');



const app = express();

//use middleware
app.use(express.json());
app.use(cors());
app.use('/signup',SignUp)
app.use('/signin',SignIn)




app.listen(3001,()=>{
    console.log("Server is running...");
})
