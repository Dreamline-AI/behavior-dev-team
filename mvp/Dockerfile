# Use a base image with Java and Maven installed
FROM maven:3.8.4-openjdk-17 AS build

# Set the working directory in the container
WORKDIR /app

# Copy the pom.xml file
COPY pom.xml .

# Download the project dependencies
RUN mvn dependency:go-offline

# Copy the rest of the application source code
COPY src src

# Build the application
RUN mvn package -DskipTests

# Use a base image with Java runtime
FROM openjdk:17-jdk-slim

# Set the working directory in the container
WORKDIR /app

# Copy the built JAR file from the previous stage
COPY --from=build /app/target/*.jar app.jar

# Create a directory for the Firebase credentials
RUN mkdir -p /app/config

# Copy the Google application credentials file to the config directory
COPY src/main/resources/serviceAccountKey.json /app/config/

# Set the environment variable for Google application credentials
ENV GOOGLE_APPLICATION_CREDENTIALS=/app/config/serviceAccountKey.json

# Expose the port on which the server will run
EXPOSE 8080

# Start the server
CMD ["java", "-jar", "app.jar"]