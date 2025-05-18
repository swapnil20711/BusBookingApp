import { MMKV } from 'react-native-mmkv';
export const storage = new MMKV();

export const setString = (key: string, value: string) => {
    storage.set(key, value);
};

export const getString = (key: string) => {
    return storage.getString(key);
};

export const deleteFromMMKV = (key: string) => {
    storage.delete(key)
}
