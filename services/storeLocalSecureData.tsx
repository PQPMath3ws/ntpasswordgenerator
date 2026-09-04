import { getItemAsync, setItemAsync } from "expo-secure-store";

class StoreLocalSecureData {
  async getSecureData(key: string, defaultReturn: string): Promise<string> {
    try {
      const result = await getItemAsync(key);
      return result || defaultReturn;
    } catch {
      return defaultReturn;
    }
  }

  async setSecureData(key: string, value: string): Promise<void> {
    try {
      await setItemAsync(key, value);
    } catch {}
  }
}

const storeLocalSecureData = new StoreLocalSecureData();

export default storeLocalSecureData;
