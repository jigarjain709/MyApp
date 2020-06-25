const express = require('express');
const bodyParser = require('body-parser');

const mongoose = require('mongoose');
const Post = require('./models/post');
const uri = "mongodb+srv://jay:123Admission@myappcluster-kg9qw.mongodb.net/AngularDB?retryWrites=true&w=majority"
const app = express();
mongoose.connect(uri, {useNewUrlParser: true, useUnifiedTopology: true})
.then(()=>{
  console.log('Connected to DB')
})
.catch(()=>{
  console.log('Connection failed')
});
app.use(bodyParser.json());

app.use((req, res, next)=>{
  res.setHeader("Access-Control-Allow-Origin","*");
  res.setHeader("Access-Control-Allow-Headers","Origin, X-Requested-With, Content-Type, Accept");
  res.setHeader("Acess-Control-Allow-Methods", "GET, POST, PATCH, DELETE, OPTIONS");
  next();
});

app.post("/api/posts",(req, res, next) => {
const post = new Post({
  title : req.body.title,
  content : req.body.content
});
post.save();
res.status(201).json({
  message : 'post added sucessfully'
})
});

app.get("/api/posts",(req, res, next) => {
  console.log('Post requested');
  Post.find()
  .then(docunmnets => {
    res.status(200).json({
      message : "Posts fetched sucessfully",
      posts : docunmnets
    })
  });
});

app.delete("/api/posts/:id",(req,res,next)=>{
  console.log(req.params.id);
  res.status(200).json({message : "Post Deleted"});
});


module.exports = app;
