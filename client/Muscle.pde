class Muscle {
  int level;
  int levelUpThreshold = 10000;

  int loadStock;
  int loadThreshold = 0;


  int power;
  int size;
  int animateSize;
  int originSize = 100;

  int w_eyeSize, b_eyeSize;
  int originEyeSize = 15;

  PImage muscleImg;

  Muscle(PImage img) {
    level = 1;
    muscleImg = img;
  }

  void display (int x, int y) {
    image(muscleImg, x-size/2, y-size/2, size, size);
    fill(255);
    stroke(0);
    ellipse(x - size/8, y-size/6, w_eyeSize, w_eyeSize);
    ellipse(x + size/12, y-size/6, w_eyeSize, w_eyeSize);

    strokeWeight(5);
    line(x - size/8 - w_eyeSize/2, y-size/6 - w_eyeSize*4/5, x - size/8 + w_eyeSize/2, y-size/6 - w_eyeSize/2);
    line(x + size/12 - w_eyeSize/2, y-size/6 - w_eyeSize/2, x + size/12 + w_eyeSize/2, y-size/6 - w_eyeSize*4/5);
    strokeWeight(1);

    fill(0);
    noStroke();
    ellipse(x - size/8, y-size/6, b_eyeSize, b_eyeSize);
    ellipse(x + size/12, y-size/6, b_eyeSize, b_eyeSize);
  }

  void update(int load) {
    if (load > loadThreshold) {
      loadStock += load;
      if (animateSize < 50) animateSize+=2;
    } else {
      if (animateSize > 0) animateSize-=2;
    }

    if (loadStock > levelUpThreshold) {
      loadStock = 0;
      levelUpThreshold *= 3;
      level++;
    }

    size = level * (originSize) + animateSize;
    w_eyeSize = level * (originEyeSize);
    b_eyeSize = w_eyeSize/2;
  }
}
