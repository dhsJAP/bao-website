"use client";
import { useEffect } from 'react';

export default function ServiceWorkerProvider() {
  useEffect(() => {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker
        .register('/sw.js')
        .catch(() => {});
    }
  }, []);

  useEffect(() => {
    if (!('Notification' in window)) return;
    if (Notification.permission === 'default') {
      // Ask permission lazily
      setTimeout(() => {
        Notification.requestPermission().catch(() => {});
      }, 2000);
    }
  }, []);

  return null;
}