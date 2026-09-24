import { createClient } from "@/utils/supabase/server";

export const dynamic = "force-dynamic";

export default async function NoticePage() {
  const supabase = await createClient();

  const { data: notices, error } = await supabase
    .from("notices")
    .select("id, title, content, author, created_at")
    .order("created_at", { ascending: false });

  return (
    <main className="min-h-screen bg-[#08090c] text-white">
      {/* 상단 메뉴 */}
      <header className="border-b border-white/10">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5">
          <a href="/" className="text-xl font-bold tracking-wider">
            伴 <span className="text-white/50">NETWORK</span>
          </a>

          <nav className="flex gap-6 text-sm text-white/50">
            <a href="/" className="transition hover:text-white">
              홈
            </a>

            <a href="/rules" className="transition hover:text-white">
              규칙
            </a>

            <a href="/sanctions" className="transition hover:text-white">
              제재 기록
            </a>

            <a href="/notice" className="text-white">
              공지
            </a>
          </nav>
        </div>
      </header>

      {/* 공지 */}
      <section className="mx-auto max-w-5xl px-6 py-20">
        <p className="text-xs font-semibold tracking-[0.35em] text-white/30">
          OFFICIAL NOTICE
        </p>

        <h1 className="mt-4 text-4xl font-bold md:text-6xl">
          공지사항
        </h1>

        <p className="mt-5 text-white/45">
          伴 NETWORK의 새로운 소식과 운영 안내를 확인할 수 있습니다.
        </p>

        {/* 오류 */}
        {error && (
          <div className="mt-10 rounded-xl border border-red-500/20 bg-red-500/[0.05] p-5 text-sm text-red-200/70">
            공지사항을 불러오지 못했습니다.
          </div>
        )}

        {/* 공지가 없는 경우 */}
        {!error && (!notices || notices.length === 0) && (
          <div className="mt-12 rounded-2xl border border-white/10 p-10 text-center">
            <p className="text-white/40">
              등록된 공지사항이 없습니다.
            </p>
          </div>
        )}

        {/* 공지 목록 */}
        {!error && notices && notices.length > 0 && (
          <div className="mt-12 overflow-hidden rounded-2xl border border-white/10">
            {notices.map((notice) => {
              const date = new Date(notice.created_at).toLocaleDateString(
                "ko-KR",
                {
                  year: "numeric",
                  month: "2-digit",
                  day: "2-digit",
                }
              );

              return (
                <article
                  key={notice.id}
                  className="border-b border-white/10 p-6 transition last:border-b-0 hover:bg-white/[0.03]"
                >
                  <div className="flex items-start justify-between gap-6">
                    <div>
                      <h2 className="text-lg font-semibold">
                        {notice.title}
                      </h2>

                      <p className="mt-3 whitespace-pre-wrap text-sm leading-6 text-white/40">
                        {notice.content}
                      </p>

                      <p className="mt-4 text-xs text-white/25">
                        작성자 · {notice.author || "관리자"}
                      </p>
                    </div>

                    <div className="shrink-0 text-right">
                      <p className="font-mono text-xs text-white/20">
                        #{String(notice.id).padStart(3, "0")}
                      </p>

                      <p className="mt-2 text-xs text-white/30">
                        {date}
                      </p>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        )}

        <a
          href="/"
          className="mt-10 inline-flex rounded-xl border border-white/10 px-5 py-3 text-sm text-white/60 transition hover:bg-white/5 hover:text-white"
        >
          ← 홈으로
        </a>
      </section>
    </main>
  );
}