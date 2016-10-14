#include <Bridge.h>
#include <BridgeClient.h>
#include <MQTTClient.h>

BridgeClient net;
MQTTClient client;

unsigned long lastMillis = 0;
int humidityAnalogPin = 0;
int pumpDigitalPin = 13;
 
void setup() {
  Bridge.begin();
  Serial.begin(9600);
  client.begin("192.168.240.234", 1883, net);
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
    String blockMessageOut = createBlockMessage(1,"humidity", analog);
    Serial.println(blockMessageOut);
    client.publish("arduino/out", blockMessageOut);
  }
}

void messageReceived(String topic, String payload, char * bytes, unsigned int length) {
  if( topic == "arduino/in") {
    Serial.println(payload);
  }
}

String createBlockMessage(int blockId, String param, int value) {
  //int value = analogRead(blockIdAnalogPin);
  String message = "{'blockId':";
  message += blockId;
  message += ",'param':'";
  message += param;
  message += "','value':'";
  message += value;
  message += "'}";
  return message;
}
