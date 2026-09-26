import Link from "next/link";
import { redirect } from "next/navigation";
import { createClient } from "../utils/supabase/server";

export default async function AdminSanctionsPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  // 로그인하지 않았으면 관리자 로그인 페이지로 이동
  if (!user) {
    redirect("/admin/login");
  }

  // Supabase에서 제재 기록 가져오기
  const { data: sanctions, error } = await supabase
    .from("sanctions")
    .select("*")
    .order("created_at", { ascending: false });

  return (
    <main className="min-h-screen bg-[#08090c] text-white">
      <div className="mx-auto max-w-6xl px-6 py-16">
        {/* 상단 */}
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-start">
          <div>
            <Link
              href="/admin"
              className="text-sm text-white/50 transition hover:text-white"
            >
              ← 관리자 대시보드
            </Link>

            <p className="mt-10 text-xs tracking-[0.35em] text-white/30">
              SANCTION MANAGEMENT
            </p>

            <h1 className="mt-4 text-4xl font-bold md:text-5xl">
              제재 기록 관리
            </h1>

            <p className="mt-4 text-sm text-white/40">
              제재 기록을 등록하고 관리할 수 있습니다.
            </p>
          </div>

          <Link
            href="/admin/sanctions/new"
            className="inline-flex items-center justify-center rounded-xl bg-white px-5 py-3 text-sm font-semibold text-black transition hover:bg-white/80"
          >
            + 새 제재 기록
          </Link>
        </div>

        {/* 오류 */}
        {error && (
          <div className="mt-10 rounded-xl border border-red-500/20 bg-red-500/5 p-5 text-sm text-red-300">
            제재 기록을 불러오지 못했습니다.
          </div>
        )}

        {/* 정상 */}
        {!error && (
          <>
            <div className="mt-12 flex items-center justify-between">
              <h2 className="text-xl font-semibold">
                등록된 제재 기록
              </h2>

              <p className="text-sm text-white/30">
                총 {sanctions?.length ?? 0}개
              </p>
            </div>

            {/* 기록 없음 */}
            {(!sanctions || sanctions.length === 0) && (
              <div className="mt-5 rounded-2xl border border-white/10 bg-white/[0.02] p-10 text-center">
                <p className="text-white/40">
                  등록된 제재 기록이 없습니다.
                </p>

                <Link
                  href="/admin/sanctions/new"
                  className="mt-5 inline-block rounded-lg border border-white/10 px-4 py-2 text-sm text-white/60 transition hover:bg-white/5 hover:text-white"
                >
                  첫 제재 기록 등록하기
                </Link>
              </div>
            )}

            {/* 제재 기록 목록 */}
            {sanctions && sanctions.length > 0 && (
              <section className="mt-5 space-y-4">
                {sanctions.map((sanction) => (
                  <article
                    key={sanction.id}
                    className="rounded-2xl border border-white/10 bg-white/[0.02] p-6 transition hover:border-white/20"
                  >
                    <div className="flex flex-col justify-between gap-6 md:flex-row md:items-center">
                      <div>
                        <div className="flex items-center gap-3">
                          <span className="font-mono text-xs text-white/25">
                            #{String(sanction.id).padStart(4, "0")}
                          </span>

                          <h3 className="text-lg font-semibold">
                            {sanction.user}
                          </h3>
                        </div>

                        <p className="mt-3 text-sm leading-6 text-white/40">
                          사유 · {sanction.reason}
                        </p>
                      </div>

                      <div className="grid grid-cols-2 gap-8 text-sm">
                        <div>
                          <p className="text-xs text-white/25">
                            제재
                          </p>

                          <p className="mt-1">
                            {sanction.type}
                          </p>
                        </div>

                        <div>
                          <p className="text-xs text-white/25">
                            상태
                          </p>

                          <p className="mt-1">
                            {sanction.status}
                          </p>
                        </div>
                      </div>
                    </div>
                  </article>
                ))}
              </section>
            )}
          </>
        )}
      </div>
    </main>
  );
}