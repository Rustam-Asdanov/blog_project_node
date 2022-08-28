const mongoose = require("mongoose");

const localDbConntection =
  "mongodb://127.0.0.1:27017/shopDB?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+1.5.1";

mongoose.connect(localDbConntection, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Model
const postSchema = new mongoose.Schema({
  title: String,
  content: String,
});

const Post = mongoose.model("Post", postSchema);

async function getPostArray() {
  let myPosts = "";
  while (true) {
    myPosts = await Post.find()
      .exec()
      .then((array) => {
        return array;
      });

    if (myPosts.length == 0) {
      const firstPost = new Post({
        title: "It is first Default Post",
        content:
          "You can delete this post after adding new posts. If you delete all posts, this post generated again automatically",
      });
      await firstPost.save();
    } else {
      break;
    }
  }

  return myPosts;
}

function addNewPost(post) {
  const myPost = new Post({
    title: post.title,
    content: post.content,
  });

  myPost.save();
}

async function getPostById(postId) {
  const myPost = await Post.find({ _id: postId })
    .exec()
    .then((post) => {
      return post;
    });

  return myPost;
}

module.exports = {
  getPostArray,
  addNewPost,
  getPostById,
};
