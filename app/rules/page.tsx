export default function RulesPage() {
  const rules = [
    {
      number: "01",
      title: "기본 예절",
      description:
        "욕설, 비하, 조롱, 시비 등 다른 사람에게 불쾌감을 줄 수 있는 언행은 삼가주세요.",
    },
    {
      number: "02",
      title: "상대방이 싫어하는 행동은 멈추기",
      description:
        "장난이라도 상대방이 불편하다고 표현했다면 해당 행동을 계속하지 말아주세요.",
    },
    {
      number: "03",
      title: "과도한 싸움 및 분쟁 금지",
      description:
        "게임이나 채팅 중 문제가 생겼다면 공개적으로 싸움을 이어가기보다 관리자에게 알려주세요.",
    },
    {
      number: "04",
      title: "도배 및 채팅 방해 금지",
      description:
        "같은 내용의 반복 전송, 과도한 멘션, 의미 없는 도배 등 다른 사람의 채팅 이용을 방해하는 행동은 금지합니다.",
    },
    {
      number: "05",
      title: "부적절한 콘텐츠 금지",
      description:
        "음란물, 지나치게 폭력적이거나 혐오감을 주는 콘텐츠 등 서버 이용에 부적절한 내용은 게시하지 말아주세요.",
    },
    {
      number: "06",
      title: "개인정보 보호",
      description:
        "본인 또는 다른 사람의 개인정보를 공개하거나 허락 없이 공유하지 말아주세요.",
    },
    {
      number: "07",
      title: "홍보 및 초대 링크",
      description:
        "관리자의 허락 없는 타 서버 홍보, 광고 및 초대 링크 게시는 금지합니다.",
    },
    {
      number: "08",
      title: "관리자 사칭 및 허위 신고 금지",
      description:
        "관리자인 것처럼 사칭하거나 다른 이용자를 곤란하게 만들기 위한 고의적인 허위 신고는 금지합니다.",
    },
    {
      number: "09",
      title: "공지사항 확인",
      description:
        "중요한 운영 안내 및 규칙 변경 사항이 올라올 수 있으니 공지사항을 확인해주세요.",
    },
    {
      number: "10",
      title: "관리자 안내 준수",
      description:
        "규칙에 명시되지 않은 상황이라도 서버 운영 및 분쟁 해결을 위해 필요한 관리자의 안내를 따라주세요.",
    },
  ];

  return (
    <main className="min-h-screen bg-[#08090c] text-white">
      {/* 상단 메뉴 */}
      <header className="border-b border-white/10">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5">
          <a href="/" className="text-xl font-bold tracking-wider">
            I LOVE ME THAN{" "}
            <span className="text-white/50">VALO</span>
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

      {/* 규칙 */}
      <section className="mx-auto max-w-4xl px-6 py-20">
        <div className="mb-14">
          <p className="mb-4 text-xs font-semibold tracking-[0.35em] text-white/30">
            COMMUNITY GUIDELINES
          </p>

          <h1 className="text-4xl font-bold md:text-6xl">
            서버 규칙
          </h1>

          <p className="mt-5 max-w-2xl leading-7 text-white/45">
            I LOVE ME THAN VALO의 모든 구성원이 편하게 활동할 수 있도록
            아래 규칙을 확인해주세요.
          </p>
        </div>

        {/* 규칙 목록 */}
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

        {/* 제재 안내 */}
        <div className="mt-12 rounded-2xl border border-white/10 bg-white/[0.025] p-6">
          <p className="text-xs font-semibold tracking-[0.25em] text-white/30">
            SANCTION POLICY
          </p>

          <h2 className="mt-3 text-lg font-semibold">
            제재 안내
          </h2>

          <p className="mt-3 text-sm leading-7 text-white/40">
            규칙 위반의 내용과 정도에 따라 경고, 타임아웃, 추방,
            차단 등의 조치가 이루어질 수 있습니다.
            반복적인 규칙 위반이나 심각한 행위의 경우 단계 없이
            더 강한 조치가 적용될 수 있습니다.
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