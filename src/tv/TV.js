import React, { Component } from 'react';
import { View, Text, TouchableOpacity, FlatList, RefreshControl } from 'react-native';
import { DETAIL_TITLE } from './../detail/Detail'
import { ThemeContext } from '../context/ThemeCtx'
import { renderItem } from '../component/TMDBItem'
import { discoverTv } from '../provider/Providers'
import { TMDBBase } from '../component/BaseCompoent'

class TV extends TMDBBase {

    TMDBRender = context => {
        return (
            <FlatList
                style={{ flex: 1 }}
                data={this.state.datasource}
                renderItem={({ item, index }) => renderItem(item, index, context.theme, false, () => {
                    this.TMDBOnClickItem(item, index)
                })}
                keyExtractor={(item, index) => String(index)}
                key={context.theme ? 'v' : 'h'}
                numColumns={context.theme ? 3 : 1} 
                refreshControl={
                    <RefreshControl
                        tintColor='#000000'
                        refreshing={this.state.isRef}
                        onRefresh={() => (
                            this.onRefresh('tv')
                        )} />
                } 
                ListFooterComponent={this.renderLoadMore}
                onEndReached={this.onLoadMore('tv')} 
                />
        )
    }

    TMDBDidMount = () => {
        this.discoverTv();
    }


}

export const TV_TITLE = '电视';
export const TV_TITLE_NAV = '电视页';


export function TVScreen({ navigation, route }) {

    return (
        <TV nav={navigation} />
    )
}