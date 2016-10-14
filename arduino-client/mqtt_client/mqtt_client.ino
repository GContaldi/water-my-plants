#include <Bridge.h>
#include <BridgeClient.h>
#include <MQTTClient.h>
#include <ArduinoJson.h>
#include <string.h>

BridgeClient net;
MQTTClient client;

unsigned long lastMillis = 0;
int humidityAnalogPin = 0;
int pumpDigitalPin = 13;
StaticJsonBuffer<200> jsonBuffer;
 
void setup() {
  Bridge.begin();
  Serial.begin(9600);
  client.begin("192.168.1.201", 1883, net);
  digitalWrite(pumpDigitalPin, HIGH);
  connect();
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

void loop() {
  client.loop();

  if(!client.connected()) {
    connect();
  }

  // publish a message roughly every second.
  if(millis() - lastMillis > 1000) {
    lastMillis = millis();
    String blockMessageOut = createBlockMessage(1,"humidity", analogRead(humidityAnalogPin));
    client.publish("arduino/out", blockMessageOut);
  }
}

void messageReceived(String topic, String payload, char * bytes, unsigned int length) {
  if( topic == "arduino/in") {
    Serial.println(payload);
    JsonObject& received = jsonBuffer.parseObject(payload);
    const char* param = received["param"];
    const char* value = received["value"];
    if(param == "pump_in") {
      setupPump(value);
    }
    Serial.println(payload);
  }
}

String createBlockMessage(int blockId, String param, int value) {
  JsonObject& message = jsonBuffer.createObject();
  message["blockId"] = blockId;
  message["param"] = param;
  message["value"] = value;
  String messageString;
  message.printTo(messageString);
  return messageString;
}

void setupPump(String value) {
  if (value == "1") {
    digitalWrite(pumpDigitalPin, LOW);
  }
  if (value == "0") {
    digitalWrite(pumpDigitalPin, HIGH);
  }
}
