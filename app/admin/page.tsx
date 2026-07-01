import Link from "next/link";
import { getContacts, getWorks, getServices, getAllNews } from "@/lib/data";

export const dynamic = "force-dynamic";

export default async function AdminDashboard() {
  const [contacts, works, services, news] = await Promise.all([
    getContacts(),
    getWorks(),
    getServices(),
    getAllNews(),
  ]);

  const newContacts = contacts.filter((c) => c.status === "new").length;

  const cards = [
    {
      href: "/admin/contacts",
      label: "お問い合わせ",
      value: contacts.length,
      sub: `未対応 ${newContacts} 件`,
      accent: "var(--brand)",
    },
    {
      href: "/admin/works",
      label: "実績",
      value: works.length,
      sub: "公開中",
      accent: "var(--accent)",
    },
    {
      href: "/admin/services",
      label: "サービス",
      value: services.length,
      sub: "公開中",
      accent: "var(--brand-2)",
    },
    {
      href: "/admin/news",
      label: "お知らせ",
      value: news.length,
      sub: `公開 ${news.filter((n) => n.published).length} 件`,
      accent: "#ff9f43",
    },
  ];

  return (
    <>
      <header className="page-head">
        <div>
          <h1>ダッシュボード</h1>
          <p>コンテンツの概要と最新のお問い合わせを確認できます。</p>
        </div>
      </header>

      <div className="stat-grid">
        {cards.map((c) => (
          <Link key={c.href} href={c.href} className="stat-card">
            <span className="stat-label">{c.label}</span>
            <span className="stat-value" style={{ color: c.accent }}>
              {c.value}
            </span>
            <span className="stat-sub">{c.sub}</span>
          </Link>
        ))}
      </div>

      <section className="panel">
        <div className="panel-head">
          <h2>最近のお問い合わせ</h2>
          <Link href="/admin/contacts" className="link-more">
            すべて見る →
          </Link>
        </div>
        {contacts.length === 0 ? (
          <p className="empty">まだお問い合わせはありません。</p>
        ) : (
          <ul className="recent-list">
            {contacts.slice(0, 5).map((c) => (
              <li key={c.id}>
                <span className={`badge badge-${c.status}`}>
                  {c.status === "new"
                    ? "未対応"
                    : c.status === "in_progress"
                      ? "対応中"
                      : "対応済み"}
                </span>
                <strong>{c.name}</strong>
                <span className="recent-msg">{c.message}</span>
                <time>{new Date(c.createdAt).toLocaleString("ja-JP")}</time>
              </li>
            ))}
          </ul>
        )}
      </section>
    </>
  );
}
