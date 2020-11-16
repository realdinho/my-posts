const express = require('express')
const mongodb = require('mongodb')

const router = express.Router()


// get post
router.get('/', async (req, res) => {
  const posts = await loadPostsCollection()
  res.send(await posts.find({}).toArray())
})

// add post
router.post('/', async (req, res) => {
  const posts = await loadPostsCollection()
  await posts.insertOne({
    text: req.body.text,
    createdAt: new Date()
  })
  res.status(201).send()
})

// delete post
router.delete('/:id', async (req, res) => {
  const posts = await loadPostsCollection()
  await posts.deleteOne({ _id: new mongodb.ObjectID(req.params.id) })
  res.status(200).send()
})

const loadPostsCollection = async() => {
  const client = await mongodb.MongoClient.connect('mongodb+srv://rdias:realdinho90@cluster0.l2pll.mongodb.net/postsdb?authSource=admin&replicaSet=atlas-u2oikw-shard-0&w=majority&readPreference=primary&appname=MongoDB%20Compass&retryWrites=true&ssl=true', {
    useNewUrlParser: true
  })
  return client.db('postsdb').collection('posts')
}

module.exports = router