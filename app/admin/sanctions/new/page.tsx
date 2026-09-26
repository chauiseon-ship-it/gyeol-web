"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { createClient } from "../../utils/supabase/client";

export default function NewSanctionPage() {
  const router = useRouter();
  const supabase = createClient();

  const [user, setUser] = useState("");
  const [type, setType] = useState("");
  const [reason, setReason] = useState("");
  const [status, setStatus] = useState("처리 완료");

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  async function createSanction() {
    if (!user.trim() || !type.trim() || !reason.trim()) {
      setMessage("닉네임, 제재 종류, 사유를 모두 입력해주세요.");
      return;
    }

    setLoading(true);
    setMessage("");

    const { error } = await supabase.from("sanctions").insert({
      user: user.trim(),
      type: type.trim(),
      reason: reason.trim(),
      status,
    });

    if (error) {
      console.error(error);
      setMessage("제재 기록 등록에 실패했습니다.");
      setLoading(false);
      return;
    }

    router.push("/admin/sanctions");
    router.refresh();
  }

  return (
    <main className="min-h-screen bg-[#08090c] text-white">
      <div className="mx-auto max-w-3xl px-6 py-16">
        <Link
          href="/admin/sanctions"
          className="text-sm text-white/50 transition hover:text-white"
        >
          ← 제재 기록 관리
        </Link>

        <div className="mt-10">
          <p className="text-xs tracking-[0.4em] text-white/30">
            NEW SANCTION
          </p>

          <h1 className="mt-3 text-4xl font-bold">
            제재 기록 등록
          </h1>

          <p className="mt-4 text-sm text-white/40">
            새로운 제재 기록을 등록합니다.
          </p>
        </div>

        <div className="mt-10 space-y-5 rounded-2xl border border-white/10 bg-white/[0.02] p-6">
          <div>
            <label className="mb-2 block text-sm text-white/60">
              닉네임
            </label>

            <input
              type="text"
              value={user}
              onChange={(e) => setUser(e.target.value)}
              placeholder="제재 대상 닉네임"
              className="w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 outline-none placeholder:text-white/20 focus:border-white/30"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm text-white/60">
              제재 종류
            </label>

            <input
              type="text"
              value={type}
              onChange={(e) => setType(e.target.value)}
              placeholder="예: 경고, 7일 차단, 영구 차단"
              className="w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 outline-none placeholder:text-white/20 focus:border-white/30"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm text-white/60">
              제재 사유
            </label>

            <textarea
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              placeholder="제재 사유를 입력하세요."
              rows={5}
              className="w-full resize-none rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 outline-none placeholder:text-white/20 focus:border-white/30"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm text-white/60">
              상태
            </label>

            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="w-full rounded-xl border border-white/10 bg-[#101115] px-4 py-3 outline-none focus:border-white/30"
            >
              <option value="처리 완료">처리 완료</option>
              <option value="제재 중">제재 중</option>
            </select>
          </div>

          {message && (
            <div className="rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-white/60">
              {message}
            </div>
          )}

          <button
            type="button"
            onClick={createSanction}
            disabled={loading}
            className="w-full rounded-xl bg-white px-4 py-3 font-semibold text-black transition hover:bg-white/80 disabled:opacity-50"
          >
            {loading ? "등록 중..." : "제재 기록 등록"}
          </button>
        </div>
      </div>
    </main>
  );
}