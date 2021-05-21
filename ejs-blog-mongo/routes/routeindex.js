const { render } = require('ejs');
const express = require('express');
const router = express.Router();
const Post = require('../posts');
//const Task = require('../model/task');


router.get('/', async function(req,res){
  var posts = await Post.find();
  res.render('index', {posts, title: 'home'});
});


router.get('/newPost', async (req,res) =>{
  res.render('newPost', {title: 'newPost', author: req.userId});
});

router.post('/newPost', async(req, res) => {
  var post = new Post(req.body);
  await post.save();
  res.redirect("/");
});

router.get('/edit/:id', async(req, res) => {
  var {id} = req.params;
  var post = await Post.findById(id);
  res.render('edit', {post, title: 'edit'});
});

router.post('/edit/:id', async(req, res) => {
  var {id} = req.params;
  await Post.updateOne({_id:id}, req.body);
  res.redirect("/");
});

router.get('/delete/:id', async(req,res) => {
  var{id} = req.params;
  var post = await Post.findById(id);
  res.render('delete', {post, title: 'delete'})
});

router.post('/delete/:id', async(req,res) => {
  var{id} = req.params;
  await Post.deleteOne({_id:id});
  res.redirect("/");
});


module.exports = router;