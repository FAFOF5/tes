
import { State } from '../config/state';

export class ApiVaultEngine {
  public static async testKey(key: string): Promise<boolean> {
    if (!key || key.trim().length < 15) return false;
    try {
      const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${encodeURIComponent(key.trim())}`;
      const res = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ contents: [{ parts: [{ text: 'Ping Test' }] }] })
      });
      return res.ok;
    } catch {
      return false;
    }
  }

  public static savePersonalKey(key: string): void {
    State.data.vault.personalKey = key.trim();
    State.data.vault.activeKeyType = 'personal';
    State.save();
  }

  public static contributeToCommunityPool(key: string): void {
    const trimmed = key.trim();
    if (!State.data.vault.communityPool.includes(trimmed)) {
      State.data.vault.communityPool.push(trimmed);
    }
    State.data.vault.activeKeyType = 'community';
    State.save();
  }

  public static getActiveKey(): string {
    const { personalKey, communityPool } = State.data.vault;
    if (personalKey) return personalKey;
    if (communityPool.length > 0) {
      const randomIndex = Math.floor(Math.random() * communityPool.length);
      return communityPool[randomIndex];
    }
    return '';
  }

  public static getActiveTypeLabel(): string {
    const { personalKey, communityPool } = State.data.vault;
    if (personalKey) return 'مفتاح شخصي نشط';
    if (communityPool.length > 0) return `مشارك من المجمع العام (${communityPool.length} مفاتيح)`;
    return 'غير متوفر';
  }
}