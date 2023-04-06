package uy.edu.ucu.Controllers;

import org.springframework.web.bind.annotation.RestController;

import uy.edu.ucu.DTO.Metric;
import uy.edu.ucu.Simulator.Simulator;

import org.springframework.web.bind.annotation.GetMapping;

@RestController
public class SensorController {

    private final Simulator simulator;

    public SensorController(Simulator simulator) {
        this.simulator = simulator;
    }

    @GetMapping("/sensor")
    public Metric hello() {
        return simulator.simulate();
    }
}