import Link from "next/link";
import { redirect } from "next/navigation";
import { createClient } from "./utils/supabase/server";

export default async function AdminPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  // 로그인하지 않았으면 로그인 페이지로 이동
  if (!user) {
    redirect("/admin/login");
  }

  return (
    <main className="min-h-screen bg-[#08090a] text-white">
      <div className="mx-auto max-w-6xl px-6 py-16">

        {/* 상단 */}
        <div className="flex items-start justify-between gap-6">
          <div>
            <p className="mb-4 text-xs tracking-[0.4em] text-white/40">
              MANAGEMENT SYSTEM
            </p>

            <h1 className="text-5xl font-bold tracking-tight">
              관리자 대시보드
            </h1>

            <p className="mt-5 text-sm text-white/40">
              공지사항과 제재 기록을 관리하는 페이지입니다.
            </p>
          </div>

          {/* 로그인 정보 + 로그아웃 */}
          <div className="text-right">
            <p className="text-xs text-white/30">
              로그인 계정
            </p>

            <p className="mt-1 text-sm text-white/60">
              {user.email}
            </p>

            <Link
              href="/admin/logout"
              className="mt-3 inline-block rounded-lg border border-white/10 px-4 py-2 text-sm text-white/60 transition hover:bg-white/5 hover:text-white"
            >
              로그아웃
            </Link>
          </div>
        </div>

        {/* 통계 */}
        <section className="mt-14 grid gap-4 md:grid-cols-3">
          <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-6">
            <p className="text-sm text-white/40">
              전체 제재 기록
            </p>

            <p className="mt-3 text-3xl font-bold">
              3
            </p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-6">
            <p className="text-sm text-white/40">
              공지사항
            </p>

            <p className="mt-3 text-3xl font-bold">
              3
            </p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-6">
            <p className="text-sm text-white/40">
              현재 제재 중
            </p>

            <p className="mt-3 text-3xl font-bold">
              1
            </p>
          </div>
        </section>

        {/* 관리 메뉴 */}
        <h2 className="mt-12 text-xl font-semibold">
          관리 메뉴
        </h2>

        <section className="mt-5 grid gap-4 md:grid-cols-2">

          {/* 제재 기록 */}
          <Link
            href="/admin/sanctions"
            className="block rounded-2xl border border-white/10 bg-white/[0.02] p-6 transition hover:border-white/25 hover:bg-white/[0.04]"
          >
            <p className="text-lg font-semibold">
              ⚖️ 제재 기록 관리
            </p>

            <p className="mt-2 text-sm leading-6 text-white/40">
              새로운 제재 기록을 등록하거나 기존 기록을 수정합니다.
            </p>

            <p className="mt-6 text-sm text-white/70">
              관리하기 →
            </p>
          </Link>

          {/* 공지 관리 */}
          <Link
            href="/admin/notices"
            className="block rounded-2xl border border-white/10 bg-white/[0.02] p-6 transition hover:border-white/25 hover:bg-white/[0.04]"
          >
            <p className="text-lg font-semibold">
              📢 공지 관리
            </p>

            <p className="mt-2 text-sm leading-6 text-white/40">
              새로운 공지를 작성하거나 기존 공지를 관리합니다.
            </p>

            <p className="mt-6 text-sm text-white/70">
              관리하기 →
            </p>
          </Link>

          {/* 규칙 */}
          <Link
            href="/rules"
            className="block rounded-2xl border border-white/10 bg-white/[0.02] p-6 transition hover:border-white/25 hover:bg-white/[0.04]"
          >
            <p className="text-lg font-semibold">
              📜 규칙 관리
            </p>

            <p className="mt-2 text-sm leading-6 text-white/40">
              커뮤니티 규칙과 안내 내용을 확인합니다.
            </p>

            <p className="mt-6 text-sm text-white/70">
              관리하기 →
            </p>
          </Link>

          {/* 사이트 확인 */}
          <Link
            href="/"
            className="block rounded-2xl border border-white/10 bg-white/[0.02] p-6 transition hover:border-white/25 hover:bg-white/[0.04]"
          >
            <p className="text-lg font-semibold">
              🏠 사이트 확인
            </p>

            <p className="mt-2 text-sm leading-6 text-white/40">
              일반 이용자에게 보이는 홈페이지를 확인합니다.
            </p>

            <p className="mt-6 text-sm text-white/70">
              홈페이지 →
            </p>
          </Link>

        </section>
      </div>
    </main>
  );
}