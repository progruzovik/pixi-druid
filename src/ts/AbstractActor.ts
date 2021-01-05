import { Event } from "./util"
import * as PIXI from "pixi.js"

/**
 * Базовый клас для отображаемых объектов, которые меняют свое состояние с течением времени
 */
export abstract class AbstractActor extends PIXI.Container {

    private isTickerActive = false

    protected constructor(isTickerEnabled: boolean = true) {
        super()
        if (isTickerEnabled) {
            this.activateTicker()
        }
    }

    activateTicker() {
        if (!this.isTickerActive) {
            this.isTickerActive = true
            this.on(Event.ADDED, () => PIXI.Ticker.shared.add(this.update, this))
            this.on(Event.REMOVED, () => PIXI.Ticker.shared.remove(this.update, this))
        }
    }

    /**
     * Метод, который вызывается при каждом обновлении картинки на экране
     * @param deltaTime Количество кадров, прошедшее с предыдущего вызова метода (относительно 60 FPS)
     */
    protected abstract update(deltaTime: number): void
}
