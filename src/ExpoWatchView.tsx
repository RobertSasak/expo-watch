import { requireNativeViewManager } from 'expo-modules-core';
import * as React from 'react';

import { ExpoWatchViewProps } from './ExpoWatch.types';

const NativeView: React.ComponentType<ExpoWatchViewProps> =
  requireNativeViewManager('ExpoWatch');

export default function ExpoWatchView(props: ExpoWatchViewProps) {
  return <NativeView {...props} />;
}
