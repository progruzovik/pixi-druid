// noinspection JSUnusedGlobalSymbols

export const INDENT = 20

/**
 * Основные события, которые могут быть объявлены различными объектами внутри приложения
 */
export namespace Event {

    export const ADDED = "added"

    export const REMOVED = "removed"

    export const KEY_EVENT = "keyEvent"

    export const KEY_RELEASE = "keyRelease"

    export const POINTER_OVER = "pointerover"

    export const POINTER_DOWN = "pointerdown"

    export const POINTER_MOVE = "pointermove"

    export const POINTER_UP = "pointerup"

    export const POINTER_OUT = "pointerout"

    export const POINTER_UP_OUTSIDE = "pointerupoutside"

    export const POINTER_TAP = "pointertap"

    export const RESIZE = "resize"

    /**
     * Обновление объекта
     */
    export const UPDATE = "update"

    /**
     * Завершение работы объекта
     */
    export const DONE = "done"
}

export const enum Alignment {
    Left, Center, Right
}

export const enum BarTextConfig {
    Default, Custom
}

export interface SizeAware {
    resize(width: number, height: number): void
}

export class Point {
    constructor(readonly x: number, readonly y: number) {}
}
