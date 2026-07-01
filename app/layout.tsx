import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "株式会社ブルーブリッジ | Blue Bridge Inc.",
  description:
    "株式会社ブルーブリッジは、企業のデジタル変革を支援するコンサルティング＆開発企業です。",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja">
      <body>{children}</body>
    </html>
  );
}
