const ratelimit = require('koa-ratelimit');
const Redis = require('ioredis');
let db = new Map();


module.exports = strapi => {
  return {
    initialize() {
      const settings = strapi.config.middleware.settings.ratelimit
      const whitelist = settings.whitelist

      if (settings.driver === 'redis') {
        db = new Redis(settings.redis)
      }

      strapi.app.use(ratelimit({
        driver: settings.driver,
        db: db,
        duration: settings.duration,
        errorMessage: settings.errorMessage,
        id: (ctx) => ctx.ip,
        headers: {
          remaining: 'Rate-Limit-Remaining',
          reset: 'Rate-Limit-Reset',
          total: 'Rate-Limit-Total'
        },
        max: settings.max,
        disableHeader: settings.disableHeader,
        whitelist: (ctx) => {
          let adminRegex = new RegExp("^\/admin\.*")
          let routeRegex = new RegExp("^\/.*\/[a-zA-Z0-9_]+")

          // Remove some common paths
          if (
            ctx.request.url === '/favicon.ico' ||
            adminRegex.test(ctx.request.url) === true
          ) {
            return true
          }

          // Check IP Whitelist
          if (whitelist.ip.includes(ctx.ip) === true) {
            return true
          }

          // Check route Whitelist
          if (whitelist.route.includes(ctx.request.url) === true) {
            return true
          } else if (routeRegex.test(ctx.request.url) === true) {
            let route = ctx.request.url.match("\/.*\/")
            if (
              route !== null &&
              routeRegex.test(ctx.request.url) &&
              whitelist.route.includes(route[0] + ':id')
            ) {
              return true
            }
          }
        }
      }));
    },
  };
};
