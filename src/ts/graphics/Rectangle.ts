import { Shape } from "./Shape"

/**
 * Прямоугольник (отобржаемый объект)
 */
export class Rectangle extends Shape {

    /**
     * @property width Ширина
     * @property height Высота
     * @property color Код цвета (16-ричное число)
     */
    constructor(width: number = 0, height: number = 0, color: number = 0x000000) {
        super(width, height, color, 0)
    }

    /**
     * Отрисовывает прямоугольник на основе его свойств (ширина, высота, цвет)
     */
    protected draw(): void {
        this.graphics.beginFill(this.color)
        this.graphics.drawRect(0, 0, this.width, this.height)
        this.graphics.endFill()
    }
}
