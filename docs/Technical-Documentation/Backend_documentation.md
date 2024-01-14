
# LE AREA - Backend documentation



## Table of contents

[Introduction](#introduction) \
[Prérequisites](#prerequsites) \
[Architecture Overview](#Architecture) \
[API Endpoints](#API-Endpoint) \
[Database Schema](#Database) \
[Authentication](#Authentication)





## 1 Introduction

LeArea is project based on [IFTTT](https://ifttt.com/explore) it's aime to automate services communication. 

A small example :

if it's 30° in Tolosa -> then -> create a Github repository
## Prerequisites


you will find every prerequisites and how to run the project [here](https://github.com/christophechr/LeAREA/blob/dev/README.md)
## Architecture Overview

&nbsp;&nbsp;&nbsp;&nbsp;The architecture of the project follows a modular and scalable design, drawing inspiration from the principles of IFTTT (If This Then That). The system is composed of the following key components:

### 3.1 User Interface (UI)

&nbsp;&nbsp;&nbsp;&nbsp;The UI serves as the front end where users interact with the system. It allows users to create and manage triggers and actions, providing a user-friendly experience for configuring automation scenarios.

### 3.2 Backend Server

&nbsp;&nbsp;&nbsp;&nbsp;The backend server is the core of the system, responsible for processing user requests, executing automation workflows, and interacting with the MongoDB database. It is built using [mention the programming language and framework, e.g., Node.js and Express].

### 3.3 MongoDB Database

&nbsp;&nbsp;&nbsp;&nbsp;MongoDB serves as the persistent data store for the project. It stores user profiles, triggers, actions, and other relevant data. The schema-less nature of MongoDB allows for flexibility in handling diverse automation scenarios.

### 3.4 Trigger Engine

&nbsp;&nbsp;&nbsp;&nbsp;The Trigger Engine is a critical component responsible for monitoring predefined conditions or events ("If This") set by users. When a trigger condition is met, it initiates the execution of associated actions.

### 3.5 Action Executor

&nbsp;&nbsp;&nbsp;&nbsp;The Action Executor is responsible for carrying out specific actions ("Then That") associated with triggered events. It interacts with external services, APIs, or devices to perform the desired actions configured by users.

### 3.6 Communication Middleware

&nbsp;&nbsp;&nbsp;&nbsp;To facilitate communication between different components, a middleware layer handles event propagation and ensures seamless interaction between the Trigger Engine, Action Executor, and other modules.

### 3.7 External Services and APIs

&nbsp;&nbsp;&nbsp;&nbsp;The system interacts with various external services and APIs to enable a wide range of automation possibilities. This includes integrations with third-party applications,  and custom services.

### 3.8 Authentication and Security

&nbsp;&nbsp;&nbsp;&nbsp;User authentication and authorization are implemented to secure the system. This involves validating user identities and ensuring that only authorized users can create, modify, or execute automation workflows.

## 4. API Endpoints 

### 4.1 Endpoint: /api/resource1

#### Description

This endpoint allows users to perform operations on resource1. Replace `{resource_id}` with the actual resource identifier.

#### Request

- **Method:** GET
- **Parameters:**
  - `resource_id` (path parameter): The identifier of the resource1.

- **Authentication:**
  - This endpoint requires authentication. Ensure the user is authenticated using the provided token.

- **Pre-handler:**
  - `auth`: Handles user authentication.
  - `getUser`: Retrieves user information.

#### Response

- **Status Codes:**
  - 200 OK: The request was successful.
  - 401 Unauthorized: The user is not authenticated.
  - 403 Forbidden: The authenticated user does not have permission.
  - 404 Not Found: The requested resource does not exist.
  - ...

- **Response Body (Example):**
  ```json
  {
    "resource_id": 123,
    "name": "Resource 1",
    "description": "Description of Resource 1"
    // Additional fields
  }

### 4.2 Endpoint: /api/resource1

#### Description

This endpoint allows users to create a new resource1.

#### Request

- **Method:** POST
- **Parameters:**
  - `name` (body parameter): The name of the new resource.

- **Authentication:**
  - This endpoint requires authentication. Ensure the user is authenticated using the provided token.

- **Pre-handler:**
  - `auth`: Handles user authentication.
  - `getUser`: Retrieves user information.

#### Response

- **Status Codes:**
  - 201 Created: The resource was successfully created.
  - 401 Unauthorized: The user is not authenticated.
  - 403 Forbidden: The authenticated user does not have permission to create resources.
  - 422 Unprocessable Entity: The request body is invalid.
  - ...

- **Response Body (Example):**
  ```json
  {
    "resource_id": 124,
    "name": "New Resource",
    "description": "Description of the New Resource"
    // Additional fields
  }

### 4.3 Endpoint: /api/resource1/{resource_id}

#### Description

This endpoint allows users to update an existing resource1.

#### Request

- **Method:** PUT
- **Parameters:**
  - `resource_id` (path parameter): The identifier of the resource1.
  - `name` (body parameter): The updated name of the resource.

- **Authentication:**
  - This endpoint requires authentication. Ensure the user is authenticated using the provided token.

- **Pre-handler:**
  - `auth`: Handles user authentication.
  - `getUser`: Retrieves user information.

#### Response

- **Status Codes:**
  - 200 OK: The resource was successfully updated.
  - 401 Unauthorized: The user is not authenticated.
  - 403 Forbidden: The authenticated user does not have permission to update resources.
  - 404 Not Found: The requested resource does not exist.
  - ...

- **Response Body (Example):**
  ```json
  {
    "resource_id": 124,
    "name": "Updated Resource",
    "description": "Description of the Updated Resource"
    // Additional fields
  }

### 4.4 Endpoint: /api/resource1/{resource_id}

#### Description

This endpoint allows users to delete an existing resource1.

#### Request

- **Method:** DELETE
- **Parameters:**
  - `resource_id` (path parameter): The identifier of the resource1.

- **Authentication:**
  - This endpoint requires authentication. Ensure the user is authenticated using the provided token.

- **Pre-handler:**
  - `auth`: Handles user authentication.
  - `getUser`: Retrieves user information.

#### Response

- **Status Codes:**
  - 204 No Content: The resource was successfully deleted.
  - 401 Unauthorized: The user is not authenticated.
  - 403 Forbidden: The authenticated user does not have permission to delete resources.
  - 404 Not Found: The requested resource does not exist.
  - ...

- **Response Body (Example):**
  ```json
  {
    "resource_id": 124,
    "name": "Delete  Resource",
    "description": "Description of the deleted Resource"
    // Additional fields
  }
  
## 7. Authentication

The authentication in this project is implemented using [Passport](http://www.passportjs.org/), a popular authentication middleware for Node.js. Passport provides a flexible and modular approach to authentication, supporting various strategies such as JWT, OAuth, and more.


### Routes Protection

``` javascript 

const { sign, verify } = require("jsonwebtoken");

const createJwt = (userId, email) => {
    return sign({ userId, email }, process.env.JWT_SECRET, {
        expiresIn: "24h",
    });
};

const verifyJwt = (token) => {
    return verify(token, process.env.JWT_SECRET);
};

module.exports = {
    createJwt,
    verifyJwt,
};
```

### Usage in Postman

When testing protected routes in POstman, include the authentification token in the request header. For JWT authentication add an "Authorization" Header with the value "Bearer [your_token]"

Example
``` http
GET /api/protected-route
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.[your_token]
```
Replace [your_token] with the actual JWT token obtained during the authentication process.
