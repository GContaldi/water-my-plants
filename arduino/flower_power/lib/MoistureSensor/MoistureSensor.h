#ifndef _MoistureSensor_h
#ifdef __cplusplus
#define _MoistureSensor_h

#include <inttypes.h>

class MoistureSensor {

public:
    MoistureSensor(uint8_t analogPin);
    void reset();
    void read();
    int getSmoothedReading();

private:
    uint8_t readingIndex;
    uint8_t analogPin;
    int*  recents;

    const int NUM_READINGS = 50;
};

#endif // __cplusplus
#endif /* _MoistureSensor_h */
