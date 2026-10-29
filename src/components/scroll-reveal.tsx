"use client";
import { useEffect } from "react";
export function ScrollReveal() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches || !("IntersectionObserver" in window)) return;
    document.documentElement.classList.add("has-reveal");
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => { if (entry.isIntersecting) { entry.target.classList.add("is-visible"); observer.unobserve(entry.target); } });
    }, { threshold: 0.12, rootMargin: "0px 0px -5% 0px" });
    const observeNew = (root: ParentNode) => root.querySelectorAll("[data-reveal]:not(.is-visible)").forEach((node) => observer.observe(node));
    observeNew(document);
    const mutationObserver = new MutationObserver((records) => records.forEach((record) =>
      record.addedNodes.forEach((node) => { if (node instanceof HTMLElement) { if (node.matches("[data-reveal]")) observer.observe(node); observeNew(node); } }),
    ));
    mutationObserver.observe(document.getElementById("main-content") ?? document.body, { childList: true, subtree: true });
    return () => { mutationObserver.disconnect(); observer.disconnect(); document.documentElement.classList.remove("has-reveal"); };
  }, []);
  return null;
}