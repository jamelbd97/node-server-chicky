require("dotenv").config();

// DEPENDENCIES
const express = require("express");
const bodyParser = require("body-parser")
const mongoose = require("mongoose")
const morgan = require("morgan")
const cors = require('cors')

// VARIABLES
const app = express();
const port = process.env.PORT || 5000

// MIDDLEWARES
app.use(cors())
app.use(morgan('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.static('public'))
app.use('/images-files', express.static('uploads/images'))
app.use('/videos-files', express.static('uploads/videos'))
app.use('/music-files', express.static('uploads/music'))

// DATABASE
mongoose.Promise = global.Promise
mongoose.connect(process.env.MONGODB_DB_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(
    () => {
      console.log("Database connected")
    },
    (err) => {
      console.log("Error connecting to the database", err)
    }
  )

// ROUTES
app.use("/user", require("./routes/user-route"))
app.use("/chat", require("./routes/chat-route"))
app.use("/post", require("./routes/post-route"))
app.use("/music", require("./routes/music-route"))
app.use("/like", require("./routes/like-route"))
app.use("/comment", require("./routes/comment-route"))
app.use("/record", require("./routes/record-route"))

// SERVER START
const server = app.listen(port, () => {
  const port = server.address().port;
  console.log(`Server running on port ${port}`);
});