# ex-api

Project for testing CRUD API with Express, Seqeulize

#### What is a CRUD API?

A CRUD API is an application programming interface that provides operations to create, read, update, and delete data from a database, which are the four basic functions of persistent storage.

The API exposes endpoints that correspond to each of these operations, and developers can use HTTP requests to interact with the API and perform these actions on the data. Here's a brief overview of each operation:

### Operations

- **Create**: This operation allows you to add new data to the database. To add a new user to the database, create a POST HTTP request `/users` with JSON object contaning the values like `name`, `email` and `password`. While adding to the database, api will add `uuid`, `id`, `updatedAt` and `createdAt` fields.

- **Read**: This operation allows you to retrieve data from the database.

  - To retrieve a list of all users in the database, create a GET HTTP request `/users`. The response is limited to 10 users.
  - To find users with name, uuid or email, create a GET HTTP request `/users/find` with JSON object containg the value `uuid` or a pattern like value in `name` or `email` fields.

- **Update**: This operation allows you to modify existing data in the database. To change a user's password, create a POST HTTP request `/users/update` with JSON object contaning the values `uuid` and changed `password`.

- **Delete**: This operation allows you to remove data from the database. To remove a user from the database, create a POST HTTP request `/users/delete` with JSON object contaning the values `uuid`

### Model `User`

- **id**: auto-increment integer, hidden from api response

- **uuid**: unique id automatically created by sequelize

- **name**: non-empty, not-null and validated string; can contain (a-z ,.'-)

- **email**: unique, non-empty, not-null and validated email string

- **password**: non-empty, not-null and validated string; can contain (a-z0-9@$!%\*#?&)
