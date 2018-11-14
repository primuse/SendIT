# [SendIT](https://primuse.github.io/SendIT/index.html)
[![Build Status](https://travis-ci.com/primuse/SendIT.svg?branch=APIv1)](https://travis-ci.com/primuse/SendIT)
[![Coverage Status](https://coveralls.io/repos/github/primuse/SendIT/badge.svg?branch=APIv1)](https://coveralls.io/github/primuse/SendIT?branch=APIv1)
[![Maintainability](https://api.codeclimate.com/v1/badges/a99a88d28ad37a79dbf6/maintainability)](https://codeclimate.com/github/codeclimate/codeclimate/maintainability)


[SendIT](https://primuse.github.io/SendIT/index.html) is a courier service app that helps users deliver parcels to different destinations all around the world. 

It provides courier quotes based on weight categories.

#### Current Feautures: 
* Users can create parcel orders, specifying who it is addressed to and destination.
* Users can cancel parcels and change parcel destination.
* Admin can change the current location and update status of a parcel.
* Users can see Pickup location and destination on google map

#### Future Features:
* Users receive live email notification anytime Admin changes parcel status.

**N/B: Admin functionalities can be accessed through [admin.html](https://primuse.github.io/SendIT/admin.html)**

## Getting Started
Clone the repo and cd into it.

### Prerequisites
#### NodeJs is needed on your local machine to run this app

### Installation and Usage
Simply run:
```npm start```

### Testing
#### Unit tests can be run using:
```npm test```

#### API endpoint tests can be done using postman:
- To create new parcel order

``` POST localhost:3000/api/v1/parcels```

- To get all parcel orders

```GET localhost:3000/api/v1/parcels```

- with query

```GET localhost:3000/api/v1/parcels?weight=5```

- To get a parcel order with ID

```GET localhost:3000/api/v1/parcels/:parcelId```

- To update a parcel order with ID

```PUT localhost:3000/api/v1/parcels/:parcelId/update```

- To cancel a Parcel order with ID

```PUT localhost:3000/api/v1/parcels/:parcelId/cancel```

- To get all parcel orders from User with ID

```GET localhost:3000/api/v1/users/:userId/parcels```

## Technologies used
NodeJs,
Express,
Mocha test suite,
Chai assertion library

## Environments
#### API endpoints hosted on Heroku @ https://sendit18.herokuapp.com/
#### UI templates hosted on GH-pages @ https://primuse.github.io/SendIT/index.html
#### Pivotal Tracker board @ https://www.pivotaltracker.com/n/projects/2212719

## Author

* **Tiku Okoye**
