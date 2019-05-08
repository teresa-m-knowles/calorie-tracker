var shell = require('shelljs');
var request = require("supertest");
var app = require('./app');

describe('api', () => {
  beforeAll(() => {
    shell.exec('npx sequelize db:create')
  });
  beforeEach(() => {
    shell.exec('npx sequelize db:migrate')
    shell.exec('npx sequelize db:seed:all')
  });
  afterEach(() => {
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
        expect(response.body.length).toBe(2),
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
        console.log(response.body)
        expect(response.body.id).toBe(2);
        expect(response.body.name).toBe('Mint');
        expect(response.body.calories).toBe(14);
      })
    })
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

    })
  });
});
