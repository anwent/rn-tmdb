import React from 'react';

import {
    StyleSheet,
    TouchableOpacity,
    Image,
    Text
} from 'react-native'

import {
    screenWidth
} from '../utils/Utils';

const itemMargin = 10;
const gridColumns = 3;

export function renderItem(item, index, isGrid, isMovie, onPress = () => {}) {
    let imageUrl = `https://image.tmdb.org/t/p/w300${isMovie ? item.backdrop_path : item.poster_path}`
    let title = isMovie ? item.title : item.name;
    return (
        <TouchableOpacity
            style={styles({
                isGrid: isGrid
            }).item} 
            onPress={onPress} >
            <Image
                style={styles({}).image}
                source={{ uri: imageUrl }} />
            <Text
                style={styles({
                    textColor: isMovie ? '#B0BEC5' : '#455A64'
                }).title}
                numberOfLines={1}> {title} </Text>
        </TouchableOpacity>
    )
}

/**
 * 
 * props.isGrid
 * 
 * props.textColor
 * 
*/
const styles = (props) => StyleSheet.create({
    item: {
        width: props.isGrid ? (screenWidth - ((gridColumns + 1) * itemMargin)) / gridColumns : screenWidth - itemMargin * 4,
        height: props.isGrid ? 200 : 300,
        marginStart: props.isGrid ? itemMargin : itemMargin * 2,
        marginTop: itemMargin
    },

    image: {
        flex: 4
    },

    title: {
        flex: 1,
        marginTop: itemMargin,
        fontWeight: 'bold',
        fontSize: 18,
        color: props.textColor,
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center'
    }
})