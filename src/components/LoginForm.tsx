"use client";

import { useState } from "react";
import { loginWithPassword } from "@/app/actions/auth";

type Props = {
  title: string;
  lede: string;
};

export function LoginForm({ title, lede }: Props) {
  const [error, setError] = useState<string | null>(null);
  const [pending, setPending] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setPending(true);
    try {
      const formData = new FormData(e.currentTarget);
      const result = await loginWithPassword(formData);
      if (result.ok) {
        window.location.assign("/manage");
        return;
      }
      setError(result.error);
    } catch {
      setError("Something went wrong. Try again.");
    } finally {
      setPending(false);
    }
  }

  return (
    <div className="mx-auto flex min-h-[60vh] max-w-md flex-col justify-center px-4 py-12">
      <h1 className="mb-2 text-2xl font-bold text-[var(--wsu-gray)]">{title}</h1>
      <p className="mb-6 whitespace-pre-wrap text-sm text-[var(--wsu-gray-mid)]">{lede}</p>
      <form
        onSubmit={handleSubmit}
        className="space-y-4 rounded-[10px] bg-white p-5 shadow-[0_4px_14px_rgba(0,0,0,0.08)] ring-1 ring-black/5"
      >
        <div>
          <label htmlFor="password" className="mb-1 block text-xs font-semibold uppercase tracking-wide text-[var(--wsu-gray-mid)]">
            Password
          </label>
          <input
            id="password"
            name="password"
            type="password"
            autoComplete="current-password"
            required
            className="w-full rounded-lg border border-[var(--wsu-gray-light)] px-3 py-2 text-sm outline-none ring-[var(--wsu-crimson)] focus:ring-2"
          />
        </div>
        {error ? <p className="text-sm text-red-600">{error}</p> : null}
        <button
          type="submit"
          disabled={pending}
          className="w-full rounded-full bg-[var(--wsu-crimson)] py-2.5 text-sm font-semibold text-white hover:bg-[var(--wsu-crimson-dark)] disabled:opacity-60"
        >
          {pending ? "Signing in…" : "Sign in"}
        </button>
      </form>
    </div>
  );
}
