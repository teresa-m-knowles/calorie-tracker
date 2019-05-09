var express = require("express");
var router = express.Router();
var pry = require("pryjs");
var Meal = require("../../../models").Meal;
var Food = require("../../../models").Food;

router.get("/:id/foods", function (req, res, next) {
  Meal.findOne({
    where: {id: req.params.id},
    include: [{
      model: Food,
      as: 'foods'
    }]
  })
    .then(meal => {
      res.setHeader("Content-Type", "application/json");
      res.status(200).send(JSON.stringify(meal));
    })
    .catch(error => {
      res.setHeader("Content-Type", "application/json");
      res.status(500).send({ error })
    });
});

module.exports = router;
