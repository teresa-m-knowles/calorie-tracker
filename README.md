# Calorie Tracker

## Introduction ##
This is a calorie tracker application written as a pair project in Module 4 of the Turing School of Software Engineering and Desgin. 
## Initial Setup ## 
## How to Use ## 

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


### Update a Food Item ###

**DELETE /api/v1/foods/:id**
<details>
  <summary>More info </summary>

When a visitor makes a delete call to api/v1/foods/:id, they get a 204 status code and the Food is deleted. There is no body in the response.
</details>





## Known Issues ## 
## Running Tests ## 
## How to Contribute ## 
## Core Contributors ## 
## Schema Design ##
## Tech Stack List ## 
