"use client";

import type { PointerEvent } from "react";

export function InteractiveMonogram() {
  function tiltWithPointer(event: PointerEvent<HTMLSpanElement>) {
    const bounds = event.currentTarget.getBoundingClientRect();
    const x = (event.clientX - bounds.left) / bounds.width - 0.5;
    const y = (event.clientY - bounds.top) / bounds.height - 0.5;
    event.currentTarget.style.setProperty("--tilt-x", `${-y * 52}deg`);
    event.currentTarget.style.setProperty("--tilt-y", `${x * 52}deg`);
  }

  function resetTilt(event: PointerEvent<HTMLSpanElement>) {
    event.currentTarget.style.setProperty("--tilt-x", "0deg");
    event.currentTarget.style.setProperty("--tilt-y", "0deg");
  }

  return (
    <span
      className="interactive-monogram"
      onPointerMove={tiltWithPointer}
      onPointerLeave={resetTilt}
    >
      AT
    </span>
  );
}
