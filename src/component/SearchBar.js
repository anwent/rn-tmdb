import React, { Component } from 'react';
import { View, Platform, StyleSheet, Text, Button, TouchableOpacity } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import { screenWidth } from '../utils/Utils'

const barHeight = Platform.OS === 'ios' ? 44 : 54

export class SearchBar extends Component {

    render() {
        let os = Platform.OS
        return os === 'ios' ? (
            <View style={styles.navSearch}>
                < View style={styles.bar}>
                    <View style={styles.radiusContent}>
                        <TextInput style={styles.inputContent} placeholder={'请输入搜索内容'} />
                    </View>
                </View>
            </View>


        ) : (
                <View style={{
                    width: screenWidth,
                    height: barHeight,
                    flexDirection: 'row'
                }} >
                    <TouchableOpacity style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }} >
                        <Text style={{ fontSize: 26, transform: [{ rotate: '180 deg' }], marginTop: 4 }} >➔</Text>
                    </TouchableOpacity>
                    < View style={{ flex: 8, justifyContent: 'center', alignItems: 'center' }}>
                        <View style={styles.radiusContent}>
                            <TextInput style={styles.inputContent} placeholder={'请输入搜索内容'} />
                        </View>
                    </View>
                    <TouchableOpacity style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }} >
                        <Text style={{ fontSize: 24 }} >🔍</Text>
                    </TouchableOpacity>
                </View>


            )
    }

    _searchBar = () => {
        return (
            < View style={styles.bar}>
                <View style={styles.radiusContent}>
                    <TextInput style={styles.inputContent} placeholder={'请输入搜索内容'} />
                </View>
            </View>
        )
    }

}

const barStyles = StyleSheet.create({


    bar: {
        width: screenWidth * 0.8,
        height: '100%',
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center'
    },

    radiusContent: {
        width: '90%',
        height: '80%',
        backgroundColor: '#EAECEE',
        borderRadius: 17.6,
        justifyContent: 'center'
    },

    inputContent: {
        width: '80%',
        height: '80%',
        marginStart: 40
    }

})


const styles = StyleSheet.create({



    navSearch: {
        width: screenWidth,
        height: barHeight,
    },

    backButton: {
        width: '20%',
        height: 30,
        backgroundColor: 'red'
    },

    bar: {
        width: screenWidth * 0.8,
        height: barHeight,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center'
    },

    radiusContent: {
        width: Platform.OS === 'ios' ? '90%' : '95%',
        height: Platform.OS === 'ios' ? '80%' : '80%',
        backgroundColor: '#EAECEE',
        borderRadius: Platform.OS == 'ios' ? 17.6 : 5,
        justifyContent: 'center'
    },

    inputContent: {
        width: '80%',
        height: Platform.OS === 'ios' ? '80%' : '100%',
        marginStart: Platform.OS === 'ios' ? 40 : 5,
        fontSize: Platform.OS === 'ios' ? 16 : 20
    }
})