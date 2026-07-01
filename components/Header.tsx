"use client";

import { useEffect, useState } from "react";

const NAV_ITEMS = [
  { href: "#services", label: "サービス" },
  { href: "#about", label: "私たちについて" },
  { href: "#works", label: "実績" },
  { href: "#news", label: "お知らせ" },
  { href: "#contact", label: "お問い合わせ" },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className={scrolled ? "scrolled" : ""}>
      <div className="container nav">
        <a href="#top" className="logo">
          <span className="mark">B</span>Blue&nbsp;Bridge
        </a>
        <nav className={`nav-links ${open ? "open" : ""}`.trim()}>
          {NAV_ITEMS.map((item) => (
            <a key={item.href} href={item.href} onClick={() => setOpen(false)}>
              {item.label}
            </a>
          ))}
          <a
            href="#contact"
            className="btn btn-primary nav-cta"
            onClick={() => setOpen(false)}
          >
            無料相談
          </a>
        </nav>
        <button
          className="burger"
          aria-label="メニュー"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>
    </header>
  );
}
