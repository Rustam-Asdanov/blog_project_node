const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require("lodash");
const myBase = require(__dirname + "/data-base.js");
const app = express();
const port = 3000;

app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

const homeStartingContent =
  "Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempore autem placeat eaque, eum officia optio facere assumenda ipsam labore a ullam temporibus voluptatibus odio obcaecati in iure veniam. Esse modi suscipit minima in. Repudiandae dolor obcaecati, sunt natus eaque, libero laboriosam in quis voluptatum, facilis doloribus ab temporibus! Ipsam porro iste labore natus beatae ad enim est facilis nihil quo repellendus, harum provident at voluptas explicabo ullam libero vero, ratione reprehenderit itaque adipisci quasi! Ullam culpa omnis reiciendis perspiciatis laboriosam pariatur quaerat, nemo asperiores voluptatem temporibus, doloribus quisquam.";

const aboutContent =
  "Perspiciatis illo fuga optio velit porro, suscipit sed provident dolore vel incidunt doloribus accusantium rem, voluptate ab minus sunt vero reiciendis nostrum molestiae consequatur, minima aliquid. Distinctio autem sit reprehenderit laborum beatae ipsa corrupti, praesentium cumque sapiente vitae porro officia animi molestias provident repellat voluptate dolorem consequuntur cupiditate et ea ab! Nam qui quam pariatur, ipsa iure aperiam iusto adipisci nesciunt quaerat. Natus tenetur voluptate nihil vero sed iusto labore molestias aliquam.";

const contactContent =
  "Ipsam quo, consequuntur aspernatur, rerum debitis ad, minima officiis beatae ullam exercitationem aperiam quibusdam? Accusantium dignissimos quae repellat quo quidem aut voluptate tenetur sapiente, provident impedit totam doloremque saepe ipsum doloribus, ab minima in. Ipsum corporis amet itaque ea non iste beatae, sit vel cum. Illum in suscipit obcaecati, cum iusto consequuntur esse fuga ab architecto quidem aut, cupiditate earum temporibus est ipsam harum. Accusantium, quia! Exercitationem, consectetur voluptatibus dignissimos dolore nemo architecto vel velit. ";

const posts = new Array();

app.get("/", async (req, res) => {
  res.render("home", {
    homeCont: homeStartingContent,
    postsArray: await myBase.getPostArray(),
  });
});

app.get("/about", (req, res) => {
  res.render("about", { aboutCont: aboutContent });
});

app.get("/contact", (req, res) => {
  res.render("contact", { contactCont: contactContent });
});

app.get("/compose", (req, res) => {
  res.render("compose");
});

app.post("/compose", (req, res) => {
  const post = {
    title: req.body["postTitle"],
    content: req.body["postBody"],
  };
  // console.log(post);
  // posts.push(post);
  myBase.addNewPost(post);
  res.redirect("/");
});

app.get("/posts/:postID", async (req, res) => {
  const postId = req.params.postID;

  console.log(postId);

  const selectedPost = await myBase.getPostById(postId);
  console.log("selectedPost " + selectedPost[0].title);

  if (selectedPost !== undefined) {
    res.render("post", { message: "Hey", post: selectedPost[0] });
  } else {
    res.redirect("/");
  }
});

app.listen(port, () => {
  console.log(`Server listen on port ${port}`);
});
