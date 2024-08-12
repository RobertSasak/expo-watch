import * as React from 'react';

import { ExpoWatchViewProps } from './ExpoWatch.types';

export default function ExpoWatchView(props: ExpoWatchViewProps) {
  return (
    <div>
      <span>{props.name}</span>
    </div>
  );
}
