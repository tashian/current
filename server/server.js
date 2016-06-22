import conf from './config';
import HBS from 'express-handlebars';
import _ from 'underscore';
import lessMiddleware from 'less-middleware';
import favicon from 'serve-favicon';
import logger from 'morgan';

import express                   from 'express';
import React                     from 'react';
import { renderToString }        from 'react-dom/server'
import { RouterContext, match } from 'react-router';
import createLocation            from 'history/lib/createLocation';
import routes                    from '~/shared/routes';

const ROOT = __dirname + '/../'

import Twitter from './feeds/twitter';
import Medium from './feeds/medium';
import Instagram from './feeds/instagram';
import cache from 'memory-cache';

Promise.all(
  [(new Twitter()).fetch(),
   (new Instagram()).fetch(),
   (new Medium()).fetch()]
).then((values) => {
  let sortedFeed = _.chain(values)
    .flatten()
    .sortBy(function(current) {
      return 0 - current.createdAt.getTime();
    })
    .value()

  cache.put('feed', {items: sortedFeed});

});

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
        <meta charset="utf-8">
        <title>Isomorphic Redux Demo</title>
      </head>
      <body>
        <div id="react-view">${componentHTML}</div>
        <script type="application/javascript" src="/bundle.js"></script>
      </body>
  </html>
`
    res.end(HTML);
  });
});

// This is where all the magic happens!
app.set('x-powered-by', false);

// app.set('views', ROOT + 'views');
//
// app.engine('hbs', HBS({
//     extname: 'hbs',
//     defaultLayout: 'main.hbs',
//     layoutsDir: ROOT + 'views/layouts'
// }));
//
// app.set('view engine', 'hbs');

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
