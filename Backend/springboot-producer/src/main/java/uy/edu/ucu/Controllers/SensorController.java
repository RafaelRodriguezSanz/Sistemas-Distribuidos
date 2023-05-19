package uy.edu.ucu.Controllers;

import org.springframework.web.bind.annotation.RestController;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;

import lombok.AllArgsConstructor;
import uy.edu.ucu.Simulator.Simulator;
import uy.edu.ucu.Config.RandomCoordinates;
import uy.edu.ucu.DTO.Metric;

import java.util.UUID;

import javax.annotation.PostConstruct;

import org.eclipse.paho.client.mqttv3.MqttClient;
import org.eclipse.paho.client.mqttv3.MqttConnectOptions;
import org.eclipse.paho.client.mqttv3.MqttException;
import org.eclipse.paho.client.mqttv3.MqttMessage;
import org.eclipse.paho.client.mqttv3.persist.MemoryPersistence;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.web.bind.annotation.GetMapping;

@RestController
@EnableScheduling
public class SensorController {

    private final ObjectMapper objectMapper;

    private final Simulator simulator;
    private final RandomCoordinates cordinates;

    @Value("${cron.expression}")
    private String cronExpression;

    @Autowired
    public SensorController(ObjectMapper objectMapper, Simulator simulator, RandomCoordinates cordinates) {
        this.objectMapper = objectMapper;
        this.simulator = simulator;
        this.cordinates = cordinates;
    }

    @GetMapping("/sensor")
    @Scheduled(cron = "${cron.expression}")
    public Metric simulate() throws JsonProcessingException, MqttException {
        Metric metric = simulator.simulate(this.cordinates);
        String payload = objectMapper.writeValueAsString(metric);

        String broker = "tcp://mosquitto:1883";
        String topic = "topic";
        String clientid = "Sensor-" + UUID.randomUUID().toString();
        int qos = 0;

        try {
            MqttClient client = new MqttClient(broker, clientid, new MemoryPersistence());
            MqttConnectOptions options = new MqttConnectOptions();
            options.setConnectionTimeout(60);
            options.setKeepAliveInterval(60);
            // connect
            client.connect(options);
            // create message and setup QoS
            MqttMessage message = new MqttMessage(payload.getBytes());
            message.setQos(qos);
            // publish message
            client.publish(topic, message);
            System.out.println("Message published");
            System.out.println("topic: " + topic);
            System.out.println("message content: " + payload);
            // disconnect
            client.disconnect();
            // close client
            client.close();
        } catch (MqttException e) {
            throw new RuntimeException(e);
        }

        // influxdbClient.write(metric);
        return metric;
    }

    @GetMapping("/simulate-drought")
    public ResponseEntity<String> simulateDrought() {
        simulator.setMAX_JITTER_FLOW(0.632f);
        simulator.setMIN_JITTER_FLOW(-1.368f);
        return ResponseEntity.accepted().body("204 - Accepted");
    }

}