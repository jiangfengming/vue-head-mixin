function cleanMeta() {
  const head = document.querySelector('head')
  const metaEls = document.querySelectorAll('meta[vue-head-mixin]')

  for (const el of metaEls) {
    head.removeChild(el)
  }
}

function insertMeta(meta) {
  const head = document.querySelector('head')

  for (const { name, content } of meta) {
    const el = document.createElement('meta')
    el.name = name
    el.content = content
    el.setAttribute('vue-head-mixin', '')
    head.appendChild(el)
  }
}

function encodeHTMLEntities(s) {
  return s.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
}

function generateMetaString(meta) {
  let s = ''

  for (const { name, content } of meta) {
    s += `<meta name="${encodeHTMLEntities(name)}" content="${encodeHTMLEntities(content)}" vue-head-mixin>`
  }

  return s
}

export default function({ titleTemplate }) {
  return {
    created() {
      if (this.$options.title) {
        this.setDocumentTitle(this.$options.title)
      }
    },

    methods: {
      setDocumentTitle(title, template = titleTemplate) {
        if (template) title = template.replace('%s', title)

        if (this.$ssrContext) {
          this.$ssrContext.title = title
        } else {
          window.document.title = title
        }
      },

      setDocumentMeta(name, content) {
        let meta
        if (name.constructor === Array) {
          meta = name
        } else {
          meta = [{ name, content }]
        }

        if (this.$ssrContext) {
          this.$ssrContext.meta = generateMetaString(meta)
        } else {
          cleanMeta()
          insertMeta(meta)
        }
      }
    }
  }
}
