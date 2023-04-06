package uy.edu.ucu.Serializers;

import com.fasterxml.jackson.core.JsonGenerator;
import com.fasterxml.jackson.databind.JsonSerializer;
import com.fasterxml.jackson.databind.SerializerProvider;
import java.text.DecimalFormat;
import java.util.StringJoiner;
import java.io.IOException;

public class TemperatureSerializer extends JsonSerializer<Float> {

    private static final String UNIT = "°C";

    private final DecimalFormat decimalFormat = new DecimalFormat("0.00");

    @Override
    public void serialize(Float temperatureFloat, JsonGenerator jsonGenerator, SerializerProvider serializerProvider)
            throws IOException {
        final StringJoiner joiner = new StringJoiner(" ");
        joiner.add(decimalFormat.format(temperatureFloat));
        joiner.add(UNIT);
        jsonGenerator.writeString(joiner.toString());
    }
}