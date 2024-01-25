const  express = require("express");
const app = express() ;
var cors = require('cors')
app.use(cors())
app.use(express.json());
const port = 3000; 
const baseRouter = require('./routes/index')
app.use("/api/v1", baseRouter);

app.listen(port , () =>{
    console.log("The server is live on port 3000")
});
