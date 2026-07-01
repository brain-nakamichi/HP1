import Reveal from "@/components/Reveal";

export default function CTA() {
  return (
    <section style={{ paddingTop: 0 }}>
      <div className="container">
        <Reveal className="cta-band">
          <h2>まずは、お気軽にご相談ください。</h2>
          <p>
            貴社の課題に合わせた最適なプランをご提案します。ご相談・お見積もりは無料です。
          </p>
          <a href="#contact" className="btn btn-primary">
            無料相談を予約する →
          </a>
        </Reveal>
      </div>
    </section>
  );
}
