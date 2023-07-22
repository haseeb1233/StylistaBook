const express = require('express');
const cors = require('cors');

require('dotenv').config();

const { connection } = require('./Configs/db');

const userRoutes = require("./Routes/user.routes");


const app = express();
app.use(express.json());
app.use(cors());
app.use("/user", userRoutes)



const Port = process.env.Port || 8000;

app.listen(Port, async (req,res)=>{

    try {
            await connection;

        console.log(`DB connected. `);

    } catch (error) {

        console.log(error);

    }

    console.log(`server is running on port ${Port}`);
    
})