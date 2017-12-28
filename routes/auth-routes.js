const router= require("express").Router();
const passport= require("passport");

router.get("/login",function(req,res){
	res.render("login", { user: req.user });
});

router.get("/logout", function(req,res){
	//res.send("Will log you out ;)");
	req.logout();
	res.redirect("/");
});

router.get("/google",passport.authenticate("google",{
	scope: ['profile']
}));

router.get("/google/redirect",passport.authenticate("google"), function(req,res){
	//res.send(req.user);
	res.redirect("/profile");
});
module.exports= router;