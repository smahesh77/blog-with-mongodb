const router = require('express').Router()
const {validateToken} = require('../middleware/authMiddleware')
const commentModel  = require('../models/CommentModel')
router.get('/:postId', async (req, res) => {
    const postId = req.params.postId
    const comments = await commentModel.find({ PostId: postId })
    res.status(200).json(comments)

})

router.post('/',validateToken, async (req, res) => { // this will go to validateToken middleware first and validate and only post the comment if the token is valid
    const comment = req.body;
    const username = req.user.username;
    comment.username = username; 
    console.log(comment)
    console.log(req.body.test);
    try {
      const newCommnet = new commentModel(comment)
      await newCommnet.save()
      res.status(200).json(comment)
    } catch (err) {
        res.json("err")
    }
    
})


router.delete("/:commentId", validateToken, async (req, res) => {
    const commentId = req.params.commentId;
    console.log(commentId)
    console.log("HHHHHHEEEEEEEEELLLLLLLLLLLOOOOOO")
    
    if(commentId === undefined){
        console.log("HOW DID I GET IN")
        await commentModel.deleteOne({ _id: ObjectId(commentId) });

        
          res.json("DELETED SUCCESSFULLY");
    }else {
        res.json("error")
    }
    
  });

module.exports = router