'use strict';
var pry = require("pryjs")

module.exports = (sequelize, DataTypes) => {
  const Meal = sequelize.define('Meal', {
    name: DataTypes.STRING
  }, {});
  Meal.associate = function(models) {
    Meal.belongsToMany(models.Food, {through: models.MealFood, as: 'foods'});
  };

  Meal.findMeal = function(id) {
    const Food = require("../models").Food;
    return new Promise ((resolve, reject) => {

      Meal.findOne({
        where: {id: id},
        attributes: ['id', 'name'],
        include: [{
          model: Food,
          as: 'foods',
          attributes: ['id', 'name', 'calories'],
          through: {
             attributes: []
                  }
        }]
      })
      .then(meal => {
        if (meal) {
          resolve(meal)
        } else{
          reject({error: `No meal with id of ${id} found in the database.`})
        }
      })
    })
  }
  return Meal;
};
