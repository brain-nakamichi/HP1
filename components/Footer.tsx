const FOOT_COLS = [
  {
    title: "Company",
    links: [
      { href: "#about", label: "私たちについて" },
      { href: "#works", label: "実績" },
      { href: "#contact", label: "お問い合わせ" },
    ],
  },
  {
    title: "Services",
    links: [
      { href: "#services", label: "DXコンサルティング" },
      { href: "#services", label: "システム開発" },
      { href: "#services", label: "グロース支援" },
    ],
  },
  {
    title: "Follow",
    links: [
      { href: "#", label: "X (Twitter)" },
      { href: "#", label: "Facebook" },
      { href: "#", label: "LinkedIn" },
    ],
  },
];

export default function Footer() {
  return (
    <footer>
      <div className="container">
        <div className="foot-top">
          <div style={{ maxWidth: 280 }}>
            <a href="#top" className="logo" style={{ marginBottom: 16 }}>
              <span className="mark">B</span>Blue&nbsp;Bridge
            </a>
            <p style={{ color: "var(--muted)", fontSize: ".9rem", marginTop: 14 }}>
              ビジネスと技術をつなぐ架け橋。企業のデジタル変革を、戦略から運用まで伴走支援します。
            </p>
          </div>
          <div className="foot-links">
            {FOOT_COLS.map((col) => (
              <div className="foot-col" key={col.title}>
                <h4>{col.title}</h4>
                {col.links.map((l, i) => (
                  <a href={l.href} key={`${col.title}-${i}`}>
                    {l.label}
                  </a>
                ))}
              </div>
            ))}
          </div>
        </div>
        <div className="copy">
          <span>© 2026 Blue Bridge Inc. All rights reserved.</span>
          <span>※ 本サイトはダミー内容のサンプルです。</span>
        </div>
      </div>
    </footer>
  );
}
