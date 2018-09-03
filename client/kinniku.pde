Muscle muscle;
int load;
PImage room;

void setup() {
  container = document.querySelector(".canvas-container");
  size(container.clientWidth, container.clientHeight);
  x = width/2;
  y = height/2;
  load = 0;
  muscle = new Muscle(loadImage("kinniku.png"));
  room = loadImage("heya.jpg");

    var config = {
      apiKey: "AIzaSyDFwmR2cTNPBRxVgEDVTJkhziV9HTiEvyk",
      authDomain: "muscle-breeder.firebaseapp.com",
      databaseURL: "https://muscle-breeder.firebaseio.com",
      projectId: "muscle-breeder",
      storageBucket: "muscle-breeder.appspot.com",
      messagingSenderId: "229711818286"
  };
  firebase.initializeApp(config);

  var database = firebase.database();
  var init = false;

  var logs = firebase.database().ref('logs');

  logs.once("value", function(data) {
    values = Object.entries(data.val());
    initM(muscle, values);
  });

  logs.on('value', function (data) {
    values = Object.entries(data.val());
    value = values[values.length - 1];
    setChart(value);
  });

  var status = firebase.database().ref('status');
  status.on('value', function (snapshot) {
      if(snapshot.val().mode === "standby") {
        load = 0;
      }
      if(snapshot.val().mode === "getPower") {
        load = snapshot.val().power/10;
      }
  });
}

void draw() {
  background(50);
  int imW = room.width * height/room.height;
  int imh = height;
  image(room, width/2 - imW/2, 0, imW, height);

  muscle.update(load);
  muscle.display(x, y);

  var levelEl = document.querySelector(".level");
  levelEl.textContent = "筋肉レベル: " + muscle.level;

  var loadEl = document.querySelector(".load");
  loadEl.textContent = "現在の負荷: " + load;

  var leftEl = document.querySelector(".left");
  leftEl.textContent = "次のレベルまで: " + Math.floor(muscle.levelUpThreshold - muscle.loadStock);
}
