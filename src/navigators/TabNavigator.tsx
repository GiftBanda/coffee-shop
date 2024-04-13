import {StyleSheet} from 'react-native';
import React from 'react';
import HomeScreen from '../screens/HomeScreen';
import OrderHistoryScreen from '../screens/OrderHistoryScreen';
import CartScreen from '../screens/CartScreen';
import FavoritesScreen from '../screens/FavoritesScreen';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { COLORS } from '../theme/theme';
import CustomIcon from '../components/CustomIcon';
import { BlurView } from '@react-native-community/blur';

const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  return (
    <Tab.Navigator screenOptions={{
      tabBarHideOnKeyboard: true,
      headerShown: false,
      tabBarShowLabel: false,
      tabBarStyle: styles.tabBarStyle,
      tabBarBackground: () => (
        <BlurView
          style={styles.blurViewStyle}
          blurType="light"
          blurAmount={10}
          reducedTransparencyFallbackColor="white"
        />
      ),
    }}>
      <Tab.Screen name="Home" component={HomeScreen} options={
        {
          tabBarIcon: ({focused}) => (
            <CustomIcon
              name="home"
              size={28}
              color={focused ? COLORS.primaryOrangeHex : COLORS.secondaryLightGreyHex}
            />
          ),
        }
      }/>
      
      <Tab.Screen name="Cart" component={CartScreen} options={
        {
          tabBarIcon: ({focused}) => (
            <CustomIcon
              name="cart"
              size={28}
              color={focused ? COLORS.primaryOrangeHex : COLORS.secondaryLightGreyHex}
            />
          ),
        }
      } />
      <Tab.Screen name="Favorites" component={FavoritesScreen} options={
        {
          tabBarIcon: ({focused}) => (
            <CustomIcon
              name="like"
              size={28}
              color={focused ? COLORS.primaryOrangeHex : COLORS.secondaryLightGreyHex}
            />
          ),
        }
      } />
      <Tab.Screen name="History" component={OrderHistoryScreen} options={
        {
          tabBarIcon: ({focused}) => (
            <CustomIcon
              name="bell"
              size={28}
              color={focused ? COLORS.primaryOrangeHex : COLORS.secondaryLightGreyHex}
            />
          ),
        }
      } />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  tabBarStyle: {
    height: 80,
    position: 'absolute',
    backgroundColor: COLORS.primaryBlackRGBA,
    borderTopWidth: 0,
    borderTopColor: 'transparent',
    elevation: 0,
  },
  blurViewStyle: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    top: 0,
  },
});

export default TabNavigator;
