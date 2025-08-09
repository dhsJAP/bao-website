"use client";
import { useEffect, useState } from 'react';
import { db, type UserProfile } from '@/lib/db';

export default function ProfilePage() {
  const [profile, setProfile] = useState<UserProfile | null>(null);

  useEffect(() => {
    db.profiles.get('me').then((p) => setProfile(p ?? { id: 'me', dailyGoal: 20 }));
  }, []);

  const save = async () => {
    if (!profile) return;
    await db.profiles.put(profile);
    alert('Đã lưu');
  };

  return (
    <div className="space-y-4">
      <h1 className="text-xl font-semibold">Cá nhân</h1>
      <div className="grid gap-3">
        <label className="grid gap-1">
          <span className="text-sm text-neutral-600">Tên hiển thị</span>
          <input className="rounded border px-3 py-2" value={profile?.name ?? ''} onChange={(e) => setProfile(p => ({ ...(p ?? { id: 'me' }), name: e.target.value }))} />
        </label>
        <label className="grid gap-1">
          <span className="text-sm text-neutral-600">Mục tiêu mỗi ngày (từ)</span>
          <input type="number" className="rounded border px-3 py-2" value={profile?.dailyGoal ?? 20} onChange={(e) => setProfile(p => ({ ...(p ?? { id: 'me' }), dailyGoal: Number(e.target.value) }))} />
        </label>
        <div>
          <button className="rounded border px-3 py-2" onClick={save}>Lưu</button>
        </div>
      </div>
    </div>
  );
}