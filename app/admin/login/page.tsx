"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "../utils/supabase/client";

export default function AdminLoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  async function handleLogin(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    setLoading(true);
    setMessage("");

    const supabase = createClient();

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setMessage("이메일 또는 비밀번호를 확인해주세요.");
      setLoading(false);
      return;
    }

    router.push("/admin");
    router.refresh();
  }

  return (
    <main className="min-h-screen bg-[#08090b] text-white flex items-center justify-center px-6">
      <div className="w-full max-w-md">
        <p className="mb-3 text-xs tracking-[0.35em] text-white/40">
          MANAGEMENT SYSTEM
        </p>

        <h1 className="text-4xl font-bold">관리자 로그인</h1>

        <p className="mt-3 text-sm text-white/45">
          관리자 계정으로 로그인하세요.
        </p>

        <form
          onSubmit={handleLogin}
          className="mt-10 rounded-2xl border border-white/10 bg-white/[0.02] p-7"
        >
          <label className="block text-sm text-white/60">이메일</label>

          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            autoComplete="email"
            className="mt-2 w-full rounded-xl border border-white/10 bg-black px-4 py-3 text-white outline-none focus:border-white/30"
            placeholder="admin@example.com"
          />

          <label className="mt-6 block text-sm text-white/60">비밀번호</label>

          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            autoComplete="current-password"
            className="mt-2 w-full rounded-xl border border-white/10 bg-black px-4 py-3 text-white outline-none focus:border-white/30"
            placeholder="비밀번호"
          />

          {message && (
            <p className="mt-4 text-sm text-red-400">{message}</p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="mt-7 w-full rounded-xl bg-white py-3 font-semibold text-black transition hover:bg-white/90 disabled:opacity-50"
          >
            {loading ? "로그인 중..." : "로그인"}
          </button>
        </form>
      </div>
    </main>
  );
}
