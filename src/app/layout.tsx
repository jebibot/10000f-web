import type { Metadata } from "next";
import "./globals.css";
import "pretendard/dist/web/variable/pretendardvariable-dynamic-subset.css";

export const metadata: Metadata = {
  title: "10000팔",
  description:
    "트위치 팔로워 수가 10,000명에 근접한 스트리머의 방송을 소개합니다.",
  keywords: ["Twitch", "streamer", "치지직", "만팔", "품앗이"],
  alternates: {
    canonical: "https://10000.twitchgg.tv/",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <body className="bg-slate-900 text-slate-100">{children}</body>
    </html>
  );
}
