const express = require("express");
const router = express.Router();
const { upload } = require("./storage");
const blogs = require("./api/skillsData.json");
const authenticatedToken = require("./authenticatedToken");
router.get("/blog", (req, res) => {
  res.send(blogs);
});
router.get("/blog/:id", (req, res) => {
 
  const id = parseInt(req.params.id);
  // console.log(id)
  const blog = blogs.filter((b) => b.id === id);
   console.log(blog)
  res.send(blog);
});

router.get("/category",(req,res)=>{
  console.log("hit");
 const categoryData= blogs.reduce((accumulator,blog)=>{
    accumulator[blog.category]=(accumulator[blog.category]||0)+1;
    return accumulator;
  },{})
 
  const result = Object.entries(categoryData).map(([category, count]) => ({
    category,
    count,
  }));
 
  res.send(result);

})
module.exports = router;
