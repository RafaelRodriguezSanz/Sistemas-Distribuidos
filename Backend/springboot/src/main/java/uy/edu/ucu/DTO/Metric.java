package uy.edu.ucu.DTO;

import uy.edu.ucu.Serializers.HumiditySerializer;
import uy.edu.ucu.Serializers.TemperatureSerializer;
import java.time.LocalDateTime;

import lombok.Builder;
import lombok.Getter;

import com.fasterxml.jackson.databind.annotation.JsonSerialize;

import lombok.extern.jackson.Jacksonized;

@Builder
@Jacksonized
@Getter
public class Metric {
    LocalDateTime instant;

    @JsonSerialize(using = HumiditySerializer.class)
    Float humidity;

    @JsonSerialize(using = TemperatureSerializer.class)

    Float temperature;
}
