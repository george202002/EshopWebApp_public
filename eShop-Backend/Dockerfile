# Use an official OpenJDK runtime as a parent image
FROM openjdk:22-jdk-slim

# Set the working directory inside the container
WORKDIR /app

# Copy the Maven wrapper and the Maven settings
COPY mvnw .
COPY .mvn .mvn

# Copy the pom.xml file and the source code
COPY pom.xml .
COPY src src

# Build the application
RUN ./mvnw install -DskipTests

# Expose port 8080
EXPOSE 8080

# Run the application
CMD ["java", "-jar", "target/eShop-Backend-0.0.1-SNAPSHOT.jar"]
