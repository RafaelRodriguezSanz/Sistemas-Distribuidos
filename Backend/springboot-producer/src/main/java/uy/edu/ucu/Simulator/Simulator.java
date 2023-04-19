package uy.edu.ucu.Simulator;

import static java.lang.Math.min;
import static java.lang.Math.max;
import java.time.LocalDateTime;
import java.util.Random;

import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Component;
import lombok.Getter;
import lombok.Setter;
import uy.edu.ucu.DTO.Metric;

@Component
@Scope("singleton")
@Getter
@Setter
public class Simulator {
    public float MIN_JITTER_HUM;
    public float MAX_JITTER_HUM;
    public float MIN_JITTER_TEMP;
    public float MAX_JITTER_TEMP;

    private final static float MIN_TEMP = -50.0f;
    private final static float MAX_TEMP = 50.0f;

    private final static float MIN_HUM = 0.0f;
    private final static float MAX_HUM = 100.0f;

    private Metric value;

    public Simulator() {
        this.MIN_JITTER_HUM = -1.0f;
        this.MAX_JITTER_HUM = 1.0f;
        this.MIN_JITTER_TEMP = -1.0f;
        this.MAX_JITTER_TEMP = 1.0f;

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

        float jitterHum = new Random().nextFloat() * (MAX_JITTER_HUM - MIN_JITTER_HUM) + MIN_JITTER_HUM;
        float jitterTemp = new Random().nextFloat() * (MAX_JITTER_TEMP - MIN_JITTER_TEMP) + MIN_JITTER_TEMP;
        float humidity = this.value.getHumidity() + jitterHum;
        float temperature = this.value.getTemperature() + jitterTemp;
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
