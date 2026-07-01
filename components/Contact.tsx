import Reveal from "@/components/Reveal";
import ContactForm from "@/components/ContactForm";

const INFO = [
  { k: "Email", v: "info@bluebridge.example.com" },
  { k: "Tel", v: "03-1234-5678（平日 10:00–18:00）" },
  { k: "Address", v: "〒100-0001 東京都千代田区サンプル 1-2-3 サンプルビル 8F" },
];

export default function Contact() {
  return (
    <section id="contact" className="about">
      <div className="container contact-grid">
        <Reveal>
          <span className="eyebrow">Contact</span>
          <h2 className="title">お問い合わせ</h2>
          <p className="lead">
            ご質問・ご依頼など、下記フォームまたはお電話にてお気軽にご連絡ください。
          </p>
          <div style={{ marginTop: 40 }}>
            {INFO.map((item) => (
              <div className="info-item" key={item.k}>
                <div className="k">{item.k}</div>
                <div className="v">{item.v}</div>
              </div>
            ))}
          </div>
        </Reveal>
        <Reveal delay={0.12}>
          <ContactForm />
        </Reveal>
      </div>
    </section>
  );
}
