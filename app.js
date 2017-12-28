//Express Module
const express= require("express");
//Obtain router of auth-routes.js as authRoutes
const authRoutes= require("./routes/auth-routes");
//Obtain passport-setup.js
const passportSetup= require("./config/passport-setup");
//
const app= express();
//Set view Enjine to EJS
app.set("view engine","ejs");
//All requests meade to auth will be controlled by authRoutes
app.use("/auth",authRoutes);
//Set index.ejs for request at /
app.get("/",function(req,res){
	res.render("index");
});
//Listen to port
app.listen(3000,function(){
	console.log("listening to port 3000");
});