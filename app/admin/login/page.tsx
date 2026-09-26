"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "../utils/supabase/client";

export default function AdminLoginPage() {
  const router = useRouter();
  const supabase = createClient();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  async function login() {
    if (!email.trim() || !password) {
      setMessage("이메일과 비밀번호를 입력해주세요.");
      return;
    }

    setLoading(true);
    setMessage("");

    const { error } = await supabase.auth.signInWithPassword({
      email: email.trim(),
      password,
    });

    if (error) {
      console.error(error);
      setMessage("이메일 또는 비밀번호를 확인해주세요.");
      setLoading(false);
      return;
    }

    router.push("/admin");
    router.refresh();
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#08090c] px-6 text-white">
      <div className="w-full max-w-md">
        <a
          href="/"
          className="text-sm text-white/40 transition hover:text-white"
        >
          ← 홈페이지
        </a>

        <div className="mt-10">
          <p className="text-xs tracking-[0.35em] text-white/30">
            ADMINISTRATOR
          </p>

          <h1 className="mt-3 text-4xl font-bold">
            관리자 로그인
          </h1>

          <p className="mt-4 text-sm leading-6 text-white/40">
            관리자 계정으로 로그인해주세요.
          </p>
        </div>

        <div className="mt-10 space-y-5 rounded-2xl border border-white/10 bg-white/[0.02] p-6">
          <div>
            <label className="mb-2 block text-sm text-white/60">
              이메일
            </label>

            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@example.com"
              autoComplete="email"
              className="w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-white outline-none placeholder:text-white/20 focus:border-white/30"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm text-white/60">
              비밀번호
            </label>

            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  login();
                }
              }}
              placeholder="비밀번호"
              autoComplete="current-password"
              className="w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-white outline-none placeholder:text-white/20 focus:border-white/30"
            />
          </div>

          {message && (
            <div className="rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-white/60">
              {message}
            </div>
          )}

          <button
            type="button"
            onClick={login}
            disabled={loading}
            className="w-full rounded-xl bg-white px-4 py-3 font-semibold text-black transition hover:bg-white/80 disabled:opacity-50"
          >
            {loading ? "로그인 중..." : "로그인"}
          </button>
        </div>
      </div>
    </main>
  );
}