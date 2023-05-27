// thie will run between comments to see if the user is actually logged in

const {verify} = require('jsonwebtoken')

const validateToken = (req, res, next) => {
    const accessToken = req.header("accessToken")
    console.log(req.body.tokentest)
    console.log(req.header("test"));
    if(!accessToken) {
        return res.json({error: "User is not logged in"})
    }

    try {
        const validToken = verify(accessToken, "shhhhh its a secret")
         // you can store stuff in req variables which will be passed through the next middleware and so on to be accessed from there
        if(validToken){
            req.user = validToken //validtoken will have the users username and id and everythin we pass in that token
            //req.body.username = validToken.username or you can directly store it in body
            req.body.test = "testing res body"
            return next() // this will move forward you can give anything here like an other middleware like return newmidware 
        }
    } catch (err) {
        return res.json({error: err});
    }
} 

module.exports = {validateToken}