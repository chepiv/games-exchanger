FROM maven:3.5-jdk-8-alpine as build

WORKDIR /app

COPY . src

#ENV JAVA_TOOL_OPTIONS -agentlib:jdwp=transport=dt_socket,address=5850,server=y,suspend=n
#CMD cd src ; mvn spring-boot:run
CMD cd src ; mvn spring-boot:run -Dspring-boot.run.jvmArguments="-Xdebug -Xrunjdwp:transport=dt_socket,server=y,suspend=n,address=5850"
