// scripts/storageEvents.ts
type Listener = (...args: any[]) => void;

class SimpleEmitter {
  private listeners: Record<string, Listener[]> = {};

  on(event: string, listener: Listener) {
    if (!this.listeners[event]) this.listeners[event] = [];
    this.listeners[event].push(listener);
  }

  off(event: string, listener: Listener) {
    this.listeners[event] = (this.listeners[event] || []).filter(l => l !== listener);
  }

  emit(event: string, ...args: any[]) {
    (this.listeners[event] || []).forEach(listener => listener(...args));
  }
}

export const storageEvents = new SimpleEmitter();
