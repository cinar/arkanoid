export const SPACE_WIDTH = 1000;
export const SPACE_HEIGHT = 600;

const CANVAS_ID = 'game';
const BACKGROUND_IMAGE_ID = 'background';

const SCORE_X = 20;
const SCORE_Y = SPACE_HEIGHT - 20;

const MESSAGE_X = Math.floor(SPACE_WIDTH / 2);
const MESSAGE_Y = Math.floor(SPACE_HEIGHT / 2);

/**
 * Space object.
 *
 * @author Onur Cinar
 */
export class Space {
  constructor() {
    this.backgroundImage = document.getElementById(BACKGROUND_IMAGE_ID);

    this.canvas = document.getElementById(CANVAS_ID);
    this.context = this.canvas.getContext('2d');

    this.score = 0;
    this.gameOver = false;
  }

  clear() {
    this.context.clearRect(0, 0, SPACE_WIDTH, SPACE_HEIGHT);
    this.context.drawImage(this.backgroundImage, 0, 0);

    this.context.fillStyle = 'white';
    this.context.font = '18px sans';
    this.context.fillText(`Score: ${this.score}`, SCORE_X, SCORE_Y);

    if (this.gameOver) {
      this.context.font = '32px sans';
      this.context.textAlign = 'center';
      this.context.fillText('GAME OVER', MESSAGE_X, MESSAGE_Y);
    }
  }
}