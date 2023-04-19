package uy.edu.ucu.Config;

import org.eclipse.paho.client.mqttv3.IMqttDeliveryToken;
import org.eclipse.paho.client.mqttv3.MqttCallback;
import org.eclipse.paho.client.mqttv3.MqttMessage;
import org.springframework.beans.factory.annotation.Autowired;

import com.fasterxml.jackson.databind.ObjectMapper;

import uy.edu.ucu.Clients.InfluxdbClient;
import uy.edu.ucu.DTO.Metric;

public class MosquittoCallback implements MqttCallback {

    ObjectMapper objectMapper;
    InfluxdbClient influxdbClient;

    @Autowired
    public MosquittoCallback(ObjectMapper objectMapper, InfluxdbClient influxdbClient) {
        this.objectMapper = objectMapper;
        this.influxdbClient = influxdbClient;
    }

    @Override
    public void connectionLost(Throwable cause) {
        System.out.println("Connection Lost: " + cause.getMessage());
    }

    @Override
    public void messageArrived(String topic, MqttMessage message) throws Exception {
        influxdbClient.write(objectMapper.readValue(message.getPayload(), Metric.class));
    }

    @Override
    public void deliveryComplete(IMqttDeliveryToken token) {
        System.out.println("Received" + token.isComplete());
    }

}
