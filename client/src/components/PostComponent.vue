<template>
  <div class="container">
    <h1>Latest Posts</h1>
    <hr>
    <div class="create-post">
      <label for="create-post">Say something</label>
      <input type="text" id="create-post" v-model="text" placeholder="create a post">
      <button @click="createPost">Post</button>
    </div>
    <p class="error" v-if="error">{{error}}</p>
    <div class="posts-container">
      <div class="post"
        v-for="(post, index) in posts"
        :item="post"
        :index="index"
        :key="post._id"
        @dblclick="deletePost(post._id)"
      >
        {{ `${post.createdAt.getDate()}/${post.createdAt.getMonth()}/${post.createdAt.getFullYear()}` }}
        <p class="text">{{ post.text }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import PostService from '../PostService'

export default {
  name: 'PostComponent',
  data() {
    return {
      posts: [],
      error: '',
      text: ''
    }
  },
  async created() {
    try {
      const ps = new PostService()
      this.posts = await ps.getPosts()
    } catch (err) {
      this.error = err.message
    }
  },
  methods: {
    async createPost() {
      const ps = new PostService()
      await ps.addPost(this.text)
      this.posts = await ps.getPosts()
    },
    async deletePost(id) {
      const ps = new PostService()
      await ps.deletePost(id)
      this.posts = await ps.getPosts()
    }
  }
}
</script>

<style>
div.container {
  max-width: 800px;
  margin: 0 auto;
}

p.error {
  border: 1px solid #ff5b5f;
  background-color: #ffc5c1;
  padding: 10px;
  margin-bottom: 15px;
}

div.post {
  position: relative;
  border: 1px solid #5bd658;
  background-color: 3bcffb8;
  padding: 10px 10px 30px 10px;
  margin-bottom: 15px;
}

div.created-at {
  position: absolute;
  top: 0;
  left: 0;
  padding: 5px 15px 5px 15px;
  background-color: darkgreen;
}

p.text {
  font-size: 22px;
  font-weight: 700;
  margin-bottom: 0;
}
</style>
