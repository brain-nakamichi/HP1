import { getAllNews } from "@/lib/data";
import {
  createNewsAction,
  updateNewsAction,
  deleteNewsAction,
} from "@/app/actions";

export const dynamic = "force-dynamic";

export default async function NewsAdminPage() {
  const news = await getAllNews();

  return (
    <>
      <header className="page-head">
        <div>
          <h1>お知らせの管理</h1>
          <p>公開中のお知らせのみ公開サイトに表示されます。（全 {news.length} 件）</p>
        </div>
      </header>

      <section className="panel">
        <div className="panel-head">
          <h2>新規追加</h2>
        </div>
        <form action={createNewsAction} className="edit-form">
          <div className="form-row">
            <label className="narrow">
              日付
              <input type="date" name="date" required />
            </label>
            <label className="grow">
              タイトル
              <input name="title" placeholder="お知らせのタイトル" required />
            </label>
          </div>
          <label>
            本文
            <textarea name="body" placeholder="お知らせの本文" required />
          </label>
          <div className="form-inline-foot">
            <label className="checkbox">
              <input type="checkbox" name="published" defaultChecked />
              公開する
            </label>
            <button type="submit" className="btn-primary-sm">
              ＋ 追加する
            </button>
          </div>
        </form>
      </section>

      <div className="cards">
        {news.map((n) => (
          <article key={n.id} className="edit-card">
            <form action={updateNewsAction} className="edit-form">
              <input type="hidden" name="id" value={n.id} />
              <div className="form-row">
                <label className="narrow">
                  日付
                  <input type="date" name="date" defaultValue={n.date} required />
                </label>
                <label className="grow">
                  タイトル
                  <input name="title" defaultValue={n.title} required />
                </label>
              </div>
              <label>
                本文
                <textarea name="body" defaultValue={n.body} required />
              </label>
              <div className="form-inline-foot">
                <label className="checkbox">
                  <input type="checkbox" name="published" defaultChecked={n.published} />
                  公開する
                </label>
                <div className="edit-actions">
                  <span className={`badge ${n.published ? "badge-done" : "badge-new"}`}>
                    {n.published ? "公開中" : "下書き"}
                  </span>
                  <button type="submit" className="btn-sm">
                    保存
                  </button>
                </div>
              </div>
            </form>
            <form action={deleteNewsAction} className="inline">
              <input type="hidden" name="id" value={n.id} />
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
