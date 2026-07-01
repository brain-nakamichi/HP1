export type ContactStatus = "new" | "in_progress" | "done";

export type Contact = {
  id: string;
  name: string;
  email: string;
  message: string;
  status: ContactStatus;
  createdAt: string;
};

export type Work = {
  id: string;
  tag: string;
  title: string;
  description: string;
};

export type Service = {
  id: string;
  icon: string;
  title: string;
  description: string;
};

export type News = {
  id: string;
  title: string;
  body: string;
  published: boolean;
  date: string;
};

export const CONTACT_STATUS_LABEL: Record<ContactStatus, string> = {
  new: "未対応",
  in_progress: "対応中",
  done: "対応済み",
};
