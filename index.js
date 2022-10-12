window.addEventListener("load", () => {
  const canvas = document.getElementById("canvas1");
  const ctx = canvas.getContext("2d");
  const WIDTH = (canvas.width = 800);
  const HEIGHT = (canvas.height = 720);
  let enemies = [];

  class InputHandlers {
    constructor() {
      this.keys = [];
      window.addEventListener("keydown", (e) => {
        if (
          (e.key === "ArrowDown" ||
            e.key === "ArrowUp" ||
            e.key === "ArrowRight" ||
            e.key === "ArrowLeft") &&
          this.keys.indexOf(e.key) === -1
        ) {
          this.keys.push(e.key);
        }
      });
      window.addEventListener("keyup", (e) => {
        if (
          e.key === "ArrowDown" ||
          e.key === "ArrowUp" ||
          e.key === "ArrowRight" ||
          e.key === "ArrowLeft"
        ) {
          this.keys.splice(this.keys.indexOf(e.key), 1);
        }
      });
    }
  }
  class Player {
    constructor(gameWidth, gameHeight) {
      this.gameHeight = gameHeight;
      this.gameWidth = gameWidth;
      this.width = 200;
      this.height = 200;
      this.x = 0;
      this.y = this.gameHeight - this.height;
      this.image = document.getElementById("player");
      this.frameX = 0;
      this.frameY = 1;
      this.speed = 0;
      this.vy = 0;
      this.weight = 1;
    }
    update(input) {
      this.x += this.speed;
      if (input.keys.indexOf("ArrowRight") > -1) {
        this.speed = 5;
      } else if (input.keys.indexOf("ArrowLeft") > -1) {
        this.speed = -5;
      } else if (input.keys.indexOf("ArrowUp") > -1 && this.onGround()) {
        this.vy -= 32;
      } else {
        this.speed = 0;
      }
      if (this.x < 0) this.x = 0;
      else if (this.x > this.gameWidth - this.width)
        this.x = this.gameWidth - this.width;

      this.y += this.vy;
      if (!this.onGround()) {
        this.vy += this.weight;
        this.frameY = 1;
      } else {
        this.vy = 0;
        this.frameY = 0;
      }
      if (this.y > this.gameHeight - this.height)
        this.y = this.gameHeight - this.height;
    }
    draw(context) {
      context.fillStyle = "white";
      // context.fillRect(this.x, this.y, this.width, this.height);
      context.drawImage(
        this.image,
        this.width * this.frameX,
        this.frameY * this.height,
        this.width,
        this.height,
        this.x,
        this.y,
        this.width,
        this.height
      );
    }
    onGround() {
      return this.y >= this.gameHeight - this.height;
    }
  }
  class Background {
    constructor(gameWidth, gameHeight) {
      this.gameWidth = gameWidth;
      this.gameHeight = gameHeight;
      this.image = document.getElementById("background");
      this.x = 0;
      this.y = 0;
      this.width = 2400;
      this.height = 720;
      this.speed = 20;
    }
    draw(context) {
      context.drawImage(this.image, this.x, this.y, this.width, this.height);
      context.drawImage(
        this.image,
        this.x + this.width - this.speed,
        this.y,
        this.width,
        this.height
      );
    }
    update() {
      this.x -= this.speed;
      if (this.x < 0 - this.width) this.x = 0;
    }
  }

  class Enemy {
    constructor(gameWidth, gameHeight) {
      this.gameHeight = gameHeight;
      this.gameWidth = gameWidth;
      this.width = 160;
      this.height = 119;
      this.image = document.getElementById("enemy");
      this.x = this.gameWidth;
      this.y = gameHeight - this.height;
      this.maxFrame = 5;
      this.fps = 20;
      this.frameTimer = 0;
      this.frameInterval = 1000 / this.fps;
      this.speed = 1;
      this.frameX = 0;
    }
    draw(context) {
      context.drawImage(
        this.image,
        this.width * this.frameX,
        0,
        this.width,
        this.height,
        this.x,
        this.y,
        this.width,
        this.height
      );
    }
    update(deltaTime) {
      if (this.frameX >= this.maxFrame) this.frameX = 0;
      else this.frameX++;
      this.x -= this.speed;
    }
  }
  function handleEnemies(deltaTime) {
    if (enemyTimer > enemyInterval + randomInterval) {
      enemies.push(new Enemy(WIDTH, HEIGHT));
      enemyTimer = 0;
    } else enemyTimer += deltaTime;
    enemies.forEach((enemy) => {
      enemy.draw(ctx);
      enemy.update(deltaTime);
    });
  }
  function displayStatusText() {}
  const input = new InputHandlers();
  const player = new Player(WIDTH, HEIGHT);
  const background = new Background(WIDTH, HEIGHT);
  let lastTime = 0;
  let enemyTimer = 0;
  let enemyInterval = 2000;
  let randomInterval = Math.random() * 1000 + 500;
  function animate(timeStamp) {
    const deltaTime = timeStamp - lastTime;
    lastTime = timeStamp;
    ctx.clearRect(0, 0, WIDTH, HEIGHT);
    background.draw(ctx);
    // background.update();

    player.draw(ctx);
    player.update(input);
    handleEnemies(deltaTime);
    requestAnimationFrame(animate);
  }
  animate(0);
});
