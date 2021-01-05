import * as WebFont from "webfontloader"

export namespace FontLoader {

    export function load(families: string[], urls: string[]): Promise<void> {
        return new Promise<void>(resolve => {
            WebFont.load({
                custom: {
                    families: families,
                    urls: urls
                },
                active(): void {
                    resolve()
                }
            })
        })
    }
}
