package uy.edu.ucu.Config;

import static java.lang.Math.min;
import static java.lang.Math.max;
import java.time.LocalDateTime;
import java.util.Random;

import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Component;
import lombok.Getter;
import lombok.Setter;
import uy.edu.ucu.DTO.Metric;
import java.util.Random;

@Component
@Scope("singleton")
@Getter
@Setter
public class RandomCoordinates {
    private final float minLat = -34.920388f;
    private final float maxLat = -34.779969f;
    private final float minLon = -56.251644f;
    private final float maxLon = -56.003818f;

    private float latitude;
    private float longitud;

    public RandomCoordinates() {
        Random random = new Random();
        this.latitude = minLat + (maxLat - minLat) * random.nextFloat();
        this.longitud = minLon + (maxLon - minLon) * random.nextFloat();
    }
}
