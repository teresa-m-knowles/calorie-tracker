var shell = require('shelljs');
var request = require("supertest");
var app = require('./app');

describe('api', () => {
  beforeAll(() => {
    shell.exec('npx sequelize db:create')
    shell.exec('npx sequelize db:migrate')
    shell.exec('npx sequelize db:seed:all')
  });
  afterAll(() => {
    shell.exec('npx sequelize db:seed:undo:all')
    shell.exec('npx sequelize db:migrate:undo:all')
  });

  describe('Foods index path', () => {
    test('should return a 200 status', () => {
      return request(app).get('/api/v1/foods').then(response => {
        expect(response.status).toBe(200)
      })
    });
    test('should return an array of foods', () => {
      return request(app).get('/api/v1/foods').then(response => {
        expect(response.body.length).toBe(8),
        expect(Object.keys(response.body[0])).toContain('name'),
        expect(Object.keys(response.body[0])).toContain('calories')
      })
    });
  });

  describe('Single food item path', () => {
    test('should return a 200 status', () => {
      return request(app).get("/api/v1/foods/2").then(response => {
        expect(response.status).toBe(200)
      })
    });

    test('should return one food item', () => {
      return request(app).get("/api/v1/foods/2").then(response => {
        expect(response.header["content-type"]).toContain("application/json");
        expect(response.body.id).toBe(2);
        expect(response.body.name).toBe('Mint');
        expect(response.body.calories).toBe(14);
      })
    });

    describe('When the food item does not exist', () => {
      test('should return a 404 status', () => {
        return request(app).get("/api/v1/foods/43").then(response => {
          expect(response.status).toBe(404);
          expect(response.body).toEqual({});
        })
      });
    });
  });

  describe('Create food item path', () => {
    test('should return a 201 status and the created food item', () => {
      const body = {
        food: {
          name: "Apple",
          calories: 40
        }
      }
      return request(app).post("/api/v1/foods").send(body).then(response => {
        expect(response.status).toBe(201);
        expect(Object.keys(response.body)).toContain('id');
        expect(response.body.name).toBe('Apple');
        expect(response.body.calories).toBe(40);
      })
    });

    test('returns a 400 is info is missing', () => {
      const body = {
        food: {
          name: "name",
          calories: "hslafjkhjfakl"
        }
      }
      return request(app).post("/api/v1/foods").send(body).then(response => {
        expect(response.status).toBe(400);
      })
    });
  });

  describe('Update food item path', () => {
    test('should return a 200 status', () => {
      //Change banana from 150 calories (from seed) to 40
      const body = {
        food: {
          name: "Banana",
          calories: 40
        }
      }

      return request(app).patch("/api/v1/foods/1").send(body).then(response => {
        expect(response.status).toBe(200);
      })

    });
    test('should update the food item and return it', () => {
      const body = {
        food: {
          name: "Banana",
          calories: 40
        }
      }

      return request(app).patch("/api/v1/foods/1").send(body).then(response => {
        expect(response.body.id).toBe(1);
        expect(response.body.name).toBe("Banana");
        expect(response.body.calories).toBe(40);
      })

    });
    describe('when the request body is invalid (no calories or no name for food)', () => {
      test('should return a 400 status', () => {
        const body = {
          food: {
            calories: 40
          }
        }
        return request(app).patch("/api/v1/foods/1").send(body).then(response => {
          expect(response.status).toBe(400)
        })
      });
    });
  });

  describe('Create delete item path', () => {
    test('should return a 204 status', () => {
      return request(app).delete("/api/v1/foods/1").then(response => {
        expect(response.status).toBe(204);
      })
    });

    test('the item no longer exists and the you cannot delete an item that does not exist', () => {
      return request(app).delete("/api/v1/foods/1").then(response => {
        expect(response.status).toBe(404);
      })
    });
  });

  describe('Meals index path', () => {
    test('should return a 200 status', () => {
      return request(app).get('/api/v1/meals').then(response => {
        expect(response.status).toBe(200)
      })
    });

    test('should return an array of meals and their foods', () => {
      return request(app).get('/api/v1/meals')
      .then(response => {
        const lunch = response.body[2];
        expect(response.body.length).toBe(4);
        expect(lunch.name).toBe('Lunch');
        expect(lunch).toHaveProperty('foods');
        expect(lunch.foods[0].name).toBe('Bagel Bites - Four Cheese');
        expect(lunch.foods[0].calories).toBe(650);
      })
    })
  });

  describe('Get all foods for one meal', () => {
    test('should return a 200 status', () => {
      return request(app).get("/api/v1/meals/1/foods").then(response => {
        expect(response.status).toBe(200);
      })
    });

    test('should return a name and an array of food objects', () => {
      return request(app).get("/api/v1/meals/1/foods").then(response => {
        expect(Object.keys(response.body)).toContain('name');
        expect(response.body.foods.length).toBe(2);
        expect(Object.keys(response.body.foods[0])).toContain("name");
        expect(Object.keys(response.body.foods[0])).toContain("calories");
      })
    });

    test('should return a 404 if the meal does not exist', () => {
      return request(app).get("/api/v1/meals/8/foods").then(response => {
        expect(response.status).toBe(404);
      })
    });
  });
});