import React from 'react';
import { StyleSheet } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialIcons } from '@expo/vector-icons';
import { useSelector } from 'react-redux';
import BackButton from './components/BackButton';
// import i18n from './utils/i18n';
import { SCREENS } from './utils/constants';
import { getIconName } from './utils/navigator';

import Play from './screens/Play';
import Playing from './screens/Playing';
// import StartPlaying from './screens/StartPlaying';
import Login from './screens/Login';
import Events from './screens/Events';
import Signup from './screens/Signup';
// import Account from './screens/Account';
import Profile from './screens/Profile';
// import Business from './screens/Business';
// import Language from './screens/Language';
// import Payments from './screens/Payments';
// import Appearance from './screens/Appearance';
// import EditPayout from './screens/EditPayout';
// import EditAccount from './screens/EditAccount';
// import EditPayment from './screens/EditPayment';
// import EventDetails from './screens/EventDetails';
// import PayoutMethods from './screens/PayoutMethods';
import ModalClose from './components/ModalClose';

const options = ({ colors, title = '', ...rest }) => ({
  title,
  headerTintColor: colors.primary,
  headerStyle: {
    shadowOpacity: 0,
    backgroundColor: colors.background,
  },
  cardStyle: { backgroundColor: colors.background },
  headerLeft: props => <BackButton {...props} color={colors.primary} />,
  ...rest,
});

const styles = StyleSheet.create({
  tabBar: colors => ({
    borderTopColor: colors.background,
    backgroundColor: colors.background,
    shadowColor: colors.primary,
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.2,
    shadowRadius: 7,
    elevation: 7,
  }),
});

const AuthStack = createStackNavigator();

export function AuthStackScreen({ localOption }) {
  const colors = useSelector((state) => state.appSettings.colors);

  return (
    <AuthStack.Navigator>
      <AuthStack.Screen
        name={SCREENS.LOGIN}
        component={Login}
        options={options({ colors, ...localOption })}
      />
      <AuthStack.Screen
        name={SCREENS.SIGNUP}
        component={Signup}
        options={options({ colors, ...localOption })}
      />
    </AuthStack.Navigator>
  );
}

const EventsStack = createStackNavigator();

export function EventsStackScreen() {
  const colors = useSelector((state) => state.appSettings.colors);

  return (
    <EventsStack.Navigator>
      <EventsStack.Screen
        name={SCREENS.EVENTS}
        component={Events}
        options={options({ colors })}
      />
      {/* <EventsStack.Screen
        name={SCREENS.EVENTDETAILS}
        component={EventDetails}
        options={options({ colors })}
      /> */}
    </EventsStack.Navigator>
  );
}

const PlayStack = createStackNavigator();

export function PlayStackScreen() {
  const colors = useSelector((state) => state.appSettings.colors);

  return (
    <PlayStack.Navigator>
      <PlayStack.Screen
        name={SCREENS.PLAY}
        component={Play}
        options={options({ colors })}
      />
      {/* <PlayStack.Screen
        name={SCREENS.PLAYING}
        component={Playing}
        options={options({ colors })}
      /> */}
      {/* <PlayStack.Screen
        name={SCREENS.PLAY_EVENT_DETAILS}
        component={EventDetails}
        options={options({ colors })}
      /> */}
    </PlayStack.Navigator>
  );
}

const ProfileStack = createStackNavigator();

export function ProfileStackScreen() {
  const colors = useSelector((state) => state.appSettings.colors);

  return (
    <ProfileStack.Navigator>
      <ProfileStack.Screen
        name={SCREENS.PROFILE}
        component={Profile}
        options={options({ colors, headerShown: false })}
      />
      {/* <ProfileStack.Screen
        name={SCREENS.ACCOUNT}
        component={Account}
        options={options({ colors, title: i18n.t('account') })}
      />
      <ProfileStack.Screen
        name={SCREENS.EDITACCOUNT}
        component={EditAccount}
        options={options({ colors })}
      />
      <ProfileStack.Screen
        name={SCREENS.PAYOUTMETHODS}
        component={PayoutMethods}
        options={options({ colors })}
      />
      <ProfileStack.Screen
        name={SCREENS.EDITPAYOUT}
        component={EditPayout}
        options={options({ colors })}
      />
      <ProfileStack.Screen
        name={SCREENS.LANGUAGE}
        component={Language}
        options={options({ colors })}
      />
      <ProfileStack.Screen
        name={SCREENS.PAYMENTS}
        component={Payments}
        options={options({ colors })}
      />
      <ProfileStack.Screen
        name={SCREENS.EDITPAYMENT}
        component={EditPayment}
        options={options({ colors })}
      />
      <EventsStack.Screen
        name={SCREENS.APPEARANCE}
        component={Appearance}
        options={options({ colors, title: i18n.t('appearance') })}
      />
      <ProfileStack.Screen
        name={SCREENS.BUSINESS}
        component={Business}
        options={options({ colors, title: i18n.t('popquizCreator') })}
      /> */}
    </ProfileStack.Navigator>
  );
}

const MainStack = createBottomTabNavigator();

export function MainStackScreen() {
  const colors = useSelector((state) => state.appSettings.colors);

  const tabBarOptions = {
    activeTintColor: colors.primary,
    showLabel: false,
    keyboardHidesTabBar: true,
    style: styles.tabBar(colors),
  };

  return (
    <MainStack.Navigator
      keyboardHidesTabBar
      tabBarOptions={tabBarOptions}
      screenOptions={({ route }) => ({
        // eslint-disable-next-line
        tabBarIcon: ({ color, size }) => (
          <MaterialIcons
            name={getIconName({ routeName: route.name })}
            color={color}
            size={size}
          />
        ),
      })}
    >
      <MainStack.Screen name={SCREENS.EVENTS} component={EventsStackScreen} />
      <MainStack.Screen name={SCREENS.PLAY} component={PlayStackScreen} />
      <MainStack.Screen
        name={SCREENS.PROFILE}
        component={ProfileStackScreen}
        options={options({ colors })}
      />
    </MainStack.Navigator>
  );
}

const PlayingStack = createStackNavigator();

export function PlayingStackScreen({ navigation }) {
  const colors = useSelector((state) => state.appSettings.colors);

  return (
    <PlayingStack.Navigator
      initialRouteName={SCREENS.PRE_START_EVENT}
    >
      <PlayingStack.Screen
        name={SCREENS.EVENT_START}
        component={Playing}
        options={options({
          colors,
          headerRight: () =>
            <ModalClose
              onPress={() => navigation.navigate(SCREENS.APP)}
            />,
          headerLeft: null,
        })}
      />
      {/* <PlayingStack.Screen
        name={SCREENS.PRE_START_EVENT}
        component={StartPlaying}
        options={options({
          colors,
          headerRight: () =>
            <ModalClose
              onPress={() => navigation.navigate(SCREENS.APP)}
            />,
          headerLeft: null
        })}
      /> */}
    </PlayingStack.Navigator>
  );
}

const RootStack = createStackNavigator();
export function RootStackScreen() {
  const colors = useSelector((state) => state.appSettings.colors);

  return (
    <RootStack.Navigator
      initialRouteName={SCREENS.APP}
      mode="modal"
    >
      <RootStack.Screen
        name={SCREENS.APP}
        component={MainStackScreen}
        options={options({ colors, headerShown: false })}
      />
      {/* <RootStack.Screen
        name={SCREENS.START_PLAYING_EVENT}
        component={PlayingStackScreen}
        options={options({ colors, headerShown: false })}
      /> */}
    </RootStack.Navigator>
  );
}

