package uy.edu.ucu.Controllers;

import org.springframework.web.bind.annotation.RestController;

import uy.edu.ucu.Client.InfluxdbClient;
import uy.edu.ucu.DTO.Metric;
import uy.edu.ucu.Simulator.Simulator;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.web.bind.annotation.GetMapping;

@RestController
@EnableScheduling
public class SensorController {

    private final Simulator simulator;
    private final InfluxdbClient client;
    @Value("${cron.expression}")
    private String cronExpression;

    public SensorController(Simulator simulator, InfluxdbClient client) {
        this.simulator = simulator;
        this.client = client;
    }

    @GetMapping("/sensor")
    @Scheduled(cron = "${cron.expression}")
    public Metric simulate() {
        Metric metric = simulator.simulate();
        // client.write(metric);
        return metric;
    }

    @GetMapping("/simulate-drought")
    public ResponseEntity<String> simulateDrought() {
        simulator.setMAX_JITTER_HUM(0.632f);
        simulator.setMIN_JITTER_TEMP(-0.632f);
        return ResponseEntity.accepted().body("204 - Accepted");
    }

}