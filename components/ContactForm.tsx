"use client";

import { useActionState } from "react";
import { submitContactAction, type ContactFormState } from "@/app/actions";

const INITIAL: ContactFormState = { ok: false, message: "" };

export default function ContactForm() {
  const [state, action, pending] = useActionState(submitContactAction, INITIAL);

  return (
    <form action={action}>
      {state.message && (
        <p className={`form-msg ${state.ok ? "ok" : "err"}`}>{state.message}</p>
      )}
      <div className="field">
        <label htmlFor="name">お名前</label>
        <input type="text" id="name" name="name" placeholder="山田 太郎" required />
      </div>
      <div className="field">
        <label htmlFor="email">メールアドレス</label>
        <input
          type="email"
          id="email"
          name="email"
          placeholder="you@example.com"
          required
        />
      </div>
      <div className="field">
        <label htmlFor="message">お問い合わせ内容</label>
        <textarea
          id="message"
          name="message"
          placeholder="ご相談内容をご記入ください"
          required
        ></textarea>
      </div>
      <button
        type="submit"
        className="btn btn-primary"
        style={{ justifyContent: "center" }}
        disabled={pending}
      >
        {pending ? "送信中..." : "送信する"}
      </button>
    </form>
  );
}
