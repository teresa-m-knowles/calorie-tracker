var express = require("express");
var router = express.Router();
var pry = require("pryjs");
var Food = require("../../../models").Food;

router.get("/", function (req, res) {
  res.setHeader("Content-Type", "application/json");
  Food.findAll()
    .then(foods => {
      res.status(200).send(JSON.stringify(foods));
    })
    .catch(error => {
      res.status(500).send({ error })
    });
});

router.get("/:id", function(req, res) {
  res.setHeader("Content-Type", "application/json");

  Food.findFood(req.params.id)
    .then(foodItem => {
      res.status(200).send(JSON.stringify(foodItem))
    })
    .catch(error => {
      res.status(404).send(error)
    });
})

router.post("/", function(req, res) {
  res.setHeader("Content-Type", "application/json");

  checkValidBody(req.body)
    .then(body => {
      return Food.createFood(req)
    })
    .then(food => {
      res.status(201).send(JSON.stringify(food))
    })
    .catch(error => {
      res.status(400).send(error);
    })
});

router.delete("/:id", function(req, res) {
  res.setHeader("Content-Type", "application/json");

  Food.findFood(req.params.id)
    .then(food => {
      return food.destroy();
    })
    .then(destroyedFood => {
      res.sendStatus(204);
    })
    .catch(error => {
      res.status(404).send(error)
    })

});

router.patch("/:id", function(req, res) {
  checkValidBody(req.body)
    .then(reqBody => {
      return Food.updateFood(req)
    })
    .then(updatedFood => {
      res.setHeader("Content-Type", "application/json");
      res.status(200).send(JSON.stringify(updatedFood));
    })
    .catch(error => {
      res.status(400).send(error)
    })
    });

function checkValidBody(reqBody) {
  return new Promise((resolve, reject) => {
    if (reqBody.food && reqBody.food.name && reqBody.food.calories && typeof reqBody.food.calories === "number"){
      resolve(reqBody)
    } else {
      reject({error: "Invalid request format"})
    }
  })
}

module.exports = router;
