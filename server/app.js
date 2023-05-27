const express = require('express')
const postRouter = require('./routes/postRoute')
const commentRouter = require('./routes/commentRoute');
const userRouter = require('./routes/userRoute')
const cors = require('cors')
const app = express();

app.use(cors());
app.use(express.json())
// app.get('/', (req, res) => {
//     res.sendFile(__dirname + '/index.html')
// })
app.use('/posts', postRouter)
app.use('/comments', commentRouter)
app.use('/auth', userRouter);


module.exports = app;