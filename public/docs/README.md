# Project Documentation

## Table of Contents

---

1. [Introduction](#1-introduction)
2. [Project Overview](#2-project-overview)
   1. [Project Goals](#21-project-goals)
   2. [Technologies Used](#22-technologies-used)
3. [System Architecture](#3-system-architecture)
   1. [Frontend (React + TypeScript)](#31-frontend-react--typescript)
   2. [Backend (Django)](#32-backend-django)
4. [Features](#4-features)
   1. [User Registration and Authentication](#41-user-registration-and-authentication)
   2. [Project Creation](#42-project-creation)
   3. [Bidding](#43-bidding)
   4. [Chat Integration](#44-chat-integration)
5. [API Root](#5-api-root)
6. [Settings and Configurations](#6-settings-and-configurations)
7. [Project Structure](#7-project-structure)

---

## 1. Introduction

---

Here is a rough walk through the journey of conceptualizing, designing, and implementing an artwork bidding site.

---

## 2. Project Overview

---

### 2.1 Project Goals

The aim was to develop a user-friendly and efficient Art bidding site enables users to view as well as bid and buy artworks of their linkng.Should also support account creation for interested artists in which they can showcase their artworks.



### 2.2 Technologies Used

The Website is done with a combination of modern technologies which include:

- **Frontend (React + TypeScript):** The user interface is developed using React, a popular JavaScript library, and TypeScript, a statically typed superset of JavaScript. Redux Toolkit is utilized for state management, daisyui and tailwind csss for styling.

- **Backend (Django):** The backend is powered by Django, a Python web framework. We use Django Rest Framework for building RESTful APIs and SimpleJWT for authentication. Viewsets.ModelViewSet is employed for efficient data handling.

---

## 3. System Architecture

---

### 3.1 Frontend (React + TypeScript)

The frontend is built using React a JavaScript library known for its component-based architecture and and Typescript. TypeScript adds static typing to the codebase, making it more reliable and maintainable. To manage the application's state, [Redux Toolkit](https://redux-toolkit.js.org/) was used, which provides efficient state management capabilities.

### 3.2 Backend (Django)

The backend is powered by Django, a high-level Python web framework. We employed Django Rest Framework (DRF) to create RESTful APIs, enabling seamless communication between the frontend and backend. For secure user authentication, we integrated SimpleJWT into our Django backend. To efficiently handle database operations and API endpoints, we utilized DRF's Viewsets.ModelViewSet.

---

## 4. Features

---

### 4.1 User Registration and Authentication

The project uses [django-rest-framework-jwt](https://django-rest-framework-simplejwt.readthedocs.io/en/latest/) for authentication via token-based authentication.

Authentication routes used are:

- **http:127.0.0.1/auth/users/:** This url end point is responsible for creating a new user.

- **http:127.0.0.1/auth/jwt/create/:** This url end point is responsible for logging in and a jwt token is returned as the response. the token consists of an eccess token and a refresh token. the access token is used to access the different resources on the server and the refresh token is used to rquest for a new access token if the access token expires or is invalid.

- **http:127.0.0.1/auth/users/me:** This endpoint returns the logged in user. one must provide the access token

The token expiry time span is set in `artbid-connect-backend/gallery/settings`

```python


SIMPLE_JWT = {
'AUTH_HEADER_TYPES': ('JWT',),
   'REFRESH_TOKEN_LIFETIME': timedelta(days=30),
   'ACCESS_TOKEN_LIFETIME': timedelta(days=30),
}


```

### 4.2 Project Creation

A ModelViewSet is implemented that handles different CRUDE requests, also, a serializer is implemented that serializes and decerializes the incomming data

- **ProjectViewSet:**

```python
class ProjectViewSet(viewsets.ModelViewSet):
    queryset = Project.objects.all()

    def get_serializer_class(self):
        if self.request.method == 'POST':
            return ProjectCreateSerializer  
        return ProjectSerializer
    
    def create(self, request, *args, **kwargs):
        # (project, created) = Project.objects.get_or_create(
        #     creator_id=request.user.id)
       
        project_serializer = ProjectCreateSerializer(data=request.data)
        project_serializer.is_valid(raise_exception=True)
        project_instance = project_serializer.save()
        
        collaborator_serializer = CollaboratorCreateSerializer(data={'artist': project_instance.creator.id, 'project': project_instance.id})
        collaborator_serializer.is_valid(raise_exception=True)
        collaborator_serializer.save()
        
        return Response(project_serializer.data)

```

- **Serializer:**

Two serializers are used . one to deal with `GET` requests and the other for `POST` request

```python


class ProjectCreateSerializer(serializers.ModelSerializer):
    creator = serializers.PrimaryKeyRelatedField(queryset=Artist.objects.all())  
    class Meta:
        model = Project
        fields = ['title', 'description', 'creator']

```

### 4.3 Bidding

Authenticated users can bid as well as purchase the artwork at the highest bidded price (highest bidder).These transactions are then recorded and can be viewed later if the need arises.


### 4.4 Chat Integration

A collaboration panel exists where artists can join a particular ongoing projects and collaborate together via a chat interface. The chat functionallity uses web sockets to send messages back and forth.Web sockets are very essential as they aso have the capability to work offline even when the server is  down and on reconnection, messages sent during the offline session are then broadcasted to every artist on the chat room.

Chat Server

```ts
import express from 'express';
import { createServer } from 'node:http';
import { Server } from 'socket.io';
import cors from 'cors';


const app = express();
cors(app);
const server = createServer(app);
const io = new Server( server,{
    cors: {
      origin: "http://localhost:5173"
    }
  });
  
  io.listen(4000);
app.get('/', (req, res) => {
  res.send('<h1>Hello world</h1>');
});


io.on('connection', (socket) => {
    console.log('a user connected');
    
    socket.on('chat message', (msg) => {
      console.log('message: ' + msg.sender.email);
      io.emit('chat-message', msg);
    });

  });

server.listen(3000, () => {
  console.log('server running at http://localhost:3000');
});





```

- Loook for the above code in `gallery/event/views.py` and `gallery/event/serializers.py`.
- For the client requests against these viewsets, look under `gallery/frontend/client/actions`.

## 5. Api Root

Here is the api documentation for the different endpoints:

  ```

 {
    "biddings": "http://localhost:8000/api/biddings/",
    "artworks": "http://localhost:8000/api/artworks/",
    "artists": "http://localhost:8000/api/artists/",
    "follows": "http://localhost:8000/api/follows/",
    "projects": "http://localhost:8000/api/projects/",
    "collaborators": "http://localhost:8000/api/collaborators/",
    "collections": "http://localhost:8000/api/collections/",
    "purchases": "http://localhost:8000/api/purchases/"
}

  ```

## 6. Settings and Configurations

Different app configurations are set in `artbid-connect-backend/gallery/settings`


To configure allowed hosts and ip's change the following:

```python

ALLOWED_HOSTS = ['*']
CORS_ORIGIN_ALLOW_ALL = True
CORS_ALLOW_CREDENTIALS = True

INTERNAL_IPS = [
    # ...
    '127.0.0.1',
    # ...
]

```

One can also use a different database other than sqlite3 db
here is the current configuration;

```python

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.sqlite3',
        'NAME': BASE_DIR / 'db.sqlite3',
    }
}


```

To use MySQL database , change it to :

```python

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.mysql',
        'NAME': 'db name',
        'HOST': 'localhost',
        'USER': 'db username',
        'PASSWORD': 'db password'
    }
}

```

Then run,

```sh
python3 manage.py migrate

```

<p style="color: orange;"> NB: Each time you change your database and run the above command you'll loose all your data eg artworks,projects,users etc. To recover the data , search for a backup tool eg mysqldump to backup the data then repopulate the data into the new database</p>

--- 
**NOTE** During registration, pasword Must be at least 8 characters long , should also be mixed with Uppacase, and or @*&# or underscores otherwise resgistration would fail. 

Sample password : 
- test - bad.
- Test#09@_2024 - Good.                 


Other necessary commands are:

- python manage.py runserver (to run the application on [localhost](httpp://localhost:8000)) - run against artbid-connect-backend folder - `cd artbid-connect-backend`
- python manage.py createsuperuser (to create an admin)
- python manage.py changepassword (to reset the admin password)
- npm start (to run chat-server ) - `cd chat-server` then run `npm start`
The above commands must be against the root project folder (artbid-connect-backend)

---

In order to run the clien , navigate into the the folder `art-gallery-full` (root folder of the entire project) and run:
```sh
 npm run dev
```

## 7. Project Structure

---

```
.
└── art-gallery-full            # The project root folder
    └──  artbid-connect-backend # Project root folder for the backend   
    └── gallery                 # Contains most of the the backend code
        ├── migrations          # Contains database migrations
        ├── templates           # Django templates (html)
    └── artbidconnect           # Contains the backend project settings
    
    └── src     #Poject source folder for the frontend
            ├── actions     # All API calls to the server
            ├── assets      # Assets folder
            ├── components  # All react components are here
            ├── constants   # Global constants
            ├── features    # Redux slices
            ├── pages       # Pages
            ├── types       # Types and Interfaces
            └── utils       # Utility functions     

```
