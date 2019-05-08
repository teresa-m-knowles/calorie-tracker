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
      res.setHeader("Content-Type", "application/json")
      foodItem ? res.status(200).send(JSON.stringify(foodItem)) : res.sendStatus(404);
    })
    .catch(error => {
      res.status(500).send({ error })
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

module.exports = router;
