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
import {ThemeProvider} from './Theme/ThemeContext'; // Adjust the path as needed
import HomeScreen from './Home/HomeScreen';
import SearchScreen from './Search/SearchScreen';
import BibleScreen from './Bible/BibleScreen';
import {BibleVersionProvider} from './Setting/BibleVersionContext';

const Tab = createBottomTabNavigator();

// Screen for the Bookmarks tab
function BookmarksScreen() {
  return (
    <View style={styles.screenContainer}>
      <Text style={styles.screenTitle}>Bookmarks</Text>
      {/* Display bookmarked verses and notes */}
    </View>
  );
}

function App() {
  return (
    <NavigationContainer>
      <BibleVersionProvider>
        <ThemeProvider>
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
                return (
                  <Icon name={iconName as string} size={size} color={color} />
                );
              },
              tabBarActiveTintColor: 'tomato',
              tabBarInactiveTintColor: 'gray',
            })}>
            <Tab.Screen name="Home" component={HomeScreen} />
            <Tab.Screen name="Bible" component={BibleScreen} />
            <Tab.Screen name="Search">
              {props => <SearchScreen {...props} />}
            </Tab.Screen>
            <Tab.Screen name="Bookmarks" component={BookmarksScreen} />
            <Tab.Screen name="Settings" component={SettingsScreen} />
          </Tab.Navigator>
        </ThemeProvider>
      </BibleVersionProvider>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  screenTitle: {
    fontSize: 22,
    fontWeight: 'bold',
  },
});

export default App;
