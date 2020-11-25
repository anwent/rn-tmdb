import React, { Component } from 'react';
import { View } from 'react-native';

class Detail extends Component {

    render() {
        return (
            <View />
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