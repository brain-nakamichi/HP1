import { getServices } from "@/lib/data";
import {
  createServiceAction,
  updateServiceAction,
  deleteServiceAction,
} from "@/app/actions";

export const dynamic = "force-dynamic";

export default async function ServicesAdminPage() {
  const services = await getServices();

  return (
    <>
      <header className="page-head">
        <div>
          <h1>サービスの管理</h1>
          <p>公開サイトの「私たちが提供する価値」に表示される内容です。（全 {services.length} 件）</p>
        </div>
      </header>

      <section className="panel">
        <div className="panel-head">
          <h2>新規追加</h2>
        </div>
        <form action={createServiceAction} className="edit-form">
          <div className="form-row">
            <label className="narrow">
              アイコン
              <input name="icon" placeholder="🧭" maxLength={4} />
            </label>
            <label className="grow">
              タイトル
              <input name="title" placeholder="サービス名" required />
            </label>
          </div>
          <label>
            説明
            <textarea name="description" placeholder="サービスの説明" required />
          </label>
          <div>
            <button type="submit" className="btn-primary-sm">
              ＋ 追加する
            </button>
          </div>
        </form>
      </section>

      <div className="cards">
        {services.map((s) => (
          <article key={s.id} className="edit-card">
            <form action={updateServiceAction} className="edit-form">
              <input type="hidden" name="id" value={s.id} />
              <div className="form-row">
                <label className="narrow">
                  アイコン
                  <input name="icon" defaultValue={s.icon} maxLength={4} />
                </label>
                <label className="grow">
                  タイトル
                  <input name="title" defaultValue={s.title} required />
                </label>
              </div>
              <label>
                説明
                <textarea name="description" defaultValue={s.description} required />
              </label>
              <div className="edit-actions">
                <button type="submit" className="btn-sm">
                  保存
                </button>
              </div>
            </form>
            <form action={deleteServiceAction} className="inline">
              <input type="hidden" name="id" value={s.id} />
              <button type="submit" className="btn-sm btn-danger">
                削除
              </button>
            </form>
          </article>
        ))}
      </div>
    </>
  );
}
