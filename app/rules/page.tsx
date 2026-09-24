export default function RulesPage() {
  const rules = [
    {
      number: "01",
      title: "기본 예절",
      description:
        "모든 이용자를 존중해주세요. 과도한 비방, 괴롭힘, 분쟁 유도는 제재될 수 있습니다.",
    },
    {
      number: "02",
      title: "도배 및 스팸",
      description:
        "반복 메시지, 의미 없는 도배, 과도한 멘션 등 다른 이용을 방해하는 행동은 금지됩니다.",
    },
    {
      number: "03",
      title: "개인정보 보호",
      description:
        "본인 또는 다른 사람의 개인정보를 공개하거나 공유하지 마세요.",
    },
    {
      number: "04",
      title: "채널 목적 준수",
      description:
        "각 채널의 목적에 맞게 이용해주세요. 주제와 맞지 않는 내용은 적절한 채널로 이동해주세요.",
    },
    {
      number: "05",
      title: "운영 방해 금지",
      description:
        "제재 회피, 반복적인 규칙 위반 등 정상적인 서버 운영을 방해하는 행동은 금지됩니다.",
    },
  ];

  return (
    <main className="min-h-screen bg-[#08090c] text-white">
      <header className="border-b border-white/10">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5">
          <a href="/" className="text-xl font-bold tracking-wider">
            伴 <span className="text-white/50">NETWORK</span>
          </a>

          <nav className="flex gap-6 text-sm text-white/50">
            <a href="/" className="transition hover:text-white">
              홈
            </a>

            <a href="/rules" className="text-white">
              규칙
            </a>

            <a href="/sanctions" className="transition hover:text-white">
              제재 기록
            </a>

            <a href="/notice" className="transition hover:text-white">
              공지
            </a>
          </nav>
        </div>
      </header>

      <section className="mx-auto max-w-4xl px-6 py-20">
        <div className="mb-14">
          <p className="mb-4 text-xs font-semibold tracking-[0.35em] text-white/30">
            COMMUNITY GUIDELINES
          </p>

          <h1 className="text-4xl font-bold md:text-6xl">
            서버 규칙
          </h1>

          <p className="mt-5 max-w-2xl leading-7 text-white/45">
            伴 NETWORK의 모든 구성원이 편하게 활동할 수 있도록
            아래 규칙을 확인해주세요.
          </p>
        </div>

        <div className="space-y-4">
          {rules.map((rule) => (
            <article
              key={rule.number}
              className="group rounded-2xl border border-white/10 bg-white/[0.025] p-6 transition hover:border-white/20 hover:bg-white/[0.04]"
            >
              <div className="flex gap-6">
                <span className="font-mono text-sm text-white/25">
                  {rule.number}
                </span>

                <div>
                  <h2 className="text-lg font-semibold">
                    {rule.title}
                  </h2>

                  <p className="mt-2 leading-7 text-white/45">
                    {rule.description}
                  </p>
                </div>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-12 rounded-2xl border border-white/10 bg-white/[0.025] p-6">
          <p className="text-sm leading-6 text-white/40">
            규칙 위반에 대한 조치는 상황과 정도에 따라 달라질 수 있으며,
            제재 기록은 제재 기록 페이지에서 확인할 수 있습니다.
          </p>
        </div>

        <a
          href="/"
          className="mt-10 inline-flex rounded-xl border border-white/10 px-5 py-3 text-sm text-white/60 transition hover:bg-white/5 hover:text-white"
        >
          ← 홈으로 돌아가기
        </a>
      </section>
    </main>
  );
}