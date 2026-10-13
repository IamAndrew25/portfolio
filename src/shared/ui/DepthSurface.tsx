"use client";

import { useEffect, useRef, type ReactNode } from "react";

interface DepthSurfaceProps {
    children: ReactNode;
    className?: string;
    intensity?: number;
}

/** Enhances server-rendered content; the static 3D composition also works without JS. */
export function DepthSurface({ children, className = "", intensity = 4 }: DepthSurfaceProps) {
    const rootRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const current = rootRef.current;
        if (!current) return;
        const root: HTMLDivElement = current;

        const media = window.matchMedia("(prefers-reduced-motion: no-preference) and (hover: hover) and (pointer: fine)");
        const controller = new AbortController();
        const options = { signal: controller.signal };
        const limit = Math.max(0, Math.min(intensity, 8));
        let frame: number | null = null;
        let point = { x: 0, y: 0 };
        let active = false;

        function reset() {
            if (frame !== null) cancelAnimationFrame(frame);
            frame = null;
            if (!active) return;
            active = false;
            root.dataset.depthActive = "false";
            for (const property of ["--tilt-x", "--tilt-y", "--light-x", "--light-y"]) {
                root.style.removeProperty(property);
            }
        }

        function update() {
            frame = null;
            if (!media.matches || root.contains(document.activeElement)) return;
            // Measure the stationary wrapper, not its transformed child, to avoid feedback jitter.
            const bounds = root.getBoundingClientRect();
            if (!bounds.width || !bounds.height) return;
            const x = Math.max(0, Math.min(1, (point.x - bounds.left) / bounds.width));
            const y = Math.max(0, Math.min(1, (point.y - bounds.top) / bounds.height));
            root.style.setProperty("--tilt-x", `${((0.5 - y) * 2 * limit).toFixed(2)}deg`);
            root.style.setProperty("--tilt-y", `${((x - 0.5) * 2 * limit).toFixed(2)}deg`);
            root.style.setProperty("--light-x", `${(x * 100).toFixed(1)}%`);
            root.style.setProperty("--light-y", `${(y * 100).toFixed(1)}%`);
            root.dataset.depthActive = "true";
            active = true;
        }

        function move(event: PointerEvent) {
            if (!media.matches || event.pointerType !== "mouse" || root.contains(document.activeElement)) return;
            point = { x: event.clientX, y: event.clientY };
            if (frame === null) frame = requestAnimationFrame(update);
        }

        function updatePreference() {
            reset();
            root.dataset.depthMotion = media.matches ? "enabled" : "static";
        }

        updatePreference();
        root.addEventListener("pointermove", move, { ...options, passive: true });
        root.addEventListener("pointerleave", reset, options);
        root.addEventListener("pointercancel", reset, options);
        root.addEventListener("focusin", reset, options);
        media.addEventListener("change", updatePreference, options);
        window.addEventListener("blur", reset, options);
        window.addEventListener("scroll", reset, { ...options, passive: true });
        document.addEventListener("visibilitychange", reset, options);

        return () => {
            controller.abort();
            reset();
        };
    }, [intensity]);

    return (
        <div ref={rootRef} className={`depth-scene ${className}`} data-depth-motion="static" data-depth-active="false">
            <div className="depth-surface">{children}</div>
        </div>
    );
}
