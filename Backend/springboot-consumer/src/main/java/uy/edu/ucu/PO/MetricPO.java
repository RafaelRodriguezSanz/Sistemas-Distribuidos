package uy.edu.ucu.PO;

import java.time.Instant;
import java.time.LocalDateTime;

import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import com.influxdb.annotations.Column;
import com.influxdb.annotations.Measurement;
import lombok.Builder;
import lombok.Setter;
import lombok.extern.jackson.Jacksonized;

@Builder
@Jacksonized
@Measurement(name = "metric")
public class MetricPO {
    @Column(tag = true)
    @Setter
    String host;

    @Column
    float latitude;

    @Column
    float longitud;

    @Column
    String city;

    @Column
    LocalDateTime instant;

    @Column
    Float flow;

    @Column(timestamp = true)
    Instant time;
}
