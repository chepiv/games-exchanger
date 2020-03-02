#### Stage 1: Build the application
FROM maven:3.5-jdk-8-alpine as build

# Set the current working directory inside the image
WORKDIR /app
ARG M2=${HOME}
ENV M2=${M2}


# Build all the dependencies in preparation to go offline.
# This is a separate step so the dependencies will be cached unless
# the pom.xml file has changed.
#RUN ./mvnw dependency:go-offline -B
#VOLUME $HOME/.m2/repository/
#RUN --mount=target=/var/lib/apt/lists,type=cache

# Copy the project source
COPY . src
COPY ${M2}/.m2/repository /root/.m2/repository

# Package the application
#RUN mvn package -DskipTests
#RUN mkdir -p target/dependency && (cd target/dependency; jar -xf ../*.jar)
#ENV JAVA_TOOL_OPTIONS -agentlib:jdwp=transport=dt_socket,address=8000,server=y,suspend=n

#CMD cd src ; mvn spring-boot:run
CMD echo $M2;