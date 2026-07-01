import Reveal from "@/components/Reveal";
import type { Service } from "@/lib/types";

export default function Services({ items }: { items: Service[] }) {
  return (
    <section id="services">
      <div className="container">
        <Reveal className="section-head">
          <span className="eyebrow">Services</span>
          <h2 className="title">私たちが提供する価値</h2>
          <p className="lead">
            課題の発見から実装、そして継続的な改善まで。お客様のフェーズに合わせたソリューションをご用意しています。
          </p>
        </Reveal>
        <div className="grid grid-3">
          {items.map((s, i) => (
            <Reveal key={s.id} className="card" delay={(i % 3) * 0.08}>
              <div className="ico">{s.icon}</div>
              <h3>{s.title}</h3>
              <p>{s.description}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
