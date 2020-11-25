import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Button, FlatList, Image } from 'react-native';
import { DETAIL_TITLE } from './../detail/Detail'
import { ThemeContext } from '../context/ThemeCtx'
import { discoverMovie } from './../provider/Providers'
import { renderItem } from './../component/TMDBItem'


class Movie extends Component {

    state = {
        datasource: []
    }

    componentDidMount() {
        this._discoverMovie();
    }

    render() {

        return (
            <ThemeContext.Consumer>
                {
                    value =>
                        <FlatList
                            style={{
                                flex: 1,
                                backgroundColor: '#000000'
                            }}
                            data={this.state.datasource}
                            renderItem={({ item, index }) => renderItem(item, index, value.theme, true)}
                            keyExtractor={(item, index) => String(index)}
                            key={value.theme ? 'v' : 'h'}
                            numColumns={value.theme ? 3 : 1}
                        />
                }
            </ThemeContext.Consumer>
        )
    }

    async _discoverMovie(page) {
        let req = await discoverMovie(page);
        this.setState({
            datasource: req.results
        })
    }
}

export const MOVIE_TITLE = '电影';

export function MovieScreen({ navigation, route }) {
    return (
        <Movie nav={navigation} />
    )
}