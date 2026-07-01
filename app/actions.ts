"use server";

import { revalidatePath } from "next/cache";
import type { ContactStatus } from "@/lib/types";
import {
  addContact,
  updateContactStatus,
  deleteContact,
  addWork,
  updateWork,
  deleteWork,
  addService,
  updateService,
  deleteService,
  addNews,
  updateNews,
  deleteNews,
} from "@/lib/data";

function s(formData: FormData, key: string): string {
  return String(formData.get(key) ?? "").trim();
}

/* ---------------- Contact（公開フォーム） ---------------- */

export type ContactFormState = { ok: boolean; message: string };

export async function submitContactAction(
  _prev: ContactFormState,
  formData: FormData
): Promise<ContactFormState> {
  const name = s(formData, "name");
  const email = s(formData, "email");
  const message = s(formData, "message");

  if (!name || !email || !message) {
    return { ok: false, message: "すべての項目を入力してください。" };
  }

  await addContact({ name, email, message });
  revalidatePath("/admin/contacts");
  revalidatePath("/admin");
  return { ok: true, message: "お問い合わせありがとうございます。送信を受け付けました。" };
}

/* ---------------- Contact（管理） ---------------- */

export async function setContactStatusAction(formData: FormData) {
  await updateContactStatus(
    s(formData, "id"),
    s(formData, "status") as ContactStatus
  );
  revalidatePath("/admin/contacts");
  revalidatePath("/admin");
}

export async function deleteContactAction(formData: FormData) {
  await deleteContact(s(formData, "id"));
  revalidatePath("/admin/contacts");
  revalidatePath("/admin");
}

/* ---------------- Works ---------------- */

export async function createWorkAction(formData: FormData) {
  await addWork({
    tag: s(formData, "tag"),
    title: s(formData, "title"),
    description: s(formData, "description"),
  });
  revalidatePath("/admin/works");
  revalidatePath("/");
}

export async function updateWorkAction(formData: FormData) {
  await updateWork(s(formData, "id"), {
    tag: s(formData, "tag"),
    title: s(formData, "title"),
    description: s(formData, "description"),
  });
  revalidatePath("/admin/works");
  revalidatePath("/");
}

export async function deleteWorkAction(formData: FormData) {
  await deleteWork(s(formData, "id"));
  revalidatePath("/admin/works");
  revalidatePath("/");
}

/* ---------------- Services ---------------- */

export async function createServiceAction(formData: FormData) {
  await addService({
    icon: s(formData, "icon") || "✨",
    title: s(formData, "title"),
    description: s(formData, "description"),
  });
  revalidatePath("/admin/services");
  revalidatePath("/");
}

export async function updateServiceAction(formData: FormData) {
  await updateService(s(formData, "id"), {
    icon: s(formData, "icon") || "✨",
    title: s(formData, "title"),
    description: s(formData, "description"),
  });
  revalidatePath("/admin/services");
  revalidatePath("/");
}

export async function deleteServiceAction(formData: FormData) {
  await deleteService(s(formData, "id"));
  revalidatePath("/admin/services");
  revalidatePath("/");
}

/* ---------------- News ---------------- */

export async function createNewsAction(formData: FormData) {
  await addNews({
    title: s(formData, "title"),
    body: s(formData, "body"),
    date: s(formData, "date") || new Date().toISOString().slice(0, 10),
    published: formData.get("published") === "on",
  });
  revalidatePath("/admin/news");
  revalidatePath("/");
}

export async function updateNewsAction(formData: FormData) {
  await updateNews(s(formData, "id"), {
    title: s(formData, "title"),
    body: s(formData, "body"),
    date: s(formData, "date") || new Date().toISOString().slice(0, 10),
    published: formData.get("published") === "on",
  });
  revalidatePath("/admin/news");
  revalidatePath("/");
}

export async function deleteNewsAction(formData: FormData) {
  await deleteNews(s(formData, "id"));
  revalidatePath("/admin/news");
  revalidatePath("/");
}
