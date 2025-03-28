var express = require('express');
var router = express.Router();
const userModel = require("./users");
const postModel = require("./posts");
const passport = require('passport');
const localStrategy = require("passport-local");
const upload = require("./multer");
passport.use(new localStrategy(userModel.authenticate()))
const isLoggedIn = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next()
  }
  res.redirect("/")
}
const check = (req, res, next) => {
  if (!(req.isAuthenticated())) {
    return next()
  }
  else{
  res.redirect("/profile")
  }
}
/* GET home page. */
router.get('/', check, function (req, res, next) {
  res.render('index', { error: req.flash("errorS") });
});
router.get('/login', check, function (req, res, next) {
  res.render('login', { error: req.flash("error") });
});
router.get("/profile", isLoggedIn, async (req, res) => {
  const user = await userModel.findOne({username: req.session.passport.user}).populate("posts")
  res.render("profile", {user})
})
router.post("/register", async (req, res) => {
  let check = await userModel.find({ accountname: req.body.accountname })
  let check2 = await userModel.find({ username: req.body.username })
  if (check.length == 0) {
    if (check2.length == 0) {
      let userData = new userModel({
        username: req.body.username,
        fullname: req.body.fullname,
        accountname: req.body.accountname
      })
      userModel.register(userData, req.body.password).then(() => {
        passport.authenticate("local")(req, res, () => {
          res.redirect("/profile")
        })
      })
    }
    else {
      req.flash("errorS", "email id is already taken")
      res.redirect("profile")
    }
  }
  else {
    req.flash("errorS", "username is already taken")
    res.redirect("/profile")
  }
})
router.post("/login", passport.authenticate("local", {
  successRedirect: "/profile",
  failureRedirect: "/login",
  failureFlash: true
}), (req, res) => { })
router.post("/dpupload", upload.single("dpupload"), async (req, res)=>{
  const user = await userModel.findOne({username: req.session.passport.user})
  user.dp = req.file.filename
  await user.save()
  res.redirect("/profile")
})
router.get("/upload", isLoggedIn, (req, res)=>{
  res.render("upload")
})
router.post("/upload", upload.array("media"), async (req, res)=>{
  const images = req.files.map((file) => file.filename);
  const user = await userModel.findOne({username: req.session.passport.user})
  const post = await postModel.create({
    title: req.body.caption,
    url: images,
    view: req.body.type,
    owner: user._id
  })
  user.posts.push(post._id)
  await user.save()
  res.redirect("/profile")
})
router.get("/feed", async (req, res)=>{
  const posts = await postModel.find({view: "public"})
  res.render("feed", {posts: posts})
})
router.get("/post/:id", async (req, res)=>{
  try{
  const post = await postModel.findOne({_id: req.params.id})
  res.render("display", {posts: post})
  }
  catch{
    res.redirect("/profile")
  }
})
router.get("/logout", (req, res, next) => {
  req.logout((err) => {
    if (err) return next(err)
    res.redirect("/login")
  })
})
module.exports = router;