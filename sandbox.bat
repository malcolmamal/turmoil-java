@echo off

@javac C:\Users\fox\IdeaProjects\turmoil\src\main\java\info\nemhauser\turmoil\sandbox\Sandbox.java -classpath C:\Users\fox\IdeaProjects\turmoil\target\classes;C:\Users\fox\.m2\repository\org\springframework\boot\spring-boot-starter-actuator\2.2.6.RELEASE\spring-boot-starter-actuator-2.2.6.RELEASE.jar;C:\Users\fox\.m2\repository\org\springframework\boot\spring-boot-starter\2.2.6.RELEASE\spring-boot-starter-2.2.6.RELEASE.jar;C:\Users\fox\.m2\repository\org\springframework\boot\spring-boot-starter-logging\2.2.6.RELEASE\spring-boot-starter-logging-2.2.6.RELEASE.jar;C:\Users\fox\.m2\repository\ch\qos\logback\logback-classic\1.2.3\logback-classic-1.2.3.jar;C:\Users\fox\.m2\repository\ch\qos\logback\logback-core\1.2.3\logback-core-1.2.3.jar;C:\Users\fox\.m2\repository\org\apache\logging\log4j\log4j-to-slf4j\2.12.1\log4j-to-slf4j-2.12.1.jar;C:\Users\fox\.m2\repository\org\apache\logging\log4j\log4j-api\2.12.1\log4j-api-2.12.1.jar;C:\Users\fox\.m2\repository\org\slf4j\jul-to-slf4j\1.7.30\jul-to-slf4j-1.7.30.jar;C:\Users\fox\.m2\repository\jakarta\annotation\jakarta.annotation-api\1.3.5\jakarta.annotation-api-1.3.5.jar;C:\Users\fox\.m2\repository\org\yaml\snakeyaml\1.25\snakeyaml-1.25.jar;C:\Users\fox\.m2\repository\org\springframework\boot\spring-boot-actuator-autoconfigure\2.2.6.RELEASE\spring-boot-actuator-autoconfigure-2.2.6.RELEASE.jar;C:\Users\fox\.m2\repository\org\springframework\boot\spring-boot-actuator\2.2.6.RELEASE\spring-boot-actuator-2.2.6.RELEASE.jar;C:\Users\fox\.m2\repository\com\fasterxml\jackson\core\jackson-databind\2.10.3\jackson-databind-2.10.3.jar;C:\Users\fox\.m2\repository\com\fasterxml\jackson\core\jackson-core\2.10.3\jackson-core-2.10.3.jar;C:\Users\fox\.m2\repository\org\springframework\spring-context\5.2.5.RELEASE\spring-context-5.2.5.RELEASE.jar;C:\Users\fox\.m2\repository\com\fasterxml\jackson\datatype\jackson-datatype-jsr310\2.10.3\jackson-datatype-jsr310-2.10.3.jar;C:\Users\fox\.m2\repository\io\micrometer\micrometer-core\1.3.6\micrometer-core-1.3.6.jar;C:\Users\fox\.m2\repository\org\hdrhistogram\HdrHistogram\2.1.11\HdrHistogram-2.1.11.jar;C:\Users\fox\.m2\repository\org\latencyutils\LatencyUtils\2.0.3\LatencyUtils-2.0.3.jar;C:\Users\fox\.m2\repository\org\springframework\boot\spring-boot-starter-amqp\2.2.6.RELEASE\spring-boot-starter-amqp-2.2.6.RELEASE.jar;C:\Users\fox\.m2\repository\org\springframework\spring-messaging\5.2.5.RELEASE\spring-messaging-5.2.5.RELEASE.jar;C:\Users\fox\.m2\repository\org\springframework\spring-beans\5.2.5.RELEASE\spring-beans-5.2.5.RELEASE.jar;C:\Users\fox\.m2\repository\org\springframework\amqp\spring-rabbit\2.2.5.RELEASE\spring-rabbit-2.2.5.RELEASE.jar;C:\Users\fox\.m2\repository\com\rabbitmq\amqp-client\5.7.3\amqp-client-5.7.3.jar;C:\Users\fox\.m2\repository\org\springframework\amqp\spring-amqp\2.2.5.RELEASE\spring-amqp-2.2.5.RELEASE.jar;C:\Users\fox\.m2\repository\org\springframework\boot\spring-boot-starter-data-rest\2.2.6.RELEASE\spring-boot-starter-data-rest-2.2.6.RELEASE.jar;C:\Users\fox\.m2\repository\org\springframework\data\spring-data-rest-webmvc\3.2.6.RELEASE\spring-data-rest-webmvc-3.2.6.RELEASE.jar;C:\Users\fox\.m2\repository\org\springframework\data\spring-data-rest-core\3.2.6.RELEASE\spring-data-rest-core-3.2.6.RELEASE.jar;C:\Users\fox\.m2\repository\org\springframework\hateoas\spring-hateoas\1.0.4.RELEASE\spring-hateoas-1.0.4.RELEASE.jar;C:\Users\fox\.m2\repository\org\springframework\data\spring-data-commons\2.2.6.RELEASE\spring-data-commons-2.2.6.RELEASE.jar;C:\Users\fox\.m2\repository\org\springframework\plugin\spring-plugin-core\2.0.0.RELEASE\spring-plugin-core-2.0.0.RELEASE.jar;C:\Users\fox\.m2\repository\org\atteo\evo-inflector\1.2.2\evo-inflector-1.2.2.jar;C:\Users\fox\.m2\repository\com\fasterxml\jackson\core\jackson-annotations\2.10.3\jackson-annotations-2.10.3.jar;C:\Users\fox\.m2\repository\org\springframework\boot\spring-boot-starter-integration\2.2.6.RELEASE\spring-boot-starter-integration-2.2.6.RELEASE.jar;C:\Users\fox\.m2\repository\org\springframework\boot\spring-boot-starter-aop\2.2.6.RELEASE\spring-boot-starter-aop-2.2.6.RELEASE.jar;C:\Users\fox\.m2\repository\org\aspectj\aspectjweaver\1.9.5\aspectjweaver-1.9.5.jar;C:\Users\fox\.m2\repository\org\springframework\integration\spring-integration-core\5.2.5.RELEASE\spring-integration-core-5.2.5.RELEASE.jar;C:\Users\fox\.m2\repository\org\springframework\retry\spring-retry\1.2.5.RELEASE\spring-retry-1.2.5.RELEASE.jar;C:\Users\fox\.m2\repository\org\springframework\boot\spring-boot-starter-mail\2.2.6.RELEASE\spring-boot-starter-mail-2.2.6.RELEASE.jar;C:\Users\fox\.m2\repository\org\springframework\spring-context-support\5.2.5.RELEASE\spring-context-support-5.2.5.RELEASE.jar;C:\Users\fox\.m2\repository\com\sun\mail\jakarta.mail\1.6.5\jakarta.mail-1.6.5.jar;C:\Users\fox\.m2\repository\com\sun\activation\jakarta.activation\1.2.2\jakarta.activation-1.2.2.jar;C:\Users\fox\.m2\repository\org\springframework\boot\spring-boot-starter-quartz\2.2.6.RELEASE\spring-boot-starter-quartz-2.2.6.RELEASE.jar;C:\Users\fox\.m2\repository\org\springframework\spring-tx\5.2.5.RELEASE\spring-tx-5.2.5.RELEASE.jar;C:\Users\fox\.m2\repository\org\quartz-scheduler\quartz\2.3.2\quartz-2.3.2.jar;C:\Users\fox\.m2\repository\com\mchange\mchange-commons-java\0.2.15\mchange-commons-java-0.2.15.jar;C:\Users\fox\.m2\repository\org\springframework\boot\spring-boot-starter-security\2.2.6.RELEASE\spring-boot-starter-security-2.2.6.RELEASE.jar;C:\Users\fox\.m2\repository\org\springframework\spring-aop\5.2.5.RELEASE\spring-aop-5.2.5.RELEASE.jar;C:\Users\fox\.m2\repository\org\springframework\security\spring-security-config\5.2.2.RELEASE\spring-security-config-5.2.2.RELEASE.jar;C:\Users\fox\.m2\repository\org\springframework\security\spring-security-web\5.2.2.RELEASE\spring-security-web-5.2.2.RELEASE.jar;C:\Users\fox\.m2\repository\org\springframework\spring-expression\5.2.5.RELEASE\spring-expression-5.2.5.RELEASE.jar;C:\Users\fox\.m2\repository\org\springframework\boot\spring-boot-starter-thymeleaf\2.2.6.RELEASE\spring-boot-starter-thymeleaf-2.2.6.RELEASE.jar;C:\Users\fox\.m2\repository\org\thymeleaf\thymeleaf-spring5\3.0.11.RELEASE\thymeleaf-spring5-3.0.11.RELEASE.jar;C:\Users\fox\.m2\repository\org\thymeleaf\thymeleaf\3.0.11.RELEASE\thymeleaf-3.0.11.RELEASE.jar;C:\Users\fox\.m2\repository\org\attoparser\attoparser\2.0.5.RELEASE\attoparser-2.0.5.RELEASE.jar;C:\Users\fox\.m2\repository\org\unbescape\unbescape\1.1.6.RELEASE\unbescape-1.1.6.RELEASE.jar;C:\Users\fox\.m2\repository\org\thymeleaf\extras\thymeleaf-extras-java8time\3.0.4.RELEASE\thymeleaf-extras-java8time-3.0.4.RELEASE.jar;C:\Users\fox\.m2\repository\org\springframework\boot\spring-boot-starter-web\2.2.6.RELEASE\spring-boot-starter-web-2.2.6.RELEASE.jar;C:\Users\fox\.m2\repository\org\springframework\boot\spring-boot-starter-json\2.2.6.RELEASE\spring-boot-starter-json-2.2.6.RELEASE.jar;C:\Users\fox\.m2\repository\com\fasterxml\jackson\datatype\jackson-datatype-jdk8\2.10.3\jackson-datatype-jdk8-2.10.3.jar;C:\Users\fox\.m2\repository\com\fasterxml\jackson\module\jackson-module-parameter-names\2.10.3\jackson-module-parameter-names-2.10.3.jar;C:\Users\fox\.m2\repository\org\springframework\boot\spring-boot-starter-tomcat\2.2.6.RELEASE\spring-boot-starter-tomcat-2.2.6.RELEASE.jar;C:\Users\fox\.m2\repository\org\apache\tomcat\embed\tomcat-embed-core\9.0.33\tomcat-embed-core-9.0.33.jar;C:\Users\fox\.m2\repository\org\apache\tomcat\embed\tomcat-embed-el\9.0.33\tomcat-embed-el-9.0.33.jar;C:\Users\fox\.m2\repository\org\apache\tomcat\embed\tomcat-embed-websocket\9.0.33\tomcat-embed-websocket-9.0.33.jar;C:\Users\fox\.m2\repository\org\springframework\boot\spring-boot-starter-validation\2.2.6.RELEASE\spring-boot-starter-validation-2.2.6.RELEASE.jar;C:\Users\fox\.m2\repository\jakarta\validation\jakarta.validation-api\2.0.2\jakarta.validation-api-2.0.2.jar;C:\Users\fox\.m2\repository\org\hibernate\validator\hibernate-validator\6.0.18.Final\hibernate-validator-6.0.18.Final.jar;C:\Users\fox\.m2\repository\org\jboss\logging\jboss-logging\3.4.1.Final\jboss-logging-3.4.1.Final.jar;C:\Users\fox\.m2\repository\com\fasterxml\classmate\1.5.1\classmate-1.5.1.jar;C:\Users\fox\.m2\repository\org\springframework\spring-web\5.2.5.RELEASE\spring-web-5.2.5.RELEASE.jar;C:\Users\fox\.m2\repository\org\springframework\spring-webmvc\5.2.5.RELEASE\spring-webmvc-5.2.5.RELEASE.jar;C:\Users\fox\.m2\repository\org\springframework\boot\spring-boot-starter-webflux\2.2.6.RELEASE\spring-boot-starter-webflux-2.2.6.RELEASE.jar;C:\Users\fox\.m2\repository\org\springframework\boot\spring-boot-starter-reactor-netty\2.2.6.RELEASE\spring-boot-starter-reactor-netty-2.2.6.RELEASE.jar;C:\Users\fox\.m2\repository\io\projectreactor\netty\reactor-netty\0.9.6.RELEASE\reactor-netty-0.9.6.RELEASE.jar;C:\Users\fox\.m2\repository\io\netty\netty-codec-http\4.1.48.Final\netty-codec-http-4.1.48.Final.jar;C:\Users\fox\.m2\repository\io\netty\netty-common\4.1.48.Final\netty-common-4.1.48.Final.jar;C:\Users\fox\.m2\repository\io\netty\netty-buffer\4.1.48.Final\netty-buffer-4.1.48.Final.jar;C:\Users\fox\.m2\repository\io\netty\netty-transport\4.1.48.Final\netty-transport-4.1.48.Final.jar;C:\Users\fox\.m2\repository\io\netty\netty-codec\4.1.48.Final\netty-codec-4.1.48.Final.jar;C:\Users\fox\.m2\repository\io\netty\netty-codec-http2\4.1.48.Final\netty-codec-http2-4.1.48.Final.jar;C:\Users\fox\.m2\repository\io\netty\netty-handler\4.1.48.Final\netty-handler-4.1.48.Final.jar;C:\Users\fox\.m2\repository\io\netty\netty-resolver\4.1.48.Final\netty-resolver-4.1.48.Final.jar;C:\Users\fox\.m2\repository\io\netty\netty-handler-proxy\4.1.48.Final\netty-handler-proxy-4.1.48.Final.jar;C:\Users\fox\.m2\repository\io\netty\netty-codec-socks\4.1.48.Final\netty-codec-socks-4.1.48.Final.jar;C:\Users\fox\.m2\repository\io\netty\netty-transport-native-epoll\4.1.48.Final\netty-transport-native-epoll-4.1.48.Final-linux-x86_64.jar;C:\Users\fox\.m2\repository\io\netty\netty-transport-native-unix-common\4.1.48.Final\netty-transport-native-unix-common-4.1.48.Final.jar;C:\Users\fox\.m2\repository\org\glassfish\jakarta.el\3.0.3\jakarta.el-3.0.3.jar;C:\Users\fox\.m2\repository\org\springframework\spring-webflux\5.2.5.RELEASE\spring-webflux-5.2.5.RELEASE.jar;C:\Users\fox\.m2\repository\org\synchronoss\cloud\nio-multipart-parser\1.1.0\nio-multipart-parser-1.1.0.jar;C:\Users\fox\.m2\repository\org\synchronoss\cloud\nio-stream-storage\1.1.3\nio-stream-storage-1.1.3.jar;C:\Users\fox\.m2\repository\de\codecentric\spring-boot-admin-starter-client\2.2.1\spring-boot-admin-starter-client-2.2.1.jar;C:\Users\fox\.m2\repository\de\codecentric\spring-boot-admin-client\2.2.1\spring-boot-admin-client-2.2.1.jar;C:\Users\fox\.m2\repository\org\jolokia\jolokia-core\1.6.2\jolokia-core-1.6.2.jar;C:\Users\fox\.m2\repository\com\googlecode\json-simple\json-simple\1.1.1\json-simple-1.1.1.jar;C:\Users\fox\.m2\repository\de\codecentric\spring-boot-admin-starter-server\2.2.1\spring-boot-admin-starter-server-2.2.1.jar;C:\Users\fox\.m2\repository\de\codecentric\spring-boot-admin-server\2.2.1\spring-boot-admin-server-2.2.1.jar;C:\Users\fox\.m2\repository\io\projectreactor\addons\reactor-extra\3.3.3.RELEASE\reactor-extra-3.3.3.RELEASE.jar;C:\Users\fox\.m2\repository\de\codecentric\spring-boot-admin-server-ui\2.2.1\spring-boot-admin-server-ui-2.2.1.jar;C:\Users\fox\.m2\repository\de\codecentric\spring-boot-admin-server-cloud\2.2.1\spring-boot-admin-server-cloud-2.2.1.jar;C:\Users\fox\.m2\repository\org\springframework\data\spring-data-rest-hal-browser\3.2.6.RELEASE\spring-data-rest-hal-browser-3.2.6.RELEASE.jar;C:\Users\fox\.m2\repository\org\slf4j\slf4j-api\1.7.30\slf4j-api-1.7.30.jar;C:\Users\fox\.m2\repository\org\springframework\session\spring-session-core\2.2.2.RELEASE\spring-session-core-2.2.2.RELEASE.jar;C:\Users\fox\.m2\repository\org\springframework\spring-jcl\5.2.5.RELEASE\spring-jcl-5.2.5.RELEASE.jar;C:\Users\fox\.m2\repository\org\springframework\boot\spring-boot-devtools\2.2.6.RELEASE\spring-boot-devtools-2.2.6.RELEASE.jar;C:\Users\fox\.m2\repository\org\springframework\boot\spring-boot\2.2.6.RELEASE\spring-boot-2.2.6.RELEASE.jar;C:\Users\fox\.m2\repository\org\springframework\boot\spring-boot-autoconfigure\2.2.6.RELEASE\spring-boot-autoconfigure-2.2.6.RELEASE.jar;C:\Users\fox\.m2\repository\mysql\mysql-connector-java\8.0.19\mysql-connector-java-8.0.19.jar;C:\Users\fox\.m2\repository\org\springframework\boot\spring-boot-configuration-processor\2.2.6.RELEASE\spring-boot-configuration-processor-2.2.6.RELEASE.jar;C:\Users\fox\.m2\repository\org\projectlombok\lombok\1.18.12\lombok-1.18.12.jar;C:\Users\fox\.m2\repository\com\jayway\jsonpath\json-path\2.4.0\json-path-2.4.0.jar;C:\Users\fox\.m2\repository\net\minidev\json-smart\2.3\json-smart-2.3.jar;C:\Users\fox\.m2\repository\net\minidev\accessors-smart\1.2\accessors-smart-1.2.jar;C:\Users\fox\.m2\repository\org\ow2\asm\asm\5.0.4\asm-5.0.4.jar;C:\Users\fox\.m2\repository\org\springframework\spring-core\5.2.5.RELEASE\spring-core-5.2.5.RELEASE.jar;C:\Users\fox\.m2\repository\io\projectreactor\reactor-core\3.3.4.RELEASE\reactor-core-3.3.4.RELEASE.jar;C:\Users\fox\.m2\repository\org\reactivestreams\reactive-streams\1.0.3\reactive-streams-1.0.3.jar;C:\Users\fox\.m2\repository\org\springframework\security\spring-security-core\5.2.2.RELEASE\spring-security-core-5.2.2.RELEASE.jar;C:\Users\fox\IdeaProjects\turmoil\lib\jgrapht-core-1.4.0.jar;C:\Users\fox\IdeaProjects\turmoil\lib\jheaps-0.11.jar;C:\Users\fox\IdeaProjects\turmoil\lib\groovy-3.0.3.jar -Xlint:unchecked 2>NUL
@mv C:\Users\fox\IdeaProjects\turmoil\src\main\java\info\nemhauser\turmoil\sandbox\Sandbox.class C:\Users\fox\IdeaProjects\turmoil\target\classes\info\nemhauser\turmoil\sandbox
@"C:\Program Files\Java\jdk-14.0.1\bin\java.exe" "-javaagent:C:\Program Files\JetBrains\IntelliJ IDEA 2020.1\lib\idea_rt.jar=5886:C:\Program Files\JetBrains\IntelliJ IDEA 2020.1\bin" -Dfile.encoding=UTF-8 -classpath C:\Users\fox\IdeaProjects\turmoil\target\classes;C:\Users\fox\.m2\repository\org\springframework\boot\spring-boot-starter-actuator\2.2.6.RELEASE\spring-boot-starter-actuator-2.2.6.RELEASE.jar;C:\Users\fox\.m2\repository\org\springframework\boot\spring-boot-starter\2.2.6.RELEASE\spring-boot-starter-2.2.6.RELEASE.jar;C:\Users\fox\.m2\repository\org\springframework\boot\spring-boot-starter-logging\2.2.6.RELEASE\spring-boot-starter-logging-2.2.6.RELEASE.jar;C:\Users\fox\.m2\repository\ch\qos\logback\logback-classic\1.2.3\logback-classic-1.2.3.jar;C:\Users\fox\.m2\repository\ch\qos\logback\logback-core\1.2.3\logback-core-1.2.3.jar;C:\Users\fox\.m2\repository\org\apache\logging\log4j\log4j-to-slf4j\2.12.1\log4j-to-slf4j-2.12.1.jar;C:\Users\fox\.m2\repository\org\apache\logging\log4j\log4j-api\2.12.1\log4j-api-2.12.1.jar;C:\Users\fox\.m2\repository\org\slf4j\jul-to-slf4j\1.7.30\jul-to-slf4j-1.7.30.jar;C:\Users\fox\.m2\repository\jakarta\annotation\jakarta.annotation-api\1.3.5\jakarta.annotation-api-1.3.5.jar;C:\Users\fox\.m2\repository\org\yaml\snakeyaml\1.25\snakeyaml-1.25.jar;C:\Users\fox\.m2\repository\org\springframework\boot\spring-boot-actuator-autoconfigure\2.2.6.RELEASE\spring-boot-actuator-autoconfigure-2.2.6.RELEASE.jar;C:\Users\fox\.m2\repository\org\springframework\boot\spring-boot-actuator\2.2.6.RELEASE\spring-boot-actuator-2.2.6.RELEASE.jar;C:\Users\fox\.m2\repository\com\fasterxml\jackson\core\jackson-databind\2.10.3\jackson-databind-2.10.3.jar;C:\Users\fox\.m2\repository\com\fasterxml\jackson\core\jackson-core\2.10.3\jackson-core-2.10.3.jar;C:\Users\fox\.m2\repository\org\springframework\spring-context\5.2.5.RELEASE\spring-context-5.2.5.RELEASE.jar;C:\Users\fox\.m2\repository\com\fasterxml\jackson\datatype\jackson-datatype-jsr310\2.10.3\jackson-datatype-jsr310-2.10.3.jar;C:\Users\fox\.m2\repository\io\micrometer\micrometer-core\1.3.6\micrometer-core-1.3.6.jar;C:\Users\fox\.m2\repository\org\hdrhistogram\HdrHistogram\2.1.11\HdrHistogram-2.1.11.jar;C:\Users\fox\.m2\repository\org\latencyutils\LatencyUtils\2.0.3\LatencyUtils-2.0.3.jar;C:\Users\fox\.m2\repository\org\springframework\boot\spring-boot-starter-amqp\2.2.6.RELEASE\spring-boot-starter-amqp-2.2.6.RELEASE.jar;C:\Users\fox\.m2\repository\org\springframework\spring-messaging\5.2.5.RELEASE\spring-messaging-5.2.5.RELEASE.jar;C:\Users\fox\.m2\repository\org\springframework\spring-beans\5.2.5.RELEASE\spring-beans-5.2.5.RELEASE.jar;C:\Users\fox\.m2\repository\org\springframework\amqp\spring-rabbit\2.2.5.RELEASE\spring-rabbit-2.2.5.RELEASE.jar;C:\Users\fox\.m2\repository\com\rabbitmq\amqp-client\5.7.3\amqp-client-5.7.3.jar;C:\Users\fox\.m2\repository\org\springframework\amqp\spring-amqp\2.2.5.RELEASE\spring-amqp-2.2.5.RELEASE.jar;C:\Users\fox\.m2\repository\org\springframework\boot\spring-boot-starter-data-rest\2.2.6.RELEASE\spring-boot-starter-data-rest-2.2.6.RELEASE.jar;C:\Users\fox\.m2\repository\org\springframework\data\spring-data-rest-webmvc\3.2.6.RELEASE\spring-data-rest-webmvc-3.2.6.RELEASE.jar;C:\Users\fox\.m2\repository\org\springframework\data\spring-data-rest-core\3.2.6.RELEASE\spring-data-rest-core-3.2.6.RELEASE.jar;C:\Users\fox\.m2\repository\org\springframework\hateoas\spring-hateoas\1.0.4.RELEASE\spring-hateoas-1.0.4.RELEASE.jar;C:\Users\fox\.m2\repository\org\springframework\data\spring-data-commons\2.2.6.RELEASE\spring-data-commons-2.2.6.RELEASE.jar;C:\Users\fox\.m2\repository\org\springframework\plugin\spring-plugin-core\2.0.0.RELEASE\spring-plugin-core-2.0.0.RELEASE.jar;C:\Users\fox\.m2\repository\org\atteo\evo-inflector\1.2.2\evo-inflector-1.2.2.jar;C:\Users\fox\.m2\repository\com\fasterxml\jackson\core\jackson-annotations\2.10.3\jackson-annotations-2.10.3.jar;C:\Users\fox\.m2\repository\org\springframework\boot\spring-boot-starter-integration\2.2.6.RELEASE\spring-boot-starter-integration-2.2.6.RELEASE.jar;C:\Users\fox\.m2\repository\org\springframework\boot\spring-boot-starter-aop\2.2.6.RELEASE\spring-boot-starter-aop-2.2.6.RELEASE.jar;C:\Users\fox\.m2\repository\org\aspectj\aspectjweaver\1.9.5\aspectjweaver-1.9.5.jar;C:\Users\fox\.m2\repository\org\springframework\integration\spring-integration-core\5.2.5.RELEASE\spring-integration-core-5.2.5.RELEASE.jar;C:\Users\fox\.m2\repository\org\springframework\retry\spring-retry\1.2.5.RELEASE\spring-retry-1.2.5.RELEASE.jar;C:\Users\fox\.m2\repository\org\springframework\boot\spring-boot-starter-mail\2.2.6.RELEASE\spring-boot-starter-mail-2.2.6.RELEASE.jar;C:\Users\fox\.m2\repository\org\springframework\spring-context-support\5.2.5.RELEASE\spring-context-support-5.2.5.RELEASE.jar;C:\Users\fox\.m2\repository\com\sun\mail\jakarta.mail\1.6.5\jakarta.mail-1.6.5.jar;C:\Users\fox\.m2\repository\com\sun\activation\jakarta.activation\1.2.2\jakarta.activation-1.2.2.jar;C:\Users\fox\.m2\repository\org\springframework\boot\spring-boot-starter-quartz\2.2.6.RELEASE\spring-boot-starter-quartz-2.2.6.RELEASE.jar;C:\Users\fox\.m2\repository\org\springframework\spring-tx\5.2.5.RELEASE\spring-tx-5.2.5.RELEASE.jar;C:\Users\fox\.m2\repository\org\quartz-scheduler\quartz\2.3.2\quartz-2.3.2.jar;C:\Users\fox\.m2\repository\com\mchange\mchange-commons-java\0.2.15\mchange-commons-java-0.2.15.jar;C:\Users\fox\.m2\repository\org\springframework\boot\spring-boot-starter-security\2.2.6.RELEASE\spring-boot-starter-security-2.2.6.RELEASE.jar;C:\Users\fox\.m2\repository\org\springframework\spring-aop\5.2.5.RELEASE\spring-aop-5.2.5.RELEASE.jar;C:\Users\fox\.m2\repository\org\springframework\security\spring-security-config\5.2.2.RELEASE\spring-security-config-5.2.2.RELEASE.jar;C:\Users\fox\.m2\repository\org\springframework\security\spring-security-web\5.2.2.RELEASE\spring-security-web-5.2.2.RELEASE.jar;C:\Users\fox\.m2\repository\org\springframework\spring-expression\5.2.5.RELEASE\spring-expression-5.2.5.RELEASE.jar;C:\Users\fox\.m2\repository\org\springframework\boot\spring-boot-starter-thymeleaf\2.2.6.RELEASE\spring-boot-starter-thymeleaf-2.2.6.RELEASE.jar;C:\Users\fox\.m2\repository\org\thymeleaf\thymeleaf-spring5\3.0.11.RELEASE\thymeleaf-spring5-3.0.11.RELEASE.jar;C:\Users\fox\.m2\repository\org\thymeleaf\thymeleaf\3.0.11.RELEASE\thymeleaf-3.0.11.RELEASE.jar;C:\Users\fox\.m2\repository\org\attoparser\attoparser\2.0.5.RELEASE\attoparser-2.0.5.RELEASE.jar;C:\Users\fox\.m2\repository\org\unbescape\unbescape\1.1.6.RELEASE\unbescape-1.1.6.RELEASE.jar;C:\Users\fox\.m2\repository\org\thymeleaf\extras\thymeleaf-extras-java8time\3.0.4.RELEASE\thymeleaf-extras-java8time-3.0.4.RELEASE.jar;C:\Users\fox\.m2\repository\org\springframework\boot\spring-boot-starter-web\2.2.6.RELEASE\spring-boot-starter-web-2.2.6.RELEASE.jar;C:\Users\fox\.m2\repository\org\springframework\boot\spring-boot-starter-json\2.2.6.RELEASE\spring-boot-starter-json-2.2.6.RELEASE.jar;C:\Users\fox\.m2\repository\com\fasterxml\jackson\datatype\jackson-datatype-jdk8\2.10.3\jackson-datatype-jdk8-2.10.3.jar;C:\Users\fox\.m2\repository\com\fasterxml\jackson\module\jackson-module-parameter-names\2.10.3\jackson-module-parameter-names-2.10.3.jar;C:\Users\fox\.m2\repository\org\springframework\boot\spring-boot-starter-tomcat\2.2.6.RELEASE\spring-boot-starter-tomcat-2.2.6.RELEASE.jar;C:\Users\fox\.m2\repository\org\apache\tomcat\embed\tomcat-embed-core\9.0.33\tomcat-embed-core-9.0.33.jar;C:\Users\fox\.m2\repository\org\apache\tomcat\embed\tomcat-embed-el\9.0.33\tomcat-embed-el-9.0.33.jar;C:\Users\fox\.m2\repository\org\apache\tomcat\embed\tomcat-embed-websocket\9.0.33\tomcat-embed-websocket-9.0.33.jar;C:\Users\fox\.m2\repository\org\springframework\boot\spring-boot-starter-validation\2.2.6.RELEASE\spring-boot-starter-validation-2.2.6.RELEASE.jar;C:\Users\fox\.m2\repository\jakarta\validation\jakarta.validation-api\2.0.2\jakarta.validation-api-2.0.2.jar;C:\Users\fox\.m2\repository\org\hibernate\validator\hibernate-validator\6.0.18.Final\hibernate-validator-6.0.18.Final.jar;C:\Users\fox\.m2\repository\org\jboss\logging\jboss-logging\3.4.1.Final\jboss-logging-3.4.1.Final.jar;C:\Users\fox\.m2\repository\com\fasterxml\classmate\1.5.1\classmate-1.5.1.jar;C:\Users\fox\.m2\repository\org\springframework\spring-web\5.2.5.RELEASE\spring-web-5.2.5.RELEASE.jar;C:\Users\fox\.m2\repository\org\springframework\spring-webmvc\5.2.5.RELEASE\spring-webmvc-5.2.5.RELEASE.jar;C:\Users\fox\.m2\repository\org\springframework\boot\spring-boot-starter-webflux\2.2.6.RELEASE\spring-boot-starter-webflux-2.2.6.RELEASE.jar;C:\Users\fox\.m2\repository\org\springframework\boot\spring-boot-starter-reactor-netty\2.2.6.RELEASE\spring-boot-starter-reactor-netty-2.2.6.RELEASE.jar;C:\Users\fox\.m2\repository\io\projectreactor\netty\reactor-netty\0.9.6.RELEASE\reactor-netty-0.9.6.RELEASE.jar;C:\Users\fox\.m2\repository\io\netty\netty-codec-http\4.1.48.Final\netty-codec-http-4.1.48.Final.jar;C:\Users\fox\.m2\repository\io\netty\netty-common\4.1.48.Final\netty-common-4.1.48.Final.jar;C:\Users\fox\.m2\repository\io\netty\netty-buffer\4.1.48.Final\netty-buffer-4.1.48.Final.jar;C:\Users\fox\.m2\repository\io\netty\netty-transport\4.1.48.Final\netty-transport-4.1.48.Final.jar;C:\Users\fox\.m2\repository\io\netty\netty-codec\4.1.48.Final\netty-codec-4.1.48.Final.jar;C:\Users\fox\.m2\repository\io\netty\netty-codec-http2\4.1.48.Final\netty-codec-http2-4.1.48.Final.jar;C:\Users\fox\.m2\repository\io\netty\netty-handler\4.1.48.Final\netty-handler-4.1.48.Final.jar;C:\Users\fox\.m2\repository\io\netty\netty-resolver\4.1.48.Final\netty-resolver-4.1.48.Final.jar;C:\Users\fox\.m2\repository\io\netty\netty-handler-proxy\4.1.48.Final\netty-handler-proxy-4.1.48.Final.jar;C:\Users\fox\.m2\repository\io\netty\netty-codec-socks\4.1.48.Final\netty-codec-socks-4.1.48.Final.jar;C:\Users\fox\.m2\repository\io\netty\netty-transport-native-epoll\4.1.48.Final\netty-transport-native-epoll-4.1.48.Final-linux-x86_64.jar;C:\Users\fox\.m2\repository\io\netty\netty-transport-native-unix-common\4.1.48.Final\netty-transport-native-unix-common-4.1.48.Final.jar;C:\Users\fox\.m2\repository\org\glassfish\jakarta.el\3.0.3\jakarta.el-3.0.3.jar;C:\Users\fox\.m2\repository\org\springframework\spring-webflux\5.2.5.RELEASE\spring-webflux-5.2.5.RELEASE.jar;C:\Users\fox\.m2\repository\org\synchronoss\cloud\nio-multipart-parser\1.1.0\nio-multipart-parser-1.1.0.jar;C:\Users\fox\.m2\repository\org\synchronoss\cloud\nio-stream-storage\1.1.3\nio-stream-storage-1.1.3.jar;C:\Users\fox\.m2\repository\de\codecentric\spring-boot-admin-starter-client\2.2.1\spring-boot-admin-starter-client-2.2.1.jar;C:\Users\fox\.m2\repository\de\codecentric\spring-boot-admin-client\2.2.1\spring-boot-admin-client-2.2.1.jar;C:\Users\fox\.m2\repository\org\jolokia\jolokia-core\1.6.2\jolokia-core-1.6.2.jar;C:\Users\fox\.m2\repository\com\googlecode\json-simple\json-simple\1.1.1\json-simple-1.1.1.jar;C:\Users\fox\.m2\repository\de\codecentric\spring-boot-admin-starter-server\2.2.1\spring-boot-admin-starter-server-2.2.1.jar;C:\Users\fox\.m2\repository\de\codecentric\spring-boot-admin-server\2.2.1\spring-boot-admin-server-2.2.1.jar;C:\Users\fox\.m2\repository\io\projectreactor\addons\reactor-extra\3.3.3.RELEASE\reactor-extra-3.3.3.RELEASE.jar;C:\Users\fox\.m2\repository\de\codecentric\spring-boot-admin-server-ui\2.2.1\spring-boot-admin-server-ui-2.2.1.jar;C:\Users\fox\.m2\repository\de\codecentric\spring-boot-admin-server-cloud\2.2.1\spring-boot-admin-server-cloud-2.2.1.jar;C:\Users\fox\.m2\repository\org\springframework\data\spring-data-rest-hal-browser\3.2.6.RELEASE\spring-data-rest-hal-browser-3.2.6.RELEASE.jar;C:\Users\fox\.m2\repository\org\slf4j\slf4j-api\1.7.30\slf4j-api-1.7.30.jar;C:\Users\fox\.m2\repository\org\springframework\session\spring-session-core\2.2.2.RELEASE\spring-session-core-2.2.2.RELEASE.jar;C:\Users\fox\.m2\repository\org\springframework\spring-jcl\5.2.5.RELEASE\spring-jcl-5.2.5.RELEASE.jar;C:\Users\fox\.m2\repository\org\springframework\boot\spring-boot-devtools\2.2.6.RELEASE\spring-boot-devtools-2.2.6.RELEASE.jar;C:\Users\fox\.m2\repository\org\springframework\boot\spring-boot\2.2.6.RELEASE\spring-boot-2.2.6.RELEASE.jar;C:\Users\fox\.m2\repository\org\springframework\boot\spring-boot-autoconfigure\2.2.6.RELEASE\spring-boot-autoconfigure-2.2.6.RELEASE.jar;C:\Users\fox\.m2\repository\mysql\mysql-connector-java\8.0.19\mysql-connector-java-8.0.19.jar;C:\Users\fox\.m2\repository\org\springframework\boot\spring-boot-configuration-processor\2.2.6.RELEASE\spring-boot-configuration-processor-2.2.6.RELEASE.jar;C:\Users\fox\.m2\repository\org\projectlombok\lombok\1.18.12\lombok-1.18.12.jar;C:\Users\fox\.m2\repository\com\jayway\jsonpath\json-path\2.4.0\json-path-2.4.0.jar;C:\Users\fox\.m2\repository\net\minidev\json-smart\2.3\json-smart-2.3.jar;C:\Users\fox\.m2\repository\net\minidev\accessors-smart\1.2\accessors-smart-1.2.jar;C:\Users\fox\.m2\repository\org\ow2\asm\asm\5.0.4\asm-5.0.4.jar;C:\Users\fox\.m2\repository\org\springframework\spring-core\5.2.5.RELEASE\spring-core-5.2.5.RELEASE.jar;C:\Users\fox\.m2\repository\io\projectreactor\reactor-core\3.3.4.RELEASE\reactor-core-3.3.4.RELEASE.jar;C:\Users\fox\.m2\repository\org\reactivestreams\reactive-streams\1.0.3\reactive-streams-1.0.3.jar;C:\Users\fox\.m2\repository\org\springframework\security\spring-security-core\5.2.2.RELEASE\spring-security-core-5.2.2.RELEASE.jar;C:\Users\fox\IdeaProjects\turmoil\lib\jgrapht-core-1.4.0.jar;C:\Users\fox\IdeaProjects\turmoil\lib\jheaps-0.11.jar;C:\Users\fox\IdeaProjects\turmoil\lib\groovy-3.0.3.jar info.nemhauser.turmoil.sandbox.Sandbox