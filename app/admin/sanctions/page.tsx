import Link from "next/link";
import { redirect } from "next/navigation";
import { createClient } from "../utils/supabase/server";

export default async function AdminSanctionsPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  // 로그인하지 않은 사용자는 관리자 로그인 페이지로 이동
  if (!user) {
    redirect("/admin/login");
  }

  const { data: sanctions, error } = await supabase
    .from("sanctions")
    .select("*")
    .order("created_at", { ascending: false });

  return (
    <main className="min-h-screen bg-[#08090c] text-white">
      <div className="mx-auto max-w-6xl px-6 py-16">
        <div className="flex items-start justify-between gap-6">
          <div>
            <p className="text-xs tracking-[0.35em] text-white/30">
              MANAGEMENT SYSTEM
            </p>

            <h1 className="mt-4 text-4xl font-bold md:text-5xl">
              제재 기록 관리
            </h1>

            <p className="mt-4 text-sm text-white/40">
              등록된 제재 기록을 확인하고 관리합니다.
            </p>
          </div>

          <Link
            href="/admin"
            className="rounded-lg border border-white/10 px-4 py-2 text-sm text-white/60 transition hover:bg-white/5 hover:text-white"
          >
            ← 관리자 홈
          </Link>
        </div>

        {error && (
          <div className="mt-10 rounded-xl border border-red-500/20 bg-red-500/5 p-5 text-sm text-red-300">
            제재 기록을 불러오지 못했습니다.
          </div>
        )}

        <section className="mt-10 space-y-4">
          {!error && (!sanctions || sanctions.length === 0) && (
            <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-10 text-center">
              <p className="text-white/40">
                등록된 제재 기록이 없습니다.
              </p>
            </div>
          )}

          {sanctions?.map((sanction) => (
            <article
              key={sanction.id}
              className="rounded-2xl border border-white/10 bg-white/[0.02] p-6"
            >
              <div className="flex flex-col justify-between gap-6 md:flex-row md:items-center">
                <div>
                  <p className="text-xs text-white/30">
                    #{String(sanction.id).padStart(4, "0")}
                  </p>

                  <h2 className="mt-2 text-xl font-semibold">
                    {sanction.user}
                  </h2>

                  <p className="mt-2 text-sm text-white/40">
                    {sanction.reason}
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-8 text-sm">
                  <div>
                    <p className="text-xs text-white/30">제재</p>
                    <p className="mt-1">{sanction.type}</p>
                  </div>

                  <div>
                    <p className="text-xs text-white/30">상태</p>
                    <p className="mt-1">{sanction.status}</p>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </section>
      </div>
    </main>
  );
}