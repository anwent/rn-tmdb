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
                    flex: 1,
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
                ListFooterComponent={this._renderLoadMore}
                onEndReached={this._onLoadMore}
            />
        )
    }

    TMDBDidMount = () => {
        this.discoverMovie()
    }

    _onLoadMore = () => {
        if (this.state.isLoading) return;
        if (!this.state.hasMore) return;
        this.setState({
            isLoading: true
        })
        this.discoverMovie().catch(err => {
            this.setState({
                isLoading: false
            })
            console.log('网络请求失败:', err)
        })
    }

    _renderLoadMore = () => {
        let load = this.state.hasMore ? '下拉加载更多' : '没有更多了'
        let label = this.state.isLoading ? '加载中...' : load
        return (
            <View style={{ alignItems: 'center' }}>
                <Text style={{ color: 'red' }} >{label}</Text>
            </View>
        )
    }

}

export const MOVIE_TITLE = '电影';

export function MovieScreen({ navigation, route }) {
    return (
        <Movie nav={navigation} />
    )
}