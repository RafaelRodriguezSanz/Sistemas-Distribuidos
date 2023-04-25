package uy.edu.ucu.DTO;

// import uy.edu.ucu.Serializers.FlowSerializer;
// import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import java.time.LocalDateTime;

import lombok.Builder;
import lombok.Getter;

import lombok.extern.jackson.Jacksonized;

@Builder
@Jacksonized
@Getter
public class Metric {
    float latitude;

    float longitud;

    String city;

    LocalDateTime instant;

    // @JsonSerialize(using = FlowSerializer.class)
    Float flow;
}
