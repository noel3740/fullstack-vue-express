const express = require("express");
const mongodb = require("mongodb");

const router = express.Router();

//Get posts
router.get("/", (req, res) => {

    loadPostsCollection()
        .then(posts => {
            posts
                .find({})
                .toArray((err, docs) => {
                    console.log(err);
                    res.send(docs);
                });
        });
});

//Add posts
router.post("/", (req, res) => {
    loadPostsCollection()
        .then(posts => {
            posts.insertOne({
                text: req.body.text,
                createdAt: new Date()
            }, result => {
                res.status("201").send();
            });
        });
});

//Delete posts
router.delete("/:id", (req, res) => {
    loadPostsCollection()
        .then(posts => {
            posts.deleteOne({
                _id: new mongodb.ObjectID(req.params.id)
            }, result => {
                res.status("200").send();
            });
        });
});

//Function that loads the posts collection from the mongo db
async function loadPostsCollection() {
    const client = await mongodb.MongoClient.connect(
        "mongodb://abc123:Green001@cluster0-shard-00-00-rxobv.mongodb.net:27017,cluster0-shard-00-01-rxobv.mongodb.net:27017,cluster0-shard-00-02-rxobv.mongodb.net:27017/test?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true", {
            useNewUrlParser: true
        });

    return client.db("vue_express").collection("posts");
}

module.exports = router;
