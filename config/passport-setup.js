// Modules
const passport= require("passport");
const GoogleStrategy= require("passport-google-oauth20");
const key= require("./keys");

// Tell Passport We're using Google Strategy
passport.use(new GoogleStrategy(
	{
		callbackURL: "/auth/google/redirect",
		clientID: key.google.clientID,
		clientSecret: key.google.clientSecret
	},
	function(accessToken,refreshToken,profile,done){
		console.log("passport callback function fired");
		console.log(profile);
	}
));

