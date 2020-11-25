import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Button } from 'react-native';
import { DETAIL_TITLE } from './../detail/Detail'
import { ThemeContext } from '../context/ThemeCtx'


class Movie extends Component {
    render() {
        return (
            <TouchableOpacity
                style={{ flex: 1 }}
                onPress={() => {
                    this.props.nav.setOptions({ tabBarVisible: false })
                    this.props.nav.navigate(DETAIL_TITLE)
                }} >

                <View style={{ flex: 1 }}>
                    <ThemeContext.Consumer>
                        {
                            value => <Text>{value.theme ? '网格展示' : '列表展示'} </Text>
                        }
                    </ThemeContext.Consumer>
                </View>
            </TouchableOpacity>
        );
    }
}

export const MOVIE_TITLE = '电影';

export function MovieScreen({ navigation, route }) {
    return (
        <Movie nav={navigation} />
    )
}