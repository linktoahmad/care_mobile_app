import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {useSelector} from 'react-redux';
import {BaseColor, useTheme, useFont} from '@config';
import {useTranslation} from 'react-i18next';
import {Icon} from '@components';

import SignUp from '@screens/SignUp';
import SignIn from '@screens/SignIn';
import ResetPassword from '@screens/ResetPassword';
import ChangePassword from '@screens/ChangePassword';
import Event from '@screens/Event';
import GoogleAuth from '@screens/GoogleAuth';
import Home from '@screens/Home';
import Quiz from '@screens/Quiz';
import History from '@screens/History';
import Profile from '@screens/Profile';

const MainStack = createStackNavigator();
const BottomTab = createBottomTabNavigator();

export default function Main() {
  const auth = useSelector(state => state.auth);
  const login = auth.login.success;
  return (
    <MainStack.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName="BottomTabNavigator">
      <MainStack.Screen
        name="BottomTabNavigator"
        component={login ? BottomTabNavigator : GoogleAuth}
      />
      <MainStack.Screen name="SignUp" component={SignUp} />
      <MainStack.Screen name="SignIn" component={SignIn} />
      <MainStack.Screen name="ResetPassword" component={ResetPassword} />
      <MainStack.Screen name="ChangePassword" component={ChangePassword} />
      <MainStack.Screen name="Event" component={Event} />
    </MainStack.Navigator>
  );
}

function BottomTabNavigator() {
  const {t} = useTranslation();
  const {colors} = useTheme();
  const font = useFont();

  return (
    <BottomTab.Navigator
      initialRouteName="Home"
      screenOptions={{
        tabBarInactiveTintColor: BaseColor.grayColor,
        tabBarActiveTintColor: colors.primary,
        headerShown: false,
        tabBarLabelStyle: {
          fontSize: 12,
          fontFamily: font,
          paddingBottom: 2,
        },
      }}>
      <BottomTab.Screen
        name="Home"
        component={Home}
        options={{
          title: t('Dashboard'),
          tabBarIcon: ({color}) => {
            return <Icon color={color} name="tachometer-alt" size={20} solid />;
          },
        }}
      />
      <BottomTab.Screen
        name="Booking"
        component={Quiz}
        options={{
          title: t('Quiz'),
          tabBarIcon: ({color}) => {
            return <Icon color={color} name="clipboard-list" size={20} solid />;
          },
        }}
      />
      <BottomTab.Screen
        name="Messenger"
        component={History}
        options={{
          title: t('History'),
          tabBarIcon: ({color}) => {
            return <Icon solid color={color} name="history" size={20} />;
          },
        }}
      />
      {/* <BottomTab.Screen
        name="Post"
        component={Post}
        options={{
          title: t('news'),
          tabBarIcon: ({color}) => {
            return <Icon color={color} name="copy" size={20} solid />;
          },
        }}
      /> */}
      <BottomTab.Screen
        name="Profile"
        component={Profile}
        options={{
          title: t('Profile'),
          tabBarIcon: ({color}) => {
            return <Icon solid color={color} name="user-circle" size={20} />;
          },
        }}
      />
    </BottomTab.Navigator>
  );
}
