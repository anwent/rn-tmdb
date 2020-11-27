import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Button, FlatList, Image, RefreshControl } from 'react-native';
import { DETAIL_TITLE } from './../detail/Detail'
import { ThemeContext } from '../context/ThemeCtx'
import { discoverMovie } from './../provider/Providers'
import { renderItem } from './../component/TMDBItem'
import { TMDBBase } from '../component/BaseCompoent'

class Movie extends TMDBBase {

    TMDBRender = context => {
        return (
            <FlatList
                style={{
                    height: '100%',
                    width: '100%',
                    backgroundColor: '#000000'
                }}
                data={this.state.datasource}
                renderItem={({ item, index }) => renderItem(item, index, context.theme, true, () => {
                    this.TMDBOnClickItem(item, index);
                })}
                keyExtractor={(item, index) => String(index)}
                key={context.theme ? 'v' : 'h'}
                numColumns={context.theme ? 3 : 1}
                refreshControl={
                    <RefreshControl
                        tintColor='#ffffff'
                        refreshing={this.state.isRef}
                        onRefresh={() => (
                            this.onRefresh('movie')
                        )} />
                }
                ListFooterComponent={this.renderLoadMore}
                onEndReached={this.onLoadMore('movie')}
                onEndReachedThreshold={0.01}
            />
        )
    }

    TMDBDidMount = () => {
        this.discoverMovie()
    }

}

export const MOVIE_TITLE = '电影';

export function MovieScreen({ navigation, route }) {
    return (
        <Movie nav={navigation} />
    )
}