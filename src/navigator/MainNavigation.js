import React, {
    useState,
    useEffect
} from 'react';

import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'

import { MovieScreen, MOVIE_TITLE, MOVIE_TITLE_NAV } from './../movie/Movie'
import { TVScreen, TV_TITLE, TV_TITLE_NAV } from './../tv/TV'
import { DetailScreen, DETAIL_TITLE } from './../detail/Detail'
import { ThemeContext } from '../context/ThemeCtx'
import { SearchScreen, SEARCH_TITLE } from '../search/Search'
import { SearchBar } from '../component/SearchBar'
import { screenWidth } from '../utils/Utils'
import Entypo from 'react-native-vector-icons/Entypo'
import EvilIcons from 'react-native-vector-icons/EvilIcons'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'

import {
    Button,
    DeviceEventEmitter,
    HeaderBackButton,
    View,
    Platform,
    Text
} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';


const MovieStack = createStackNavigator();
function MovieStackScreen({ navigation, route }) {
    return (
        <ThemeContext.Consumer>
            {
                value =>
                    <MovieStack.Navigator>
                        <MovieStack.Screen
                            name={MOVIE_TITLE}
                            component={MovieScreen}
                            initialParams={{ mode: 0 }}
                            options={{
                                headerRight: () => (
                                    <TouchableOpacity onPress={() => {
                                        console.log('---------------------------: ', route);
                                        DeviceEventEmitter.emit('mod')
                                    }}>
                                        <Entypo style={{ marginEnd: 10 }} name={value.theme ? 'list' : 'grid'} size={34} color="#FFA000" />
                                    </TouchableOpacity>
                                ),
                                headerLeft: (props) => (
                                    <TouchableOpacity onPress={() => {
                                        navigation.navigate(SEARCH_TITLE)
                                    }}>
                                        <EvilIcons style={{ marginStart: 10 }} name={'search'} size={34} color="#FFA000" />
                                    </TouchableOpacity>
                                )
                            }} />
                        <MovieStack.Screen
                            name={DETAIL_TITLE}
                            component={DetailScreen} />
                        <MovieStack.Screen
                            name={SEARCH_TITLE}
                            component={SearchScreen}
                            options={{
                                headerLeft: () => {
                                    return (
                                        <SearchBar nav={navigation} />
                                    )
                                },
                                headerTitle: null
                            }} />
                    </MovieStack.Navigator>
            }
        </ThemeContext.Consumer>
    )
}

const TVStack = createStackNavigator();
function TVStackScreen({ navigation, route }) {
    return (
        <ThemeContext.Consumer>
            {
                value =>
                    <TVStack.Navigator>
                        <TVStack.Screen
                            name={TV_TITLE}
                            component={TVScreen}
                            initialParams={{ mode: 0 }}
                            options={{
                                headerRight: () => (
                                    <TouchableOpacity onPress={() => {
                                        DeviceEventEmitter.emit('mod')
                                    }}>
                                        <Entypo style={{ marginEnd: 10 }} name={value.theme ? 'list' : 'grid'} size={34} color="#FFA000" />
                                    </TouchableOpacity>
                                ),
                                headerLeft: (props) => (
                                    <TouchableOpacity onPress={() => {
                                        navigation.navigate(SEARCH_TITLE)
                                    }}>
                                        <EvilIcons style={{ marginStart: 10 }} name={'search'} size={34} color="#FFA000" />
                                    </TouchableOpacity>
                                )
                            }} />
                        <TVStack.Screen
                            name={DETAIL_TITLE}
                            component={DetailScreen} />
                        <TVStack.Screen
                            name={SEARCH_TITLE}
                            component={SearchScreen}
                            options={{
                                headerLeft: () => {
                                    return (
                                        <SearchBar nav={navigation} />
                                    )
                                },
                                headerTitle: null
                            }} />
                    </TVStack.Navigator>
            }
        </ThemeContext.Consumer>

    )
}

const Tabbar = createBottomTabNavigator();
export function TMDBNavigation() {

    const [isGrid, setMode] = useState(true)

    _changeMode = () => {
        setMode(!isGrid)
        console.log(isGrid);
    }

    useEffect(() => {
        const lis = DeviceEventEmitter.addListener('mod', () => {
            _changeMode();
        })
        return () => {
            lis.remove()
        }
    })

    return (
        <NavigationContainer>
            <ThemeContext.Provider value={{ theme: isGrid }}>
                <Tabbar.Navigator
                    tabBarOptions={{
                        activeTintColor: 'tomato',
                        inactiveTintColor: 'gray',
                        iconStyle: 'normal'
                    }} >
                    <Tabbar.Screen
                        name={MOVIE_TITLE_NAV}
                        component={MovieStackScreen}
                        options={({ route, navigation }) => ({
                            tabBarVisible: _hideBottomTabbar(route, navigation),
                            tabBarIcon: ({ size, color }) => (
                                <MaterialCommunityIcons name='movie' size={size} color={color} />
                            )
                        })}
                    />
                    <Tabbar.Screen
                        name={TV_TITLE_NAV}
                        component={TVStackScreen}
                        options={({ route, navigation }) => ({
                            tabBarVisible: _hideBottomTabbar(route, navigation),
                            tabBarIcon: ({ size, color }) => (
                                <MaterialIcons name='tv' size={size} color={color} />
                            )
                        })} />
                </Tabbar.Navigator>

            </ThemeContext.Provider>
        </NavigationContainer >
    )
}

function _hideBottomTabbar(route, navigation) {

    console.log(navigation);


    return true;

    // let index = route.state?.index ?? 0
    // return index === 0
}