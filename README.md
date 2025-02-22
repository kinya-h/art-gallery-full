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
   2. [Event Creation](#42-event-creation)
   3. [Event Management](#43-event-management)
   4. [Invitations](#44-invitations)
5. [API Root](#5-api-root)
6. [Settings and Configurations](#6-settings-and-configurations)
7. [Project Structure](#7-project-structure)

---

## 1. Introduction

---

Here is a rough walk through the journey of conceptualizing, designing, and implementing an application that simplifies event planning and management

---

## 2. Project Overview

---

### 2.1 Project Goals

The aim was to develop a user-friendly and efficient Event Planning App that enables users to create, manage, and schedule events seamlessly. The key project goals include:

Streamlining event creation and management.
Ensuring user data security.
Sending invitations to other users.
Leveraging modern web technologies for a robust and responsive user interface.

### 2.2 Technologies Used

The Event Planning App was built using a combination of modern technologies:

- **Frontend (React + TypeScript):** The user interface is developed using React, a popular JavaScript library, and TypeScript, a statically typed superset of JavaScript. Redux Toolkit is utilized for state management.

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

The token expiry time span is set in `eventshub/eventfusion/settings`

```python


SIMPLE_JWT = {
'AUTH_HEADER_TYPES': ('JWT',),
   'REFRESH_TOKEN_LIFETIME': timedelta(days=60),
   'ACCESS_TOKEN_LIFETIME': timedelta(days=30),
}


```

### 4.2 Event Creation

A ModelViewSet is implemented that handles different CRUDE requests, also, a serializer is implemented that serializes and decerializes the incomming data

- **EventViewSet:**

```python
class EventViewSet(viewsets.ModelViewSet):
    queryset = Event.objects.all()

    def get_serializer_class(self):
        if self.request.method == 'POST':
            return EventCreateSerializer
        else:
            return DefaultEventSerializer

```

- **Serializer:**

Two serializers are used . one to deal with `GET` requests and the other for `POST` request

```python


class DefaultEventSerializer(serializers.ModelSerializer):


    organizer = serializers.SerializerMethodField()
    attendees = serializers.SerializerMethodField()
    collection = serializers.SerializerMethodField()

    class Meta:
        model = Event
        fields = '__all__'

    def get_organizer(self, obj):
        organizer = obj.organizer
        return {
            'id': organizer.id,
            'username': organizer.username,
            'email': organizer.email,
        }

    def get_collection(self,obj):
        # Serialize the category as a JSON object
        collection = obj.collection
        return {
            'id': collection.id,
            'name': collection.name,


        }

    def get_attendees(self, obj):
        # Serialize the attendees as a JSON array of objects
        attendees = obj.attendees.all()
        return [
            {
                'id': attendee.id,
                'username': attendee.username,
                'email': attendee.email,
                # Add more fields as needed
            }
            for attendee in attendees
        ]

class EventCreateSerializer(serializers.ModelSerializer):
    organizer = serializers.PrimaryKeyRelatedField(queryset=User.objects.all())
    collection = serializers.PrimaryKeyRelatedField(queryset=Collection.objects.all())
    class Meta:
        model = Event
        fields = '__all__'
    read_only_fields = ['attendees' , 'co_hosts']

```

### 4.3 Event Management

Users can manage their events within the app. One can also delete the event and or send invites
External events are also suported. ticketmaster API was used and one can view upcomming events and or send invites to other users via email

### 4.4 Invitations

Based on created events, a logged in user can send event invitations to other users. An email smtp server is also implemented that can send email based event invitations to other users. The email uses google oauth2

Invitation ViewSet

```python


class InvitationViewSet(viewsets.ModelViewSet):
    queryset = Invitation.objects.all()
    permission_classes = [IsAuthenticated] # can only see invitations if authenticated

    def get_serializer_class(self):
        if self.request.method == 'POST':
            return InvitationCreateSerializer
        else:
            return DefaultInvitationSerializer


    def update(self, request, *args, **kwargs):
        partial = kwargs.pop('partial', False)
        instance = self.get_object()

        # Ensure that only the 'accepted' field is updated
        if 'accepted' in request.data:
            instance.accepted = request.data['accepted']
            instance.save()

            # Serialize the updated instance using DefaultInvitationSerializer
            updated_serializer = DefaultInvitationSerializer(instance)

            # Return the updated object in the response
            return Response(updated_serializer.data, status=status.HTTP_200_OK)
        else:
            # If 'accepted' field is not provided in the request, return an error response
            return Response({'error': 'Accepted field is required for updating.'}, status=status.HTTP_400_BAD_REQUEST)

    @action(detail=False, methods=['GET'])
    def me(self, request):
        user = request.user
        invitations = Invitation.objects.filter(receiver=user)
        serializer = self.get_serializer(invitations, many=True)
        return Response(serializer.data)


```

Invitation Serializer

```python

class DefaultInvitationSerializer(serializers.ModelSerializer):
    sender = serializers.SerializerMethodField()
    receiver = serializers.SerializerMethodField()
    event = DefaultEventSerializer()
    class Meta:
        model = Invitation
        fields = '__all__'

    def get_sender(self , obj):
        sender = obj.sender
        return {
            'id': sender.id,
            'username': sender.username,
            'email': sender.email,
        }

    def get_receiver(self , obj):
        receiver = obj.receiver
        return {
            'id': receiver.id,
            'username': receiver.username,
            'email': receiver.email,
        }

    def to_representation(self, instance):

        # Serialize the Invitation object including the nested Event data
        representation = super().to_representation(instance)
        event_data = DefaultEventSerializer(instance.event).data
        representation['event'] = event_data
        return representation

class InvitationCreateSerializer(serializers.ModelSerializer):
    event = serializers.PrimaryKeyRelatedField(queryset=Event.objects.all())
    sender = serializers.PrimaryKeyRelatedField(queryset=User.objects.all())
    receiver = serializers.PrimaryKeyRelatedField(queryset=User.objects.all())
    class Meta:
        model = Invitation
        fields = '__all__'
        read_only_fields = ['accepted']

```

- Loook for the above code in `eventshub/event/views.py` and `eventshub/event/serializers.py`.
- For the client requests against these viewsets, look under `eventshub/frontend/client/actions`.

## 5. Api Root

Here is the api documentation for the different endpoints:

    "events (managing events)": "http://127.0.0.1:5000/api/events/",
    "invitations (managing invitations)": "http://127.0.0.1:5000/api/invitations/",
    "collections (managing event collections)": "http://127.0.0.1:5000/api/collections/",
    "users (getting users without necessarily having to have an admin role)": "http://127.0.0.1:5000/api/users/",
    "friends (managing friend requests)": "http://127.0.0.1:5000/api/friends/",
    "sending email invitations": "http://127.0.0.1:5000/api/send/"

## 6. Settings and Configurations

Different app configurations are set in `eventshub/eventfusion/settings`

To configure the email backend, username and password, edit

```python

EMAIL_BACKEND = 'django.core.mail.backends.smtp.EmailBackend'
EMAIL_HOST = 'smtp.gmail.com'
EMAIL_USE_TLS = True
EMAIL_PORT = 587
EMAIL_DEBUG = True
EMAIL_USE_SSL = False
EMAIL_HOST_USER = os.environ.get('MAIL_USERNAME')
EMAIL_HOST_PASSWORD = os.environ.get('MAIL_PASSWORD')


SCOPES = ['https://www.googleapis.com/auth/gmail.send']

GOOGLE_CLIENT_ID = os.environ.get('CLIENT_ID')
GOOGLE_CLIENT_SECRET = os.environ.get('CLIENT_SECRET')
GOOGLE_DISCOVERY_URL = (
    "https://accounts.google.com/.well-known/openid-configuration"
)
client = WebApplicationClient(GOOGLE_CLIENT_ID)
client.prepare_request_body(include_client_id=True)

```

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

<p style="color: orange;"> NB: Each time you change your database and run the above command you'll loose all your data eg events,invitations,users etc. To recover the data , search for a backup tool eg mysqldump to backup the data then repopulate the data into the new database</p>

Other necessary commands are:

- python3 manage.py createsuperuser (to create an admin)
- python3 manage.py changepassword (to reset the admin password)

The above commands must be against the root project folder (eventshub)

---

## 7. Project Structure

---

```
.
└── eventshub                   # The project root folder
    └── event                   # Contains most of the the backend code
        ├── migrations          # Contains database migrations
        ├── templates           # Django templates (html)
    └── eventsfusion            # Contains the backend project settings
    └── frontend
        └── client              # Project folder for the frontend
            └── src             # Project source folder for the frontend
                ├── actions     # All API calls to the server
                ├── assets      # Assets folder
                ├── components  # All react components are here
                ├── constants   # Global constants
                ├── features    # Redux slices
                ├── pages       # Pages
                ├── types       # Types and Interfaces
                └── utils       # Utility functions

```
