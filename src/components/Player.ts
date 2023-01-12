import { Game } from "./Game";
import { Bullet } from "./Bullet";
import { IDrawable } from "./types/Drawable";
import { IUpdatable } from "./types/Updatable";

export class Player implements IDrawable, IUpdatable{
    game: Game;
    width = 120;
    height = 190;
    x = 20;
    y = 100;
    speedY = 0;
    maxSpeed = 3;
    bullets: Bullet[] = [];

    constructor(game: Game) {
        this.game = game;
    } 

    update() {
        if (this.game.keys.includes('ArrowUp')) this.speedY = -this.maxSpeed;
        else if (this.game.keys.includes('ArrowDown')) this.speedY = this.maxSpeed;
        else this.speedY = 0;
        this.y += this.speedY;
        this.bullets.forEach(bullet => bullet.update());
        this.bullets = this.bullets.filter(bullet => !bullet.markForDelete);
    }

    draw() {
        this.game.ctx.fillStyle = 'black';
        this.game.ctx.fillRect(this.x, this.y, this.width, this.height);
        this.bullets.forEach(bullet => bullet.draw());
    }

    shoot() {
        if (this.game.ammo > 0) {
            this.bullets.push(new Bullet(this.game, this.x, this.y));
            this.game.ammo--;
        }
    }
}