window.addEventListener("load", () => {
  const canvas = document.getElementById("canvas1");
  const ctx = canvas.getContext("2d");
  const WIDTH = (canvas.width = 800);
  const HEIGHT = (canvas.height = 720);

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
    }
    update(input) {
      this.x += this.speed;
      if (input.keys.indexOf("ArrowRight") > -1) {
        this.speed = 5;
      } else if (input.keys.indexOf("ArrowLeft") > -1) {
        this.speed = -5;
      } else {
        this.speed = 0;
      }
      if (this.x < 0) this.x = 0;
      else if (this.x > this.gameWidth - this.width)
        this.x = this.gameWidth - this.width;
    }
    draw(context) {
      context.fillStyle = "white";
      context.fillRect(this.x, this.y, this.width, this.height);
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
  }
  class Enemy {}
  function handleEnemies() {}
  function displayStatusText() {}
  const input = new InputHandlers();
  const player = new Player(WIDTH, HEIGHT);
  function animate() {
    ctx.clearRect(0, 0, WIDTH, HEIGHT);
    player.draw(ctx);
    player.update(input);
    requestAnimationFrame(animate);
  }
  animate();
});
