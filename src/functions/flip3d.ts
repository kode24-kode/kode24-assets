//const MAX_ROTATE = 60; // degrees
const DAMPING = 0.12; // lerp amount for smoothing (0..1)

interface Rotation {
  rx: number;
  ry: number;
}

/**
 * Legger til en 3D-hover-effekt på et HTML-element.
 * @param element HTML-elementet som skal få effekten
 * @param degrees Maks rotasjonsvinkel i grader (default: 6)
 */
export default function bind3DHover(element: HTMLElement, degrees = 6): void {
  if (element === null) return;
  let rect: DOMRect | null = null;
  let pointerInside = false;

  const target: Rotation = { rx: 0, ry: 0 };
  const current: Rotation = { rx: 0, ry: 0 };
  let rafId: number | null = null;

  function updateRect(): void {
    rect = element.getBoundingClientRect();
  }

  function onEnter(): void {
    pointerInside = true;
    element.classList.add("is-hovered");
    updateRect();
    startLoop();
  }

  function onMove(e: PointerEvent): void {
    if (!rect) updateRect();
    if (!rect) return;

    const x = e.clientX;
    const y = e.clientY;
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;

    // normalized -1..1 where 0 is center
    let nx = (x - cx) / (rect.width / 2);
    let ny = (y - cy) / (rect.height / 2);
    nx = Math.max(-1, Math.min(1, nx));
    ny = Math.max(-1, Math.min(1, ny));

    // rotateX rotates around the X axis (tilt up/down), invert ny
    target.rx = -ny * degrees;
    // rotateY rotates around the Y axis (tilt left/right)
    target.ry = nx * degrees;
  }

  function onLeave(): void {
    pointerInside = false;
    element.classList.remove("is-hovered");
    target.rx = 0;
    target.ry = 0;
  }

  function applyTransform(): void {
    // lerp only the rotation components
    current.rx += (target.rx - current.rx) * DAMPING;
    current.ry += (target.ry - current.ry) * DAMPING;

    const transform = `rotateX(${current.rx.toFixed(
      2
    )}deg) rotateY(${current.ry.toFixed(2)}deg)`;
    element.style.transform = transform;
  }

  function loop(): void {
    applyTransform();
    const closeToZero =
      Math.abs(current.rx) < 0.01 && Math.abs(current.ry) < 0.01;

    if (!pointerInside && closeToZero) {
      if (rafId !== null) cancelAnimationFrame(rafId);
      rafId = null;
      return;
    }

    rafId = requestAnimationFrame(loop);
  }

  function startLoop(): void {
    if (rafId === null) rafId = requestAnimationFrame(loop);
  }

  element.addEventListener("pointerenter", onEnter);
  element.addEventListener("pointermove", onMove);
  element.addEventListener("pointerleave", onLeave);
  window.addEventListener("resize", updateRect);
}
