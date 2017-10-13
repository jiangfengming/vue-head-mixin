# vue-head-mixin
A Vue mixin to manage document title and meta tags. Works on both client and server side.


## Usage

```js
import vueHeadMixin from 'vue-head-mixin'
import { getArticle } from './api'

const headMixin = vueHeadMixin({
  titleTemplate: '%s - Your Company Name'
})

export default {
  mixins: [headMixin],

  props: ['id'],

  async created() {
    const article = getArticle(this.id)
    this.setDocumentTitle(article.title)
    this.setDocumentMeta([
      {
        name: 'author',
        content: article.author
      },

      {
        name: 'description',
        content: article.description
      },

      {
        name: 'keywords',
        content: article.keywords
      }
    ])
  }
}
```

If you use SSR, you need to inject the title and meta into html template:

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <title>{{ title }}</title>
    {{{ meta }}}
  </head>

  <body>
    <!--vue-ssr-outlet-->
  </body>
</html>
```

And make sure set the default values in SSR context:

```js
const context = {
  url: ctx.url,
  title: '',
  meta: ''
}

renderer.renderToString(context, (err, html) => {
  // ...
}
```

## APIs

### vueInstance.setDocumentTitle(title, titleTemplate)
```
title: String.
titleTemplate: String. the template of the title. e.g, '%s - Your Company Name'
```

### vueInstance.setDocumentMeta(name, content)

### vueInstance.setDocumentMeta([ { name, content }, ...])

```
name: The name of <meta>.
content: The content of <meta>.
