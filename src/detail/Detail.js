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

export function DetailScreen({ navigation }) {
    return (
        <Detail />
    )
}