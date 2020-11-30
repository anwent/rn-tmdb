import React, { Component } from 'react';
import { View } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome'

class Detail extends Component {

    render() {
        return (
            // <View />
            <Icon name="github" size={44} color="blue" />
        );
    }
}

export const DETAIL_TITLE = '详情';

export function DetailScreen({ navigation, route }) {
    console.log(route.params.index);
    console.log(route.params.item);
    return (
        <Detail />
    )
}