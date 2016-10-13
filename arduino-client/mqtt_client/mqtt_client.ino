#include <Bridge.h>
#include <BridgeClient.h>
#include <MQTTClient.h>

BridgeClient net;
MQTTClient client;

unsigned long lastMillis = 0;
int humidityAnalogPin = 3;
int pumpDigitalPin = 13;
 
void setup() {
  Bridge.begin();
  Serial.begin(9600);
  client.begin("192.168.0.102", 1883, net);

  connect();
}

void connect() {
  Serial.print("connecting...");
  while (!client.connect("arduino", "try", "try")) {
    Serial.print(".");
    delay(1000);
  }

  Serial.println("\nconnected!");

  client.subscribe("arduino/in/pump");
  // client.unsubscribe("/example");
}

void loop() {
  client.loop();

  if(!client.connected()) {
    connect();
  }

  // publish a message roughly every second.
  if(millis() - lastMillis > 1000) {
    lastMillis = millis();
    // read humidity and send
    String messageJson = sendAnalogValue("humidity", humidityAnalogPin);
    Serial.println(messageJson);
    client.publish("arduino/out", messageJson);
  }
}

void messageReceived(String topic, String payload, char * bytes, unsigned int length) {
  //Serial.print("incoming: ");
  //Serial.print(topic);
  //Serial.print(" - ");
  //Serial.print(payload);
  Serial.println();
  if( topic == "arduino/in/pump") {
    Serial.print(topic);
    Serial.print(" value: ");
    Serial.println(payload);
    if( payload == "ON") {
      Serial.println("Turning ON the PUMP");
      digitalWrite(pumpDigitalPin, HIGH);
    }
    if( payload == "OFF") {
      Serial.println("Turning OFF the PUMP");
      digitalWrite(pumpDigitalPin, LOW);
    }
  }
}

String sendAnalogValue(String valueName, int sensorPin) {
  int value = analogRead(sensorPin);
  String message = "{'";
  message += valueName;
  message += "':";
  message += value;
  message += "}";
  return message;
}

