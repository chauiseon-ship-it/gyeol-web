"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { createClient } from "@/utils/supabase/client";

type Notice = {
  id: number;
  title: string;
  content: string;
  author: string | null;
  created_at: string;
};

export default function AdminNoticesPage() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [author, setAuthor] = useState("");

  const [notices, setNotices] = useState<Notice[]>([]);
  const [loading, setLoading] = useState(false);
  const [deletingId, setDeletingId] = useState<number | null>(null);
  const [message, setMessage] = useState("");

  // 수정 관련
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editTitle, setEditTitle] = useState("");
  const [editContent, setEditContent] = useState("");
  const [editAuthor, setEditAuthor] = useState("");
  const [updating, setUpdating] = useState(false);

  const supabase = createClient();

  // 공지 목록 불러오기
  async function loadNotices() {
    const { data, error } = await supabase
      .from("notices")
      .select("id, title, content, author, created_at")
      .order("created_at", { ascending: false });

    if (error) {
      console.error(error);
      setMessage("공지 목록을 불러오지 못했습니다.");
      return;
    }

    setNotices(data ?? []);
  }

  useEffect(() => {
    loadNotices();
  }, []);

  // 새 공지 등록
  async function createNotice() {
    if (!title.trim() || !content.trim() || !author.trim()) {
      setMessage("제목, 내용, 작성자를 모두 입력해주세요.");
      return;
    }

    setLoading(true);
    setMessage("");

    const { error } = await supabase.from("notices").insert({
      title: title.trim(),
      content: content.trim(),
      author: author.trim(),
    });

    if (error) {
      console.error(error);
      setMessage("공지 등록에 실패했습니다.");
      setLoading(false);
      return;
    }

    setTitle("");
    setContent("");
    setAuthor("");
    setMessage("공지가 등록되었습니다!");
    setLoading(false);

    await loadNotices();
  }

  // 수정 시작
  function startEdit(notice: Notice) {
    setEditingId(notice.id);
    setEditTitle(notice.title);
    setEditContent(notice.content);
    setEditAuthor(notice.author ?? "");
    setMessage("");
  }

  // 수정 취소
  function cancelEdit() {
    setEditingId(null);
    setEditTitle("");
    setEditContent("");
    setEditAuthor("");
  }

  // 수정 저장
  async function updateNotice(id: number) {
    if (
      !editTitle.trim() ||
      !editContent.trim() ||
      !editAuthor.trim()
    ) {
      setMessage("제목, 내용, 작성자를 모두 입력해주세요.");
      return;
    }

    setUpdating(true);
    setMessage("");

    const { error } = await supabase
      .from("notices")
      .update({
        title: editTitle.trim(),
        content: editContent.trim(),
        author: editAuthor.trim(),
      })
      .eq("id", id);

    if (error) {
      console.error(error);
      setMessage("공지 수정에 실패했습니다.");
      setUpdating(false);
      return;
    }

    setUpdating(false);
    cancelEdit();
    setMessage("공지가 수정되었습니다!");

    await loadNotices();
  }

  // 삭제
  async function deleteNotice(id: number) {
    const confirmed = window.confirm(
      "이 공지를 정말 삭제하시겠습니까?"
    );

    if (!confirmed) return;

    setDeletingId(id);
    setMessage("");

    const { error } = await supabase
      .from("notices")
      .delete()
      .eq("id", id);

    if (error) {
      console.error(error);
      setMessage("공지 삭제에 실패했습니다.");
      setDeletingId(null);
      return;
    }

    if (editingId === id) {
      cancelEdit();
    }

    setDeletingId(null);
    setMessage("공지가 삭제되었습니다.");

    await loadNotices();
  }

  return (
    <main className="min-h-screen bg-[#08090a] text-white">
      <div className="mx-auto max-w-4xl px-6 py-16">
        <Link
          href="/admin"
          className="text-sm text-white/50 transition hover:text-white"
        >
          ← 관리자 대시보드
        </Link>

        <div className="mt-10">
          <p className="text-xs tracking-[0.4em] text-white/40">
            NOTICE MANAGEMENT
          </p>

          <h1 className="mt-3 text-4xl font-bold">
            공지 관리
          </h1>

          <p className="mt-4 text-sm text-white/40">
            새로운 공지를 작성하거나 기존 공지를 수정·삭제합니다.
          </p>
        </div>

        {/* 새 공지 작성 */}
        <div className="mt-10 space-y-5 rounded-2xl border border-white/10 bg-white/[0.02] p-6">
          <div>
            <label className="mb-2 block text-sm text-white/60">
              제목
            </label>

            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="공지 제목을 입력하세요."
              className="w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-white outline-none placeholder:text-white/20 focus:border-white/30"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm text-white/60">
              내용
            </label>

            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="공지 내용을 입력하세요."
              rows={8}
              className="w-full resize-none rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-white outline-none placeholder:text-white/20 focus:border-white/30"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm text-white/60">
              작성자
            </label>

            <input
              type="text"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              placeholder="예: 관리자"
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
            onClick={createNotice}
            disabled={loading}
            className="w-full rounded-xl bg-white px-4 py-3 font-semibold text-black transition hover:bg-white/80 disabled:opacity-50"
          >
            {loading ? "등록 중..." : "공지 등록"}
          </button>
        </div>

        {/* 공지 목록 */}
        <section className="mt-14">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold">
              등록된 공지
            </h2>

            <p className="text-sm text-white/30">
              총 {notices.length}개
            </p>
          </div>

          {notices.length === 0 ? (
            <div className="mt-5 rounded-2xl border border-white/10 p-8 text-center text-sm text-white/40">
              등록된 공지가 없습니다.
            </div>
          ) : (
            <div className="mt-5 overflow-hidden rounded-2xl border border-white/10">
              {notices.map((notice) => (
                <div
                  key={notice.id}
                  className="border-b border-white/10 p-6 last:border-b-0"
                >
                  {editingId === notice.id ? (
                    /* 수정 모드 */
                    <div className="space-y-4">
                      <p className="text-xs font-semibold tracking-widest text-white/40">
                        공지 수정
                      </p>

                      <input
                        type="text"
                        value={editTitle}
                        onChange={(e) =>
                          setEditTitle(e.target.value)
                        }
                        className="w-full rounded-xl border border-white/10 bg-black/30 px-4 py-3 outline-none focus:border-white/30"
                      />

                      <textarea
                        value={editContent}
                        onChange={(e) =>
                          setEditContent(e.target.value)
                        }
                        rows={6}
                        className="w-full resize-none rounded-xl border border-white/10 bg-black/30 px-4 py-3 outline-none focus:border-white/30"
                      />

                      <input
                        type="text"
                        value={editAuthor}
                        onChange={(e) =>
                          setEditAuthor(e.target.value)
                        }
                        className="w-full rounded-xl border border-white/10 bg-black/30 px-4 py-3 outline-none focus:border-white/30"
                      />

                      <div className="flex gap-3">
                        <button
                          type="button"
                          onClick={() =>
                            updateNotice(notice.id)
                          }
                          disabled={updating}
                          className="rounded-lg bg-white px-5 py-2 text-sm font-semibold text-black transition hover:bg-white/80 disabled:opacity-50"
                        >
                          {updating
                            ? "저장 중..."
                            : "수정 저장"}
                        </button>

                        <button
                          type="button"
                          onClick={cancelEdit}
                          disabled={updating}
                          className="rounded-lg border border-white/10 px-5 py-2 text-sm text-white/60 transition hover:bg-white/5 hover:text-white"
                        >
                          취소
                        </button>
                      </div>
                    </div>
                  ) : (
                    /* 일반 모드 */
                    <div className="flex items-start justify-between gap-6">
                      <div className="min-w-0">
                        <div className="flex items-center gap-3">
                          <span className="font-mono text-xs text-white/25">
                            #
                            {String(notice.id).padStart(
                              3,
                              "0"
                            )}
                          </span>

                          <h3 className="font-semibold">
                            {notice.title}
                          </h3>
                        </div>

                        <p className="mt-3 whitespace-pre-wrap text-sm leading-6 text-white/40">
                          {notice.content}
                        </p>

                        <p className="mt-4 text-xs text-white/25">
                          작성자 ·{" "}
                          {notice.author || "관리자"}
                        </p>
                      </div>

                      <div className="flex shrink-0 gap-2">
                        <button
                          type="button"
                          onClick={() => startEdit(notice)}
                          className="rounded-lg border border-white/10 px-4 py-2 text-sm text-white/70 transition hover:bg-white/5 hover:text-white"
                        >
                          수정
                        </button>

                        <button
                          type="button"
                          onClick={() =>
                            deleteNotice(notice.id)
                          }
                          disabled={
                            deletingId === notice.id
                          }
                          className="rounded-lg border border-red-500/20 px-4 py-2 text-sm text-red-300 transition hover:bg-red-500/10 disabled:opacity-50"
                        >
                          {deletingId === notice.id
                            ? "삭제 중..."
                            : "삭제"}
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </section>
      </div>
    </main>
  );
}