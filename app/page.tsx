"use client";

export default function Home() {
  function openDiscord() {
    // Discord 데스크톱 앱 실행 시도
    window.location.href = "discord://-/invite/m7ND3bucfh";

    // 앱 실행이 안 되는 경우 웹 초대 페이지로 이동
    setTimeout(() => {
      window.location.href = "https://discord.gg/m7ND3bucfh";
    }, 1500);
  }

  return (
    <main className="min-h-screen bg-[#08090c] text-white">
      {/* 상단 메뉴 */}
      <header className="border-b border-white/10">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5">
          <a href="/" className="text-xl font-bold tracking-wider">
            伴 <span className="text-white/50">NETWORK</span>
          </a>

          <nav className="flex gap-6 text-sm text-white/50">
            <a
              href="/"
              className="text-white transition hover:text-white"
            >
              홈
            </a>

            <a
              href="/rules"
              className="transition hover:text-white"
            >
              규칙
            </a>

            <a
              href="/sanctions"
              className="transition hover:text-white"
            >
              제재 기록
            </a>

            <a
              href="/notice"
              className="transition hover:text-white"
            >
              공지
            </a>
          </nav>
        </div>
      </header>

      {/* 메인 화면 */}
      <section className="mx-auto flex min-h-[calc(100vh-81px)] max-w-5xl flex-col justify-center px-8">
        <p className="mb-4 text-sm tracking-[0.3em] text-white/40">
          COMMUNITY NETWORK
        </p>

        <h1 className="text-5xl font-bold md:text-7xl">
          伴 NETWORK
        </h1>

        <p className="mt-6 max-w-xl text-lg leading-8 text-white/50">
          커뮤니티의 규칙, 공지사항과 제재 기록을
          한곳에서 확인할 수 있습니다.
        </p>

        {/* 버튼 */}
        <div className="mt-10 flex gap-4">
          <button
            type="button"
            onClick={openDiscord}
            className="rounded-lg bg-white px-6 py-3 font-semibold text-black transition hover:bg-white/80"
          >
            서버 입장
          </button>

          <a
            href="/rules"
            className="rounded-lg border border-white/20 px-6 py-3 text-white/70 transition hover:bg-white/10 hover:text-white"
          >
            규칙 확인
          </a>
        </div>
      </section>
    </main>
  );
}