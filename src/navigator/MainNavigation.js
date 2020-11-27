import React, {
    useState,
    useEffect
} from 'react';

import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'

import { MovieScreen, MOVIE_TITLE } from './../movie/Movie'
import { TVScreen, TV_TITLE } from './../tv/TV'
import { DetailScreen, DETAIL_TITLE } from './../detail/Detail'
import { ThemeContext } from '../context/ThemeCtx'
import { SearchScreen, SEARCH_TITLE } from '../search/Search'
import { SearchBar } from '../component/SearchBar'
import { screenWidth } from '../utils/Utils'

import {
    Button,
    DeviceEventEmitter,
    HeaderBackButton,
    View,
    Platform
} from 'react-native';


const MovieStack = createStackNavigator();
function MovieStackScreen({ navigation }) {
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
                                    <Button
                                        title={value.theme ? '切换为列表' : '切换为表格'}
                                        color='#FFA000'
                                        onPress={() => { DeviceEventEmitter.emit('mod') }} />
                                ),
                                headerLeft: (props) => (
                                    <Button
                                        title={SEARCH_TITLE}
                                        color='#FFA000'
                                        onPress={() => (
                                            navigation.navigate(SEARCH_TITLE)
                                        )}
                                    />
                                )
                            }} />
                        <MovieStack.Screen
                            name={DETAIL_TITLE}
                            component={DetailScreen} />
                        <MovieStack.Screen
                            name={SEARCH_TITLE}
                            component={SearchScreen} />
                    </MovieStack.Navigator>
            }
        </ThemeContext.Consumer>
    )
}

const TVStack = createStackNavigator();
function TVStackScreen({ navigation }) {

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
                                    <Button
                                        title={value.theme ? '切换为列表' : '切换为表格'}
                                        color='#FFA000'
                                        onPress={() => { DeviceEventEmitter.emit('mod') }} />
                                ),
                                headerLeft: (props) => (
                                    <Button
                                        title={SEARCH_TITLE}
                                        color='#FFA000'
                                        onPress={() => (
                                            navigation.navigate(SEARCH_TITLE)
                                        )}
                                    />
                                )
                            }} />
                        <TVStack.Screen
                            name={DETAIL_TITLE}
                            component={DetailScreen} />
                        <TVStack.Screen
                            name={SEARCH_TITLE}
                            component={SearchScreen}
                            options={{
                                headerLeft: () => (
                                    <SearchBar />
                                ),
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
                    }} >
                    <Tabbar.Screen
                        name={MOVIE_TITLE}
                        component={MovieStackScreen}
                        options={({ route }) => ({
                            tabBarVisible: _hideBottomTabbar(route)
                        })}
                    />
                    <Tabbar.Screen
                        name={TV_TITLE}
                        component={TVStackScreen}
                        options={({ route }) => ({
                            tabBarVisible: _hideBottomTabbar(route)
                        })} />
                </Tabbar.Navigator>
            </ThemeContext.Provider>
        </NavigationContainer >
    )
}

function _hideBottomTabbar(route) {
    let index = route.state?.index ?? 0
    return index === 0
}