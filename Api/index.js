const express = require('express');
const app = express();

app.use(express.json());

app.use(express.urlencoded({
    extended:true
}));

var cors = require("cors");

app.use(cors());

app.get("/", (req, res) => {
    res.json({
        message : "Welcome to the Node Js App"
    })
})

require("./src/routes/login-route")(app);

const PORT = 4000;
app.listen(PORT, function() {
    console.log(`Server is running on Port : ${PORT}. `);
})