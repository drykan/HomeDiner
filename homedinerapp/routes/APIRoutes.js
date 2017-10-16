const axios = require("axios");
const router = require("express").Router();

router.get("/recipes", (req, res) => {
  console.log(req);
  console.log("this is the APIRoutes file");
  axios
    .get("http://api.yummly.com/v1/api/recipes?_app_id=4bc73554&_app_key=4f3d8d424c1d7e1b36ac5d67ef2b3625&q=cornbread&requirePictures=true", { params: req.query })
    .then(({ data: { results } }) => res.json(results))
    .catch(err => res.status(422).json(err));

    console.log(results);
    
});

module.exports = router;