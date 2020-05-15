# Strapi Ratelimit Middleware

A ratelimit middleware using [koa-ratelimit](https://github.com/koajs/ratelimit) for the headless CMS [Strapi](https://strapi.io)

**Please note this middleware is under development and is not ready for production usage**

## How it works

## Installing

## Setup

### Storage engine

### Ratelimit settings

### Error message and headers

### Whitlisting

#### IP Addresses

#### Routes

#### Methods

## Default settings

```json
{
  "ratelimit": {
    "enabled": true,
    "driver": "memory",
    "redis": {
      "host": "127.0.0.1",
      "port": 6379,
      "family": 4,
      "password": "",
      "db": 0
    },
    "duration": 60000,
    "max": 100,
    "errorMessage": {
      "statusCode": 429,
      "error": "Rate limit exceeded"
    },
    "headers": {
      "remaining": "Rate-Limit-Remaining",
      "reset": "Rate-Limit-Reset",
      "total": "Rate-Limit-Total"
    },
    "disableHeader": false,
    "whitelist": {
      "ip": [],
      "route": [],
      "method": []
    }
  }
}
```
