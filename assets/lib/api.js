import 'isomorphic-fetch'

function isTest() {
  return process.env.NODE_ENV === 'test'
}

function getUrl(path) {
  return isTest() ? `http://localhost${path}` : path
}

export function getTodos() {
  const url = getUrl('/api/todos')
  return fetch(url)
    .then(res => res.json())
}

export function addTodo(text) {
  const url = getUrl('/api/todos')
  return fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      todo: { text }
    })
  })
  .then(res => res.json())
}

export function updateTodo(id, params) {
  const url = getUrl(`/api/todos/${id}`)
  return fetch(url, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      todo: params
    })
  })
  .then(res => res.json())
}