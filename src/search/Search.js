import React from 'react'
import { Platform, Text, View } from 'react-native'
import { Base } from '../component/BaseCompoent'

export class Search extends Base {

    BaseRender = () => {

        if (Platform.OS === 'ios') {
            return (
                <View style={{ flex: 1 }}>
                </View>
            )
        }

        return (
            <View style={{ flex: 1 }}>
            </View>
        )
    }

}

export const SEARCH_TITLE = '搜索'

export function SearchScreen({ navigation, route }) {
    return (
        <Search />
    )
}