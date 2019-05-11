'use strict';
module.exports = (sequelize, DataTypes) => {
  const Food = sequelize.define('Food', {
    name: DataTypes.STRING,
    calories: DataTypes.INTEGER
  }, {});

  Food.associate = function(models) {
    Food.belongsToMany(models.Meal, {through: models.MealFood});
  };

  Food.findFood = function(id) {
    return new Promise((resolve, reject) => {
      Food.findByPk(id)
        .then(foodItem => {
          if (foodItem){
            resolve(foodItem);
          } else{
            reject({error: `No food with id of ${id} found in the database.`});
          }
        });
    })
  };

  Food.updateFood = function(req) {
    let errorMessage = `No food with id of ${req.params.id} was found in the database`
    return new Promise((resolve, reject) => {
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
        updatedFood ? resolve(updatedFood) : reject({error: errorMessage})
      })
    })

  };

  return Food;
};
