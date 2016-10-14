#include <Arduino.h>
#include "MoistureSensor.h"

MoistureSensor::MoistureSensor(uint8_t ap):
analogPin(ap),
readingIndex(0)
{
    this->recents = new int[NUM_READINGS];
    this->reset();
}

void MoistureSensor::reset() {
    for (int i = 0; i < this->NUM_READINGS; i++) {
        this->recents[i] = -1;
    }
}

void MoistureSensor::read() {
    int vin = analogRead(analogPin);
    recents[readingIndex] = vin;
    readingIndex++;
    readingIndex %= this->NUM_READINGS;
}

int MoistureSensor::getSmoothedReading() {
    float sum = 0;
    float count = 0;

    // throw out the highest and lowest
    int maxval = -10000;
    int minval = 10000;
    int minindex = -1;
    int maxindex = -1;
    int validReadings = 0;

    this->reset();

    for(int i = 0; i < this->NUM_READINGS; i++) {
      this->read();
    }

    for (int i = 0; i < this->NUM_READINGS; i++) {
        float reading = recents[i];
        if (reading < minval) {
            minval = reading;
            minindex = i;
        }
        if (reading > maxval) {
            maxval = reading;
            maxindex = i;
        }
        if (reading >= 0) {
            validReadings++;
        }
    }

    for (int i = 0; i < this->NUM_READINGS; i++) {
        if (validReadings > 2 && (i == minindex || i == maxindex)) {
            continue;
        }

        float reading = recents[i];
        if (reading > 0) {
            sum += reading;
            count++;
        }
    }
    if (count == 0) {
        return 0;
    }
    return sum/count;
}
