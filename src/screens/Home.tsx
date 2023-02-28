import React, {useState} from 'react';

import {
  Text,
  View,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  Image,
  FlatList,
} from 'react-native';

import {COLORS, icons, SIZES, FONTS} from '../constants';
import {
  categoryData,
  initialCurrentLocation,
  restaurantData,
} from '../data/DUMMY_DATA';

type HeaderProps = {
  location: string;
};
const Header = ({location}: HeaderProps) => {
  return (
    <View style={{flexDirection: 'row', alignItems: 'center', height: 50}}>
      <TouchableOpacity
        activeOpacity={0.8}
        style={{
          width: 50,
          paddingLeft: SIZES.padding * 2,
          justifyContent: 'center',
        }}>
        <Image
          source={icons.nearby}
          resizeMode="contain"
          style={{width: 30, height: 30}}
        />
      </TouchableOpacity>
      <View
        style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <View
          style={{
            width: '70%',
            height: '100%',
            backgroundColor: COLORS.lightGray3,
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: SIZES.radius,
          }}>
          <Text style={{...FONTS.h3}}>{location}</Text>
        </View>
      </View>
      <TouchableOpacity
        activeOpacity={0.8}
        style={{
          width: 50,
          paddingRight: SIZES.padding * 2,
          justifyContent: 'center',
        }}>
        <Image
          source={icons.shopping_basket}
          resizeMode="contain"
          style={{width: 30, height: 30}}
        />
      </TouchableOpacity>
    </View>
  );
};

const Home = () => {
  const [categories, setCategories] = useState(categoryData);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [restaurants, setRestaurants] = useState(restaurantData);
  const [currentLocation, setCurrentLocation] = useState(
    initialCurrentLocation,
  );

  return (
    <SafeAreaView style={styles.container}>
      <Header location={currentLocation.streetName} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.lightGray4,
  },
  shadow: {
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 3},
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 1,
  },
});

export default Home;
