api-documention
This will start the server on the configured port.

## API Endpoints
The application provides the following API endpoints:

- `GET /msgs`: Retrieve all messages from the database.
- `GET /msg/:id`: Retrieve a specific message by ID.
- `POST /send`: Create a new message in the database.

## Usage
You can interact with the API endpoints using tools like Postman or cURL.

1. Use a tool like Postman to make HTTP requests to the endpoints.
2. Send a GET request to `/msgs` to retrieve all messages.
3. Send a GET request to `/msg/:id` to retrieve a specific message by ID.
4. Send a POST request to `/send` with a JSON payload containing the message to create a new message in the database.

## Dependencies
The project utilizes the following dependencies:

- [Express](https://expressjs.com/): Web application framework for Node.js.
- [Sequelize](https://sequelize.org/): Promise-based Node.js ORM for Postgres, MySQL, MariaDB, SQLite, and Microsoft SQL Server.

## License
This project is licensed under the MIT License. See the [LICENSE](https://github.com/your-username/your-repo/blob/main/LICENSE) file for details.

## Author
[Your Name](https://github.com/your-username)