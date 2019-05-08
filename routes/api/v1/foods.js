var express = require("express");
var router = express.Router();
var Food = require("../../../models").Food;

router.get("/", function (req, res) {
  Food.findAll()
    .then(foods => {
      res.setHeader("Content-Type", "application/json");
      res.status(200).send(JSON.stringify(foods));
    })
    .catch(error => {
      res.setHeader("Content-Type", "application/json");
      res.status(500).send({ error })
    });
});

router.get("/:id", function(req, res) {
  Food.findByPk(req.params.id)
    .then(foodItem => {
      res.setHeader("Content-Type", "application/json");
      if(foodItem){
        res.status(200).send(JSON.stringify(foodItem));
      } else {
        res.sendStatus(400);
      }
    })
    .catch(error => {
      res.setHeader("Content-Type", "application/json");
      res.status(500).send({ error })
    });
})

module.exports = router;
