const { resolve } = require('path');

const Koa = require('koa');
const logger = require('koa-logger');
const serve = require('koa-static');
const views = require('koa-views');

const router = require('./routes');

const app = new Koa();

app.use(logger());

if (process.env.NODE_ENV !== 'production') {
  const outFile = resolve(__dirname, 'dist', 'index.html')
  const outDir = resolve(__dirname, 'dist')
  const { createMiddleware } = require('koa-parcel-middleware');
  const { Bundler } = require('parcel-bundler');
  const staticMiddleware = serve(outDir)

  (async () => {
    const middleware = await koaWebpack({
      config: webpackConfig,
      devMiddleware: {
        colors: true,
        contentBase: 'public',
        publicPath: '/',
        stats: 'minimal',
      },
      hotClient: {
        hmr: true,
        host: 'localhost',
      },
    });
    const outFile = path.resolve(__dirname, 'dist', 'index.html');
    const outDir = path.resolve(__dirname, 'dist');

    const options = {
      outDir,
      outFile,
      watch: isDev,
      minify: !isDev,
      scopeHoist: false,
      hmr: isDev,
      detailedReport: isDev
    }
    const bundler = new Bundler(ENTRY_FILENAME, options)
    bundler.bundle()
    const staticMiddleware = serveStatic(outDir)

    const parcelMiddleware = createMiddleware({
      bundler,
      renderHtmlMiddleware: async (ctx, next) => {
        // optionally wire in SSR!
   
        // index.html
        //
        // <html>
        //   <div id="app"><!-- ssr-content --></div>
        //   <script src="app.tsx"></script>
        // </html>
        const outFileBuffer = await fs.readFile(outFile)
        const [preAppEntry, postAppEntry] = outFileBuffer.toString().split(/<!--.*ssr.*-->/)

        ctx.status = 200
        const htmlStream = new CombinedStream()
        
        [
          preAppEntry,
          ReactDOMServer.renderToNodeStream(App()),
          postAppEntry
        ].forEach(content => htmlStream.append(content));

        ctx.body = htmlStream;
        ctx.type = 'html';
        await next();
      },
      staticMiddleware,
    })
    app.use((ctx, next) => parcelMiddleware(ctx, next))
  })();
} else {
  app.use(serve(__rootdir + '/public'));
}

app.use(views(__dirname + '/views', {
  map: {
    html: 'nunjucks'
  }
}));

app.use(router.routes());

module.exports = app;
