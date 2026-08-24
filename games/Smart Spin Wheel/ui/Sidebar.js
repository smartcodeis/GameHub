export default class Sidebar {
    constructor(app) {
        this.app = app;
        this.container = document.getElementById("wheelList");
        this.render();
    }

    render() {
        if (!this.container) {
            return;
        }
        this.container.innerHTML = "";

        this.app.wheels.forEach(
            wheel => {
                const button = document.createElement("button");
                button.type = "button";
                button.dataset.id = wheel.id;
                button.innerHTML = `
                    <span>🎡</span>
                    <span>${wheel.name}</span>
                `;
                button.addEventListener("click", () => this.app.selectWheel(wheel.id));
                this.container.appendChild(button);
            }
        );

        const count = document.getElementById("wheelCount");

        if (count) {
            count.textContent = `${this.app.wheels.length} wheels`;
        }
    }
}