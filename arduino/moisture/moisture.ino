/*
  Monitors the moisture level on a YL-38 and moisture sensor and
  YL-69 probe.

  This example will only power the probe for the few seconds a
  reading is made, the remaining time it is powered down (as
  various posts indicate these probes will corrode over time,
  much faster if left powered 100% of the time).

  My wiring relies on a transistor to switch the power to
  the sensor, you can attemp to connect your sensor directly
  to the digital pin (I wasn't getting accurate readings).

  This code is in the public domain.

  modified 2016-04-27
  by Jon DeYoung
 */

#include <MoistureSensor.h>

int NUM_READINGS = 50;
MoistureSensor ms(A0, NUM_READINGS);

const int DELAY = 1 * 1000;

void setup() {
  Serial.begin(9600);
  pinMode(13, OUTPUT);
}

void loop() {

  digitalWrite(13, HIGH);

  Serial.print("LEVEL: ");
  Serial.println(ms.getSmoothedReading());

  digitalWrite(13, LOW);
  delay(DELAY);
}
