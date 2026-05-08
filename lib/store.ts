import AsyncStorage from '@react-native-async-storage/async-storage';

const PREFIX = 'kaliy:app:';

export const store = {
  async get<T>(key: string, fallback: T): Promise<T> {
    try {
      const v = await AsyncStorage.getItem(PREFIX + key);
      return v === null ? fallback : JSON.parse(v);
    } catch {
      return fallback;
    }
  },
  async set(key: string, val: unknown): Promise<void> {
    try {
      await AsyncStorage.setItem(PREFIX + key, JSON.stringify(val));
    } catch {}
  },
  async clear(): Promise<void> {
    try {
      const keys = await AsyncStorage.getAllKeys();
      const appKeys = (keys as readonly string[]).filter(k => k.startsWith(PREFIX));
      await Promise.all(appKeys.map(k => AsyncStorage.removeItem(k)));
    } catch {}
  },
};
