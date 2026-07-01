import Reveal from "@/components/Reveal";

const STATS = [
  { num: "120+", lbl: "支援実績" },
  { num: "98%", lbl: "継続契約率" },
  { num: "15年", lbl: "業界経験" },
];

export default function Hero() {
  return (
    <section className="hero">
      <div className="container">
        <Reveal as="span" className="eyebrow">
          Digital Transformation Partner
        </Reveal>
        <Reveal as="h1" delay={0.08}>
          ビジネスに、
          <br />
          <span className="grad">次の一手</span>を。
        </Reveal>
        <Reveal as="p" delay={0.16}>
          株式会社ブルーブリッジは、戦略立案からシステム開発・運用まで一気通貫で伴走する、企業のデジタル変革パートナーです。
        </Reveal>
        <Reveal className="hero-actions" delay={0.24}>
          <a href="#contact" className="btn btn-primary">
            無料相談を予約する →
          </a>
          <a href="#services" className="btn btn-ghost">
            サービスを見る
          </a>
        </Reveal>
        <Reveal className="hero-stats" delay={0.32}>
          {STATS.map((s) => (
            <div key={s.lbl}>
              <div className="num">{s.num}</div>
              <div className="lbl">{s.lbl}</div>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
