import { getSupabase } from "@/lib/supabase";
import type { Contact, Work, Service, News, ContactStatus } from "@/lib/types";

/* ============================================================
 * Supabase を使ったデータアクセス層。
 * すべて非同期。DB の snake_case を型の camelCase にマッピングする。
 * ========================================================== */

function fail(context: string, error: { message: string }): never {
  throw new Error(`[Supabase] ${context}: ${error.message}`);
}

/* ---------------- Contacts ---------------- */

type ContactRow = {
  id: string;
  name: string;
  email: string;
  message: string;
  status: ContactStatus;
  created_at: string;
};

function toContact(r: ContactRow): Contact {
  return {
    id: r.id,
    name: r.name,
    email: r.email,
    message: r.message,
    status: r.status,
    createdAt: r.created_at,
  };
}

export async function getContacts(): Promise<Contact[]> {
  const { data, error } = await getSupabase()
    .from("contacts")
    .select("*")
    .order("created_at", { ascending: false });
  if (error) fail("お問い合わせ取得", error);
  return (data as ContactRow[]).map(toContact);
}

export async function addContact(input: {
  name: string;
  email: string;
  message: string;
}): Promise<void> {
  const { error } = await getSupabase().from("contacts").insert({
    name: input.name,
    email: input.email,
    message: input.message,
    status: "new",
  });
  if (error) fail("お問い合わせ登録", error);
}

export async function updateContactStatus(
  id: string,
  status: ContactStatus
): Promise<void> {
  const { error } = await getSupabase()
    .from("contacts")
    .update({ status })
    .eq("id", id);
  if (error) fail("お問い合わせ状態更新", error);
}

export async function deleteContact(id: string): Promise<void> {
  const { error } = await getSupabase().from("contacts").delete().eq("id", id);
  if (error) fail("お問い合わせ削除", error);
}

/* ---------------- Works ---------------- */

export async function getWorks(): Promise<Work[]> {
  const { data, error } = await getSupabase()
    .from("works")
    .select("*")
    .order("created_at", { ascending: true });
  if (error) fail("実績取得", error);
  return data as Work[];
}

export async function addWork(input: Omit<Work, "id">): Promise<void> {
  const { error } = await getSupabase().from("works").insert(input);
  if (error) fail("実績追加", error);
}

export async function updateWork(
  id: string,
  input: Omit<Work, "id">
): Promise<void> {
  const { error } = await getSupabase().from("works").update(input).eq("id", id);
  if (error) fail("実績更新", error);
}

export async function deleteWork(id: string): Promise<void> {
  const { error } = await getSupabase().from("works").delete().eq("id", id);
  if (error) fail("実績削除", error);
}

/* ---------------- Services ---------------- */

export async function getServices(): Promise<Service[]> {
  const { data, error } = await getSupabase()
    .from("services")
    .select("*")
    .order("created_at", { ascending: true });
  if (error) fail("サービス取得", error);
  return data as Service[];
}

export async function addService(input: Omit<Service, "id">): Promise<void> {
  const { error } = await getSupabase().from("services").insert(input);
  if (error) fail("サービス追加", error);
}

export async function updateService(
  id: string,
  input: Omit<Service, "id">
): Promise<void> {
  const { error } = await getSupabase().from("services").update(input).eq("id", id);
  if (error) fail("サービス更新", error);
}

export async function deleteService(id: string): Promise<void> {
  const { error } = await getSupabase().from("services").delete().eq("id", id);
  if (error) fail("サービス削除", error);
}

/* ---------------- News ---------------- */

export async function getAllNews(): Promise<News[]> {
  const { data, error } = await getSupabase()
    .from("news")
    .select("*")
    .order("date", { ascending: false });
  if (error) fail("お知らせ取得", error);
  return data as News[];
}

export async function getPublishedNews(): Promise<News[]> {
  const { data, error } = await getSupabase()
    .from("news")
    .select("*")
    .eq("published", true)
    .order("date", { ascending: false });
  if (error) fail("お知らせ取得（公開）", error);
  return data as News[];
}

export async function addNews(input: Omit<News, "id">): Promise<void> {
  const { error } = await getSupabase().from("news").insert(input);
  if (error) fail("お知らせ追加", error);
}

export async function updateNews(
  id: string,
  input: Omit<News, "id">
): Promise<void> {
  const { error } = await getSupabase().from("news").update(input).eq("id", id);
  if (error) fail("お知らせ更新", error);
}

export async function deleteNews(id: string): Promise<void> {
  const { error } = await getSupabase().from("news").delete().eq("id", id);
  if (error) fail("お知らせ削除", error);
}
