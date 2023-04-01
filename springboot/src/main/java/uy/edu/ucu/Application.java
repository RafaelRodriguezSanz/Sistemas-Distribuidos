package uy.edu.ucu;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;

@SpringBootApplication
@ComponentScan(basePackages = "uy.edu.ucu.Controllers")
public class Application {
    public static void main(String[] args) {
        SpringApplication.run(Application.class, args);
    }
}