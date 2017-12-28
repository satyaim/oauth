const router= require("express").Router();
// authCheck as middleware to check if logged in or not
const authCheck= function(req,res,next){
	if(!req.user){
		//not logged in
		res.redirect("/auth/login");
	}
	else
		next();
}
router.get("/", function(req,res){
	//res.send("You are logged in as: "+ req.user.username);
	res.render("profile",{user: req.user});
});

module.exports= router;