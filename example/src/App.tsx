import { View, StyleSheet, Dimensions } from 'react-native';
import { BannerAd } from 'react-native-adgeist';

export default function App() {
  return (
    <View style={styles.container}>
      <BannerAd
        dataPublisherId="67c99c7a34929568f405e7ff"
        dataAdSlot="67a056c63205fce2290d1cda"
        width={Dimensions.get('window').width}
        height={300}
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
