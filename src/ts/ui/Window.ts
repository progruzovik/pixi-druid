import { AbstractBranch, Event, Rectangle } from "../";
import * as PIXI from "pixi.js";

/**
 * Модальное окно внутри канваса (отображаемый объект)
 */
export class Window extends AbstractBranch {

    /**
     * @property bg Прямоугольник, который появляется на фоне для его затемнения
     */
    private readonly bg: Rectangle;

    /**
     * @property window Основа модального окна
     */
    private readonly window: Rectangle;

    /**
     * @param windowWidth Ширина окна
     * @param windowHeight Высота окна
     * @param windowX Положение окна по координате x
     * @param windowY Положение окна по координате y
     * @param bgWidth Ширина фона
     * @param bgHeight Высота фона
     * @param content Всё, что будет отображено внутри модального окна
     */
    constructor(windowWidth: number, windowHeight: number, windowX: number, windowY: number,
                bgWidth: number, bgHeight: number, content: PIXI.Container) {
        super();
        this.bg = new Rectangle();
        this.bg.interactive = true;
        this.bg.alpha = 0.1;
        this.addChild(this.bg);
        this.window = new Rectangle(windowWidth, windowHeight, 0xdedede);
        this.window.position.set(windowX, windowY);
        this.window.addChild(content);
        this.addChild(this.window);
        this.setUpChildren(bgWidth, bgHeight);

        this.bg.on(Event.CLICK, () => {
            this.emit(Event.DONE);
            this.destroy({ children: true });
        });
    }

    /**
     * Обновляет размер фона
     * @param width Ширина фона
     * @param height Высота фона
     */
    setUpChildren(width: number, height: number): void {
        this.bg.width = width;
        this.bg.height = height;
    }
}
