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
import routes                    from '~/app/routes';

const ROOT = __dirname + '/../'

// import Instagram from './feeds/instagram';
// (new Instagram()).fetch();

const app = express();

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

app.set('views', ROOT + 'views');

app.engine('hbs', HBS({
    extname: 'hbs',
    defaultLayout: 'main.hbs',
    layoutsDir: ROOT + 'views/layouts'
}));

app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(lessMiddleware(
    ROOT + '/public',
    { dest: ROOT + 'public/css' }
  )
);
app.use(express.static(ROOT + 'public'));
// app.use('/', routes);

export default app;

app.listen(conf.get('PORT'), () => {
    console.log('Listening on http://' + conf.get('HOST') + ':' + conf.get('PORT'));
});
