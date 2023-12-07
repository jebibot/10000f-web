"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { getChannelUrl, getEmbedUrl, getThumbnailUrl } from "@/utils/twitch";
import { formatNumber } from "@/utils/util";

type Stream = {
  title: string;
  game: string;
  username: string;
  name: string;
  profile: string;
  followers: number;
};

export default function StreamList({ streams }: { streams: Stream[] }) {
  const router = useRouter();
  const [stream, setStream] = useState(streams[0].username);
  const [lastRefresh, setLastRefresh] = useState(Date.now());

  return (
    <>
      <div className="flex flex-row items-center w-full p-2">
        <div className="flex-1 text-purple-300">
          <div className="text-4xl font-bold">10000팔</div>
          <div>
            팔로워 수가 10,000명에 근접한 스트리머의 방송을 소개합니다.{" "}
            <span className="text-sm">
              썸네일을 클릭하면 내장 플레이어로 방송을 시청할 수 있으며, 방송
              제목을 클릭하면 해당 방송의 트위치 채널로 이동합니다.
            </span>
          </div>
        </div>
        <div>
          <button
            className="inline-flex items-center m-2 p-3 font-semibold text-lg bg-purple-500 hover:bg-purple-400 rounded leading-none"
            onClick={() => {
              if (Date.now() - lastRefresh < 60 * 1000) {
                setStream(
                  streams[Math.floor(Math.random() * streams.length)].username,
                );
              } else {
                setLastRefresh(Date.now());
                router.refresh();
              }
            }}
          >
            <span className="inline mr-2 fill-white">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="16"
                width="16"
                viewBox="0 0 512 512"
              >
                <path d="M369.1 142.9L312 200l24 24H496V64L472 40 414.4 97.6l0 0c-87.5-87.5-229.3-87.5-316.8 0s-87.5 229.3 0 316.8s229.3 87.5 316.8 0l-45.3-45.3c-62.5 62.5-163.8 62.5-226.3 0s-62.5-163.8 0-226.3s163.8-62.5 226.3 0l0 0z" />
              </svg>
            </span>
            랜덤
          </button>
        </div>
      </div>
      <iframe
        className="w-full min-h-[max(70vh,550px)] md:min-h-[50vh]"
        src={getEmbedUrl(stream)}
        allowFullScreen
        allow="autoplay; fullscreen"
      ></iframe>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 px-3 sm:px-0 py-4">
        {streams?.map((s) => (
          <div
            key={s.username}
            className="flex flex-col items-center rounded-md bg-slate-800 overflow-hidden"
          >
            <img
              className="w-full aspect-video cursor-pointer"
              srcSet={[80, 276, 414, 552, 828, 1242, 1656]
                .map((w) => `${getThumbnailUrl(s.username, w)} ${w}w`)
                .join(", ")}
              src={getThumbnailUrl(s.username, 440)}
              alt={`${s.name}의 방송`}
              onClick={() => setStream(s.username)}
            />
            <a
              className="flex flex-row w-full items-center p-2"
              href={getChannelUrl(s.username)}
              target="_blank"
            >
              {s.profile && (
                <img
                  className="w-12 h-12 rounded-full mr-2"
                  src={s.profile.replace("300x300", "50x50")}
                  alt={s.name}
                />
              )}
              <div className="flex flex-col">
                <div className="font-semibold line-clamp-3 hover:text-gray-300">
                  {s.title}
                </div>
                <div>
                  <span className="text-gray-400">
                    {s.name} ({s.username})
                  </span>
                  <span className="inline-flex items-center text-sm align-bottom">
                    <svg
                      className="inline mx-1 fill-white"
                      xmlns="http://www.w3.org/2000/svg"
                      height="12"
                      width="12"
                      viewBox="0 0 512 512"
                    >
                      <path d="M225.8 468.2l-2.5-2.3L48.1 303.2C17.4 274.7 0 234.7 0 192.8v-3.3c0-70.4 50-130.8 119.2-144C158.6 37.9 198.9 47 231 69.6c9 6.4 17.4 13.8 25 22.3c4.2-4.8 8.7-9.2 13.5-13.3c3.7-3.2 7.5-6.2 11.5-9c0 0 0 0 0 0C313.1 47 353.4 37.9 392.8 45.4C462 58.6 512 119.1 512 189.5v3.3c0 41.9-17.4 81.9-48.1 110.4L288.7 465.9l-2.5 2.3c-8.2 7.6-19 11.9-30.2 11.9s-22-4.2-30.2-11.9zM239.1 145c-.4-.3-.7-.7-1-1.1l-17.8-20c0 0-.1-.1-.1-.1c0 0 0 0 0 0c-23.1-25.9-58-37.7-92-31.2C81.6 101.5 48 142.1 48 189.5v3.3c0 28.5 11.9 55.8 32.8 75.2L256 430.7 431.2 268c20.9-19.4 32.8-46.7 32.8-75.2v-3.3c0-47.3-33.6-88-80.1-96.9c-34-6.5-69 5.4-92 31.2c0 0 0 0-.1 .1s0 0-.1 .1l-17.8 20c-.3 .4-.7 .7-1 1.1c-4.5 4.5-10.6 7-16.9 7s-12.4-2.5-16.9-7z" />
                    </svg>
                    {formatNumber(s.followers)}
                  </span>
                </div>
                <div className="text-sm text-gray-300">{s.game}</div>
              </div>
            </a>
          </div>
        ))}
      </div>
    </>
  );
}
