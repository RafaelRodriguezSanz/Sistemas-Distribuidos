package uy.edu.ucu;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.scheduling.annotation.EnableScheduling;

@SpringBootApplication
@ComponentScan(basePackages = "uy.edu.ucu")
public class Application {
    public static void main(String[] args) {
        SpringApplication.run(Application.class, args);
    }
}