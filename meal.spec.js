var shell = require('shelljs');
var request = require("supertest");
var app = require('./app');

describe('Meals api endpoints', () => {
  beforeAll(() => {
    shell.exec('npx sequelize db:create')
    shell.exec('npx sequelize db:migrate')
    shell.exec('npx sequelize db:seed:all')
  });
  afterAll(() => {
    shell.exec('npx sequelize db:seed:undo:all')
    shell.exec('npx sequelize db:migrate:undo:all')
  });

  describe('Meals index path', () => {
    test('should return a 200 status', () => {
      return request(app).get('/api/v1/meals').then(response => {
        expect(response.status).toBe(200)
      })
    });

    test('should return an array of meals and their foods', () => {
      return request(app).get('/api/v1/meals').then(response => {
        expect(response.body.length).toBe(4);
        expect(Object.keys(response.body[0])).toContain('name')
        expect(Object.keys(response.body[0])).toContain('foods')
      })
    })
  });


});
