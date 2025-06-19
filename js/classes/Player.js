class Player extends Sprite {
  constructor({ collisionBlocks = [], imageSrc, frameRate, animations, loop }) {
    super({ imageSrc, frameRate, animations, loop });
    this.position = {
      x: 200,
      y: 200,
    };

    this.velocity = {
      x: 0,
      y: 0,
    };

    this.sides = {
      bottom: this.position.y + this.height,
    };

    this.gravity = 1;

    this.collisionBlocks = collisionBlocks;
  }

  update() {
    //blue box for player - dev purpose
    // c.fillStyle = "rgba(0,0,255,0.5)";
    // c.fillRect(this.position.x, this.position.y, this.width, this.height);
    this.position.x += this.velocity.x;

    this.updateHitBox();

    this.checkForHorizontalCollisions();
    this.applyGravity();

    this.updateHitBox();

    // c.fillRect(
    //   this.hitBox.position.x,
    //   this.hitBox.position.y,
    //   this.hitBox.width,
    //   this.hitBox.height
    // );
    this.checkForVerticalCollisions();
  }

  handleInput(keys) {
    if (this.preventInput) return;

    this.velocity.x = 0;
    if (keys.d.pressed) {
      this.switchSprite("runRight");
      this.velocity.x = 5;
      this.lastDirection = "right";
    } else if (keys.a.pressed) {
      this.switchSprite("runLeft");
      this.velocity.x = -5;
      this.lastDirection = "left";
    } else {
      if (this.lastDirection === "left") {
        this.switchSprite("idleLeft");
      } else {
        this.switchSprite("idleRight");
      }
    }
  }

  switchSprite(name) {
    if (this.image === this.animations[name].image) {
      return;
    }

    this.currentFrame = 0;
    this.image = this.animations[name].image;
    this.frameRate = this.animations[name].frameRate;
    this.frameBuffer = this.animations[name].frameBuffer;
    this.loop = this.animations[name].loop;
    this.currentAnimation = this.animations[name];
  }

  updateHitBox() {
    this.hitBox = {
      position: {
        x: this.position.x + 58,
        y: this.position.y + 34,
      },
      width: 50,
      height: 53,
    };
  }

  checkForHorizontalCollisions() {
    for (let i = 0; i < this.collisionBlocks.length; i++) {
      const collisionBlock = this.collisionBlocks[i];

      if (
        this.hitBox.position.x <=
          collisionBlock.position.x + collisionBlock.width &&
        this.hitBox.position.x + this.hitBox.width >=
          collisionBlock.position.x &&
        this.hitBox.position.y + this.hitBox.height >=
          collisionBlock.position.y &&
        this.hitBox.position.y <=
          collisionBlock.position.y + collisionBlock.height
      ) {
        if (this.velocity.x < 0) {
          const offset = this.hitBox.position.x - this.position.x;
          this.position.x =
            collisionBlock.position.x + collisionBlock.width - offset + 0.01;
          break;
        }

        if (this.velocity.x > 0) {
          const offset =
            this.hitBox.position.x - this.position.x + this.hitBox.width;
          this.position.x = collisionBlock.position.x - offset - 0.01;
          break;
        }
      }
    }
  }

  applyGravity() {
    this.velocity.y += this.gravity;
    this.position.y += this.velocity.y;
  }

  checkForVerticalCollisions() {
    for (let i = 0; i < this.collisionBlocks.length; i++) {
      const collisionBlock = this.collisionBlocks[i];

      if (
        this.hitBox.position.x <=
          collisionBlock.position.x + collisionBlock.width &&
        this.hitBox.position.x + this.hitBox.width >=
          collisionBlock.position.x &&
        this.hitBox.position.y + this.hitBox.height >=
          collisionBlock.position.y &&
        this.hitBox.position.y <=
          collisionBlock.position.y + collisionBlock.height
      ) {
        if (this.velocity.y < 0) {
          this.velocity.y = 0;
          const offset = this.hitBox.position.y - this.position.y;
          this.position.y =
            collisionBlock.position.y + collisionBlock.height + 0.01;
          break;
        }

        if (this.velocity.y > 0) {
          this.velocity.y = 0;
          const offset =
            this.hitBox.position.y - this.position.y + this.hitBox.height;
          this.position.y = collisionBlock.position.y - offset - 0.01;
          break;
        }
      }
    }
  }
}
