package uy.edu.ucu.Controllers;

import org.springframework.web.bind.annotation.RestController;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;

import lombok.AllArgsConstructor;
import uy.edu.ucu.Clients.InfluxdbClient;
import uy.edu.ucu.Config.MosquittoCallback;
import uy.edu.ucu.DTO.Metric;
import uy.edu.ucu.Simulator.Simulator;

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

    private final InfluxdbClient influxdbClient;

    @Value("${cron.expression}")
    private String cronExpression;

    @Autowired
    public SensorController(ObjectMapper objectMapper, Simulator simulator, InfluxdbClient influxdbClient) {
        this.objectMapper = objectMapper;
        this.simulator = simulator;
        this.influxdbClient = influxdbClient;
    }

    @GetMapping("/sensor")
    @Scheduled(cron = "${cron.expression}")
    public Metric simulate() throws JsonProcessingException, MqttException {
        Metric metric = simulator.simulate();
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
        simulator.setMAX_JITTER_HUM(0.632f);
        simulator.setMIN_JITTER_TEMP(-0.632f);
        return ResponseEntity.accepted().body("204 - Accepted");
    }

    @GetMapping("/consume")
    @PostConstruct
    public ResponseEntity<String> consume() throws JsonProcessingException, MqttException {

        String broker = "tcp://mosquitto:1883";
        String topic = "topic";
        String clientid = "Sensor-" + UUID.randomUUID().toString();
        int qos = 0;

        try {
            MqttClient client = new MqttClient(broker, clientid, new MemoryPersistence());
            // connect options
            MqttConnectOptions options = new MqttConnectOptions();
            options.setConnectionTimeout(60);
            options.setKeepAliveInterval(60);
            // setup callback
            client.setCallback(new MosquittoCallback(objectMapper, influxdbClient));
            client.connect(options);
            client.subscribe(topic, qos);
        } catch (Exception e) {
            e.printStackTrace();
        }
        return ResponseEntity.accepted().body("204 - Accepted");
    }

}