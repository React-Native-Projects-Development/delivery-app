import {
  NativeStackNavigationProp,
  NativeStackScreenProps,
} from '@react-navigation/native-stack';
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
import {RootStackParams} from '../navigation/AppNavigator';

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

type RestaurantProps = {
  restaurants: any;
  getCategoryNameById: (id: number) => string;
  navigation: NativeStackNavigationProp<RootStackParams, 'Main'>;
  currentLocation: any;
};

const RestaurantList = ({
  restaurants,
  getCategoryNameById,
  navigation,
  currentLocation,
}: RestaurantProps) => {
  const renderItem = ({item}: any) => {
    return (
      <TouchableOpacity
        activeOpacity={0.9}
        style={{marginBottom: SIZES.padding * 2}}
        onPress={() => {
          navigation.navigate('Restaurant', {
            item,
            location: currentLocation,
          });
        }}>
        <View style={{marginBottom: SIZES.padding}}>
          <Image
            source={item.photo}
            resizeMode="cover"
            style={{width: '100%', height: 200, borderRadius: SIZES.radius}}
          />
          <View
            style={{
              position: 'absolute',
              bottom: 0,
              height: 50,
              width: SIZES.width * 0.3,
              backgroundColor: COLORS.white,
              borderTopRightRadius: SIZES.radius,
              borderBottomLeftRadius: SIZES.radius,
              alignItems: 'center',
              justifyContent: 'center',
              ...styles.shadow,
            }}>
            <Text style={{...FONTS.h4}}>{item.duration}</Text>
          </View>
        </View>

        {/* Restaurant Info */}
        <Text style={{...FONTS.body2}}>{item.name}</Text>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginTop: SIZES.padding,
          }}>
          {/* Rating */}
          <Image
            source={icons.star}
            style={{
              height: 20,
              width: 20,
              tintColor: COLORS.primary,
              marginRight: 10,
            }}
          />
          <Text style={{...FONTS.body3}}>{item.rating}</Text>
          {/* Categories */}
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginLeft: 10,
            }}>
            {item.categories.map((category: any) => {
              return (
                <View
                  key={category}
                  style={{flexDirection: 'row', alignItems: 'center'}}>
                  <Text style={{...FONTS.body3}}>
                    {getCategoryNameById(category)}
                  </Text>

                  <Text
                    style={{...FONTS.h3, color: COLORS.darkGray, bottom: 3}}>
                    {' '}
                    .{' '}
                  </Text>
                </View>
              );
            })}

            {/* Price section */}
            {[1, 2, 3].map(priceRating => (
              <Text
                key={priceRating}
                style={{
                  ...FONTS.body3,
                  color:
                    priceRating <= item.priceRating
                      ? COLORS.black
                      : COLORS.darkGray,
                }}>
                $
              </Text>
            ))}
          </View>
        </View>
      </TouchableOpacity>
    );
  };
  return (
    <FlatList
      data={restaurants}
      keyExtractor={item => `${item.id}`}
      renderItem={renderItem}
      contentContainerStyle={{
        paddingHorizontal: SIZES.padding * 2,
        paddingBottom: 30,
      }}
    />
  );
};

interface Props extends NativeStackScreenProps<RootStackParams, 'Main'> {}

const Home = ({navigation}: Props) => {
  const [categories, setCategories] = useState(categoryData);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [restaurants, setRestaurants] = useState(restaurantData);
  const [currentLocation, setCurrentLocation] = useState(
    initialCurrentLocation,
  );

  const onSelectCategory = (category: any) => {
    // filter restaunrant
    const restaurantList = restaurantData.filter(restaurant =>
      restaurant.categories.includes(category.id),
    );

    setRestaurants(restaurantList);
    setSelectedCategory(category);
  };

  const getCategoryNameById = (id: number) => {
    const category = categories.filter(cat => cat.id === id);

    if (category.length > 0) {
      return category[0].name;
    } else {
      return '';
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header location={currentLocation.streetName} />
      <MainCategories
        categories={categories}
        selectedCategory={selectedCategory}
        onSelectCategory={onSelectCategory}
      />
      <RestaurantList
        restaurants={restaurants}
        getCategoryNameById={getCategoryNameById}
        navigation={navigation}
        currentLocation={currentLocation}
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
