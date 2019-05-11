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
  return Food;
};
