package uy.edu.ucu.Simulator;

import static java.lang.Math.min;
import static java.lang.Math.max;
import java.time.LocalDateTime;
import java.util.Random;

import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Component;
import lombok.Getter;
import uy.edu.ucu.DTO.Metric;

@Component
@Scope("singleton")
@Getter
public class Simulator {
    private final static float MIN_JITTER = -1.0f;
    private final static float MAX_JITTER = 1.0f;

    private final static float MIN_TEMP = -50.0f;
    private final static float MAX_TEMP = 50.0f;

    private final static float MIN_HUM = 0.0f;
    private final static float MAX_HUM = 100.0f;

    private Metric value;

    public Simulator() {
        this.value = Metric.builder()
                .latitude(-34.9011f)
                .longitud(56.1645f)
                .city("Montevideo")
                .humidity(15f)
                .instant(LocalDateTime.now())
                .temperature(15f)
                .build();
    }

    public Metric simulate() {

        float jitter = new Random().nextFloat() * (MAX_JITTER - MIN_JITTER) + MIN_JITTER;
        float humidity = this.value.getHumidity() + jitter;
        float temperature = this.value.getTemperature() + jitter;
        float latitude = this.value.getLatitude();
        float longitud = this.value.getLongitud();
        String city = this.value.getCity();

        humidity = adjust(humidity, MAX_HUM, MIN_HUM);
        // TODO: Make temperature ajust with sin function to simulate day/night cicle.
        temperature = adjust(temperature, MAX_TEMP, MIN_TEMP);

        this.value = Metric.builder().latitude(latitude)
                .longitud(longitud).city(city).humidity(humidity).instant(LocalDateTime.now()).temperature(temperature)
                .build();

        return value;
    }

    private static float adjust(float value, float max, float min) {
        return max(min(value, max), min);
    }

}
