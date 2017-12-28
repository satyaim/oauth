// Modules
const passport= require("passport");
const GoogleStrategy= require("passport-google-oauth20");
const key= require("./keys");
const User= require("../models/user-model");
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
		//Match one user from User
		User.findOne({ googleId: profile.id}).then(function(curr_user){
			if(curr_user){
				console.log("current user is" + curr_user);
			}
			else{
					console.log("adding new user");
				new User({
					username: profile.displayname,
					googleId: profile.id
				}).save().then(function(new_user){
					console.log("new user is" + new_user);
				});
			}
		});
	}
));

