package uy.edu.ucu.Controllers;

import org.springframework.web.bind.annotation.RestController;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import uy.edu.ucu.Clients.InfluxdbClient;
import uy.edu.ucu.Config.MosquittoCallback;

import java.util.UUID;

import javax.annotation.PostConstruct;

import org.eclipse.paho.client.mqttv3.MqttClient;
import org.eclipse.paho.client.mqttv3.MqttConnectOptions;
import org.eclipse.paho.client.mqttv3.MqttException;
import org.eclipse.paho.client.mqttv3.persist.MemoryPersistence;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.web.bind.annotation.GetMapping;

@RestController
@EnableScheduling
public class SensorController {

    private final ObjectMapper objectMapper;

    private final InfluxdbClient influxdbClient;

    @Value("${cron.expression}")
    private String cronExpression;

    @Autowired
    public SensorController(ObjectMapper objectMapper, InfluxdbClient influxdbClient) {
        this.objectMapper = objectMapper;
        this.influxdbClient = influxdbClient;
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