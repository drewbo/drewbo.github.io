const Metalsmith = require('metalsmith')
const markdown = require('metalsmith-markdown')
const collections = require('metalsmith-collections')
const permalinks = require('metalsmith-permalinks')
const layouts = require('metalsmith-layouts')

Metalsmith(__dirname)
  .metadata({
    siteurl: 'http://drewbo.com/',
  })
  .source('./src')              // source directory
  .destination('./dist')        // destination directory
  .clean(true)                  // clean destination before
  .use(collections({            // group all blog posts by internally
    post: 'posts/*.md'          // adding key 'collections':'posts'
  }))                           // use `collections.posts` in layouts
  .use(markdown({               // transpile all md into html
    gfm: true,
    tables: true
  }))
  .use(permalinks({             // change URLs to permalink URLs
    relative: false             // put css only in /css
  }))
  .use(layouts({                // wrap layouts around html
    engine: 'handlebars',       // use the layout engine you like
    directory: './src/layouts'
  }))
  .build(function(err) {        // build process
    if (err) throw err;         // error handling is required
  });
