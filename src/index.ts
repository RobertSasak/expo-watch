import { NativeModulesProxy, EventEmitter, Subscription } from 'expo-modules-core';

// Import the native module. On web, it will be resolved to ExpoWatch.web.ts
// and on native platforms to ExpoWatch.ts
import ExpoWatchModule from './ExpoWatchModule';
import ExpoWatchView from './ExpoWatchView';
import { ChangeEventPayload, ExpoWatchViewProps } from './ExpoWatch.types';

// Get the native constant value.
export const PI = ExpoWatchModule.PI;

export function hello(): string {
  return ExpoWatchModule.hello();
}

export async function setValueAsync(value: string) {
  return await ExpoWatchModule.setValueAsync(value);
}

const emitter = new EventEmitter(ExpoWatchModule ?? NativeModulesProxy.ExpoWatch);

export function addChangeListener(listener: (event: ChangeEventPayload) => void): Subscription {
  return emitter.addListener<ChangeEventPayload>('onChange', listener);
}

export { ExpoWatchView, ExpoWatchViewProps, ChangeEventPayload };
