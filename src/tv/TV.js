import React, { Component } from 'react';
import { View, Text, TouchableOpacity, FlatList } from 'react-native';
import { DETAIL_TITLE } from './../detail/Detail'
import { ThemeContext } from '../context/ThemeCtx'
import { renderItem } from '../component/TMDBItem'
import { discoverTv } from '../provider/Providers'

class TV extends Component {

    state = {
        datasource: []
    }

    render() {
        return (
            <ThemeContext.Consumer>
                {
                    value =>
                        <FlatList
                            style={{ flex: 1 }}
                            data={this.state.datasource}
                            renderItem={({ item, index }) => renderItem(item, index, value.theme, false)}
                            keyExtractor={(item, index) => String(index)}
                            key={value.theme ? 'v' : 'h'}
                            numColumns={value.theme ? 3 : 1}
                        />
                }
            </ThemeContext.Consumer>

        );
    }

    componentDidMount() {
        this._discoverTv();
    }

    async _discoverTv() {
        let result = await discoverTv();
        this.setState({
            datasource: result.results
        })
    }
}

export const TV_TITLE = '电视';

export function TVScreen({ navigation, route }) {

    return (
        <TV nav={navigation} />
    )
}