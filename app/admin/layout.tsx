import type { Metadata } from "next";
import Link from "next/link";
import "./admin.css";

export const metadata: Metadata = {
  title: "管理画面 | Blue Bridge",
  description: "コンテンツ管理画面",
};

const NAV = [
  { href: "/admin", label: "ダッシュボード", icon: "📊" },
  { href: "/admin/contacts", label: "お問い合わせ", icon: "✉️" },
  { href: "/admin/works", label: "実績", icon: "🏆" },
  { href: "/admin/services", label: "サービス", icon: "🧩" },
  { href: "/admin/news", label: "お知らせ", icon: "📰" },
];

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="admin">
      <aside className="admin-sidebar">
        <div className="admin-brand">
          <span className="mark">B</span>
          <div>
            <strong>Blue Bridge</strong>
            <span>Admin Console</span>
          </div>
        </div>
        <nav className="admin-nav">
          {NAV.map((n) => (
            <Link key={n.href} href={n.href} className="admin-nav-link">
              <span className="ic">{n.icon}</span>
              {n.label}
            </Link>
          ))}
        </nav>
        <a href="/" target="_blank" className="admin-view-site">
          🌐 公開サイトを開く
        </a>
      </aside>
      <main className="admin-main">{children}</main>
    </div>
  );
}
