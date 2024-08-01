/**
 * 封装请求
 *
 * @param url
 * @param opt
 * @param custom
 */
const fetch = (url: string, opt: object = {}, custom: object = {}) => {
  const config = await useRuntimeConfig()
  const baseURL = config.public.baseURL

  return new Promise((resolve, reject) => {
    useFetch(url, {
      // method, body, query, ...
      ...opt,
      // ofetch 库会自动识别请求地址，对于url已包含域名的请求不会再拼接baseURL
      baseURL,
      // onRequest相当于请求拦截
      onRequest({ options }) {
        // 根据额外的参数, 判断是否需要登录, 默认需要登录,如果没有 token, 直接重定向到登录

        // 设置请求头
        options.headers = {
          ...options.headers,
          authorization: 'Token'
        }
      },
      // onResponse相当于响应拦截
      onResponse({ response }) {
        // 接口返回的数据
        const data = response._data

        // 处理 http 状态码
        const status = response.status
        if (status !== 200) return reject(data)

        // TODO 这里直接返回数据, 您真实的业务请自行处理状态码
        return resolve(data)

        // 如果是 200, 直接返回数据
        if (data.code === 200) {
          return resolve(data.data)
        }

        // 判断不同的状态, 执行不同的操作
        if (data.code === 401) {
          // 重定向到登录
        }

        // 处理错误消息, 请勿使用客户端相关的 api, 否则ssr失效
        console.log(data.message)

        // 如果需要catch返回，则进行reject
        if (custom?.catch) {
          return reject(data)
        }

        // 否则返回一个pending中的promise，请求不会进入catch中
        return new Promise(() => ({}))
      },
      // error
      onRequestError(e) {
        console.log('Request Error')
        reject(e)
      },
      // request, response, options
      onResponseError(e) {
        console.log('Request Error')
        reject(e)
      }
    })
  })
}

export default {
  get(url: string, params: object = {}, custom: object = {}) {
    return fetch(url, { method: 'get', params }, custom)
  },

  post(url: string, body: object = {}, custom: object = {}) {
    return fetch(url, { method: 'post', body }, custom)
  },

  put(url: string, body: object = {}, custom: object = {}) {
    return fetch(url, { method: 'put', body }, custom)
  },

  delete(url: string, body: object = {}, custom: object = {}) {
    return fetch(url, { method: 'delete', body }, custom)
  }
}
