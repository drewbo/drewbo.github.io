#!/usr/bin/env python
# -*- coding: utf-8 -*- #
from __future__ import unicode_literals

AUTHOR = u'Drew Bollinger'
SITENAME = u'drewbo.com'
SITEURL = 'http://drewbo.com'
TIMEZONE = 'US/Eastern'

# can be useful in development, but set to False when you're ready to publish
RELATIVE_URLS = True

THEME = 'themes/flasky'
DEFAULT_LANG = u'en'

# Feed generation is usually not desired when developing
FEED_ALL_ATOM = None
CATEGORY_FEED_ATOM = None
TRANSLATION_FEED_ATOM = None


DEFAULT_PAGINATION = 10

#everything below from the flasky readme

SECTIONS = [('Archive', 'archives.html'),
        ('Projects', 'pages/projects.html'),
        ('About', 'pages/about-me.html')]

DEFAULT_CATEGORY = 'Uncategorized'
DATE_FORMAT = {
'en': '%m %d %Y'
}
DEFAULT_DATE_FORMAT = '%m %d %Y'

DISQUS_SITENAME = "drewbo"
TWITTER_USERNAME = 'drewbo19'
LINKEDIN_URL = 'https://www.linkedin.com/profile/view?id=92384606'
GITHUB_URL = 'https://github.com/drewbo'
CODEPEN_USERNAME = 'drewbo'
MAIL_USERNAME = 'drew'
MAIL_HOST = 'drewbo.com'

PDF_GENERATOR = False
REVERSE_CATEGORY_ORDER = True
LOCALE = ""
DEFAULT_PAGINATION = 10

FEED_DOMAIN = SITEURL
FEED_RSS = '/feeds/all.rss.xml'
CATEGORY_FEED_RSS = '/feeds/%s.rss.xml'

OUTPUT_PATH = 'output'

GOOGLE_ANALYTICS_ACCOUNT = 'UA-50610868-1'

#PIWIK_URL = 'myurl.com/piwik'
#PIWIK_SSL_URL = 'myurl.com/piwik'
#PIWIK_SITE_ID = '1'

PLUGIN_PATH = 'pelican-plugins'
PLUGINS = ['summary','neighbors','pelican_dynamic','render_math']

SUMMARY_BEGIN_MARKER = '!BEGIN-SUMMARY!'
SUMMARY_END_MARKER = '!END-SUMMARY!'

ARTICLE_URL = 'blog/{date:%Y}/{date:%m}/{date:%d}/{slug}/'
ARTICLE_SAVE_AS = 'blog/{date:%Y}/{date:%m}/{date:%d}/{slug}/index.html'

SUMMARY_MAX_LENGTH = 45 # None


# static paths will be copied under the same name
STATIC_PATHS = ['images','css','js','data']

# A list of files to copy from the source to the destination
#FILES_TO_COPY = (('extra/robots.txt', 'robots.txt'),)
