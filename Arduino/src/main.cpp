#include <Arduino.h>

int ledPin = 13;                // LED
int pirPin = 2;                 // PIR Out pin
int pirStat = 0;                // PIR status
void setup() {
  pinMode(ledPin, OUTPUT);
  pinMode(pirPin, INPUT);
  Serial.begin(9600);
}
void loop() {
  Serial.println(millis());
}