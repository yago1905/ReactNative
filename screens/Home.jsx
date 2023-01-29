import {
  Text,
  SafeAreaView,
  Alert,
  FlatList,
  ActivityIndicator,
  RefreshControl,
  TouchableOpacity,
} from 'react-native';
import { Post } from '../components/Post';

import axios from 'axios';
import React from 'react';

export const HomeScreen = ({ navigation }) => {
  const [isLoading, setIsLoading] = React.useState(true);
  const [items, setItems] = React.useState();

  const fetchPosts = () => {
    setIsLoading(true);
    axios
      .get('https://63cbb95d5c6f2e1d84ba8b4f.mockapi.io/Posts')
      .then(({ data }) => {
        setItems(data);
      })
      .catch((err) => {
        console.log(err);
        Alert.alert('Ошибка', 'Не удалось получить статьи');
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  React.useEffect(fetchPosts, []);

  if (isLoading) {
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
  }

  return (
    <SafeAreaView>
      <FlatList
        refreshControl={
          <RefreshControl refreshing={isLoading} onRefresh={fetchPosts} />
        }
        data={items}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() =>
              navigation.navigate('FullPost', {
                id: item.id,
                title: item.title,
              })
            }
          >
            <Post
              title={item.title}
              createDate={item.createdAt}
              imageUrl={item.imageUrl}
            />
          </TouchableOpacity>
        )}
      />
    </SafeAreaView>
  );
};
