export class Branch {
    constructor(startX, startY, endX, endY, lineWidth, color) {
        this.startX = startX;
        this.startY = startY;
        this.endX = endX;
        this.endY = endY;
        // this.color = '#8B0000';
        this.color = color
        this.lineWidth = lineWidth;

        this.frame = 10;
        this.cntFrame = 0;

        // 가지의 길이를 frame으로 나누어 구간별 길이를 구함
        this.gapX = (this.endX - this.startX) / this.frame;
        this.gapY = (this.endY - this.startY) / this.frame;

        // 구간별 가지가 그려질 때 끝 좌표
        this.currentX = this.startX;
        this.currentY = this.startY;
    }

    colorChannelMixer(colorChannelA, colorChannelB, amount) {
        let colorA = colorChannelA * amount;
        let colorB = colorChannelB * (1-amount);
        // console.log(colorChannelA, colorChannelB)
        // console.log(colorA, colorB, amount)
        return parseInt(colorA + colorB)
    }

    colorMix(rgbA, rgbB, amount) {
        let r = this.colorChannelMixer(rgbA[0], rgbB[0], amount);
        let g = this.colorChannelMixer(rgbA[1], rgbB[1], amount);
        let b = this.colorChannelMixer(rgbA[1], rgbB[2], amount);
        // console.log(rgbA, rgbB, amount)
        return "rgb("+r+", "+g+", "+b+")";
    }

    draw(ctx) {
        if (this.cntFrame === this.frame) return true;

        ctx.beginPath();
        
        this.currentX += this.gapX
        this.currentY += this.gapY


        ctx.moveTo(this.startX, this.startY); // 선의 시작 위치 지정
        ctx.lineTo(this.currentX, this.currentY); // 선의 끝 위치 지정
        

        if (this.lineWidth < 3) {
            ctx.lineWidth = 0.5;
        } else if (this.lineWidth < 7) {
            ctx.lineWidth = this.lineWidth * 0.7;
        } else if (this.lineWidth < 10) {
            ctx.lineWidth = this.lineWidth * 0.9;
        } else {
            ctx.lineWidth = this.lineWidth;
        }


        // ctx.lineWidth = this.lineWidth; // 선의 두깨
        let currentColor = this.colorMix([255, 255, 255], this.color, +this.lineWidth/10)
        // console.log(currentColor)
        // ctx.fillStyle = this.color; 
        // ctx.strokeStyle = this.color;
        ctx.fillStyle = currentColor
        ctx.strokeStyle = currentColor


        ctx.stroke();
        ctx.closePath();

        this.cntFrame++;

        return false;
    }
}