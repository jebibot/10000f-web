import StreamList from "@/components/stream-list";
import { supabase } from "@/utils/supabase";

export const revalidate = 30;

export default async function Home() {
  const { data, error } = await supabase.from("streams").select(`
    title,
    game,
    username,
    name,
    profile,
    followers
    `);

  if (data != null) {
    // shuffle
    for (var i = data.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      const temp = data[i];
      data[i] = data[j];
      data[j] = temp;
    }
  }

  return (
    <main className="flex flex-col items-center max-w-screen-2xl min-h-screen sm:px-6 lg:px-8 py-2 mx-auto">
      {error ? (
        <div className="rounded-md text-red-400 bg-slate-800 px-4 py-2 font-semibold">
          방송을 불러오는데 오류가 발생했습니다.
        </div>
      ) : (
        <StreamList streams={data} />
      )}
    </main>
  );
}
