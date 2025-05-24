// hooks/useStorage.ts
import { useState, useEffect, useCallback } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as SecureStore from 'expo-secure-store';

type UseStorageReturn = {
// AsyncStorage methods
getItem: (key: string) => Promise<string | null>;
setItem: (key: string, value: string) => Promise<void>;
removeItem: (key: string) => Promise<void>;
// SecureStore methods
getSecureItem: (key: string) => Promise<string | null>;
setSecureItem: (key: string, value: string) => Promise<void>;
removeSecureItem: (key: string) => Promise<void>;
// Stateful storage
storedValue: string | null;
secureStoredValue: string | null;
loadingStorage: boolean;
errorStorage: Error | null;
};

const useStorage = (initialKey?: string, initialSecureKey?: string): UseStorageReturn => {
const [storedValue, setStoredValue] = useState<string | null>(null);
const [secureStoredValue, setSecureStoredValue] = useState<string | null>(null);
const [loadingStorage, setLoading] = useState<boolean>(false);
const [errorStorage, setError] = useState<Error | null>(null);

// Initialize with initial keys if provided
useEffect(() => {
if (initialKey) {
getItem(initialKey).catch(e => setError(e));
}
if (initialSecureKey) {
getSecureItem(initialSecureKey).catch(e => setError(e));
}
}, [initialKey, initialSecureKey]);

// AsyncStorage methods
const getItem = useCallback(async (key: string): Promise<string | null> => {
try {
setLoading(true);
const value = await AsyncStorage.getItem(key);
setStoredValue(value);
return value;
} catch (e) {
setError(e as Error);
return null;
} finally {
setLoading(false);
}
}, []);

const setItem = useCallback(async (key: string, value: string): Promise<void> => {
try {
setLoading(true);
await AsyncStorage.setItem(key, value);
setStoredValue(value);
} catch (e) {
setError(e as Error);
} finally {
setLoading(false);
}
}, []);

const removeItem = useCallback(async (key: string): Promise<void> => {
try {
setLoading(true);
await AsyncStorage.removeItem(key);
setStoredValue(null);
} catch (e) {
setError(e as Error);
} finally {
setLoading(false);
}
}, []);

// SecureStore methods
const getSecureItem = useCallback(async (key: string): Promise<string | null> => {
try {
setLoading(true);
const value = await SecureStore.getItemAsync(key);
setSecureStoredValue(value);
return value;
} catch (e) {
setError(e as Error);
return null;
} finally {
setLoading(false);
}
}, []);

const setSecureItem = useCallback(async (key: string, value: string): Promise<void> => {
try {
setLoading(true);
await SecureStore.setItemAsync(key, value);
setSecureStoredValue(value);
} catch (e) {
setError(e as Error);
} finally {
setLoading(false);
}
}, []);

const removeSecureItem = useCallback(async (key: string): Promise<void> => {
try {
setLoading(true);
await SecureStore.deleteItemAsync(key);
setSecureStoredValue(null);
} catch (e) {
setError(e as Error);
} finally {
setLoading(false);
}
}, []);

return {
getItem,
setItem,
removeItem,
getSecureItem,
setSecureItem,
removeSecureItem,
storedValue,
secureStoredValue,
loadingStorage,
errorStorage,
};
};

export default useStorage;