void setup()
{
  Serial.begin(9600);
  pinMode(7, INPUT);
}

void loop()
{
  bool fire = digitalRead(7);
  Serial.print("F:");
  Serial.println(fire);

  delay(500);
}