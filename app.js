//Express Module
const express= require("express");
//Obtain router of auth-routes.js as authRoutes
const authRoutes= require("./routes/auth-routes");
//Obtain routes of profile-routes as profileRoutes
const profileRoutes= require("./routes/profile-routes");
//Obtain passport-setup.js
const passportSetup= require("./config/passport-setup");
//
const app= express();
//Obtain mongoose
const mongoose= require("mongoose");
//Obtain keys
const keys= require("./config/keys");
//Obtain cookie-session
const cookieSession= require("cookie-session");
//Obtain passport
const passport= require("passport");
//Encrypt with key to browser
app.use(cookieSession({
	maxAge: 24*60*60*1000,
	keys: [keys.session.cookieKey]
})); 
//Initialise passport
app.use(passport.initialize());
app.use(passport.session());
//Connect to mongoDB
mongoose.connect(keys.mongoose.URI,function(err){
	if(!err)
		console.log("Connected to db");
});
//Set view Enjine to EJS
app.set("view engine","ejs");
//All requests meade to auth will be controlled by authRoutes
app.use("/auth",authRoutes);
//All requests made to /profile/ to be controlled by profile-routes
app.use("/profile",profileRoutes);
//Set index.ejs for request at /
app.get("/",function(req,res){
	res.render("index");
});
//Listen to port
app.listen(3000,function(){
	console.log("listening to port 3000");
});