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
    public float MIN_JITTER_FLOW;
    public float MAX_JITTER_FLOW;

    private final static float MIN_FLOW = 0.0f;
    private final static float MAX_FLOW = 100.0f;

    private Metric value;

    public Simulator() {
        this.MIN_JITTER_FLOW = -1.0f;
        this.MAX_JITTER_FLOW = 1.0f;

        this.value = Metric.builder()
                .latitude(-34.9011f)
                .longitud(56.1645f)
                .city("Montevideo")
                .flow(50f)
                .instant(LocalDateTime.now())
                .build();
    }

    public Metric simulate() {

        float jitterFlow = new Random().nextFloat() * (MAX_JITTER_FLOW - MIN_JITTER_FLOW) + MIN_JITTER_FLOW;
        float flow = this.value.getFlow() + jitterFlow;
        float latitude = this.value.getLatitude();
        float longitud = this.value.getLongitud();
        String city = this.value.getCity();

        flow = adjust(flow, MAX_FLOW, MIN_FLOW);

        this.value = Metric.builder()
                .latitude(latitude)
                .longitud(longitud)
                .city(city)
                .flow(flow)
                .instant(LocalDateTime.now())
                .build();

        return value;
    }

    private static float adjust(float value, float max, float min) {
        return max(min(value, max), min);
    }

}
