#include <Arduino.h>

#include <Bridge.h>
#include <BridgeClient.h>
#include <PubSubClient.h>
#include <ArduinoJson.h>

#include <MoistureSensor.h>

// TYPES
enum PUMP_STATES {
  DISABLED = HIGH,
  ACTIVE = LOW
};
// TYPES

// CONSTANTS
const int BLINK_DELAY = 1 * 1000;
const char* MQTT_IP = "192.168.1.187";
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
PubSubClient client(net);

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

  client.publish("arduino/out", blockMessageOut.c_str());
}

void setPumpState(PUMP_STATES state) {
  digitalWrite(PUMP_PIN, state);
}

void updateActuators() {
  PUMP_STATES state = ( moisture_level > moisture_threshold ) ? ACTIVE : DISABLED;
  setPumpState(state);
}

void reconnect() {
  // Loop until we're reconnected
  while (!client.connected()) {
    Serial.print("Attempting MQTT connection...");
    // Attempt to connect
    if (client.connect("arduinoClient")) {
      Serial.println("connected");
      // ... and resubscribe
      client.subscribe("arduino/in");
    } else {
      Serial.print("failed, rc=");
      Serial.print(client.state());
      Serial.println(" try again in 5 seconds");
      // Wait 5 seconds before retrying
      delay(5000);
    }
  }
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

void messageReceived(char* topic, byte* payload, unsigned int length) {
  Serial.println(topic);
  Serial.println("MESSAGE!");
  if (topic == "arduino/in") {
    JsonObject& received = jsonBuffer.parseObject((char*)payload);
    updateSettings(received);
  }
}

void setup() {
  Serial.begin(9600);
  Serial.println("Arduino Node Started");

  init_interface();

  client.setServer(MQTT_IP, 1883);
  client.setCallback(messageReceived);

  Bridge.begin();
}

void loop() {
  // protect from disconnect
  if(!client.connected()) {
    reconnect();
  }

  client.loop();

  readSensor();
  updateActuators();

  delay(1000);
}
