import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
} from 'react-native';

interface AvatarProps {
  initials: string;
  src?: string;
};

const Avatar = ({ src, initials }: AvatarProps): JSX.Element => {
  return (
    <View style={styles.container}>
      {src ? (
        <Image
          style={styles.imageStyle}
          resizeMode="contain"
          source={{ uri: src }} />
      ) : (
        <Text style={styles.initials}>{initials}</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#ebedf0',
  },
  imageStyle: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  initials: {
    fontSize: 16,
    color: '#fff',
  },
});

export default Avatar;
