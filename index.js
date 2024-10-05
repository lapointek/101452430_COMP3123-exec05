const express = require("express");
const app = express();
const router = express.Router();

/*
- Create new html file name home.html 
- add <h1> tag with message "Welcome to ExpressJs Tutorial"
- Return home.html page to client
*/
router.get("/home", (req, res) => {
    res.sendFile(__dirname + "/home.html");
});

/*
- Return all details from user.json file to client as JSON format
*/
const users = require("./user.json");
router.get("/profile", (req, res) => {
    res.json(users);
});

/*
- Modify /login router to accept username and password as JSON body parameter
- Read data from user.json file
- If username and  passsword is valid then send resonse as below 
    {
        status: true,
        message: "User Is valid"
    }
- If username is invalid then send response as below 
    {
        status: false,
        message: "User Name is invalid"
    }
- If passsword is invalid then send response as below 
    {
        status: false,
        message: "Password is invalid"
    }
*/
router.post("/login", (req, res) => {
    const { username, password } = req.body;

    const user = users.find((user) => user.username === username);
    if (!user) {
        res.status(400).json({
            status: false,
            message: "User Name is invalid",
        });
        return;
    }

    if (!password) {
        res.status(400).json({ status: false, message: "Password is invalid" });
        return;
    }

    res.status(200).json({ status: true, message: "User Is valid" });
});

/*
- Modify /logout route to accept username as parameter and display message
    in HTML format like <b>${username} successfully logout.<b>
*/
router.get("/logout/:username", (req, res) => {
    const { username } = req.params;
    res.send(`<b>${username} successfully logged out.</b>`);
});

/*
Add error handling middleware to handle below error
- Return 500 page with message "Server Error"
*/
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send("Server Error");
});

app.use(express.json());

app.use("/", router);

app.listen(process.env.port || 8081);

console.log("Web Server is listening at port " + (process.env.port || 8081));
