import { IDrawable } from "components/types/Drawable";
import { IUpdatable } from "components/types/Updatable";
import { Game } from "../Game";
import { Sprite } from "../Sprite";


export abstract class Enemy extends Sprite implements IDrawable, IUpdatable {
    game: Game;
    markedForDelete = false;
    speedX: number;
    x: number;
    frameX = 0;

    abstract maxFrame: number;
    abstract frameY: number;
    abstract score: number;
    abstract lives: number;
    abstract y: number;
    abstract width: number;
    abstract height: number;
    abstract image: HTMLImageElement;
    
    constructor(game: Game) {
        super();
        this.game = game;
        this.x = game.width;
        this.speedX = Math.random() * -1.5 - 0.5;
    }

    update() {
        this.x += this.speedX;
        if (this.x + this.width < 0) this.markedForDelete = true;
        this.updateSprite();
    }

    draw() {
        this.drawSprite();
        if (this.game.debug) {
            this.game.ctx.fillStyle = 'black';
            this.game.ctx.font = '20px Helvetica';
            this.game.ctx.fillText(this.lives.toString(), this.x, this.y);
        }
        
    }
}