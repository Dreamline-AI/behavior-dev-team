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




2. Install dependencies.
npm install
// or
yarn install
3. Run project on iOS / Android / web
 npm run ios // npm run android // npm run web
 // or
 yarn ios // yarn android


## Backend
The backend is in the `./mvp` directory and can be deployed locally with these commands:

```
cd mvp
docker build -t mvp:local .
docker run -p 8080:8080 -t mvp:local
```

Any change to files in ./mvp will need a `docker build`, because the Dockerfile compiles java to app.jar, copies that to the docker image. The docker image can be started/stopped to bring up a server.