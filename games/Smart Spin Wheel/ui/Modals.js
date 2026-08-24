export default class Modals {
    constructor(app) {
        this.app = app;
        this.createModal = document.getElementById("createWheelModal");
        this.editModal = document.getElementById("editWheelModal");
        this.duplicateModal = document.getElementById("duplicateWheelModal");
        this.deleteModal = document.getElementById("deleteWheelModal");
        this.winnerModal = document.getElementById("winnerModal");
        this.iconModal = document.getElementById("iconModal");
        this.activeItemId = null;
        this.bind();
    }

    bind() {
        document.getElementById("closeCreateWheelModal")
            ?.addEventListener("click", () => this.createModal.close());

        document.getElementById("cancelCreateWheel")
            ?.addEventListener("click", () => this.createModal.close());

        document.getElementById("confirmCreateWheel")
            ?.addEventListener("click",
                () => {
                    const input = document.getElementById("newWheelName");
                    this.app.createWheel(input.value);
                    input.value = "";
                    this.createModal.close();
                }
            );

        document.getElementById("closeDeleteWheelModal")
            ?.addEventListener("click", () => this.deleteModal.close());

        document.getElementById("cancelDeleteWheel")
            ?.addEventListener("click", () => this.deleteModal.close());

        document.getElementById("confirmDeleteWheel")
            ?.addEventListener(
                "click", () => {
                    this.app.deleteWheel();
                    this.deleteModal.close();
                }
            );

        document.getElementById("closeDuplicateWheelModal")
            ?.addEventListener("click", () => this.duplicateModal.close());

        document.getElementById("cancelDuplicateWheel")
            ?.addEventListener("click", () => this.duplicateModal.close());

        document.getElementById("confirmDuplicateWheel")
            ?.addEventListener(
                "click",
                () => {
                    const name = document.getElementById("duplicateWheelName").value;
                    this.app.duplicateWheel(name);
                    this.duplicateModal.close();
                }
            );

        document.getElementById("closeWinnerModal")
            ?.addEventListener("click", () => this.winnerModal.close());

        document.getElementById("winnerModalSpinAgain")
            ?.addEventListener("click",
                () => {
                    this.winnerModal.close();
                    this.app.spin();
                }
            );

        document.getElementById("closeIconModal")
            ?.addEventListener("click", () => this.iconModal.close());

        document.getElementById("iconGrid")
            ?.addEventListener("click", (event) => {
                const btn = event.target.closest("button");
                if (btn && this.activeItemId) {
                    const icon = btn.dataset.icon;
                    const item = this.app.currentWheel.getItem(this.activeItemId);
                    if (item) {
                        item.icon = icon;
                        this.app.save();
                        if (this.app.renderer) {
                            this.app.renderer.render(
                                this.app.currentWheel.items,
                                this.app.renderer.rotation
                            );
                        }
                        this.app.editor.render();
                        this.app.renderWheelInfo();
                    }
                    this.iconModal.close();
                }
            });
    }


    openCreate() {
        this.createModal.showModal();
    }

    openDuplicate() {
        this.duplicateModal.showModal();
    }

    openDelete() {
        const name = document.getElementById("deleteWheelName");
        name.textContent = this.app.currentWheel.name;
        this.deleteModal.showModal();
    }

    showWinner(item) {
        document.getElementById("winnerModalText").textContent = item.name;
        this.winnerModal.showModal();
    }

    openIcon(itemId) {
        this.activeItemId = itemId;
        this.iconModal.showModal();
    }

}