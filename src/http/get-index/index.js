// Add simple, fast, scalable persistence: https://docs.begin.com/en/data/begin-data/
let data = require('@begin/data')
let begin = require('@architect/functions') // Reads & writes session data

// Add secure sessions, middleware, and more: https://docs.begin.com/en/functions/http/
// let arc = require('@architect/functions')

// TODO: modify the body object!
let body = `{
  "hello": "world",
  "number": 1
}
`

exports.handler = async function http(req) {
  let table = 'global'
  let key = 'request_count'
  let count = 0
  let doc = await data.get({table, key})
  if (doc && doc.count) {
    count = doc.count
  }
  count++
  await data.set({table, key, count})

  return {
    statusCode: 200,
    headers: {
      'content-type': 'application/json'
    },
    body: JSON.stringify({ count })
  }
}

// Example responses

/* Forward requester to a new path
exports.handler = async function http (req) {
  return {
    statusCode: 302,
    headers: {'location': '/about'}
  }
}
*/

/* Respond with successful resource creation, CORS enabled
let arc = require('@architect/functions')
exports.handler = arc.http.async (http)
async function http (req) {
  return {
    statusCode: 201,
    headers: {'content-type': 'application/json; charset=utf8'},
    body: JSON.stringify({ok: true}),
    cors: true,
  }
}
*/

/* Deliver client-side JS
exports.handler = async function http (req) {
  return {
    headers: {'content-type': 'text/javascript; charset=utf8'},
    body: 'console.log("Hello world!")',
  }
}
*/
