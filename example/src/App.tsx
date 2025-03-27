import { View, StyleSheet } from 'react-native';
import { BottomBannerAd } from 'react-native-adgeist';

export default function App() {
  return (
    <View style={styles.container}>
      <BottomBannerAd
        dataPublisherId="67a056c63205fce2290d1cda"
        dataAdSlot="67c99c7a34929568f405e7ff"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
