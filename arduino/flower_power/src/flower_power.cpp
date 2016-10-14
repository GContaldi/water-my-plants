#include <Arduino.h>

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
// VARS

MoistureSensor sensor(A0);

void blink() {
  digitalWrite(LED_PIN, HIGH);
  delay(BLINK_DELAY / 2);
  digitalWrite(LED_PIN, LOW);
  delay(BLINK_DELAY / 2);
}

void readSensor() {
  moisture_level = sensor.getSmoothedReading();
  Serial.println("LEVEL: " + String(moisture_level));
}

void setPumpState(PUMP_STATES state) {
  digitalWrite(PUMP_PIN, state);
}

void updateActuators() {
  PUMP_STATES state = ( moisture_level > moisture_threshold ) ? ACTIVE : DISABLED;
  setPumpState(state);
}

void setup() {
  Serial.begin(9600);
  Serial.println("Arduino Node Started");

  init_interface();
}

void loop() {
  readSensor();
  updateActuators();
  // String plant_condition = getPlantCondition();

  delay(1000);
  // blink();
}
