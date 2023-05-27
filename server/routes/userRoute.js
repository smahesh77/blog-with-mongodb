const express = require("express");
const router = express.Router();
const userModel = require("../models/user")
const bcrypt = require("bcrypt");
const {validateToken} = require('../middleware/authMiddleware')


const { sign } = require("jsonwebtoken");

router.post("/", async (req, res) => {
  const { username, password } = req.body;
  bcrypt.hash(password, 10).then(async(hash) => {
    try {
      // await users.create({
      //   username: username,
      //   password: hash,
      // });

      const newUser = new userModel({
        username: username,
        password: hash,
      })

      newUser.save()
      
      console.log(username)
      res.json({msg:"User Created"});
    } catch (err) {
      res.json("User already exists")
    }
  });
});

router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  //const user = await users.findOne({ where: { username: username } });

  const user = await userModel.findOne({ username: username });


  if (!user){
    res.json({ error: "User Doesn't Exist" });
  } else {
    bcrypt.compare(password, user.password).then((match) => {
        if (!match){
            res.json({ error: "Wrong Username And Password Combination" });
        } else {
            const accessToken = sign(
                { username: user.username, id: user.id },
                "shhhhh its a secret"
              );
              
            res.json({token:accessToken, username:user.username, id: user.id})
        }
    
        
      });
  }
});

router.get("/logchek", validateToken, (req, res) => {
    res.json(req.user);
  });

module.exports = router