import React, { Component } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { DETAIL_TITLE } from './../detail/Detail'
import { ThemeContext } from '../context/ThemeCtx'

class TV extends Component {

    constructor() {
        super();

    }

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
                            value => <Text>{value.theme ? '网格展示' : '列表展示'}</Text>
                        }
                    </ThemeContext.Consumer>
                </View>
            </TouchableOpacity>

        );
    }
}

export const TV_TITLE = '电视';

export function TVScreen({ navigation, route }) {

    return (
        <TV nav={navigation} />
    )
}