# Store Manager API

This is a CRUD API for a store manager. It is built using NodeJS, Express and MySQL. I have used the MSC(Models, Services, Controllers) architecture for this project and Docker for containerization. Development was done using TDD(Test Driven Development) and the tests were written using Mocha, chai and sinon.

You can Create, Read, Update and Delete products and sales records.

---

## Built With

- [NodeJS](https://nodejs.org/en/) - JavaScript runtime
- [Express](https://expressjs.com/) - Web framework for NodeJS
- [MySQL](https://www.mysql.com/) - Database
- [Docker](https://www.docker.com/) - Containerization
- [Docker Compose](https://docs.docker.com/compose/) - Container orchestration
- [Mocha](https://mochajs.org/) - Testing framework
- [Chai](https://www.chaijs.com/) - Assertion library
- [Sinon](https://sinonjs.org/) - Test spies, stubs and mocks
- [Swagger](https://swagger.io/) - API documentation

## Authors

- [Lucas Ximenes](https://www.linkedin.com/in/lucasdximenes/)

---

## API Documentation

The swagger API documentation can be found [here](https://app.swaggerhub.com/apis-docs/lucasdximenes/Store-Manager-API/1.0.0#/).

Documentation file .yaml can be found [here](./store-manager-api-documentation.yaml).

Insomnia workspace can be found [here](./Insomnia_api_documentation.json).

---

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

You will need to have the following installed on your machine:

- [Docker](https://www.docker.com/)
- [Docker Compose](https://docs.docker.com/compose/)

### Installing

To get the development environment running, you will need to clone the repository and run the following commands:

```
docker-compose up -d
```

This will start the MySQL container and the NodeJS container. The MySQL container will be running on port 3306 and the NodeJS container will be running on port 3000.

After the containers are running, you will need to connect to the bash of the NodeJS container:

```
docker exec -it store_manager bash
```

finally, you will need to install the dependencies:

```
npm install
```

## Running the tests

To run the tests, you will need to connect to the bash of the NodeJS container:

```
docker exec -it store_manager bash
```

and then run the following command:

```
npm test
```

## Running the API

To run the API, you will need to connect to the bash of the NodeJS container:

```
docker exec -it store_manager bash
```

and then run the following command:

```
npm start
```

or

```
npm run debug
```

---
