import { Event } from "./util";
import * as PIXI from "pixi.js";

/**
 * Базовый клас для отображаемых объектов, которые меняют свое состояние с течением времени
 */
export abstract class AbstractActor extends PIXI.Container {

    constructor() {
        super();
        this.on(Event.ADDED, () => PIXI.ticker.shared.add(this.update, this));
        this.on(Event.REMOVED, () => PIXI.ticker.shared.remove(this.update, this));
    }

    /**
     * Метод, который вызывается при каждом обновлении картинки на экране
     * @param deltaTime Количество кадров, прошедшее с предыдущего вызова метода (относительно 60 FPS)
     */
    protected abstract update(deltaTime: number);
}
