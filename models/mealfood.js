'use strict';
module.exports = (sequelize, DataTypes) => {
  const MealFood = sequelize.define('MealFood', {
    MealId: DataTypes.INTEGER,
    FoodId: DataTypes.INTEGER
  }, {});
  MealFood.associate = function(models) {
    MealFood.belongsTo(models.Food);
    MealFood.belongsTo(models.Meal);
  };

  MealFood.deleteFood = function(request) {
    return new Promise((resolve, reject) => {
      MealFood.findOne({
        where: {
          MealId: request.params.mealId,
          FoodId: request.params.foodId
        }
      })
        .then(mealFood => {
          if(mealFood) {
            return mealFood.destroy()
          } else{
            reject({error: "No Meal and/or Food associated found"})
            }
          })
        .then(destroyedRows => {
          resolve()
        })

    })
  }
  return MealFood;
};
