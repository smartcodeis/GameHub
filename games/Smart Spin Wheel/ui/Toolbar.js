export default class Toolbar {
    constructor(app) {
        this.app = app;
        this.bind();
    }

    bind() {
        document.getElementById("spinBtn")
            ?.addEventListener("click", () => this.app.spin());

        document.getElementById("newWheelBtn")
            ?.addEventListener("click", () => this.app.openCreateWheel());

        document.getElementById("createWheelBtn")
            ?.addEventListener("click", () => this.app.openCreateWheel());

        document.getElementById("addItemBtn")
            ?.addEventListener("click", () => this.app.addItem());

        document.getElementById("emptyAddItemBtn")
            ?.addEventListener("click", () => this.app.addItem());

        document.getElementById("quickAddItemBtn")
            ?.addEventListener("click", () => this.app.addItem());

        document.getElementById("duplicateWheelBtn")
            ?.addEventListener("click", () => this.app.openDuplicateWheel());

        document.getElementById("quickDuplicateBtn")
            ?.addEventListener("click", () => this.app.openDuplicateWheel());

        document.getElementById("deleteWheelBtn")
            ?.addEventListener("click", () => this.app.openDeleteWheel());

        document.getElementById("clearHistoryBtn")
            ?.addEventListener("click", () => this.app.clearHistory());

        document.getElementById("quickClearHistoryBtn")
            ?.addEventListener("click", () => this.app.clearHistory());

        document.getElementById("spinAgainBtn")
            ?.addEventListener("click", () => this.app.spin());

        document.getElementById("removeWinnerBtn")
            ?.addEventListener("click", () => this.app.removeWinner());

        document.getElementById("previousWheelBtn")
            ?.addEventListener("click", () => this.app.previousWheel());

        document.getElementById("nextWheelBtn")
            ?.addEventListener("click", () => this.app.nextWheel());
    }
}