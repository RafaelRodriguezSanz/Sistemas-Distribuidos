package uy.edu.ucu.Serializers;

import com.fasterxml.jackson.core.JsonGenerator;
import com.fasterxml.jackson.databind.JsonSerializer;
import com.fasterxml.jackson.databind.SerializerProvider;
import java.text.DecimalFormat;
import java.util.StringJoiner;
import java.io.IOException;

public class HumiditySerializer extends JsonSerializer<Float> {

    private static final String UNIT = "kg/m³";

    private final DecimalFormat decimalFormat = new DecimalFormat("0.00");

    @Override
    public void serialize(Float humidityFloat, JsonGenerator jsonGenerator, SerializerProvider serializerProvider)
            throws IOException {
        final StringJoiner joiner = new StringJoiner(" ");
        joiner.add(decimalFormat.format(humidityFloat));
        joiner.add(UNIT);
        jsonGenerator.writeString(joiner.toString());
    }
}