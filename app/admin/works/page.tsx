import { getWorks } from "@/lib/data";
import {
  createWorkAction,
  updateWorkAction,
  deleteWorkAction,
} from "@/app/actions";

export const dynamic = "force-dynamic";

export default async function WorksAdminPage() {
  const works = await getWorks();

  return (
    <>
      <header className="page-head">
        <div>
          <h1>実績の管理</h1>
          <p>公開サイトの「導入実績」に表示される内容です。（全 {works.length} 件）</p>
        </div>
      </header>

      <section className="panel">
        <div className="panel-head">
          <h2>新規追加</h2>
        </div>
        <form action={createWorkAction} className="edit-form">
          <div className="form-row">
            <label>
              タグ
              <input name="tag" placeholder="Retail" required />
            </label>
            <label className="grow">
              タイトル
              <input name="title" placeholder="プロジェクト名" required />
            </label>
          </div>
          <label>
            説明
            <textarea name="description" placeholder="実績の概要" required />
          </label>
          <div>
            <button type="submit" className="btn-primary-sm">
              ＋ 追加する
            </button>
          </div>
        </form>
      </section>

      <div className="cards">
        {works.map((w) => (
          <article key={w.id} className="edit-card">
            <form action={updateWorkAction} className="edit-form">
              <input type="hidden" name="id" value={w.id} />
              <div className="form-row">
                <label>
                  タグ
                  <input name="tag" defaultValue={w.tag} required />
                </label>
                <label className="grow">
                  タイトル
                  <input name="title" defaultValue={w.title} required />
                </label>
              </div>
              <label>
                説明
                <textarea name="description" defaultValue={w.description} required />
              </label>
              <div className="edit-actions">
                <button type="submit" className="btn-sm">
                  保存
                </button>
              </div>
            </form>
            <form action={deleteWorkAction} className="inline">
              <input type="hidden" name="id" value={w.id} />
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
