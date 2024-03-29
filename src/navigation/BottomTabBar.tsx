import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import HomeNavigation from './HomeNavigation';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Feather from 'react-native-vector-icons/Feather';
import Octicons from 'react-native-vector-icons/Octicons';
import {useTheme} from 'react-native-paper';
import {COLOR} from '../Util/Util';
import OrderNavigation from './OrderNavigation';
import ProfileScreen from '../Screen/Profile/ProfileScreen';
import ProfileNavigation from './ProfileNavigaton';
import SearchScreen from '../Screen/Search/SearchScreen';
import SearchIcon from '../assets/images/svg/search.svg'
import ClockIcon from '../assets/images/svg/clock.svg'
import PersonIcon from '../assets/images/svg/person.svg'
import HomeIcon from '../assets/images/svg/home.svg'
const Tab = createMaterialBottomTabNavigator();

const ICON_SIZE = 30;

Octicons .loadFont();
MaterialCommunityIcons.loadFont();
Feather.loadFont();


const BottomTabNavigation = () => {
  const theme = useTheme();
  theme.colors.secondaryContainer = 'transperent';
  return (
    <Tab.Navigator
      initialRouteName="Home"
      activeColor={COLOR.mainColor}
      inactiveColor={COLOR.black}
      theme={theme}
      barStyle={{
        backgroundColor: '#fff',
        marginBottom: 10,
        marginTop: 5,
        paddingHorizontal: 12,
        paddingTop: 12,
        height: 80,
        borderColor: 'lightgrey',
        marginHorizontal: 5,
        position: 'absolute',
        borderTopWidth: 1,
      }}>
      <Tab.Screen
        name="Home"
        component={HomeNavigation}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({color, focused}) => (
            <HomeIcon style={{ color: focused? COLOR.mainColor:COLOR.black ,}}/>
          ),
        }}
      />
      <Tab.Screen
        name="Search"
        component={SearchScreen}
        options={{
          tabBarLabel: 'Search',
          tabBarIcon: ({color, focused}) => (
            <SearchIcon  style={{ color: focused? COLOR.mainColor:COLOR.black}}
             />
          ),
        }}
      />
      <Tab.Screen
        name="History"
        component={OrderNavigation}
        options={{
          tabBarLabel: 'History',
          tabBarIcon: ({color, focused}) => (
            <ClockIcon style={{ color: focused? COLOR.mainColor:COLOR.black}}/>
          ),
        }}
      />

      <Tab.Screen
        name="Profile"
        component={ProfileNavigation}
        options={{
          tabBarLabel: 'Profile',
          tabBarIcon: ({color, focused}) => (
            <PersonIcon style={{ color: focused? COLOR.mainColor:COLOR.black}}/>

          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default BottomTabNavigation;
