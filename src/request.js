import { useEffect, useState } from 'react'
import axios from 'axios'

export const baseURL = 'https://community-open-weather-map.p.rapidapi.com/'

const baseAPI = axios.create({
    baseURL,
    headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        'X-RapidAPI-Key': '9f7a2b6051msh713725b16baa266p163449jsn7f7f57b38590',
        'X-RapidAPI-Host': 'community-open-weather-map.p.rapidapi.com',
    },
})

export function useRequest(options = {}) {
    const [response, setResponse] = useState()
    const [loading, setLoading] = useState(false)

    async function request(overrideOptions = {}) {
        setLoading(true)

        try {
            const api = await baseAPI({ ...options, ...overrideOptions })

            setResponse(api.data)
            return { response: api.data, success: true }
        } finally {
            setLoading(false)
        }
    }

    return { loading, request, response, setResponse, setLoading }
}

export function useLoad(options, dependencies = []) {
    const request = useRequest({ method: 'GET', ...options })

    useEffect(() => {
        request.request()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, dependencies)

    return request
}
