const express = require("express");
const path = require("path");//required to create paths
const helmet = require("helmet"); //for secure connection
const cookieparser = require("cookie-parser");

const app = express();
const PORT = process.env.PORT;

// allow the app to use cookieparser
app.use(helmet());

// allow the app to use cookieparser
app.use(cookieparser());

app.use(express.json());
app.use(express.urlencoded({extended:false}));
//for access to static css and js filesfiles
app.use(express.static(path.join(__dirname, "..", "public")));

app.set("view engine","ejs");//set engine

app.set("views",path.join(__dirname,"views"));//set directory path for engine to access

app.get("/",(req,res)=>{
    let username=req.cookies.username;
    return res.render("home",{username});
});

app.get("/login",(req,res)=>{

    let bad_auth = req.query.msg ? true:false;

    if(bad_auth){
        return res.render("login",{
            error:"Invalid username or password",
        })
    }
    else {
        return res.render("login");
    }

})

app.get("/welcome",(req,res)=>{
    let username = req.cookies.username;
    return res.render("welcome",{username});
});

app.post("/process_login",(req,res)=>{
    let{username,password}=req.body;

    let userdetails={
        username:"Bob",
        password:"123456",
    }
    if(username===userdetails["username"]&& password===userdetails["password"])
    {
        res.cookie("username",username);
        return res.redirect("/welcome");
    }
    else{
        return res.redirect("/login?msg=fail")
    }
});

app.get("/logout", (req, res) => {
    // clear the cookie
    res.clearCookie("username");
    // redirect to login
    return res.redirect("/login");
  });
  



app.listen(PORT, () => console.log(`server started on port: ${PORT}`));


//test functions


module.exports.test1=function test1(username,password){
    
    let userdetails={
        username:"Bob",
        password:"123456",
    }
    if(username===userdetails["username"]&& password===userdetails["password"])
    {
        res.cookie("username",username);
        //return res.redirect("/welcome");
        return true;
    }
    else{
       // return res.redirect("/login?msg=fail")
       return false;
    }
}



