import React from 'react'

const BASE_URL = 'https://api.themoviedb.org/3/'
const V3_AUTH = '5839433490aed791ddb05aaeaa0878b9'
const LANG = 'zh-cn'

export async function discoverMovie(page = 1, sort = 'popularity.desc') {
    let url = BASE_URL + `discover/movie?api_key=${V3_AUTH}&language=${LANG}&page=${page}&sort_by=${sort}`
    return await fetchRequest(url, { timeout: 10, 'Cache-Control': 'no-cache' })
}

export async function discoverTv(page = 1, sort = 'popularity.desc') {
    let url = BASE_URL + `discover/tv?api_key=${V3_AUTH}&language=${LANG}&page=${page}&sort_by=${sort}`
    return await fetchRequest(url, { timeout: 10, 'Cache-Control': 'no-cache' })
}

const fetchRequest = async (url, options) => {
    try {
        let response = await fetch(url, options)
        return await response.json()
    } catch (error) {
        throw error
    }
}
