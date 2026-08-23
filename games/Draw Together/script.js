const canvas = document.getElementById("drawingCanvas");
const ctx = canvas.getContext("2d");

const colorPicker = document.getElementById("colorPicker");
const colorValue = document.getElementById("colorValue");

const sizeSlider = document.getElementById("sizeSlider");
const sizeValue = document.getElementById("sizeValue");
const sizePreview = document.getElementById("sizePreview");

const undoBtn = document.getElementById("undoBtn");
const redoBtn = document.getElementById("redoBtn");

const clearBtn = document.getElementById("clearBtn");
const saveBtn = document.getElementById("saveBtn");
const exportBtn = document.getElementById("exportBtn");
const galleryBtn = document.getElementById("galleryBtn");
const canvasSaveFloat = document.getElementById("canvasSaveFloat");

const status = document.getElementById("status");

const tools = document.querySelectorAll(".tool");
const colors = document.querySelectorAll(".color");

// Gallery elements
const galleryModal = document.getElementById("galleryModal");
const galleryClose = document.getElementById("galleryClose");
const galleryGrid = document.getElementById("galleryGrid");
const galleryEmpty = document.getElementById("galleryEmpty");


// =========================
// VARIABLES
// =========================

let currentTool = "pencil";
let currentColor = "#111827";
let brushSize = 5;

const toolSizes = {
    pencil: 5,
    brush: 5,
    eraser: 15
};

let isDrawing = false;

let lastX = 0;
let lastY = 0;

let undoStack = [];
let redoStack = [];


// =========================
// CANVAS SETUP
// =========================

function setupCanvas() {

    const rect = canvas.getBoundingClientRect();

    const oldCanvas = document.createElement("canvas");

    oldCanvas.width = canvas.width;
    oldCanvas.height = canvas.height;

    if (canvas.width > 0 && canvas.height > 0) {
        oldCanvas
            .getContext("2d")
            .drawImage(canvas, 0, 0);
    }

    const dpr = window.devicePixelRatio || 1;

    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;

    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, rect.width, rect.height);

    if (oldCanvas.width > 0 && oldCanvas.height > 0) {

        const oldRatio =
            oldCanvas.width / oldCanvas.height;

        const newRatio =
            rect.width / rect.height;

        if (Math.abs(oldRatio - newRatio) < 0.3) {

            ctx.drawImage(
                oldCanvas,
                0,
                0,
                oldCanvas.width,
                oldCanvas.height,
                0,
                0,
                rect.width,
                rect.height
            );

        }
    }
}

setupCanvas();

window.addEventListener("resize", () => {
    setupCanvas();
});


// =========================
// POINTER POSITION
// =========================

function getPointerPosition(e) {

    const rect = canvas.getBoundingClientRect();

    return {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
    };
}


// =========================
// GET EFFECTIVE BRUSH SIZE
// =========================

function getEffectiveBrushSize() {
    if (currentTool === "brush") {
        return brushSize * 2;
    }
    return brushSize;
}


// =========================
// START DRAWING
// =========================

canvas.addEventListener("pointerdown", (e) => {

    const position = getPointerPosition(e);

    if (currentTool === "fill") {

        saveState();

        floodFill(
            Math.floor(position.x),
            Math.floor(position.y),
            currentColor
        );

        return;
    }

    saveState();

    isDrawing = true;

    lastX = position.x;
    lastY = position.y;

    canvas.setPointerCapture(e.pointerId);

    drawDot(lastX, lastY);
});


// =========================
// DRAW
// =========================

canvas.addEventListener("pointermove", (e) => {

    if (!isDrawing) return;

    const position = getPointerPosition(e);

    drawLine(
        lastX,
        lastY,
        position.x,
        position.y
    );

    lastX = position.x;
    lastY = position.y;
});


// =========================
// STOP DRAWING
// =========================

canvas.addEventListener("pointerup", stopDrawing);
canvas.addEventListener("pointercancel", stopDrawing);
canvas.addEventListener("pointerleave", (e) => {

    if (isDrawing) {
        const position = getPointerPosition(e);

        drawLine(
            lastX,
            lastY,
            position.x,
            position.y
        );

        lastX = position.x;
        lastY = position.y;
    }
});


function stopDrawing() {

    isDrawing = false;
}


// =========================
// DRAW DOT
// =========================

function drawDot(x, y) {

    ctx.save();

    const size = getEffectiveBrushSize();

    if (currentTool === "eraser") {

        ctx.globalCompositeOperation =
            "destination-out";

        ctx.fillStyle = "rgba(0,0,0,1)";

    } else {

        ctx.globalCompositeOperation =
            "source-over";

        ctx.fillStyle = currentColor;
    }

    ctx.beginPath();

    ctx.arc(
        x,
        y,
        size / 2,
        0,
        Math.PI * 2
    );

    ctx.fill();

    ctx.restore();
}


// =========================
// DRAW LINE
// =========================

function drawLine(x1, y1, x2, y2) {

    ctx.save();

    ctx.lineCap = "round";
    ctx.lineJoin = "round";

    const size = getEffectiveBrushSize();

    if (currentTool === "eraser") {

        ctx.globalCompositeOperation =
            "destination-out";

        ctx.strokeStyle = "rgba(0,0,0,1)";

    } else {

        ctx.globalCompositeOperation =
            "source-over";

        ctx.strokeStyle = currentColor;
    }

    ctx.lineWidth = size;

    ctx.beginPath();

    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);

    ctx.stroke();

    ctx.restore();
}


// =========================
// TOOLS
// =========================

tools.forEach((tool) => {

    tool.addEventListener("click", () => {

        tools.forEach((item) => {
            item.classList.remove("active");
        });

        tool.classList.add("active");

        currentTool = tool.dataset.tool;

        if (toolSizes[currentTool] !== undefined) {
            brushSize = toolSizes[currentTool];

            sizeSlider.value = brushSize;
            sizeValue.textContent = `${brushSize}px`;

            updateSizePreview();
        }

        updateStatus();
        updateCursor();
    });

});


function updateStatus() {

    const names = {
        pencil: "✏️ Pencil selected",
        brush: "🖌️ Brush selected",
        eraser: "🧽 Eraser selected",
        fill: "🪣 Fill selected"
    };

    status.textContent =
        names[currentTool];
}


function updateCursor() {

    if (currentTool === "fill") {

        canvas.style.cursor = "cell";

    } else if (currentTool === "eraser") {

        canvas.classList.add("eraser-cursor");

    } else {

        canvas.style.cursor = "crosshair";
    }
}


// =========================
// COLORS
// =========================

colorPicker.addEventListener("input", (e) => {

    currentColor = e.target.value;

    colorValue.textContent =
        currentColor.toUpperCase();
});


colors.forEach((color) => {

    color.addEventListener("click", () => {

        currentColor =
            color.dataset.color;

        colorPicker.value =
            currentColor;

        colorValue.textContent =
            currentColor.toUpperCase();
    });

});


// =========================
// BRUSH SIZE
// =========================

sizeSlider.addEventListener("input", () => {

    brushSize =
        Number(sizeSlider.value);

    sizeValue.textContent =
        `${brushSize}px`;

    updateSizePreview();
});


function updateSizePreview() {

    const size =
        Math.min(brushSize, 50);

    sizePreview.style.width =
        `${size}px`;

    sizePreview.style.height =
        `${size}px`;
}

updateSizePreview();


// =========================
// UNDO / REDO
// =========================

function saveState() {

    undoStack.push(
        canvas.toDataURL()
    );

    if (undoStack.length > 30) {
        undoStack.shift();
    }

    redoStack = [];

    updateHistoryButtons();
}


function restoreState(dataURL) {

    const image = new Image();

    image.onload = () => {

        const rect =
            canvas.getBoundingClientRect();

        ctx.clearRect(
            0,
            0,
            rect.width,
            rect.height
        );

        ctx.drawImage(
            image,
            0,
            0,
            rect.width,
            rect.height
        );
    };

    image.src = dataURL;
}


undoBtn.addEventListener("click", () => {

    if (undoStack.length === 0) {
        return;
    }

    redoStack.push(
        canvas.toDataURL()
    );

    const previous =
        undoStack.pop();

    restoreState(previous);

    updateHistoryButtons();
});


redoBtn.addEventListener("click", () => {

    if (redoStack.length === 0) {
        return;
    }

    undoStack.push(
        canvas.toDataURL()
    );

    const next =
        redoStack.pop();

    restoreState(next);

    updateHistoryButtons();
});


function updateHistoryButtons() {

    undoBtn.disabled =
        undoStack.length === 0;

    redoBtn.disabled =
        redoStack.length === 0;
}

updateHistoryButtons();


// =========================
// CLEAR
// =========================

clearBtn.addEventListener("click", () => {

    const confirmed =
        confirm("Clear your entire drawing?");

    if (!confirmed) return;

    saveState();

    const rect =
        canvas.getBoundingClientRect();

    ctx.save();

    ctx.globalCompositeOperation =
        "source-over";

    ctx.fillStyle = "#ffffff";

    ctx.fillRect(
        0,
        0,
        rect.width,
        rect.height
    );

    ctx.restore();
});


// =========================
// FILL TOOL
// =========================

function floodFill(startX, startY, fillColor) {

    const width = canvas.width;
    const height = canvas.height;

    const rect = canvas.getBoundingClientRect();

    // Convert CSS coordinates to actual canvas pixels
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;

    startX = Math.floor(startX * scaleX);
    startY = Math.floor(startY * scaleY);

    const imageData = ctx.getImageData(
        0,
        0,
        width,
        height
    );

    const pixels = imageData.data;

    const startIndex =
        (startY * width + startX) * 4;

    const targetColor = [
        pixels[startIndex],
        pixels[startIndex + 1],
        pixels[startIndex + 2],
        pixels[startIndex + 3]
    ];

    const replacementColor =
        hexToRgba(fillColor);

    if (
        colorsMatch(
            targetColor,
            replacementColor
        )
    ) {
        return;
    }

    const stack = [
        [startX, startY]
    ];

    while (stack.length) {

        const [x, y] = stack.pop();

        if (
            x < 0 ||
            y < 0 ||
            x >= width ||
            y >= height
        ) {
            continue;
        }

        const index =
            (y * width + x) * 4;

        const currentColor = [
            pixels[index],
            pixels[index + 1],
            pixels[index + 2],
            pixels[index + 3]
        ];

        if (
            !colorsMatch(
                currentColor,
                targetColor
            )
        ) {
            continue;
        }

        pixels[index] =
            replacementColor[0];

        pixels[index + 1] =
            replacementColor[1];

        pixels[index + 2] =
            replacementColor[2];

        pixels[index + 3] =
            replacementColor[3];

        stack.push([x + 1, y]);
        stack.push([x - 1, y]);
        stack.push([x, y + 1]);
        stack.push([x, y - 1]);
    }

    ctx.putImageData(
        imageData,
        0,
        0
    );
}


function colorsMatch(a, b) {

    return (
        a[0] === b[0] &&
        a[1] === b[1] &&
        a[2] === b[2] &&
        a[3] === b[3]
    );
}


function hexToRgba(hex) {

    hex = hex.replace("#", "");

    if (hex.length === 3) {

        hex =
            hex
                .split("")
                .map(c => c + c)
                .join("");
    }

    return [
        parseInt(hex.substring(0, 2), 16),
        parseInt(hex.substring(2, 4), 16),
        parseInt(hex.substring(4, 6), 16),
        255
    ];
}


// =========================
// SAVE DRAWING (to gallery)
// =========================

function saveToGallery() {

    const rect = canvas.getBoundingClientRect();
    const dataURL = canvas.toDataURL("image/png");
    const timestamp = Date.now();
    const name = `Drawing ${new Date(timestamp).toLocaleString("ar-EG")}`;

    // Load existing gallery
    const gallery = loadGallery();

    gallery.unshift({
        id: timestamp,
        name: name,
        dataURL: dataURL,
        date: timestamp,
        // Save logical canvas dimensions so we can restore correctly
        canvasWidth: rect.width,
        canvasHeight: rect.height
    });

    // Keep max 20 drawings
    if (gallery.length > 20) {
        gallery.length = 20;
    }

    saveGallery(gallery);
}

function flashSaveBtn(btn) {
    const oldHTML = btn.innerHTML;
    btn.innerHTML = "✅ Saved!";
    btn.disabled = true;
    setTimeout(() => {
        btn.innerHTML = oldHTML;
        btn.disabled = false;
    }, 1500);
}

saveBtn.addEventListener("click", () => {
    saveToGallery();
    flashSaveBtn(saveBtn);
});

canvasSaveFloat.addEventListener("click", () => {
    saveToGallery();
    flashSaveBtn(canvasSaveFloat);
});


// =========================
// GALLERY DATA
// =========================

function loadGallery() {
    try {
        const raw = localStorage.getItem("drawTogetherGallery");
        return raw ? JSON.parse(raw) : [];
    } catch {
        return [];
    }
}

function saveGallery(gallery) {
    try {
        localStorage.setItem("drawTogetherGallery", JSON.stringify(gallery));
    } catch (e) {
        alert("Storage full! Please delete some drawings from the gallery.");
    }
}


// =========================
// GALLERY UI
// =========================

galleryBtn.addEventListener("click", () => {
    openGallery();
});

galleryClose.addEventListener("click", () => {
    galleryModal.classList.remove("open");
});

galleryModal.addEventListener("click", (e) => {
    if (e.target === galleryModal) {
        galleryModal.classList.remove("open");
    }
});

document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
        galleryModal.classList.remove("open");
    }
});

function openGallery() {
    renderGallery();
    galleryModal.classList.add("open");
}

function renderGallery() {

    const gallery = loadGallery();

    galleryGrid.innerHTML = "";

    if (gallery.length === 0) {
        galleryEmpty.style.display = "flex";
        galleryGrid.style.display = "none";
        return;
    }

    galleryEmpty.style.display = "none";
    galleryGrid.style.display = "grid";

    gallery.forEach((item) => {

        const card = document.createElement("div");
        card.className = "gallery-card";
        card.dataset.id = item.id;

        const date = new Date(item.date);
        const dateStr = date.toLocaleDateString("ar-EG") + " " + date.toLocaleTimeString("ar-EG", { hour: "2-digit", minute: "2-digit" });

        card.innerHTML = `
            <div class="gallery-thumb">
                <img src="${item.dataURL}" alt="${item.name}" loading="lazy">
            </div>
            <div class="gallery-info">
                <span class="gallery-date">${dateStr}</span>
                <div class="gallery-actions">
                    <button class="gallery-load-btn" data-id="${item.id}" title="Open drawing">
                        📂 Open
                    </button>
                    <button class="gallery-download-btn" data-id="${item.id}" title="Save">
                        💾 Save
                    </button>
                    <button class="gallery-delete-btn" data-id="${item.id}" title="Delete">
                        🗑️ Delete
                    </button>
                </div>
            </div>
        `;

        galleryGrid.appendChild(card);
    });

    // Events
    galleryGrid.querySelectorAll(".gallery-load-btn").forEach(btn => {
        btn.addEventListener("click", () => {
            const id = Number(btn.dataset.id);
            loadDrawingFromGallery(id);
        });
    });

    galleryGrid.querySelectorAll(".gallery-download-btn").forEach(btn => {
        btn.addEventListener("click", () => {
            const id = Number(btn.dataset.id);
            downloadDrawingFromGallery(id);
        });
    });

    galleryGrid.querySelectorAll(".gallery-delete-btn").forEach(btn => {
        btn.addEventListener("click", () => {
            const id = Number(btn.dataset.id);
            deleteDrawingFromGallery(id);
        });
    });
}

function loadDrawingFromGallery(id) {

    const gallery = loadGallery();
    const item = gallery.find(g => g.id === id);

    if (!item) return;

    const confirmed = confirm("This will replace your current drawing. Continue?");
    if (!confirmed) return;

    saveState();

    const image = new Image();
    image.onload = () => {
        const rect = canvas.getBoundingClientRect();

        // White background
        ctx.save();
        ctx.globalCompositeOperation = "source-over";
        ctx.fillStyle = "#ffffff";
        ctx.fillRect(0, 0, rect.width, rect.height);
        ctx.restore();

        // Use saved logical dimensions for correct scaling
        const srcW = item.canvasWidth || rect.width;
        const srcH = item.canvasHeight || rect.height;

        // Object-contain: scale to fit without distortion
        const scale = Math.min(rect.width / srcW, rect.height / srcH);
        const drawW = srcW * scale;
        const drawH = srcH * scale;
        const dx = (rect.width - drawW) / 2;
        const dy = (rect.height - drawH) / 2;

        ctx.drawImage(image, dx, dy, drawW, drawH);
    };
    image.src = item.dataURL;

    galleryModal.classList.remove("open");
}

function downloadDrawingFromGallery(id) {

    const gallery = loadGallery();
    const item = gallery.find(g => g.id === id);

    if (!item) return;

    const link = document.createElement("a");
    link.download = `drawing-${id}.png`;
    link.href = item.dataURL;
    link.click();
}

function deleteDrawingFromGallery(id) {

    const confirmed = confirm("Delete this drawing?");
    if (!confirmed) return;

    const gallery = loadGallery();
    const updated = gallery.filter(g => g.id !== id);
    saveGallery(updated);

    renderGallery();
}


// =========================
// EXPORT IMAGE
// =========================

exportBtn.addEventListener("click", () => {

    const exportCanvas =
        document.createElement("canvas");

    const rect =
        canvas.getBoundingClientRect();

    exportCanvas.width =
        rect.width;

    exportCanvas.height =
        rect.height;

    const exportCtx =
        exportCanvas.getContext("2d");

    exportCtx.fillStyle =
        "#ffffff";

    exportCtx.fillRect(
        0,
        0,
        exportCanvas.width,
        exportCanvas.height
    );

    exportCtx.drawImage(
        canvas,
        0,
        0,
        canvas.width,
        canvas.height,
        0,
        0,
        rect.width,
        rect.height
    );

    const link =
        document.createElement("a");

    link.download =
        `draw-together-${Date.now()}.png`;

    link.href =
        exportCanvas.toDataURL("image/png");

    link.click();
});