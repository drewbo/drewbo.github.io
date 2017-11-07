const Metalsmith = require('metalsmith')
const markdown = require('metalsmith-markdown')
const collections = require('metalsmith-collections')
const permalinks = require('metalsmith-permalinks')
const layouts = require('metalsmith-layouts')
const dateInFilename = require('metalsmith-date-in-filename')
const codeHighlight = require('metalsmith-code-highlight')

Metalsmith(__dirname)
  .metadata({
    siteurl: 'http://drewbo.com/',
  })
  .source('./src')              // source directory
  .destination('./dist')        // destination directory
  .clean(true)                  // clean destination before
  .use(dateInFilename(true))
  .use(markdown({               // transpile all md into html
    gfm: true,
    tables: true
  }))
  .use(collections({            // group all blog posts by internally
    posts: 'posts/*'            // adding key 'collections':'posts'
  }))                           // use `collections.posts` in layouts
  .use(permalinks({             // change URLs to permalink URLs
    relative: false             // put css only in /css
  }))
  .use(layouts({                // wrap layouts around html
    engine: 'ejs',              // use the layout engine you like
    directory: './_layouts'
  }))
  .use(codeHighlight())
  .build(function(err) {        // build process
    if (err) throw err;         // error handling is required
  });
