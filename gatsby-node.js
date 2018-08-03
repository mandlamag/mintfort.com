const path = require('path')
const { languages } = require('./siteConfig')

exports.onCreateWebpackConfig = ({ actions }) => {
  actions.setWebpackConfig({
    resolve: {
      modules: [path.resolve(__dirname, "src"), "node_modules"]
    }
  })
}

exports.onCreatePage = ({ page, actions }) => {
  const { createPage, deletePage } = actions

  if (page.path.includes('404')) {
    return Promise.resolve()
  }

  return new Promise(resolve => {
    const redirect = path.resolve('src/utils/redirect.js')

    deletePage(page)
    createPage({
      ...page,
      component: redirect,
      context: {
        languages,
        locale: '',
        routed: false,
        redirectPage: page.path
      }
    })

    languages.forEach(locale => createPage({
      ...page,
      originalPath: page.path,
      path: `/${locale}${page.path}`,
      context: {
        languages,
        locale,
        routed: true,
        originalPath: page.path
      }
    }))

    resolve()
  })
}
