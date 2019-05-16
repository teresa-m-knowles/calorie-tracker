# Calorie Tracker

## Introduction ##
This is a calorie tracker microservice application written as a pair project in Module 4 of the Turing School of Software Engineering and Desgin. Using this service, our front end application could create Food and Meal items to track calorie intake. It is deployed in https://safe-tor-35013.herokuapp.com
## Initial Setup ## 

```
$ git clone git@github.com/teresa-m-knowles/calorie-tracker.git
$ cd calorie-tracker
$ npm install 
$ npx sequelize db:create
$ npx sequelize db:migrate
$ npx sequelize db:seed:all 
```

## How to Use ## 

With this application, you have access to different endpoints for the Food and Meal resources that provide CRUD actions that your frontend could then use. For example, you could add a Food item to your database by having a POST request to api/v1/foods with the food information in the body. 

## Food Items API endpoints ##
  
### Get all Food items in the database ###
   **GET /api/v1/foods:** 

<details>
  <summary>See example</summary>

Example Request: 
```
GET /api/v1/foods
Content-Type: application/json
Accept: application/json
```

Example response:

```

status: 200
body:
[
  {
      "id": 1,
      "name": "Banana",
      "calories": 150
  },
  {
      "id": 2,
      "name": "Mint",
      "calories": 14
  },
]
```
</details>


### Get one Food Item ###

**GET /api/v1/foods/:id** 

<details>
  <summary>See example</summary>

Example request:
```
GET /api/v1/foods/1
Content-Type: application/json
Accept: application/json
```

Example of response:
```
status: 200
body:
{
    "id": 1,
    "name": "Banana",
    "calories": 150
}
```
</details>


### Create a New Food Item ###

**POST /api/v1/foods** 
<details>
  <summary>See example</summary>

When a visitor makes a post request to /api/v1/foods with a food item info in the request body, it creates a new Food item and saves it to the database. The response status is 201. 

Example request:
```
POST /api/v1/foods
Content-Type: application/json
Accept: application/json

{
    "food":  
         {
            "name" : "Apple",
            "calories": 40
          }
}

```

Example of response:
```
status: 201
body: 
{
    "id": 4,
    "name": "Apple",
    "calories": 40
}
```
</details>




### Update a Food Item ###

**PATCH /api/v1/foods/:id**
<details>
  <summary>See example</summary>

When a visitor makes a patch request to /api/v1/foods/:id with the food item info in the request's body, and that food item exists in the database, it updates the respective food item with the new information. 

The response's status is 200.

Example request:
```
PATCH /api/v1/foods/4
Content-Type: application/json
Accept: application/json

{
    "food":  
         {
            "name" : "Apple",
            "calories": 40
          }
}

```

Example of response:
```
status: 200
body:
{
    "id": 4 ,
    "name": "Apple",
    "calories": 40
}
```
</details>


### Delete a Food Item ###

**DELETE /api/v1/foods/:id**
<details>
  <summary>More info </summary>

When a visitor makes a delete call to api/v1/foods/:id, they get a 204 status code and the Food is deleted. There is no body in the response.
</details>


## Meal Items API endpoints ##

### Get all Meals ###
**GET /api/v1/meals**

<details>
  <summary>See example response</summary>
  
  Example response:
  
```
status: 200
body:
[
    {
        "id": 1,
        "name": "Breakfast",
        "foods": [
            {
                "id": 1,
                "name": "Banana",
                "calories": 150
            },
            {
                "id": 6,
                "name": "Yogurt",
                "calories": 550
            },
            {
                "id": 12,
                "name": "Apple",
                "calories": 220
            }
        ]
    },
    {
        "id": 2,
        "name": "Snack",
        "foods": [
            {
                "id": 1,
                "name": "Banana",
                "calories": 150
            },
            {
                "id": 9,
                "name": "Gum",
                "calories": 50
            },
            {
                "id": 10,
                "name": "Cheese",
                "calories": 400
            }
        ]
    },
    {
        "id": 3,
        "name": "Lunch",
        "foods": [
            {
                "id": 2,
                "name": "Bagel Bites - Four Cheese",
                "calories": 650
            },
            {
                "id": 3,
                "name": "Chicken Burrito",
                "calories": 800
            },
            {
                "id": 12,
                "name": "Apple",
                "calories": 220
            }
        ]
    },
    {
        "id": 4,
        "name": "Dinner",
        "foods": [
            {
                "id": 1,
                "name": "Banana",
                "calories": 150
            },
            {
                "id": 2,
                "name": "Bagel Bites - Four Cheese",
                "calories": 650
            },
            {
                "id": 3,
                "name": "Chicken Burrito",
                "calories": 800
            }
        ]
    }
]
```
</details>


### Get all Food items associated with a specific meal ###
**GET /api/v1/meals/:meal_id/foods**

<details>
  <summary>See example response</summary>

Example response:
```
status: 200
body: 
{
    "id": 1,
    "name": "Breakfast",
    "foods": [
        {
            "id": 1,
            "name": "Banana",
            "calories": 150
        },
        {
            "id": 6,
            "name": "Yogurt",
            "calories": 550
        },
        {
            "id": 12,
            "name": "Apple",
            "calories": 220
        }
    ]
}
```
</details>

### Add a Food item to a Meal ###
**GET /api/v1/meals/:meal_id/foods/:id**

<details>
  <summary>See example</summary>

Example request:
```
POST /api/v1/meals/3/foods/1
Content-Type: application/json
Accept: application/json
```

Example response:
```
status: 201
body: 
{
    "message": "Successfully added FOODNAME to MEALNAME"
}
```
</details>

### Delete a Food item to a Meal ###
**DELETE /api/v1/meals/:meal_id/foods/:id**

This deletes the Food from that Meal and returns a 204 status


## Running Tests ## 
To run the tests:
```
npm test
```

## Core Contributors ## 
[Tim Allen](https://github.com/timnallen) and [Teresa Knowles](https://github.com/teresa-m-knowles)
## Schema Design ##
![Database schema](/schema.png)
## Tech Stack List ## 
- Node.js
- Express
- Sequelize
- PostgreSQL

