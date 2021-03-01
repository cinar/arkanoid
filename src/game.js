import { Space } from './space.js';
import { Paddle } from './paddle.js';
import { Ball } from './ball.js';
import { makeBricks } from './brick.js';

const LEVEL = [
  0, 0, 1, 1, 1, 1, 1, 1, 0, 0,
  0, 2, 2, 2, 2, 2, 2, 2, 2, 0,
  0, 3, 3, 3, 3, 3, 3, 3, 3, 0,
  0, 0, 4, 4, 4, 4, 4, 4, 0, 0,
  0, 0, 5, 5, 0, 0, 5, 5, 0, 0,
];

function isColliding(box1, box2) {
  if ((box1.rx < box2.lx) || (box2.rx < box1.lx)) {
    return false;
  }

  if ((box1.ry < box2.ly) || (box2.ry < box1.ly)) {
    return false;
  }

  return true;
}

/**
 * Game object.
 *
 * @author Onur Cinar
 */
export class Game {
  constructor() {
    this.space = new Space();
    this.paddle = new Paddle();
    this.ball = new Ball();
    this.bricks = makeBricks(LEVEL);
  }

  start() {
    this.gameLoop();
  }

  update() {
    this.paddle.update();
    this.ball.update();
  }

  draw() {
    this.paddle.draw(this.space.context);
    this.ball.draw(this.space.context);

    this.bricks.forEach((brick) => {
      brick.draw(this.space.context);
    });
  }

  gameLoop() {
    this.update();

    if (this.paddle.y < this.ball.y) {
      this.space.gameOver = true;
    } else if (isColliding(this.paddle.box(), this.ball.box())) {
      this.ball.bounceY();
    } else {
      const ballBox = this.ball.box();

      for (const brick of this.bricks) {
        if (brick.intact() && isColliding(ballBox, brick.box())) {
          this.ball.bounceY();

          brick.hit();
          if (!brick.intact()) {
            this.space.score++;
          }

          break;
        }
      }
    }

    this.space.clear();

    if (!this.space.gameOver) {
      this.draw();
      window.requestAnimationFrame(() => this.gameLoop());
    }
  }
}
