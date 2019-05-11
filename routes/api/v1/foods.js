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
  res.setHeader("Content-Type", "application/json");

  checkValidBody(req.body)
    .then(reqBody => {
      return Food.findOrCreate({
        attributes: ['id', 'name', 'calories'],
        where: {
          name: req.body.food.name,
          calories: req.body.food.calories
        }
      })
      })
    .then(([food, created]) => {
      created ? res.status(201).send(JSON.stringify(food)) : res.status(200).send(JSON.stringify(food))
    })
    .catch(error => {
      console.log(error);
      res.status(400).send(error);
    });
});

//
//   if (checkValidBody(req.body)) {
//     Food.create(
//       {
//         name: req.body.food.name,
//         calories: req.body.food.calories
//       }
//     )
//       .then(foodItem => {
//         res.setHeader("Content-Type", "application/json");
//         res.status(201).send(JSON.stringify(foodItem));
//       })
//       .catch(error => {
//         res.setHeader("Content-Type", "application/json");
//         res.status(500).send({ error });
//       });
//   } else {
//     res.setHeader("Content-Type", "application/json");
//     res.status(400).send(JSON.stringify("Invalid request format"));
//   };
// });

router.delete("/:id", function(req, res, next) {
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
      return updateFood(req)
    })
    .then(updatedFood => {
      res.setHeader("Content-Type", "application/json");
      res.status(200).send(JSON.stringify(updatedFood));
    })
    .catch(error => {
      res.status(400).send(error)
    })
    });


function updateFood(validRequest) {
  let errorMessage = `No food with id of ${validRequest.params.id} was found in the database`
  return new Promise((resolve, reject) => {
    Food.update(
      {
        name: validRequest.body.food.name,
        calories: validRequest.body.food.calories
      },
      {
        returning: true,
        where: {
          id: validRequest.params.id
        }
      }
    )
    .then(([rowsUpdate, [updatedFood]]) => {
      updatedFood ? resolve(updatedFood) : reject({error: errorMessage})
    })
  })
}

function checkValidBody(reqBody) {
  return new Promise((resolve, reject) => {
    if (reqBody.food && reqBody.food.name && reqBody.food.calories && typeof reqBody.food.calories === "number"){
      resolve(reqBody)
    } else {
      reject({error: "Invalid request format"})
    }
  })
}


function checkIfFoodExists(id) {
  return Food.findByPk(id).then(food => {
    return food
  })
};

module.exports = router;
