import { Shape } from "./Shape";

export class Line extends Shape {

    constructor(thickness: number = 1, color: number = 0x000000) {
        super(0, 0, color, thickness);
        this.pivot.y = this.thickness / 2;
    }

    get height(): number {
        return this.thickness;
    }

    set height(value: number) {
        this.thickness = value;
    }

    directTo(x: number, y: number): void {
        const dx = x - this.x, dy = y - this.y;
        this.width = Math.sqrt(dx * dx + dy * dy);
        this.rotation = Math.atan2(dy, dx);
    }

    protected draw(): void {
        this.graphics.lineStyle(this.thickness, this.color);
        this.graphics.moveTo(0, this.thickness / 2);
        this.graphics.lineTo(this.width, this.thickness / 2);
    }
}
