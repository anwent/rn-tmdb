import React, { Component } from 'react';
import { View, Platform, StyleSheet, Text, Button, TouchableOpacity } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import { screenWidth } from '../utils/Utils'
import AntDesign from 'react-native-vector-icons/AntDesign'
import EvilIcons from 'react-native-vector-icons/EvilIcons'
import { MOVIE_TITLE_NAV } from '../movie/Movie'
import { TV_TITLE_NAV } from '../tv/TV'

const barHeight = Platform.OS === 'ios' ? 44 : 54

export class SearchBar extends Component {

    render() {
        let os = Platform.OS
        return os === 'ios' ? (
            <View style={styles.navSearch}>
                <View style={styles.bar}>
                    <View style={styles.radiusContent}>
                        <EvilIcons style={{ marginStart: 10 }} name='search' size={24} />
                        <TextInput style={styles.inputContent} placeholder={'请输入搜索内容'} />
                    </View>
                </View>

                <TouchableOpacity
                    style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
                    onPress={() => {
                        console.log('~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~`');
                        this.props.nav.goBack(TV_TITLE_NAV);
                    }} >
                    <Text style={{ fontSize: 18 }} >取消</Text>
                </TouchableOpacity>
            </View>

        ) : (
                <View style={{
                    width: screenWidth,
                    height: barHeight,
                    flexDirection: 'row'
                }} >
                    <TouchableOpacity
                        style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
                        onPress={() => {
                        }} >
                        <AntDesign name='arrowleft' size={30} />
                    </TouchableOpacity>
                    < View style={{ flex: 8, justifyContent: 'center', alignItems: 'center' }}>
                        <View style={styles.radiusContent}>
                            <TextInput style={styles.inputContent} placeholder={'请输入搜索内容'} />
                        </View>
                    </View>
                    <TouchableOpacity style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }} >
                        <Text style={{ fontSize: 18 }} >搜索</Text>
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
        flex: 1,
        flexDirection: 'row'
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
        justifyContent: 'center',
        paddingStart: Platform.OS === 'ios' ? 20 : 0,
    },

    radiusContent: {
        width: Platform.OS === 'ios' ? '100%' : '95%',
        height: Platform.OS === 'ios' ? '80%' : '80%',
        backgroundColor: '#EAECEE',
        borderRadius: Platform.OS == 'ios' ? 17.6 : 5,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },

    inputContent: {
        width: '80%',
        height: Platform.OS === 'ios' ? '80%' : '100%',
        marginStart: Platform.OS === 'ios' ? 5 : 5,
        fontSize: Platform.OS === 'ios' ? 16 : 20
    }
})