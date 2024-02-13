import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons'; // Import Ionicons
import SettingsScreen from './Setting/SettingsScreen';
import {ThemeProvider, useTheme} from './Theme/ThemeContext'; // Adjust the path as needed
import HomeScreen from './Home/HomeScreen';
import SearchScreen from './Search/SearchScreen';
import BibleScreen from './Bible/BibleScreen';
import {BibleVersionProvider} from './Setting/BibleVersionContext';
import {createStackNavigator} from '@react-navigation/stack';
import ColorPickerScreen from './Setting/ColorPickerScreen';

const Tab = createBottomTabNavigator();
const SettingsStack = createStackNavigator();

function SettingsStackScreen() {
  return (
    <SettingsStack.Navigator>
      <SettingsStack.Screen name="Setting" component={SettingsScreen} />
      <SettingsStack.Screen
        name="Customize Theme Color"
        component={ColorPickerScreen}
      />
    </SettingsStack.Navigator>
  );
}

const getStyles = theme =>
  StyleSheet.create({
    screenContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: theme.backgroundColor,
    },
    screenTitle: {
      fontSize: 22,
      fontWeight: 'bold',
      color: theme.textColor,
    },
  });

// Screen for the Bookmarks tab
function BookmarksScreen() {
  const {theme, updateTheme} = useTheme();
  const styles = getStyles(theme);
  return (
    <View style={styles.screenContainer}>
      <Text style={styles.screenTitle}>Bookmarks</Text>
      {/* Display bookmarked verses and notes */}
    </View>
  );
}

function AppContent() {
  // const {theme} = useTheme();

  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        headerShown: false, // Add this line to hide the header
        tabBarIcon: ({focused, color, size}) => {
          let iconName;
          if (route.name === 'Home') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'Bible') {
            iconName = focused ? 'book' : 'book-outline';
          } else if (route.name === 'Search') {
            iconName = focused ? 'search' : 'search-outline';
          } else if (route.name === 'Bookmarks') {
            iconName = focused ? 'bookmark' : 'bookmark-outline';
          } else if (route.name === 'Settings') {
            iconName = focused ? 'settings' : 'settings-outline';
          }

          // Return the Ionicons component with the selected icon name
          return <Icon name={iconName as string} size={size} color={color} />;
        },
        tabBarActiveTintColor: 'tomato',
        tabBarInactiveTintColor: 'gray',
        style: {
          // backgroundColor: theme.backgroundColor, // Tab bar background color
        },
      })}>
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Bible" component={BibleScreen} />
      <Tab.Screen name="Search">
        {props => <SearchScreen {...props} />}
      </Tab.Screen>
      <Tab.Screen name="Bookmarks" component={BookmarksScreen} />
      <Tab.Screen name="Settings" component={SettingsStackScreen} />
    </Tab.Navigator>
  );
}

function App() {
  return (
    <NavigationContainer>
      <BibleVersionProvider>
        <ThemeProvider>
          <AppContent />
        </ThemeProvider>
      </BibleVersionProvider>
    </NavigationContainer>
  );
}

export default App;
