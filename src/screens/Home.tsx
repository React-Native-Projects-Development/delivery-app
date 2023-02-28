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

type CategoriesProps = {
  categories: any;
  selectedCategory: any;
  onSelectCategory: (category: any) => void;
};

const MainCategories = ({
  categories,
  selectedCategory,
  onSelectCategory,
}: CategoriesProps) => {
  const renderItem = ({item}: any) => {
    return (
      <TouchableOpacity
        activeOpacity={0.9}
        onPress={() => onSelectCategory(item)}
        style={{
          padding: SIZES.padding,
          paddingBottom: SIZES.padding * 2,
          backgroundColor:
            selectedCategory?.id === item.id ? COLORS.primary : COLORS.white,
          borderRadius: SIZES.radius,
          alignItems: 'center',
          justifyContent: 'center',
          marginRight: SIZES.padding,
          ...styles.shadow,
        }}>
        <View
          style={{
            width: 50,
            height: 50,
            borderRadius: 25,
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor:
              selectedCategory?.id === item.id
                ? COLORS.white
                : COLORS.lightGray,
          }}>
          <Image
            source={item.icon}
            resizeMode="contain"
            style={{width: 30, height: 30}}
          />
        </View>
        <Text
          style={{
            marginTop: SIZES.padding,
            color:
              selectedCategory?.id === item.id ? COLORS.white : COLORS.black,
            ...FONTS.body5,
          }}>
          {item.name}
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={{padding: SIZES.padding * 2}}>
      <Text style={{...FONTS.h1}}>Main</Text>
      <Text style={{...FONTS.h1}}>Categories</Text>
      <FlatList
        data={categories}
        keyExtractor={item => `${item.id}`}
        renderItem={renderItem}
        contentContainerStyle={{paddingVertical: SIZES.padding * 2}}
        showsHorizontalScrollIndicator={false}
        horizontal
      />
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

  const onSelectCategory = (category: any) => {
    // filter restaunrant
    const restaurantList = restaurants.filter(restaurant =>
      restaurant.categories.includes(category.id),
    );

    setRestaurants(restaurantList);
    setSelectedCategory(category);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header location={currentLocation.streetName} />
      <MainCategories
        categories={categories}
        selectedCategory={selectedCategory}
        onSelectCategory={onSelectCategory}
      />
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
