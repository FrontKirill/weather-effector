import queryString from 'query-string'
import { attach, createStore } from 'effector'

export const $token = createStore('d160032f18207849b4ac7f03ec2b7b5a')

export const baseRequestFx = attach({
  effect: async (_, { api, params, resource }) => {
    if (params.method === 'GET') {
      const res = await api.get(`${resource}?${queryString.stringify(params.query)}`)
      return res.data
    }
  }
})

export const authRequestFx = attach({
  source: $token,
  effect: baseRequestFx,
  mapParams: ({ api, resource, params }, token) => {
    return {
      api,
      resource,
      params: {
        ...params,
        headers: { 'content-type': 'application/json' },
        query: {
          ...params.query,
          appid: token
        }
      }
    }
  }
})

export const createRequestFx = (api, resource, params) =>
  attach({
    effect: authRequestFx,
    mapParams: data => {
      return {
        api,
        resource,
        params: {
          ...params,
          query: { ...params.query, ...data?.query },
          ...(params.method !== 'GET' ? { body: JSON.stringify(data) } : {})
        }
      }
    }
  })
