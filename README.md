# behavior-dev-team

[![MVP Docker Image Build and Publish](https://github.com/Dreamline-AI/behavior-dev-team/actions/workflows/docker-build.yml/badge.svg)](https://github.com/Dreamline-AI/behavior-dev-team/actions/workflows/docker-build.yml)

Read [Contributing Guide](CONTRIBUTING.md) before contributing to this project

## Setup

### Frontend

The standard is to use `yarn`. DO NOT USE `npm`, unless compelling use-case.
The frontend is in the `./frontend` directory. To run development:

```cmd
cd ./frontend
yarn install
yarn web
```

You can also ```yarn ios``` or ```yarn android```. 

Next, you will need to run the backend for your front end to communicate. See below for Backend Deployment

### Backend

First you need a Google Cloud Service Account Key json file at this path `./src/main/resources/serviceAccountKey.json`

The backend is in the `./mvp` directory and can be deployed locally with these commands:

```cmd
cd mvp
docker build -t mvp:local .
docker run -p 8080:8080 -t mvp:local
```

Any change to files in ./mvp will need a `docker build`, because the Dockerfile compiles java to app.jar, and copies that to the docker image. The docker image can be started/stopped to bring up a server.

With this configuration, your backend API is available at `http://localhost:8080/api` and it communicates with the `sustainability-dev` firebase project

### Backend Development

If you are developing the backend you can ignore docker. Remember that Dockerfile is how your backend will be built and deployed. Each commit to the `main` branch will produce a new docker image artifact. You can request for the service account key from the team lead.

Also, if you are developing the backend, you need to set the environment variable ```GOOGLE_APPLICATION_CREDENTIALS=/path/to/serviceAccount.json```

## LICENSE

This project does not have a License, it is proprietary and not open for public use, modification, or distribution.
