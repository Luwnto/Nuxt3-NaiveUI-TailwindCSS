import { setup } from '@css-render/vue3-ssr'
import { defineNuxtPlugin } from '#app'

export default defineNuxtPlugin(nuxtApp => {
  if (process.server) {
    // 解决刷新样式错乱的问题
    nuxtApp.ssrContext?.head.hooks.hook('tags:resolve', (ctx) => {
      //  insert Style after meta
      const lastMetaIndex = ctx.tags.map((x) => x.tag).lastIndexOf('meta')
      const styleTags = collect()
        .split('</style>')
        .filter(Boolean)
        .map((x) => {
          const id = x.match(/cssr-id="(.+?)"/)?.[1]
          const style = (x.match(/>(.*)/s)?.[1] || '').trim()
          return {
            tag: 'style',
            props: { 'cssr-id': id },
            innerHTML: style
          }
        })
      ctx.tags.splice(lastMetaIndex + 1, 0, ...styleTags)
    })
    
    const { collect } = setup(nuxtApp.vueApp)
    const originalRenderMeta = nuxtApp.ssrContext?.renderMeta
    nuxtApp.ssrContext = nuxtApp.ssrContext || {}
    nuxtApp.ssrContext.renderMeta = () => {
      if (!originalRenderMeta) {
        return { headTags: collect() }
      }
      const originalMeta = originalRenderMeta()
      if ('then' in originalMeta) {
        return originalMeta.then(resolvedOriginalMeta => ({
          ...resolvedOriginalMeta,
          headTags: resolvedOriginalMeta['headTags'] + collect()
        }))
      }
      return {
        ...originalMeta,
        headTags: originalMeta['headTags'] + collect()
      }

    }
  }
})
