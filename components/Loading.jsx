import { ActivityIndicator, SafeAreaView, Text } from 'react-native';

export const Loading = () => {
  return (
    <SafeAreaView
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <ActivityIndicator size="large" />
      <Text style={{ marginTop: 15 }}>Загрузка ... </Text>
    </SafeAreaView>
  );
};
