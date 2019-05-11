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
      res.sendStatus(404)
    });
})

router.post("/", function(req, res) {
  if (checkValidBody(req.body)) {
    Food.create(
      {
        name: req.body.food.name,
        calories: req.body.food.calories
      }
    )
      .then(foodItem => {
        res.setHeader("Content-Type", "application/json");
        res.status(201).send(JSON.stringify(foodItem));
      })
      .catch(error => {
        res.setHeader("Content-Type", "application/json");
        res.status(500).send({ error });
      });
  } else {
    res.setHeader("Content-Type", "application/json");
    res.status(400).send(JSON.stringify("Invalid request format"));
  };
});

router.delete("/:id", function(req, res, next) {
  checkIfFoodExists(req.params.id).then(food => {
    if (food !== null) {
      food.destroy()
        .then(food => {
          res.setHeader("Content-Type", "application/json");
          res.sendStatus(204);
        })
        .catch(error => {
          console.log(error)
          res.setHeader("Content-Type", "application/json");
          res.status(500).send({ error });
        });
    } else {
      res.setHeader("Content-Type", "application/json");
      res.sendStatus(404);
    }
  });
});

router.patch("/:id", function(req, res) {
  if(checkValidBody(req.body)) {
    Food.update(
      {
        name: req.body.food.name,
        calories: req.body.food.calories
      },
      {
        returning: true,
        where: {
          id: req.params.id
        }
      }
    )
      .then(([rowsUpdate, [updatedFood]]) => {
        if(updatedFood){
          res.setHeader("Content-Type", "application/json");
          res.status(200).send(JSON.stringify(updatedFood));
        } else{
          res.status(400).send(JSON.stringify(`No food with id of ${req.params.id} was found in the database`))
        }
      })
      .catch(error => {
        res.status(500).send({ error })
      });
  } else{
      res.setHeader("Content-Type", "application/json");
      res.status(400).send(JSON.stringify("Invalid request format"));
  }
});

function checkValidBody(req_body) {
  if (req_body.food && req_body.food.name && req_body.food.calories) {
    return (typeof req_body.food.calories === "number")
  } else {
    return false
  }
};

function checkIfFoodExists(id) {
  return Food.findByPk(id).then(food => {
    return food
  })
};

module.exports = router;
