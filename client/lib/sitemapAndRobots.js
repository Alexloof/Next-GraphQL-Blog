const sm = require('sitemap')
const path = require('path')

const sitemap = sm.createSitemap({
  hostname: 'https://next-graphql.now.sh',
  cacheTime: 600000 // 600 sec - cache purge period
})

const setup = ({ server }) => {
  // add all pages that you want to be indexed by google
  sitemap.add({
    url: '/',
    changefreq: 'daily',
    priority: 1
  })

  sitemap.add({
    url: '/signup',
    changefreq: 'daily',
    priority: 1
  })

  sitemap.add({
    url: '/login',
    changefreq: 'daily',
    priority: 1
  })

  server.get('/sitemap.xml', (req, res) => {
    sitemap.toXML((err, xml) => {
      if (err) {
        res.status(500).end()
        return
      }

      res.header('Content-Type', 'application/xml')
      res.send(xml)
    })
  })

  server.get('/robots.txt', (req, res) => {
    res.sendFile(path.join(__dirname, '../static', 'robots.txt'))
  })
}

module.exports = setup
