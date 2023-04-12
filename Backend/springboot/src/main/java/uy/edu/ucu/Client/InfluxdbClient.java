package uy.edu.ucu.Client;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Component;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.influxdb.client.InfluxDBClient;
import com.influxdb.client.InfluxDBClientFactory;
import com.influxdb.client.WriteApiBlocking;
import com.influxdb.client.domain.WritePrecision;

import lombok.Getter;
import uy.edu.ucu.Config.JacksonConfig;
import uy.edu.ucu.DTO.Metric;
import uy.edu.ucu.PO.MetricPO;

@Component
@Scope("prototype")
@Getter
public class InfluxdbClient {

    private String TOKEN;
    private String BUCKET;
    private String ORG;
    private String SERVER;
    private String HOST;
    private int PORT;
    private InfluxDBClient CLIENT;

    public InfluxdbClient() {

        this.TOKEN = "0qfrVjTKP-s9VZ_msUoZqez5ubytxENzCZo93WNE1_rzI-2k59tTLcRTMHCsWlxm67paxbCKInl0b8HzG5PzLg==";
        this.BUCKET = "DATA";
        this.ORG = "UCU";
        this.SERVER = "http://influxdb";
        this.HOST = "host1";
        this.PORT = 8086;
        this.CLIENT = InfluxDBClientFactory.create(this.SERVER + ":" + this.PORT, this.TOKEN.toCharArray(), this.ORG,
                this.BUCKET);
    }

    public void write(Metric metric) {

        MetricPO po = JacksonConfig.objectMapper().convertValue(metric, MetricPO.class);
        po.setHost(this.HOST);

        WriteApiBlocking writeApi = this.CLIENT.getWriteApiBlocking();
        writeApi.writeMeasurement(this.BUCKET, this.ORG, WritePrecision.NS, po);

    }

}
