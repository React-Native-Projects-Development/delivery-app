import {
  NativeStackNavigationProp,
  NativeStackScreenProps,
} from '@react-navigation/native-stack';
import React, {useEffect, useState} from 'react';

import {
  Text,
  View,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  Image,
  Animated,
} from 'react-native';

import {isIphoneX} from 'react-native-iphone-x-helper';

import {COLORS, FONTS, icons, SIZES} from '../constants';

import {RootStackParams} from '../navigation/AppNavigator';

type HeaderProps = {
  navigation: NativeStackNavigationProp<
    RootStackParams,
    'Restaurant',
    undefined
  >;
  restaurant: any;
};

const Header = ({navigation, restaurant}: HeaderProps) => {
  return (
    <View style={{flexDirection: 'row', alignItems: 'center'}}>
      <TouchableOpacity
        activeOpacity={0.6}
        style={{
          width: 50,
          paddingLeft: SIZES.padding * 2,
          justifyContent: 'center',
        }}
        onPress={() => navigation.goBack()}>
        <Image
          source={icons.back}
          resizeMode="contain"
          style={{width: 30, height: 30}}
        />
      </TouchableOpacity>

      {/* Restaurant name section */}
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <View
          style={{
            height: 50,
            alignItems: 'center',
            justifyContent: 'center',
            paddingHorizontal: SIZES.padding * 3,
            borderRadius: SIZES.radius,
            backgroundColor: COLORS.lightGray3,
          }}>
          <Text style={{...FONTS.h3}}>{restaurant?.name}</Text>
        </View>
      </View>

      <TouchableOpacity
        activeOpacity={0.6}
        style={{
          width: 50,
          paddingRight: SIZES.padding * 2,
          justifyContent: 'center',
        }}>
        <Image
          source={icons.list}
          resizeMode="contain"
          style={{width: 30, height: 30}}
        />
      </TouchableOpacity>
    </View>
  );
};

interface Props extends NativeStackScreenProps<RootStackParams, 'Restaurant'> {}

const Restaurant = ({navigation, route}: Props) => {
  const [restaurant, setRestaurant] = useState(null);
  const [location, setLocation] = useState(null);

  useEffect(() => {
    const {item, location: currentLocation} = route.params;

    setRestaurant(item);
    setLocation(currentLocation);
  }, [route]);

  return (
    <SafeAreaView style={styles.container}>
      <Header navigation={navigation} restaurant={restaurant} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.lightGray2,
  },
});

export default Restaurant;
