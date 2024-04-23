import {Dimensions, FlatList, ScrollView, StatusBar, StyleSheet, Text, TextInput, TouchableOpacity, View} from 'react-native';
import React, {useRef, useState} from 'react';
import { useStore } from '../store/store';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import { BORDERRADIUS, COLORS, FONTFAMILY, FONTSIZE, SPACING } from '../theme/theme';
import HeaderBar from '../components/HeaderBar';
import CustomIcon from '../components/CustomIcon';
import CoffeeCard from '../components/CoffeeCard';

// Helper function to get categories from data
const getCategoriesFromData = (data: any) => {
  let temp:any = {};

  for (let i = 0; i < data.length; i++) {
    if (temp[data[i].name] == undefined) {
      temp[data[i].name] = 1;
    } else {
      temp[data[i].name]++;
    }
  }

    let categories = Object.keys(temp);
    categories.unshift('All');
    return categories;

};

// Helper function to get sorted coffee
const getCoffeeList = (category: any, data: any) => {
  if (category === 'All') {
    return data;
  } else {
    let coffeeList = data.filter((item: any) => item.name == category);
    return coffeeList;
  }
};


// Home Screen
const HomeScreen = ({navigation}:any) => {
  const CoffeeList = useStore((state: any) => state.CoffeeList);
  const BeanList = useStore((state: any) => state.BeansList);

  const [categories, setCategories] = React.useState(getCategoriesFromData(CoffeeList));
  const [searchText, setSearchText] = React.useState<string>('');
  const [categoryIndex, setCategoryIndex] = React.useState({
    index: 0,
    category: categories[0],
  });
  const [sortedCoffee, setSortedCoffee] = React.useState(getCoffeeList(categoryIndex.category, CoffeeList));

  const ListRef: any = useRef<FlatList>();
  const tabBarHeight = useBottomTabBarHeight();

  // Search coffee
  const searchCoffee = (search: string) => {
    if (search !== '') {
      ListRef.current?.scrollToOffset({offset: 0, animated: true});
      setCategoryIndex({index: 0, category: categories[0]});
      setSortedCoffee([...CoffeeList.filter((item: any) => item.name.toLowerCase().includes(search.toLowerCase()))]);
    }
  };

  const resetSearchCoffee = () => {
    ListRef.current?.scrollToOffset({offset: 0, animated: true});
    setCategoryIndex({index: 0, category: categories[0]});
    setSortedCoffee([...CoffeeList]);
    setSearchText('');
  };

  return (
    <View style={styles.ScreenContainer}>
      <StatusBar backgroundColor={COLORS.primaryBlackHex} />
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.ScrollViewFlex}>
        <HeaderBar title="Judiths Mug" />

        <Text style={styles.ScreenTitle}>Find the best{'\n'}coffee for you</Text>

        {/* Search Input */}
         <View style={styles.InputContainerComponent}>
          <TouchableOpacity onPress={() => searchCoffee(searchText)}>
            <CustomIcon style={styles.InputIcon} name="search" size={FONTSIZE.size_16} color={searchText?.length > 0 ? COLORS.primaryOrangeHex : COLORS.secondaryLightGreyHex} />
          </TouchableOpacity>
          <TextInput
            placeholder="Find Your Coffee..."
            placeholderTextColor={COLORS.primaryLightGreyHex}
            style={styles.TextInputContainer}
            value={searchText}
            onChangeText={(text) => {
              setSearchText(text);
              searchCoffee(text);
            }}
          />
          {
            searchText?.length > 0 && (
              <TouchableOpacity onPress={() => resetSearchCoffee()}>
                <CustomIcon style={styles.InputIcon} name="close" size={FONTSIZE.size_16} color={COLORS.secondaryLightGreyHex} />
              </TouchableOpacity>
            )
          }
         </View>

         {/* Category Scroller */}

         <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.CategoryScrollViewStyle}>
          {categories?.map((item, index) => (
            <View key={index.toString()} style={styles.CategoryScrollViewContainer}>
              <TouchableOpacity style={styles.CategoryScrollViewItem} key={index} onPress={() => {
                ListRef.current?.scrollToOffset({offset: 0, animated: true});
                setCategoryIndex({index: index, category: categories[index]});
                setSortedCoffee([...getCoffeeList(categories[index], CoffeeList)]);
              }}>
                <Text style={[
                  styles.CategoryText,
                  categoryIndex.index === index ? {color: COLORS.primaryOrangeHex} : {color: COLORS.secondaryLightGreyHex},
                  ]}>{item}</Text>
                {categoryIndex.index === index && <View style={styles.ActiveCategory} />}
              </TouchableOpacity>
            </View>
          ))}
         </ScrollView>

          {/* Coffee FlatList */}
          <FlatList
          ref={ListRef}
          horizontal
          ListEmptyComponent={<View style={styles.EmptyListContainer}><Text style={styles.CategoryText}>No Coffee Found</Text></View>}
          showsHorizontalScrollIndicator={false}
            data={sortedCoffee}
            keyExtractor={(item) => item.id.toString()}
            contentContainerStyle={styles.FlatListContainer}
            renderItem={({item}) => (
              <TouchableOpacity
              onPress={() => {
                navigation.push('Details');
              }}
              >
              <CoffeeCard
              id={item.id}
              index={item.index}
              type={item.type}
              roasted={item.roasted}
              special_ingredient={item.special_ingredient}
              average_rating={item.average_rating}
              buttonPressHandler={() => {}}
              name={item.name}
              price={item.prices[2]}
              imagelink_square={item.imagelink_square}
              />
              </TouchableOpacity>
            )}
          />

          <Text style={styles.CoffeeBeansTitle}>Coffee Beans</Text>

          {/* Beans FlatList */}

          <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
            data={BeanList}
            keyExtractor={(item) => item.id.toString()}
            contentContainerStyle={[styles.FlatListContainer, {
              marginBottom: tabBarHeight,
            }]}
            renderItem={({item}) => (
              <TouchableOpacity
              onPress={() => {
                navigation.push('Details');
              }}
              >
              <CoffeeCard
              id={item.id}
              index={item.index}
              type={item.type}
              roasted={item.roasted}
              special_ingredient={item.special_ingredient}
              average_rating={item.average_rating}
              buttonPressHandler={() => {}}
              name={item.name}
              price={item.prices[2]}
              imagelink_square={item.imagelink_square}
              />
              </TouchableOpacity>
            )}
          />
      </ScrollView>
    </View>
  );
};


const styles = StyleSheet.create({
  ScreenContainer: {
    flex: 1,
    backgroundColor: COLORS.primaryBlackHex,
  },
  ScrollViewFlex: {},
  ScreenTitle: {
    fontSize: FONTSIZE.size_28,
    fontFamily: FONTFAMILY.poppins_semibold,
    color: COLORS.primaryWhiteHex,
    paddingLeft: SPACING.space_30,
  },
  InputContainerComponent: {
    margin: SPACING.space_30,
    borderRadius: BORDERRADIUS.radius_20,
    backgroundColor: COLORS.primaryDarkGreyHex,
    flexDirection: 'row',
    alignItems: 'center',
  },
  InputIcon: {
    marginHorizontal: SPACING.space_20,
  },
  TextInputContainer: {
    flex: 1,
    color: COLORS.primaryWhiteHex,
    fontSize: FONTSIZE.size_14,
    fontFamily: FONTFAMILY.poppins_medium,
    height: SPACING.space_20 * 3,
  },
  CategoryScrollViewStyle: {
    paddingHorizontal: SPACING.space_20,
    marginBottom: SPACING.space_20,
  },
  CategoryScrollViewContainer: {
    paddingHorizontal: SPACING.space_15,
  },
  ActiveCategory: {
    height: SPACING.space_10,
    width: SPACING.space_10,
    borderRadius: BORDERRADIUS.radius_10,
    backgroundColor: COLORS.primaryOrangeHex,
  },
  CategoryScrollViewItem: {
    alignItems: 'center',
  },
  CategoryText: {
    fontSize: FONTSIZE.size_16,
    fontFamily: FONTFAMILY.poppins_semibold,
    color: COLORS.secondaryLightGreyHex,
    marginBottom: SPACING.space_4,
  },
  FlatListContainer: {
    gap: SPACING.space_20,
    paddingHorizontal: SPACING.space_30,
    paddingVertical: SPACING.space_20,
  },
  EmptyListContainer: {
    width: Dimensions.get('window').width - SPACING.space_30 * 2,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: SPACING.space_36 * 3.6,
  },
  CoffeeBeansTitle: {
    fontSize: FONTSIZE.size_18,
    marginLeft: SPACING.space_30,
    marginTop: SPACING.space_20,
    fontFamily: FONTFAMILY.poppins_medium,
    color: COLORS.secondaryLightGreyHex,
  },

});

export default HomeScreen;
