FROM openjdk:14
ARG JAR_FILE=target/*.jar
COPY ${JAR_FILE} app.jar
ADD properties properties
EXPOSE 8080
ENTRYPOINT ["java","-jar","/app.jar"]