// enum INPUT {
//     FORWARD,
//     LEFT,
//     RIGHT,
//     DOWN,
// }

class KeyListener {
    state = new Set<string>();

    constructor() {
        document.addEventListener("keydown", (e) => this.down(e), false);
        document.addEventListener("keyup", (e) => this.up(e), false);
    }

    down(e: KeyboardEvent): void {
        this.state.add(e.key);
        // if (e.ctrlKey) {
        //     this.state.add("ctrl");
        // }

        // if (e.shiftKey) {
        //     this.state.add("shift");
        // }

        // if (e.altKey) {
        //     this.state.add("alt");
        // }
    }

    up(e: KeyboardEvent) {
        this.state.delete(e.key);
    }
}

export const KeyListenerInstance = new KeyListener();
