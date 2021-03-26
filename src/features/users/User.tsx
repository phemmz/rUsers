import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  Platform,
} from 'react-native';

import Avatar from '../../components/Avatar';

interface UserProps {
  name: {
    first: string;
    last: string;
    title: string;
  };
  phone: string;
  src?: string;
};

const User = ({ name, phone, src }: UserProps): JSX.Element => {
  return (
    <View style={styles.container}>
      <Avatar src={src} initials={`${name.first[0]}${name.last[0]}`} />
      <View style={styles.contentSection}>
        <Text
          numberOfLines={1}
          style={styles.name}>{name.first} {name.last}</Text>
        <Text
          numberOfLines={1}
          style={styles.phone}>{phone}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 8,
    borderColor: '#ebedf0',
    backgroundColor: '#fff',
    ...Platform.select({
      android: {
        elevation: 1,
      },
      default: {
        shadowColor: 'rgba(0,0,0, .2)',
        shadowOffset: { height: 0, width: 0 },
        shadowOpacity: 1,
        shadowRadius: 1,
      },
    }),
  },
  contentSection: {
    flex: 1,
    marginLeft: 12,
  },
  name: {
    marginBottom: 4,
    fontSize: 20,
    color: '#183753',
  },
  phone: {
    fontSize: 15,
    color: '#bfc0cc',
  }
});

export default User;
