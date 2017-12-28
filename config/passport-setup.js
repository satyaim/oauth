// Modules
const passport= require("passport");
const GoogleStrategy= require("passport-google-oauth20");
const key= require("./keys");
const User= require("../models/user-model");
// Tell Passport We're using Google Strategy
passport.serializeUser(function(user,done){
	done(null,user.id);
});
passport.deserializeUser(function(id,done){
	User.findById(id).then(function(user){
		done(null,user);
	});
});
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
				done(null,curr_user);
			}
			else{
					console.log("adding new user");
				new User({
					username: profile.displayName,
					googleId: profile.id,
					thumbnail: profile._json.image.url
				}).save().then(function(new_user){
					console.log("new user is" + new_user);
					done(null,new_user);
				});
			}
		});
	}
));

