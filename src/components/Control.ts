import { Game } from "./Game";

export class Control {
    game: Game;
    private controlKeys = ['ArrowUp', 'ArrowDown', ' '];

    constructor(game: Game) {
        this.game = game;
        window.addEventListener('keydown', e => {
            if (this.controlKeys.includes(e.key) && !this.game.keys.includes(e.key)) {
                this.game.keys.push(e.key);
            }
        });

        window.addEventListener('keyup', e => {
            const index = this.game.keys.indexOf(e.key);
            if (index > -1) this.game.keys.splice(index, 1);
        });
    }
}