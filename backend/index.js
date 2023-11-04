const connectMongo = require("./db");
const express = require("express");
const app = express();
const cors = require("cors");
const port = 3000;

app.use(cors());
app.use(express.json());

connectMongo();

app.get("/",(req,res)=>{
    res.send("");
})
//Routes
app.use("/api/auth",require("./routes/auth"));
app.use("/api/students",require("./routes/students"));

app.listen(port,()=>{
    console.log(`Server running on port ${port}`);
});
