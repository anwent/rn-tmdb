import React, { Component } from 'react'
import { View, Text, TouchableOpacity, Button, FlatList, Image, RefreshControl } from 'react-native'
import { ThemeContext } from '../context/ThemeCtx'
import { DETAIL_TITLE } from './../detail/Detail'
import { discoverMovie, discoverTv } from '../provider/Providers'

export class Base extends Component {

    // state = {
    //     datasource: [],
    //     nextPage: 1,
    //     isRef: false,
    //     isLoading: false,
    //     hasMore: true
    // }

    // BaseRender = () => { }

    // BaseDidMount = () => { }

    // render() {
    //     return (
    //         <ThemeContext.Consumer>
    //             {
    //                 value =>
    //                     this.BaseRender(value)
    //             }
    //         </ThemeContext.Consumer>
    //     )
    // }

    // BaseOnClickItem(item, index) {
    //     this.props.nav.navigate(DETAIL_TITLE, { item, index });
    // }

    // componentDidMount() {
    //     this.BaseDidMount()
    // }


    BaseRender = () => { }

    BaseDidMount = () => { }

    render() {
        return (
            this.BaseRender()
        )
    }

    componentDidMount() {
        this.BaseDidMount()
    }

}

export class TMDBBase extends Base {

    isCanLoadMore = true

    state = {
        datasource: [],
        nextPage: 1,
        isRef: false,
        isLoading: false,
        hasMore: true
    }

    TMDBRender = () => { }
    TMDBDidMount = () => { }

    TMDBOnClickItem(item, index) {
        this.props.nav.navigate(DETAIL_TITLE, { item, index });
    }

    BaseRender = () => {
        return (
            <ThemeContext.Consumer>
                {
                    value =>
                        this.TMDBRender(value)
                }
            </ThemeContext.Consumer>
        )
    }

    BaseDidMount = () => {
        this.TMDBDidMount()
    }

    // net
    async discoverMovie(refresh = false) {
        let response = await discoverMovie(refresh ? 1 : this.state.nextPage)

        return await this._discover(response, refresh)
    }
    async discoverTv(refresh = false) {
        let response = await discoverTv(refresh ? 1 : this.state.nextPage)
        return await this._discover(response, refresh)
    }

    onRefresh = async type => {
        if (this.state.isRef) return;
        this.setState({
            isRef: true
        })
        let response
        switch (type) {
            case 'movie':
                response = await this.discoverMovie(true)
                break;
            case 'tv':
                response = await this.discoverTv(true)
                break;

            default:
                break;
        }
        response
            .catch(err => {
                this.setState({
                    isRef: false
                })
                console.log('网络请求失败:', err)
            })
    }

    onLoadMore = type => {

        console.log(type + '    load more');

        // if (this.state.isLoading) return;
        // if (!this.state.hasMore) return;
        // this.setState({
        //     isLoading: true
        // })
        // let response
        // switch (type) {
        //     case 'movie':
        //         response = this.discoverMovie()
        //         break;
        //     case 'tv':
        //         response = this.discoverTv()
        //         break
        //     default:
        //         break;
        // }
        // response.catch(err => {
        //     this.setState({
        //         isLoading: false
        //     })
        //     console.log('网络请求失败', err);
        // })
    }

    async _discover(response, refresh) {
        let results = Array.from(response.results ?? []);
        if (results.length === 0) {
            throw new Error('results is empty')
        }
        let curPage = response.page ?? 1
        let ds = refresh ? [] : this.state.datasource
        this.setState({
            isRef: false,
            isLoading: false,
            hasMore: curPage <= response.total_pages ?? 1,
            datasource: ds.concat(results),
            nextPage: curPage + 1
        })
    }

    renderLoadMore = () => {
        let load = this.state.hasMore ? '下拉加载更多' : '没有更多了'
        let label = this.state.isLoading ? '加载中...' : load
        return (
            <View style={{ alignItems: 'center' }}>
                <Text style={{ color: 'orange' }} >{label}</Text>
            </View>
        )
    }

}