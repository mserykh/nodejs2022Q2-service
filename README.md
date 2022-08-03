# Home Library Service

Home Library Service is REST API offering Create, Read, Update, and Delete (CRUD) handlers.

## Prerequisites

- Git - [Download & Install Git](https://git-scm.com/downloads).
- Node.js - [Download & Install Node.js](https://nodejs.org/en/download/) and the npm package manager.
- Docker - [Download & Install Docker](https://www.docker.com/get-started/).

## Installation

- Clone this repository

```
git clone {repository}
```

- Go to `nodejs2022Q2-service`

```
cd nodejs2022Q2-service
```

- Install all dependencies

```
npm install
```

- Start application in production mode

```
npm run start:prod
```

- After starting the app on port (4000 as default) you can open
  in your browser OpenAPI documentation by typing http://localhost:4000/doc/.

### Run App with Docker

```
docker-compose up
```

### Download Docker Images

[See on Docker hub](https://hub.docker.com/repository/docker/marieserykh/nodejs2022q2_service)

```
docker pull marieserykh/nodejs2022q2_service:app
```

```
docker pull marieserykh/nodejs2022q2_service:postgres
```


### Vulnarability scanning

```
npm run scan:app
```

```
npm run scan:db
```


## Usage

### Routing

Collections are: `user`, `album`, `artist`, `track`, `favs`

- `GET` `/{collection}`: Returns all resources of this collestion

- `POST` `/{collection}`: Creates a resource of the collection, then returns with ID

- `POST` `/favs/album/:id`: Adds an album to favourites
- `POST` `/favs/artist/:id`: Adds an artist to favourites
- `POST` `/favs/track/:id`: Adds a track to favourites

- `PUT` `/{collection}/:id`: Updates the resource of the collection with that ID

- `DELETE` `/{collection}/:id`: Deletes the resource of the collection with that ID

- `DELETE` `/favs/album/:id`: Deletes the album from favourites
- `DELETE` `/favs/artist/:id`: Deletes the artist from favourites
- `DELETE` `/favs/track/:id`: Deletes the track from favourites

### HTTP status codes

- `201` when creating
- `200`  when getting and updating
- `204` when deleting
- `400` when trying to get a non-existant resource (id)
- `400` when providing invalid id (not uuid) or invalid request body
- `403` when providing incorrect old password
- `404` if either the collection of data you are POSTing to (e.g. genre in the URLs) is unknown or you are trying to get a non-existant resource (id)
- `422` when providing a reference in request body to a non-existant resource

## Testing

After application running open new terminal and enter:

- to run all tests without authorization

```
npm run test
```

- to run only one of all test suites

```
npm run test -- <path to suite>
```
