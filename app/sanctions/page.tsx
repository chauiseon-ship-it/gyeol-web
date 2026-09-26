export default function SanctionsPage() {
  const sanctions = [
    {
      id: "0003",
      user: "ExampleUser",
      type: "경고",
      reason: "반복적인 도배",
      date: "2026-09-21",
      status: "처리 완료",
    },
    {
      id: "0002",
      user: "TestUser",
      type: "7일 차단",
      reason: "서버 규칙 반복 위반",
      date: "2026-09-20",
      status: "제재 중",
    },
    {
      id: "0001",
      user: "SampleUser",
      type: "경고",
      reason: "채널 목적 위반",
      date: "2026-09-18",
      status: "처리 완료",
    },
  ];

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

            <a href="/sanctions" className="text-white">
              제재 기록
            </a>

            <a href="/notice" className="transition hover:text-white">
              공지
            </a>

            <a
              href="/admin/login"
              className="transition hover:text-white"
            >
              관리자 로그인
            </a>
          </nav>
        </div>
      </header>

      {/* 내용 */}
      <section className="mx-auto max-w-5xl px-6 py-20">
        <p className="text-xs font-semibold tracking-[0.35em] text-white/30">
          SANCTION RECORDS
        </p>

        <h1 className="mt-4 text-4xl font-bold md:text-6xl">
          제재 기록
        </h1>

        <p className="mt-5 max-w-2xl leading-7 text-white/45">
          커뮤니티 운영 규칙에 따라 처리된 제재 기록을 확인할 수 있습니다.
        </p>

        {/* 검색창 */}
        <div className="mt-10">
          <input
            type="text"
            placeholder="닉네임 또는 기록 번호 검색"
            className="w-full rounded-xl border border-white/10 bg-white/[0.03] px-5 py-4 text-white outline-none placeholder:text-white/25 focus:border-white/30"
          />
        </div>

        {/* 제재 기록 */}
        <div className="mt-8 space-y-4">
          {sanctions.map((sanction) => (
            <article
              key={sanction.id}
              className="rounded-2xl border border-white/10 bg-white/[0.025] p-6 transition hover:border-white/20"
            >
              <div className="flex flex-col justify-between gap-6 md:flex-row md:items-center">
                <div>
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-xs text-white/25">
                      #{sanction.id}
                    </span>

                    <h2 className="text-lg font-semibold">
                      {sanction.user}
                    </h2>
                  </div>

                  <p className="mt-3 text-sm text-white/45">
                    사유 · {sanction.reason}
                  </p>
                </div>

                <div className="grid grid-cols-3 gap-8 text-sm">
                  <div>
                    <p className="text-xs text-white/25">제재</p>
                    <p className="mt-1">{sanction.type}</p>
                  </div>

                  <div>
                    <p className="text-xs text-white/25">날짜</p>
                    <p className="mt-1">{sanction.date}</p>
                  </div>

                  <div>
                    <p className="text-xs text-white/25">상태</p>
                    <p className="mt-1">{sanction.status}</p>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>

        <p className="mt-8 text-xs leading-6 text-white/25">
          공개 기록에는 커뮤니티 운영에 필요한 최소한의 정보만 표시합니다.
        </p>
      </section>
    </main>
  );
}