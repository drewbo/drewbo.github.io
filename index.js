const Metalsmith = require('metalsmith')
const markdown = require('metalsmith-markdown')
const collections = require('metalsmith-collections')
const permalinks = require('metalsmith-permalinks')
const layouts = require('metalsmith-layouts')
const dateInFilename = require('metalsmith-date-in-filename')
const codeHighlight = require('metalsmith-code-highlight')
const justAMoment = require('metalsmith-just-a-moment')
const draft = require('metalsmith-drafts')
const katex = require('metalsmith-katex');

Metalsmith(__dirname)
  .metadata({
    siteurl: 'http://drewbo.com/',
  })
  .source('./src')              // source directory
  .destination('./dist')        // destination directory
  .clean(true)                  // clean destination before
  .use(draft())
  .use(dateInFilename(true))
  .use(justAMoment({
    scanFile: false
  }))
  .use(katex())
  .use(markdown({               // transpile all md into html
    gfm: true,
    tables: true
  }))
  .use(collections({            // group all blog posts by internally
    posts: {                    // adding key 'collections':'posts'
      pattern: 'posts/*',
      sortBy: 'date',
      reverse: true
    }
  }))
  .use(permalinks({             // change URLs to permalink URLs
    relative: false             // put css only in /css
  }))                      // use `collections.posts` in layouts
  .use(layouts({                // wrap layouts around html
    engine: 'ejs',              // use the layout engine you like
    directory: './_layouts'
  }))
  .use(codeHighlight())
  .build(function(err) {        // build process
    if (err) throw err;         // error handling is required
  });
