# --- Compilación ---
FROM maven:3.9-eclipse-temurin-21 AS build
WORKDIR /src
COPY pom.xml .
RUN mvn -q -B dependency:go-offline
COPY src ./src
RUN mvn -q -B clean package -DskipTests

# --- Ejecución ---
FROM eclipse-temurin:21-jre
WORKDIR /app

ARG SERVER_PORT=8081
ENV SPRING_PROFILES_ACTIVE=prod SERVER_PORT=${SERVER_PORT}
EXPOSE ${SERVER_PORT}

COPY --from=build /src/target/sonidovivo-0.0.1-SNAPSHOT.jar app.jar
ENTRYPOINT ["java", "-Xmx512m", "-jar", "app.jar"]
