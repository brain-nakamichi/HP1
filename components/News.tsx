import Reveal from "@/components/Reveal";
import type { News } from "@/lib/types";

export default function NewsSection({ items }: { items: News[] }) {
  if (items.length === 0) return null;

  return (
    <section id="news">
      <div className="container">
        <Reveal className="section-head">
          <span className="eyebrow">News</span>
          <h2 className="title">お知らせ</h2>
        </Reveal>
        <div className="news-list">
          {items.map((n, i) => (
            <Reveal key={n.id} className="news-item" delay={(i % 3) * 0.06}>
              <time className="news-date">{n.date}</time>
              <div className="news-body">
                <h3>{n.title}</h3>
                <p>{n.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
