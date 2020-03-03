FROM maven:3.5-jdk-8-alpine as build

WORKDIR /app

COPY . src

CMD cd src ; mvn spring-boot:run