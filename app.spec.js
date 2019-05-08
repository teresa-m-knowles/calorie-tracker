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
        expect(response.header["content-type"]).toContain("application/json");
        expect(response.body.id).toBe(2);
        expect(response.body.name).toBe('Mint');
        expect(response.body.calories).toBe(14);
      })
    })

    describe('When the food item does not exist', () => {
      test('should return a 404 status', () => {
        return request(app).get("/api/v1/foods/43").then(response => {
          expect(response.status).toBe(404);
          expect(response.body).toEqual({});
        })
      })
    })


  });
});
