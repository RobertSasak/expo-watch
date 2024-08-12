import { StyleSheet, Text, View } from 'react-native';

import * as ExpoWatch from 'expo-watch';

export default function App() {
  return (
    <View style={styles.container}>
      <Text>{ExpoWatch.hello()}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
