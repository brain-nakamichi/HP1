import Reveal from "@/components/Reveal";
import type { Work } from "@/lib/types";

export default function Works({ items }: { items: Work[] }) {
  return (
    <section id="works">
      <div className="container">
        <Reveal className="section-head">
          <span className="eyebrow">Works</span>
          <h2 className="title">導入実績</h2>
          <p className="lead">
            業界・規模を問わず、多様なお客様のプロジェクトを支援してきました。（掲載内容はサンプルです）
          </p>
        </Reveal>
        <div className="grid work-grid">
          {items.map((w, i) => (
            <Reveal key={w.id} className="work" delay={(i % 3) * 0.08}>
              <div className="thumb"></div>
              <div className="body">
                <span className="tag">{w.tag}</span>
                <h3>{w.title}</h3>
                <p>{w.description}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
