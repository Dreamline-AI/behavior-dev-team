# behavior-dev-team

## Frontend
Standard is to use `yarn`. Avoid `npm`, unless compelling use-case.
The frontend is in `./frontend` directory. To run development:

```
cd ./frontend
yarn install
yarn web
```

### iOS
```yarn ios```

### Android
```yarn android```

You will need to run backend for your frontend to communicate with. See below for Backend Deployment


## Backend
### Backend Deployment
The backend is in the `./mvp` directory and can be deployed locally with these commands:

```
cd mvp
docker build -t mvp:local .
docker run -p 8080:8080 -t mvp:local
```

Any change to files in ./mvp will need a `docker build`, because the Dockerfile compiles java to app.jar, copies that to the docker image. The docker image can be started/stopped to bring up a server.

If this configuraton, your backend api is available at `http://localhost:8080/api` and it communicates with the `sustainability-dev` firebase project


### Backend Development
If you are developing backend you can ignore docker. Just be aware that Dockerfile is how your the backend will be built and deployed. Each commit to `main` branch will produce a new docker image artifact.

Also, if you are developing backend, you need set environment variable ```GOOGLE_APPLICATION_CREDENTIALS=/path/to/serviceAccount.json```

