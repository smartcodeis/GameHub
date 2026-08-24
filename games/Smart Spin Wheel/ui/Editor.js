export default class Editor {
    constructor(app) {
        this.app = app;
        this.container =
            document.getElementById(
                "itemsContainer"
            );
        this.bind();
    }

    bind() {
        this.container
            ?.addEventListener(
                "input",
                event => {
                    const item = event.target.closest(".wheel-item");
                    if (!item) { return; }
                    const id = item.dataset.id;
                    const modelItem = this.app.currentWheel.getItem(id);
                    if (!modelItem) { return; }
                    if (event.target.classList.contains("item-name")) {
                        modelItem.name = event.target.value;
                    }

                    if (event.target.classList.contains("item-weight")) {
                        modelItem.weight = Math.max(1, Number(event.target.value) || 1);
                    }

                    if (event.target.classList.contains("item-color")) {
                        modelItem.color = event.target.value;
                    }

                    this.app.save();

                    if (this.app.renderer) {
                        this.app.renderer.render(
                            this.app.currentWheel.items,
                            this.app.renderer.rotation
                        );
                    }
                    this.app.renderWheelInfo();
                }
            );


        this.container
            ?.addEventListener(
                "click",
                event => {
                    const removeButton = event.target.closest(".remove-item-btn");
                    if (removeButton) {
                        const item = removeButton.closest(".wheel-item");
                        this.app.removeItem(item.dataset.id);
                        return;
                    }

                    const iconBtn = event.target.closest(".item-icon-btn");
                    if (iconBtn) {
                        const item = iconBtn.closest(".wheel-item");
                        this.app.modals.openIcon(item.dataset.id);
                        return;
                    }
                }
            );
    }

    render() {
        if (!this.container) {
            return;
        }
        this.container.innerHTML = "";
        this.app.currentWheel.items
            .forEach(item => {
                const element =
                    document
                        .getElementById("itemTemplate")
                        .content
                        .firstElementChild
                        .cloneNode(true);

                element.dataset.id = item.id;
                element.querySelector(".item-icon").textContent = item.icon;
                element.querySelector(".item-name").value = item.name;
                element.querySelector(".item-color").value = item.color;
                element.querySelector(".item-weight").value = item.weight;
                this.container.appendChild(element);
            });
    }
}