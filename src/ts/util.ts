import * as PIXI from "pixi.js";

export const INDENT = 20;

/**
 * Основные события, которые могут быть объявлены различными объектами внутри приложения
 */
export namespace Event {

    export const ADDED = "added";

    export const REMOVED = "removed";

    /**
     * Нажатие на объект
     */
    export const CLICK = "click";

    export const MOUSE_OVER = "mouseover";

    export const MOUSE_DOWN = "mousedown";

    export const MOUSE_MOVE = "mousemove";

    export const MOUSE_UP = "mouseup";

    export const MOUSE_OUT = "mouseout";

    export const TOUCH_START = "touchstart";

    export const TOUCH_END = "touchend";

    /**
     * Обновление объекта
     */
    export const UPDATE = "update";

    /**
     * Завершение работы объекта
     */
    export const DONE = "done";
}

export const enum Alignment {
    Left, Center, Right
}

export const enum BarTextConfig {
    Default, Custom
}

export interface SizeAware {
    setUpChildren(width: number, height: number): void;
}

export abstract class AbstractBranch extends PIXI.Container implements SizeAware {
    abstract setUpChildren(width: number, height: number): void;
}

export class Point {
    constructor(readonly x: number, readonly y: number) {}
}
