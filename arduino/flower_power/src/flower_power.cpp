#include <Arduino.h>

#include <Bridge.h>
#include <BridgeClient.h>
#include <MQTTClient.h>
#include <ArduinoJson.h>

#include <MoistureSensor.h>

// TYPES
enum PUMP_STATES {
  DISABLED = HIGH,
  ACTIVE = LOW
};
// TYPES

// CONSTANTS
int BLINK_DELAY = 1 * 1000;
// CONSTANTS

// INTERFACE
int LED_PIN = 13;
int PUMP_PIN = 13;

void init_interface() {
  pinMode(LED_PIN, OUTPUT);
  pinMode(PUMP_PIN, OUTPUT);

  // set default values
  digitalWrite(PUMP_PIN, HIGH);
}
// INTERFACE

// VARS
int moisture_level;
int moisture_threshold = 700;

BridgeClient net;
MQTTClient client;

MoistureSensor sensor(A0);

StaticJsonBuffer<200> jsonBuffer;

// VARS

// UITLS
String createBlockMessage(int blockId, String param, int value) {
  String message = "{\"blockId\":\"";
  message += blockId;
  message += "\",\"param\":\"";
  message += param;
  message += "\",\"value\":\"";
  message += value;
  message += "\"}";
  return message;
}
// UTILS

void readSensor() {
  moisture_level = sensor.getSmoothedReading();

  String blockMessageOut = createBlockMessage(1, "humidity", moisture_level);
  Serial.println(blockMessageOut);
  client.publish("arduino/out", blockMessageOut);
}

void setPumpState(PUMP_STATES state) {
  digitalWrite(PUMP_PIN, state);
}

void updateActuators() {
  PUMP_STATES state = ( moisture_level > moisture_threshold ) ? ACTIVE : DISABLED;
  setPumpState(state);
}

void connect() {
  Serial.print("connecting...");
  while (!client.connect("arduino", "try", "try")) {
    Serial.print(".");
    delay(1000);
  }
  Serial.println("\nconnected!");
  client.subscribe("arduino/in");
}

void updateSettings(JsonObject& message) {
  const String param = message["param"];
  const String value = message["value"];

  Serial.println(param);

  if (param == "humidity/threshold") {
    Serial.println("Set threshold to " + value);
    Serial.println(value.toInt());
    moisture_threshold = value.toInt();
  }
}

void messageReceived(String topic, String payload, char * bytes, unsigned int length) {
  if (topic == "arduino/in") {
    JsonObject& received = jsonBuffer.parseObject(payload);
    updateSettings(received);
  }
}

void setup() {
  Serial.begin(9600);
  Serial.println("Arduino Node Started");

  init_interface();

  Bridge.begin();
  client.begin("192.168.1.188", 1883, net);
  connect();
}

void loop() {
  // protect from disconnect
  if(!client.connected()) {
    connect();
  }

  client.loop();

  readSensor();
  updateActuators();

  delay(1000);
}
