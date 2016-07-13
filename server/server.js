import conf from './config';
import HBS from 'express-handlebars';
import lessMiddleware from 'less-middleware';
import favicon from 'serve-favicon';
import logger from 'morgan';

import express from 'express';
import React from 'react';
import { renderToString } from 'react-dom/server'
import { RouterContext, match } from 'react-router';
import createLocation from 'history/lib/createLocation';
import routes from '~/shared/routes';

import fetcher from './feeds/feed_fetcher';
fetcher.start();

const ROOT = __dirname + '/../'

const app = express();

app.use(logger('dev'));

app.use((req, res) => {
  const location = createLocation(req.url);
  match({ routes, location }, (err, redirectLocation, renderProps) => {
    if (err) {
      console.error(err);
      return res.status(500).end('Internal server error');
    }
    if (!renderProps) return res.status(404).end('Not found.');

    const InitialComponent = (
      <RouterContext {...renderProps} />
    );
    const componentHTML = renderToString(InitialComponent);
    const HTML = `
    <!DOCTYPE html>
    <html>
      <head>
        <link href="http://vjs.zencdn.net/5.10.4/video-js.css" rel="stylesheet">
        <meta charset="utf-8">
        <title>Carl Tashian</title>
      </head>
      <body>
        <div id="feed">${componentHTML}</div>
        <script src="http://vjs.zencdn.net/5.10.4/video.js"></script>
        <script type="application/javascript" src="/bundle.js"></script>
      </body>
  </html>
`
    res.end(HTML);
  });
});

app.set('x-powered-by', false);

app.use(lessMiddleware(
    ROOT + '/public',
    { dest: ROOT + 'public/css' }
  )
);
app.use(express.static(ROOT + 'public'));

export default app;

app.listen(conf.get('PORT'), () => {
    console.log('Listening on http://' + conf.get('HOST') + ':' + conf.get('PORT'));
});
