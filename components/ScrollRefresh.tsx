import React, { useState, useEffect } from 'react';
import { StyleSheet, View, RefreshControl, FlatList } from 'react-native';
import { useTheme } from '@/components/Themed/ContextTheme';

interface Item {
  id: string;
  userName: string;
  price: number;
  date: string;
  time: string;
  free: number;
  startZone: string;
  endZone: string;
}

const ScrollRefresh = () => {
  const { theme } = useTheme();
  const [data, setData] = useState<Item[]>([
    {
      id: '1',
      userName: 'Juan Pérez',
      price: 5,
      date: '2023-05-15',
      time: '08:30',
      free: 3,
      startZone: 'Centro',
      endZone: 'Norte'
    },
    {
      id: '2',
      userName: 'María García',
      price: 16,
      date: '2023-05-16',
      time: '14:15',
      free: 2,
      startZone: 'Sur',
      endZone: 'Este'
    },
    {
      id: '3',
      userName: 'Carlos López',
      price: 2,
      date: '2023-05-17',
      time: '10:45',
      free: 4,
      startZone: 'Oeste',
      endZone: 'Centro'
    },
    {
      id: '4',
      userName: 'Ana Martínez',
      price: 17,
      date: '2023-05-18',
      time: '16:20',
      free: 1,
      startZone: 'Norte',
      endZone: 'Sur'
    },
    {
      id: '5',
      userName: 'Carlos López',
      price: 2,
      date: '2023-05-17',
      time: '10:45',
      free: 4,
      startZone: 'Oeste',
      endZone: 'Centro'
    },
    {
      id: '6',
      userName: 'Carlos López',
      price: 2,
      date: '2023-05-17',
      time: '10:45',
      free: 4,
      startZone: 'Oeste',
      endZone: 'Centro'
    },
  ]);
  const [refreshing, setRefreshing] = useState(false);

  const fetchData = async () => {
    try {
      setRefreshing(false);
    } catch (err) {
      console.error('Error fetching data:', err);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const onRefresh = () => {
    setRefreshing(true);
    setTimeout(() => {
      fetchData();
    }, 1500);
  };

  const renderItem = ({ item }: { item: Item }) => (
    <View style={[
      styles.cardContainer,
      { 
        backgroundColor: theme.cardBackground,
        borderColor: theme.primary,
      }
    ]}>
      
    </View>
  );

  return (
    <View style={[
      styles.container, 
      { 
        backgroundColor: theme.background,
      }
    ]}>
      <FlatList
        data={data}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={styles.listContent}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={[theme.primary]}
            tintColor={theme.primary}
          />
        }
        ItemSeparatorComponent={() => (
          <View style={{ height: 0, backgroundColor: 'transparent' }} />
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 5,
    paddingVertical: 0,
  },
  listContent: {
    paddingVertical: 1,
  },
  cardContainer: {
    overflow: 'hidden',
    width: '100%',
  },
});

export default ScrollRefresh;