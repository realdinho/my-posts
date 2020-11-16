import axios from 'axios'

const url = 'api/posts/'

class PostService {
  // get posts
  async getPosts() {
    const response = await axios.get(url)
    return response.data.map(p => ({
      ...p,
      createdAt: new Date(p.createdAt)
    }))
  }

  // create post 
  async addPost(text) {
    return axios.post(url, {
      text
    })
  }

  // delete post
  async deletePost(id) {
    return axios.delete(`${url}${id}`)
  }
}

export default PostService