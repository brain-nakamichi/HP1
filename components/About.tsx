import Reveal from "@/components/Reveal";

const POINTS = [
  "経験豊富なプロフェッショナルによる伴走型支援",
  "小さく始めて素早く改善するアジャイルな開発",
  "リリース後も成果にコミットする継続支援体制",
];

export default function About() {
  return (
    <section id="about" className="about">
      <div className="container about-grid">
        <Reveal>
          <span className="eyebrow">About Us</span>
          <h2 className="title">
            「橋」となり、
            <br />
            ビジネスと技術をつなぐ。
          </h2>
          <p className="lead">
            私たちは、複雑なテクノロジーとビジネスの間に立ち、両者をなめらかにつなぐ架け橋でありたいと考えています。難しいことを、わかりやすく。理想を、確かなカタチに。
          </p>
          <ul>
            {POINTS.map((p) => (
              <li key={p}>{p}</li>
            ))}
          </ul>
        </Reveal>
        <Reveal className="about-visual" delay={0.12}>
          <div className="blob b1"></div>
          <div className="blob b2"></div>
          <div className="badge">BLUE&nbsp;BRIDGE</div>
        </Reveal>
      </div>
    </section>
  );
}
