"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/utils/supabase/client";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setError("");
    const supabase = createClient();
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    setLoading(false);
    if (error) {
      setError(error.message);
      return;
    }
    router.push("/admin");
    router.refresh();
  }

  return (
    <div className="admin-login-box">
      <h1 className="admin-h1">Admin Login</h1>
      <p className="admin-sub">Sign in to manage the Yamini Kalluri site.</p>
      <form onSubmit={handleSubmit}>
        <div className="admin-field">
          <label>Email</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </div>
        <div className="admin-field">
          <label>Password</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        </div>
        <button className="admin-save" disabled={loading} type="submit">
          {loading ? "Signing in…" : "Sign In"}
        </button>
        {error && <p className="admin-msg err">{error}</p>}
      </form>
    </div>
  );
}
