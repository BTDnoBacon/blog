import { Tree } from "./tree.js";

class App {
    constructor() {
        this.canvas = document.createElement('canvas');
        document.body.appendChild(this.canvas);
        this.canvas.setAttribute('style', 'background-color : #000;')

        this.ctx = this.canvas.getContext('2d');
        this.pixelRatio = window.devicePixelRatio > 1 ? 2 : 1;

        window.addEventListener('resize', this.resize.bind(this), false);
        window.addEventListener('click', this.click.bind(this), false);
        this.resize()

        // new Tree(this.ctx, this.stageWidth/2, this.stageHeight);
    }

    resize() {
        this.stageWidth = document.body.clientWidth;
        this.stageHeight = document.body.clientHeight;

        this.canvas.width = this.stageWidth * this.pixelRatio;
        this.canvas.height = this.stageHeight * this.pixelRatio;
        this.ctx.scale(this.pixelRatio, this.pixelRatio);

        this.ctx.clearRect(0, 0, this.stageWidth, this.stageHeight);
    }

    click(event) {
        const {clientX} = event;


        let randomNum = Math.random(0, 10)
        const selectColor = [[31, 120, 50], [255, 51, 51], [153, 51, 255], [248, 224, 230], [206, 227, 246]];

        if (randomNum < 0.2) {
            var color = selectColor[0]
        }
        if (randomNum >= 0.2 && randomNum < 0.4) {
            var color = selectColor[1]
        }
        if (randomNum >= 0.4 && randomNum < 0.6) {
            var color = selectColor[2]
        }
        if (randomNum >= 0.6 && randomNum < 0.8) {
            var color = selectColor[3]
        }
        if (randomNum >= 0.8) {
            var color = selectColor[4]
        }

        new Tree(this.ctx, clientX, this.stageHeight, color);
    }

    
}

window.onload = () => {
    new App();
}