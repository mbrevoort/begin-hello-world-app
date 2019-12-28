let data = require('@begin/data')

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
