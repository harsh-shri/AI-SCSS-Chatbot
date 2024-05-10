MERN_OPEN_AI_CHATBOT

This repository contains the code for a MERN stack open-source AI chatbot. The chatbot is built using the MERN stack (MongoDB, Express, React, and Node.js) and It uses Open AI open source API to perform natural language processing (NLP) to understand and respond to user inputs.

Features

User authentication and authorization using JSON Web Tokens (JWT)
Natural language processing using the Compromise NLP library
Customizable chatbot responses

Tech Stack

MongoDB: A document-oriented NoSQL database used for storing user data and chatbot responses.

Express: A Node.js web application framework used for building the backend API.

React: A JavaScript library for building user interfaces used for building the frontend.

Node.js: A JavaScript runtime built on Chrome's V8 JavaScript engine used for running the backend server.


Compromise: A natural language processing library for JavaScript.

Project Structure

The project is organized into the following directories:

backend: Contains the backend code for the chatbot, including the Express server, MongoDB models, and WebSocket implementation.

frontend: Contains the frontend code for the chatbot, including the React components and WebSocket client.

shared: Contains shared code between the backend and frontend, including the JWT authentication middleware and WebSocket event types.


Getting Started

To get started with the project, follow these steps:

Clone the repository:
bash
Copy code
git clone https://github.com/your-username/MERN_OPEN_AI_CHATBOT.git

Install the dependencies:

bash

Copy code

cd MERN_OPEN_AI_CHATBOT

npm install

Start the backend server:

bash

Copy code

cd backend

npm start

Start the frontend server:

bash

Copy code

cd frontend

npm start

Open http://localhost:3000 in your web browser to access the chatbot.

Contributing

We welcome contributions to the MERN_OPEN_AI_CHATBOT project! To contribute, follow these steps:

Fork the repository.

Create a new branch for your changes.

Make your changes and commit them.

Push your changes to your forked repository.

Create a pull request.

This project was created for educational purposes only. It is not intended for commercial use.
