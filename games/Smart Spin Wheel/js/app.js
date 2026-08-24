import Storage from "../core/Storage.js";
import Router from "../core/Router.js";
import Utils from "../core/Utils.js";

import Wheel from "../wheel/Wheel.js";
import WheelRenderer from "../wheel/WheelRenderer.js";
import WheelAnimator from "../wheel/WheelAnimator.js";
import WheelPhysics from "../wheel/WheelPhysics.js";
import WheelHistory from "../wheel/WheelHistory.js";
import WheelStatistics from "../wheel/WheelStatistics.js";

import WheelModel from "../models/WheelModel.js";
import ItemModel from "../models/ItemModel.js";

import Sidebar from "../ui/Sidebar.js";
import Editor from "../ui/Editor.js";
import Toolbar from "../ui/Toolbar.js";
import Modals from "../ui/Modals.js";


class SmartSpinWheel {

    constructor() {

        this.wheels = [];

        this.currentWheelIndex = 0;

        this.currentWheel = null;

        this.wheel = null;

        this.renderer = null;

        this.animator = null;

        this.history = null;

        this.statistics = null;

        this.lastWinner = null;

    }


    init() {
    this.load();

    this.setupWheel();

    this.sidebar =
        new Sidebar(this);

    this.editor =
        new Editor(this);

    this.modals =
        new Modals(this);

    this.toolbar =
        new Toolbar(this);

    this.bindSettings();

    this.bindExamples();

    this.bindMobileMenu();

    this.bindSpin();

    this.render();
}


    load() {

        const saved =
            Storage.load();


        if (
            saved &&
            Array.isArray(saved.wheels) &&
            saved.wheels.length
        ) {

            this.wheels =
                saved.wheels.map(
                    wheel =>
                        new WheelModel(wheel)
                );

            this.currentWheelIndex =
                saved.currentWheelIndex || 0;

        } else {

            this.wheels = [
                new WheelModel({
                    name: "My Wheel",
                    items: [
                        {
                            name: "Option 1",
                            color: "#6366f1",
                            icon: "🎯"
                        },
                        {
                            name: "Option 2",
                            color: "#ec4899",
                            icon: "⭐"
                        },
                        {
                            name: "Option 3",
                            color: "#22c55e",
                            icon: "🔥"
                        },
                        {
                            name: "Option 4",
                            color: "#f59e0b",
                            icon: "🎁"
                        }
                    ]
                })
            ];

        }


        this.currentWheel =
            this.wheels[
                this.currentWheelIndex
            ];

    }


    setupWheel() {

        this.wheel =
            new Wheel(
                this.currentWheel
            );


        const canvas =
            document.getElementById(
                "wheelCanvas"
            );


        this.renderer =
            new WheelRenderer(canvas);


        this.animator =
            new WheelAnimator(
                this.renderer
            );


        this.history =
            new WheelHistory(
                this.currentWheel
            );


        this.statistics =
            new WheelStatistics(
                this.currentWheel
            );

    }


    save() {

        Storage.save({

            wheels:
                this.wheels.map(
                    wheel =>
                        wheel.toJSON()
                ),

            currentWheelIndex:
                this.currentWheelIndex

        });


        const status =
            document.getElementById(
                "saveMessage"
            );


        if (status) {

            status.textContent =
                "All changes saved";

        }

    }


    render() {

        this.sidebar.render();

        if (!this.currentWheel) {
            if (this.renderer) {
                this.renderer.render([], 0);
            }
            if (this.editor && this.editor.container) {
                this.editor.container.innerHTML = "";
            }
            const nameEl = document.getElementById("currentWheelName");
            if (nameEl) nameEl.textContent = "No Wheels";
            
            const countEl = document.getElementById("currentWheelItemCount");
            if (countEl) countEl.textContent = "0 items";

            const sideName = document.getElementById("sideWheelName");
            if (sideName) sideName.textContent = "No Wheels";

            const sideCount = document.getElementById("sideItemCount");
            if (sideCount) sideCount.textContent = "0";
            return;
        }

        this.wheel =
            new Wheel(
                this.currentWheel
            );

        this.history =
            new WheelHistory(
                this.currentWheel
            );

        this.statistics =
            new WheelStatistics(
                this.currentWheel
            );

        this.renderer.render(
            this.currentWheel.items,
            this.renderer.rotation
        );

        this.renderWheelInfo();

        this.editor.render();

        this.renderStatistics();

        this.renderHistory();

        this.renderSettings();

    }


    renderWheelInfo() {

        const name =
            this.currentWheel.name;


        const count =
            this.currentWheel.items.length;


        document.getElementById(
            "currentWheelName"
        ).textContent = name;


        document.getElementById(
            "currentWheelItemCount"
        ).textContent =
            `${count} items`;


        document.getElementById(
            "sideWheelName"
        ).textContent = name;


        document.getElementById(
            "sideItemCount"
        ).textContent = count;


        document.getElementById(
            "panelWheelName"
        )?.replaceChildren(
            document.createTextNode(name)
        );


        document.getElementById(
            "panelItemCount"
        )?.replaceChildren(
            document.createTextNode(String(count))
        );


        const empty =
            document.getElementById(
                "emptyItems"
            );


        if (empty) {

            empty.classList.toggle(
                "hidden",
                count > 0
            );

        }

    }


    renderSettings() {

        const settings =
            this.currentWheel.settings;


        document.getElementById(
            "wheelNameInput"
        ).value =
            this.currentWheel.name;


        document.getElementById(
            "removeDuplicates"
        ).checked =
            settings.removeDuplicates;


        document.getElementById(
            "removeWinnerAfterSpin"
        ).checked =
            settings.removeWinnerAfterSpin;


        document.getElementById(
            "preventDuplicates"
        ).checked =
            settings.preventDuplicates;


        document.getElementById(
            "enableSound"
        ).checked =
            settings.enableSound;


        document.getElementById(
            "enableConfetti"
        ).checked =
            settings.enableConfetti;


        document.getElementById(
            "highlightWinner"
        ).checked =
            settings.highlightWinner;


        const duration =
            document.getElementById(
                "spinDuration"
            );


        duration.value =
            settings.spinDuration;


        document.getElementById(
            "spinDurationValue"
        ).textContent =
            `${settings.spinDuration}s`;

    }


    renderStatistics() {

        const total =
            this.statistics.getTotalSpins();


        const items =
            this.statistics.getTotalItems();


        const most =
            this.statistics.getMostSelected();


        const last =
            this.statistics.getLastResult();


        document.getElementById(
            "totalSpins"
        ).textContent = total;


        document.getElementById(
            "totalItems"
        ).textContent = items;


        document.getElementById(
            "mostSelected"
        ).textContent =
            most?.name || "—";


        document.getElementById(
            "lastResult"
        ).textContent =
            last || "—";


        document.getElementById(
            "sideSpinCount"
        ).textContent = total;

    }


    renderHistory() {

        const container =
            document.getElementById(
                "historyContainer"
            );


        const empty =
            document.getElementById(
                "emptyHistory"
            );


        container.innerHTML = "";


        const history =
            this.currentWheel.history;


        empty.classList.toggle(
            "hidden",
            history.length > 0
        );


        history.forEach(entry => {

            const element =
                document.createElement(
                    "div"
                );


            element.className =
                "history-item";


            const date =
                new Date(
                    entry.timestamp
                );


            element.innerHTML = `
                <span>🎯</span>
                <strong>${entry.itemName}</strong>
                <small>
                    ${date.toLocaleString()}
                </small>
            `;


            container.appendChild(
                element
            );

        });

    }


    addItem() {

        const item =
            this.currentWheel.addItem({

                name:
                    `Item ${
                        this.currentWheel.items.length + 1
                    }`

            });


        this.save();

        this.render();

    }


    removeItem(id) {

        this.currentWheel.removeItem(
            id
        );


        this.save();

        this.render();

    }


    createWheel(name) {

        const wheel =
            new WheelModel({

                name:
                    name?.trim() ||
                    "New Wheel"

            });


        this.wheels.push(
            wheel
        );


        this.currentWheelIndex =
            this.wheels.length - 1;


        this.currentWheel =
            wheel;


        this.setupWheel();

        this.save();

        this.render();

    }


    selectWheel(id) {
        const index =
            this.wheels.findIndex(
                wheel =>
                    wheel.id === id
            );

        if (index === -1) {
            return;
        }

        this.currentWheelIndex =
            index;

        this.currentWheel =
            this.wheels[index];

        this.setupWheel();

        this.render();

        const sidebar = document.getElementById("sidebar");
        if (sidebar && window.innerWidth <= 800) {
            sidebar.classList.remove("active");
        }
    }


    deleteWheel() {

        this.wheels.splice(
            this.currentWheelIndex,
            1
        );

        this.currentWheelIndex =
            Math.max(
                0,
                this.currentWheelIndex - 1
            );

        this.currentWheel =
            this.wheels[
                this.currentWheelIndex
            ] || null;

        if (this.currentWheel) {
            this.setupWheel();
        }

        this.save();

        this.render();

    }


    duplicateWheel(name) {

        const copy =
            new WheelModel(
                JSON.parse(
                    JSON.stringify(
                        this.currentWheel.toJSON()
                    )
                )
            );


        copy.id =
            `wheel_${Date.now()}`;


        copy.name =
            name?.trim() ||
            `${this.currentWheel.name} Copy`;


        copy.items =
            copy.items.map(item => {

                item.id =
                    `item_${Date.now()}_${Math.random()
                        .toString(36)
                        .slice(2, 6)}`;

                return item;

            });


        this.wheels.push(
            copy
        );


        this.currentWheelIndex =
            this.wheels.length - 1;


        this.currentWheel =
            copy;


        this.setupWheel();

        this.save();

        this.render();

    }


    previousWheel() {

        if (this.wheels.length < 2) {
            return;
        }


        this.currentWheelIndex--;

        if (
            this.currentWheelIndex < 0
        ) {

            this.currentWheelIndex =
                this.wheels.length - 1;

        }


        this.currentWheel =
            this.wheels[
                this.currentWheelIndex
            ];


        this.setupWheel();

        this.render();

    }


    nextWheel() {

        if (this.wheels.length < 2) {
            return;
        }


        this.currentWheelIndex++;

        if (
            this.currentWheelIndex >=
            this.wheels.length
        ) {

            this.currentWheelIndex = 0;

        }


        this.currentWheel =
            this.wheels[
                this.currentWheelIndex
            ];


        this.setupWheel();

        this.render();

    }


    spin() {
    console.log("1 - spin started");

    if (!this.wheel.canSpin()) {
        console.log("2 - cannot spin");

        this.showToast("Add items before spinning.");
        return;
    }

    console.log("3 - can spin");

    const winner = this.wheel.chooseWinner();

    console.log("4 - winner:", winner);

    if (!winner) {
        console.log("5 - no winner");

        return;
    }

    this.wheel.isSpinning = true;

    this.lastWinner = winner;

    console.log("6 - calculating target");

    const target =
        WheelPhysics.getTargetRotation(
            this.currentWheel.items,
            winner
        );

    console.log("7 - target:", target);

    const duration =
        this.currentWheel.settings.spinDuration;

    const status =
        document.getElementById("spinStatus");

    status.textContent = "Spinning...";

    console.log("8 - starting animator");

    this.animator.spin(
        this.currentWheel.items,
        duration,
        this.renderer.rotation + target,
        null,
        () => {
            console.log("9 - animation finished");

            this.wheel.isSpinning = false;

            this.history.add(winner);

            this.showWinner(winner);

            if (
                this.currentWheel.settings
                    .removeWinnerAfterSpin
            ) {
                this.currentWheel.removeItem(
                    winner.id
                );
            }

            this.save();
            this.render();
        }
    );
}


    showWinner(item) {

        document.getElementById(
            "winnerText"
        ).textContent =
            item.name;


        document.getElementById(
            "winnerDisplay"
        ).classList.remove(
            "hidden"
        );


        document.getElementById(
            "spinStatus"
        ).textContent =
            "Winner selected!";


        this.modals.showWinner(
            item
        );

    }


    removeWinner() {

        if (!this.lastWinner) {
            return;
        }


        this.currentWheel.removeItem(
            this.lastWinner.id
        );


        this.lastWinner = null;


        document.getElementById(
            "winnerDisplay"
        ).classList.add(
            "hidden"
        );


        this.save();

        this.render();

    }


    clearHistory() {

        this.currentWheel.history =
            [];


        this.currentWheel.items
            .forEach(
                item =>
                    item.spins = 0
            );


        this.currentWheel.totalSpins =
            0;


        this.save();

        this.render();

    }


    openCreateWheel() {

        this.modals.openCreate();

    }


    openDuplicateWheel() {

        this.modals.openDuplicate();

    }


    openDeleteWheel() {

        this.modals.openDelete();

    }

    bindSpin() {
    const spinBtn = document.getElementById("spinBtn");
    const wheelCenter = document.getElementById("wheelCenter");

    console.log("SPIN BUTTON:", spinBtn);

    if (!spinBtn) {
        console.error("spinBtn NOT FOUND");
        return;
    }

    spinBtn.addEventListener("click", () => {
        console.log("SPIN CLICKED");
        this.spin();
    });

    if (wheelCenter) {
        wheelCenter.addEventListener("click", () => {
            this.spin();
        });
    }
}


    bindSettings() {

        const name =
            document.getElementById(
                "wheelNameInput"
            );


        name.addEventListener(
            "input",
            () => {

                this.currentWheel.name =
                    name.value ||
                    "My Wheel";

                this.save();

                this.renderWheelInfo();

            }
        );


        const settings = {

            removeDuplicates:
                "removeDuplicates",

            removeWinnerAfterSpin:
                "removeWinnerAfterSpin",

            preventDuplicates:
                "preventDuplicates",

            enableSound:
                "enableSound",

            enableConfetti:
                "enableConfetti",

            highlightWinner:
                "highlightWinner"

        };


        Object.entries(settings)
            .forEach(
                ([key, id]) => {

                    document
                        .getElementById(id)
                        .addEventListener(
                            "change",
                            event => {

                                this.currentWheel
                                    .settings[key] =
                                    event.target
                                        .checked;


                                this.save();

                            }
                        );

                }
            );


        const duration =
            document.getElementById(
                "spinDuration"
            );


        duration.addEventListener(
            "input",
            () => {

                this.currentWheel
                    .settings
                    .spinDuration =
                    Number(
                        duration.value
                    );


                document.getElementById(
                    "spinDurationValue"
                ).textContent =
                    `${duration.value}s`;


                this.save();

            }
        );

    }


    bindExamples() {

        document
            .querySelectorAll(
                ".example-item"
            )
            .forEach(button => {

                button.addEventListener(
                    "click",
                    async () => {

                        const type =
                            button.dataset
                                .example;


                        await this.loadExample(
                            type
                        );

                    }
                );

            });

    }


    async loadExample(type) {

        const examples = {
            food: [
                { name: "Pizza", icon: "🍕" },
                { name: "Burger", icon: "🍔" },
                { name: "Pasta", icon: "🍝" },
                { name: "Chicken", icon: "🍗" },
                { name: "Sushi", icon: "🍣" },
                { name: "Tacos", icon: "🌮" }
            ],
            movies: [
                { name: "Action", icon: "💥" },
                { name: "Comedy", icon: "😂" },
                { name: "Horror", icon: "👻" },
                { name: "Drama", icon: "🎭" },
                { name: "Animation", icon: "🦄" }
            ],
            places: [
                { name: "Beach", icon: "🏖️" },
                { name: "Mall", icon: "🛍️" },
                { name: "Cinema", icon: "🍿" },
                { name: "Park", icon: "🌳" },
                { name: "Restaurant", icon: "🍽️" }
            ],
            games: [
                { name: "FIFA", icon: "⚽" },
                { name: "Minecraft", icon: "🧱" },
                { name: "Fortnite", icon: "🪂" },
                { name: "Chess", icon: "♟️" },
                { name: "Uno", icon: "🃏" }
            ],
            gifts: [
                { name: "Watch", icon: "⌚" },
                { name: "Headphones", icon: "🎧" },
                { name: "Book", icon: "📚" },
                { name: "Game", icon: "🎮" },
                { name: "Gift Card", icon: "💳" }
            ],
            songs: [
                { name: "Pop", icon: "🎤" },
                { name: "Rock", icon: "🎸" },
                { name: "Rap", icon: "🧢" },
                { name: "Jazz", icon: "🎷" },
                { name: "Classic", icon: "🎻" }
            ],
            "truth-or-dare": [
                { name: "Truth", icon: "😇" },
                { name: "Dare", icon: "😈" },
                { name: "Truth", icon: "😇" },
                { name: "Dare", icon: "😈" }
            ]
        };


        const values =
            examples[type];


        if (!values) {
            return;
        }


        const wheel =
            new WheelModel({

                name:
                    type
                        .replaceAll("-", " ")
                        .replace(
                            /\b\w/g,
                            char =>
                                char.toUpperCase()
                        ),

                items:
                    values.map(
                        (item, index) => ({
                            name: item.name,
                            icon: item.icon,

                            color:
                                [
                                    "#6366f1",
                                    "#ec4899",
                                    "#22c55e",
                                    "#f59e0b",
                                    "#06b6d4",
                                    "#ef4444"
                                ][
                                    index % 6
                                ]

                        })
                    )

            });


        this.wheels.push(
            wheel
        );


        this.currentWheelIndex =
            this.wheels.length - 1;

        this.currentWheel =
            wheel;

        this.setupWheel();

        this.save();

        this.render();

        const sidebar = document.getElementById("sidebar");
        if (sidebar && window.innerWidth <= 800) {
            sidebar.classList.remove("active");
        }
    }


    bindMobileMenu() {
        const sidebar = document.getElementById("sidebar");
        const btn = document.getElementById("mobileMenuBtn");

        if (btn && sidebar) {
            btn.addEventListener("click", (e) => {
                e.stopPropagation();
                sidebar.classList.toggle("active");
            });

            document.addEventListener("click", (e) => {
                if (window.innerWidth <= 800 && sidebar.classList.contains("active")) {
                    if (!sidebar.contains(e.target)) {
                        sidebar.classList.remove("active");
                    }
                }
            });
        }
    }


    showToast(message) {

        const container =
            document.getElementById(
                "toastContainer"
            );


        const toast =
            document.createElement(
                "div"
            );


        toast.textContent =
            message;


        container.appendChild(
            toast
        );


        setTimeout(
            () =>
                toast.remove(),
            2500
        );

    }

}


document.addEventListener(
    "DOMContentLoaded",
    () => {

        const app =
            new SmartSpinWheel();

        app.init();

        window.smartSpinWheel =
            app;

    }
);