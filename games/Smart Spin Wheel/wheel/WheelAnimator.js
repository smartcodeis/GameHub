export default class WheelAnimator {
    constructor(renderer) {
        this.renderer = renderer;
    }
    spin(
        items,
        duration,
        targetRotation,
        onUpdate,
        onComplete
    ) {
        const start = performance.now();
        const startRotation = this.renderer.rotation;
        const durationMs = duration * 1000;
        const animate = now => {
            const elapsed = now - start;
            const progress = Math.min(elapsed / durationMs, 1);
            const eased = 1 - Math.pow(1 - progress, 4);
            this.renderer.rotation = startRotation + (targetRotation - startRotation) * eased;
            this.renderer.render(items, this.renderer.rotation);
            if (onUpdate) {
                onUpdate(progress);
            }
            if (progress < 1) {
                requestAnimationFrame(animate);
            } else {
                if (onComplete) {
                    onComplete();
                }
            }
        };
        requestAnimationFrame(animate);
    }
}