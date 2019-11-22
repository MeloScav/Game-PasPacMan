const draw = () => {
  const canvas = document.getElementById("canevas");
  if (canvas.getContext) {
    const context = canvas.getContext("2d");
    // Les touches à faux car non enfoncées de base
    let rightPressed = false;
    let leftPressed = false;
    let UpPressed = false;
    let DownPressed = false;
    // Valeurs positions pacman
    let pacmanX = 13;
    let pacmanY = 190;
    let pacmanR = 13; // rayon pacman
    let mousePacman = 30;
    let angleBegin = mousePacman; // angle de début du cercle
    let angleEnd = 360 - mousePacman; // angle de fin du cercle
    let booleanPacman = false; // sens de dessin du cercle
    let testX = 0;
    let testY = 0;

    // Evènement pour quand la touche est enfoncée
    document.addEventListener(
      "keydown",
      e => {
        if (e.key == "Right" || e.key == "ArrowRight") {
          rightPressed = true;
        } else if (e.key == "Left" || e.key == "ArrowLeft") {
          leftPressed = true;
        } else if (e.key == "Up" || e.key == "ArrowUp") {
          UpPressed = true;
        } else if (e.key == "Down" || e.key == "ArrowDown") {
          DownPressed = true;
        }
      },
      false
    );
    // Evènement pour quand la touche est relachée
    document.addEventListener(
      "keyup",
      e => {
        if (e.key == "Right" || e.key == "ArrowRight") {
          rightPressed = false;
        } else if (e.key == "Left" || e.key == "ArrowLeft") {
          leftPressed = false;
        } else if (e.key == "Up" || e.key == "ArrowUp") {
          UpPressed = false;
        } else if (e.key == "Down" || e.key == "ArrowDown") {
          DownPressed = false;
        }
      },
      false
    );

    const borderCanvas = () => {
      context.lineWidth = "30";
      context.beginPath();
      context.moveTo(0, 160);
      context.lineTo(0, 0);
      context.lineTo(600, 0);
      context.lineTo(600, 160);
      context.stroke();

      context.beginPath();
      context.moveTo(0, 220);
      context.lineTo(0, 400);
      context.lineTo(600, 400);
      context.lineTo(600, 220);
      context.stroke();
    };

    const eyesPacMan = (x, y) => {
      context.beginPath();
      context.fillStyle = "black";
      context.arc(x, y - 7, 2, 0, 2 * Math.PI);
      context.closePath();
      context.fill();
    };

    const pacMan = (pacmanX, pacmanY, pacmanR, angleB, angleE, booleanP) => {
      context.beginPath();
      context.fillStyle = "rgb(235, 233, 0)";
      context.moveTo(pacmanX, pacmanY);
      context.arc(
        pacmanX,
        pacmanY,
        pacmanR,
        (Math.PI / 180) * angleB,
        (Math.PI / 180) * angleE,
        booleanP
      );
      context.lineTo(pacmanX, pacmanY);
      context.fill();
      eyesPacMan(pacmanX - testX, pacmanY + testY);
    };

    const wallTrap = () => {
      context.lineWidth = "15";
      // Obstacle en haut à gauche
      context.beginPath();
      context.moveTo(150, 0);
      context.lineTo(150, 60);
      context.stroke();

      // Obstacle en haut à droite
      context.beginPath();
      context.moveTo(450, 0);
      context.lineTo(450, 60);
      context.stroke();

      // Obstacle en bas à gauche
      context.beginPath();
      context.moveTo(150, 400);
      context.lineTo(150, 340);
      context.stroke();

      // Obstacle en bas à droite
      context.beginPath();
      context.moveTo(450, 400);
      context.lineTo(450, 340);
      context.stroke();

      //Box au centre
      context.beginPath();
      context.moveTo(220, 220);
      context.lineTo(380, 220);
      context.lineTo(380, 160);
      context.moveTo(225, 227);
      context.lineTo(225, 160);
      context.stroke();
    };

    // Obstacle en haut à gauche
    const obstacleTopLeft = () => {
      context.beginPath();
      context.lineWidth = "5";
      context.moveTo(80, 70);
      context.lineTo(80, 120);
      context.stroke();
    };
    // Obstacle en bas à gauche
    const obstacleBottomLeft = () => {
      context.beginPath();
      context.lineWidth = "20";
      context.moveTo(70, 280);
      context.lineTo(130, 280);
      context.lineTo(130, 230);
      context.stroke();
    };
    // Obstacle en haut à droite
    const obstacleTopRight = () => {
      context.beginPath();
      context.lineWidth = "8";
      context.moveTo(520, 70);
      context.lineTo(520, 120);
      context.stroke();
    };

    // Obstacle en haut au centre
    const obstacleTop = () => {
      context.beginPath();
      context.lineWidth = "15";
      context.moveTo(220, 70);
      context.lineTo(380, 70);
      context.stroke();
    };

    // Obstacle en bas au centre
    const obstacleBottom = () => {
      context.beginPath();
      context.lineWidth = "15";
      context.moveTo(220, 300);
      context.lineTo(380, 300);
      context.stroke();
    };

    // Obstacle en bas à droite
    const obstacleTBottomRight = () => {
      context.beginPath();
      context.lineWidth = "6";
      context.moveTo(520, 280);
      context.lineTo(520, 340);
      context.stroke();
    };

    const eyesGhost = (xCercle, yCercle) => {
      // Oeil blanc
      context.beginPath();
      context.fillStyle = "white";
      context.arc(xCercle - 4, yCercle, 3.5, 0, 2 * Math.PI);
      context.arc(xCercle + 5, yCercle, 3.5, 0, 2 * Math.PI);
      context.fill();

      // Pupille noir
      context.beginPath();
      context.fillStyle = "black";
      context.arc(xCercle - 2, yCercle, 1, 0, 2 * Math.PI);
      context.arc(xCercle + 7, yCercle, 1, 0, 2 * Math.PI);
      context.fill();
    };

    const cercleGhost = (x, y, colorGhost) => {
      // Tête cercle
      context.beginPath();
      context.fillStyle = colorGhost;
      context.arc(x, y, 10, 0, 2 * Math.PI);
      context.closePath();
      context.fill();
    };

    const picGhost = (xCercle, yCercle, colorGhost) => {
      // Pic pour faire le bas du fantôme
      context.lineWidth = "3";
      context.beginPath();
      context.fillStyle = colorGhost;
      context.moveTo(xCercle - 10, yCercle + 2);
      context.lineTo(xCercle + 10, yCercle + 2);
      context.lineTo(xCercle + 8, yCercle + 20);
      context.lineTo(xCercle + 8, yCercle + 20);
      context.lineTo(xCercle + 4, yCercle + 15);
      context.lineTo(xCercle, yCercle + 20);
      context.lineTo(xCercle - 4, yCercle + 15);
      context.lineTo(xCercle - 8, yCercle + 20);
      context.lineTo(xCercle - 10, yCercle + 2);
      context.closePath();
      context.fill();
    };

    // Dessiner le fantôme
    const ghostDraw = (x, y, colorGhost) => {
      cercleGhost(x, y, colorGhost);
      picGhost(x, y, colorGhost);
      eyesGhost(x, y);
    };

    const points = () => {
      /*  LIGNE   */
      //Ligne 1
      for (var i = 0; i < 5; i++) {
        context.fillRect(40 + i * 16, 35, 4, 4);
      }
      for (var i = 0; i < 17; i++) {
        context.fillRect(170 + i * 16, 35, 4, 4);
      }
      for (var i = 0; i < 7; i++) {
        context.fillRect(470 + i * 16, 35, 4, 4);
      }

      //Ligne 2 centre
      for (var i = 0; i < 11; i++) {
        context.fillRect(220 + i * 16, 122, 4, 4);
      }

      //ligne
      for (var i = 0; i < 2; i++) {
        context.fillRect(440 + i * 16, 123, 4, 4);
      }

      //ligne
      for (var i = 0; i < 3; i++) {
        context.fillRect(130 + i * 16, 123, 4, 4);
      }
      for (var i = 0; i < 3; i++) {
        context.fillRect(130 + i * 16, 187, 4, 4);
      }

      //Ligne
      for (var i = 0; i < 2; i++) {
        context.fillRect(512 + i * 16, 188, 4, 4);
      }
      for (var i = 0; i < 2; i++) {
        context.fillRect(440 + i * 16, 188, 4, 4);
      }

      //Ligne 3 centre
      for (var i = 0; i < 11; i++) {
        context.fillRect(220 + i * 16, 252, 4, 4);
      }
      //Ligne 3
      for (var i = 0; i < 2; i++) {
        context.fillRect(440 + i * 16, 252, 4, 4);
      }
      //Ligne 3
      for (var i = 0; i < 2; i++) {
        context.fillRect(512 + i * 16, 252, 4, 4);
      }

      //Ligne 4 centre
      for (var i = 0; i < 11; i++) {
        context.fillRect(220 + i * 16, 348, 4, 4);
      }

      // Ligne du bas 1
      for (var i = 0; i < 7; i++) {
        context.fillRect(63 + i * 16, 316, 4, 4);
      }

      // Ligne du bas 2
      for (var i = 0; i < 4; i++) {
        context.fillRect(63 + i * 16, 365, 4, 4);
      }
      // Ligne du bas droite
      for (var i = 0; i < 2; i++) {
        context.fillRect(512 + i * 16, 365, 4, 4);
      }

      /*     VERTICAL      */
      //vertical 1
      for (i = 0; i < 20; i++) {
        context.fillRect(40, 60 + i * 16, 4, 4);
      }

      // //vertical 2
      for (i = 0; i < 8; i++) {
        context.fillRect(78, 140 + i * 16, 4, 4);
      }

      // //vertical 3
      for (i = 0; i < 10; i++) {
        context.fillRect(110, 60 + i * 16, 4, 4);
      }

      // vertical 4
      for (i = 0; i < 20; i++) {
        context.fillRect(186, 60 + i * 16, 4, 4);
      }

      // vertical 5
      for (i = 0; i < 20; i++) {
        context.fillRect(415, 60 + i * 16, 4, 4);
      }

      // vertical 6
      for (i = 0; i < 20; i++) {
        context.fillRect(486, 60 + i * 16, 4, 4);
      }
      //vertical
      for (var i = 0; i < 2; i++) {
        context.fillRect(440 + i * 16, 300, 4, 4);
      }

      // dernière vertical
      for (i = 0; i < 20; i++) {
        context.fillRect(552, 60 + i * 16, 4, 4);
      }
    };

    // Dessiner le tout
    const drawCanvas = () => {
      context.clearRect(0, 0, canvas.width, canvas.height);
      borderCanvas();
      wallTrap();
      obstacleTopLeft();
      obstacleBottomLeft();
      obstacleTopRight();
      obstacleTop();
      obstacleBottom();
      obstacleTBottomRight();
      ghostDraw(260, 170, "rgb(214, 123, 166)");
      ghostDraw(305, 170, "rgb(189, 0, 14)");
      ghostDraw(350, 170, "rgb(1, 237, 235)");
      points();
      pacMan(pacmanX, pacmanY, pacmanR, angleBegin, angleEnd, booleanPacman);

      if (rightPressed) {
        pacmanX += 7; //On avance
        // On change remet les valeurs de bases
        angleBegin = mousePacman;
        angleEnd = 360 - mousePacman;
        booleanPacman = false;
        // EYES
        testX = 0;
        testY = 0;
        if (pacmanX + pacmanR > canvas.width) {
          pacmanX = canvas.width - pacmanR - 10;
        }
      } else if (leftPressed) {
        pacmanX -= 7;
        // On change le pacman de sens
        angleBegin = 179 - mousePacman;
        angleEnd = 180 + mousePacman;
        booleanPacman = true;

        if (pacmanX < 13) {
          pacmanX = 15;
        }
      }

      if (UpPressed) {
        pacmanY -= 7;
        // On change le pacman de sens
        angleBegin = 269 - mousePacman;
        angleEnd = 270 + mousePacman;
        booleanPacman = true;
        // EYES
        testX = 5;
        testY = 5;

        if (pacmanY < 25) {
          pacmanY = 25;
        }
      } else if (DownPressed) {
        pacmanY += 7;
        // On change le pacman de sens
        angleBegin = 79 - mousePacman;
        angleEnd = 90 + mousePacman;
        booleanPacman = true;
        // EYES
        testX = 5;
        testY = 5;
        if (pacmanY + pacmanR > canvas.height) {
          pacmanY = canvas.height - pacmanR - 15;
        }
      }

      requestAnimationFrame(drawCanvas);
    };
    drawCanvas();
  }
};

draw();
