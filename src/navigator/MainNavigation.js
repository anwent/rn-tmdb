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

import {
    Button,
    DeviceEventEmitter
} from 'react-native';


const MovieStack = createStackNavigator();
function MovieStackScreen() {
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
                                        title={value.theme ? 'list' : 'grid'}
                                        color='#00cc00'
                                        onPress={() => { DeviceEventEmitter.emit('mod') }} />
                                )
                            }}
                        />
                        <MovieStack.Screen name={DETAIL_TITLE} component={DetailScreen} />
                    </MovieStack.Navigator>
            }
        </ThemeContext.Consumer>
    )
}

const TVStack = createStackNavigator();
function TVStackScreen() {

    return (
        <TVStack.Navigator>
            <TVStack.Screen
                name={TV_TITLE}
                component={TVScreen}
                initialParams={{ mode: 0 }}
                options={{
                    headerRight: () => (
                        <Button
                            title='asd'
                            color='#00cc00'
                            onPress={() => { DeviceEventEmitter.emit('mod') }} />
                    )
                }} />
            <TVStack.Screen name={DETAIL_TITLE} component={DetailScreen} />
        </TVStack.Navigator>
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
                        component={MovieStackScreen} />
                    <Tabbar.Screen
                        name={TV_TITLE}
                        component={TVStackScreen} />
                </Tabbar.Navigator>
            </ThemeContext.Provider>

        </NavigationContainer >
    )
}

