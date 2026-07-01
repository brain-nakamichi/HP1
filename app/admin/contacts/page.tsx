import { getContacts } from "@/lib/data";
import { CONTACT_STATUS_LABEL, type ContactStatus } from "@/lib/types";
import {
  setContactStatusAction,
  deleteContactAction,
} from "@/app/actions";

export const dynamic = "force-dynamic";

const STATUSES: ContactStatus[] = ["new", "in_progress", "done"];

export default async function ContactsPage() {
  const contacts = await getContacts();

  return (
    <>
      <header className="page-head">
        <div>
          <h1>お問い合わせ</h1>
          <p>公開サイトのフォームから送信された内容の一覧です。（全 {contacts.length} 件）</p>
        </div>
      </header>

      {contacts.length === 0 ? (
        <p className="empty">まだお問い合わせはありません。</p>
      ) : (
        <div className="cards">
          {contacts.map((c) => (
            <article key={c.id} className={`contact-card status-${c.status}`}>
              <div className="contact-top">
                <div>
                  <strong className="contact-name">{c.name}</strong>
                  <a href={`mailto:${c.email}`} className="contact-email">
                    {c.email}
                  </a>
                </div>
                <span className={`badge badge-${c.status}`}>
                  {CONTACT_STATUS_LABEL[c.status]}
                </span>
              </div>
              <p className="contact-message">{c.message}</p>
              <div className="contact-foot">
                <time>{new Date(c.createdAt).toLocaleString("ja-JP")}</time>
                <div className="contact-actions">
                  <form action={setContactStatusAction} className="inline">
                    <input type="hidden" name="id" value={c.id} />
                    <select name="status" defaultValue={c.status}>
                      {STATUSES.map((st) => (
                        <option key={st} value={st}>
                          {CONTACT_STATUS_LABEL[st]}
                        </option>
                      ))}
                    </select>
                    <button type="submit" className="btn-sm">
                      更新
                    </button>
                  </form>
                  <form action={deleteContactAction} className="inline">
                    <input type="hidden" name="id" value={c.id} />
                    <button type="submit" className="btn-sm btn-danger">
                      削除
                    </button>
                  </form>
                </div>
              </div>
            </article>
          ))}
        </div>
      )}
    </>
  );
}
