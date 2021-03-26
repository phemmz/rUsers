import React, { useEffect, useState } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  StatusBar,
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';

import User from './User';
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import { fetchUsers, UserShape } from './userSlice';

const MAX_PAGE = 20;

const UserList = () => {
  const [page, setPage] = useState(1);
  const { users, error } = useAppSelector(state => state.users);
  const fetchStatus = useAppSelector(state => state.users.status);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchUsers(page));
  }, [dispatch]);

  const fetchMoreUsers = () => {
    if (fetchStatus !== 'loading' && page < MAX_PAGE) {
      const nextPage = page + 1;
      dispatch(fetchUsers(nextPage));
      setPage(nextPage);
    }
  };

  const handleRetry = () => {
    dispatch(fetchUsers(page));
  };

  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView style={styles.containerStyle}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>
            Users
          </Text>
        </View>
        {fetchStatus === 'loading' && page === 1 ? (
          <View style={styles.container}>
            <ActivityIndicator />
          </View>
        ) : fetchStatus === 'failed' ? (
          <View style={styles.container}>
            <Text style={styles.errorText}>{error}</Text>
            <TouchableOpacity onPress={handleRetry}>
              <Text style={styles.errorText}>Retry</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <FlatList
            data={users.results}
            showsVerticalScrollIndicator={false}
            keyExtractor={(item: UserShape, index: number) => `${item.id.name}-${index}`}
            renderItem={({ item }) => 
              <User
                name={item.name}
                phone={item.phone}
                src={item.picture.large}
              />
            }
            contentContainerStyle={styles.contentContainerStyle}
            onEndReached={fetchMoreUsers}
            onEndReachedThreshold={0.5}
            ItemSeparatorComponent={() => <View style={styles.separator} />}
            ListFooterComponent={() => {
              if (fetchStatus === 'loading' && page > 1) {
                return (
                  <View style={styles.footerContainer}>
                    <ActivityIndicator />
                    <Text style={styles.loadingText}>Loading</Text>
                  </View>
                );
              }
  
              return null;
            }}
          />
        )} 
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  containerStyle: {
    flex: 1,
    backgroundColor: '#fbfcfe',
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  header: {
    alignItems: 'center',
    marginBottom: 12,
    padding: 16,
  },
  headerTitle: {
    fontSize: 28,
    color: '#183753',
  },
  contentContainerStyle: {
    padding: 16,
  },
  separator: {
    height: 12,
  },
  footerContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 8,
  },
  loadingText: {
    fontSize: 14,
    color: '#183753',
  },
  errorText: {
    color: 'red',
  },
});

export default UserList;
