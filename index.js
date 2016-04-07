import curry from 'curry'
import { LocalStorage } from 'node-localstorage'
const localStorage = new LocalStorage('./scratch')

const defaultMethods = {
  'get': (original) => original || null,
  'put': (original, body) => body,
  'post': (original, body) => body,
  'patch': (original, body) => body,
  'delete': (original) => null
}

const defaultOptions = {
  method: 'get',
  body: {},
  success: () => {},
  error: () => {}
}

const fakeFetch = (config = {}, mockOptions) => {
  const options = { ...defaultOptions, ...mockOptions }
  const { url, method, body, success, error } = options
  const original = localStorage.getItem(url)
  const func = config[url] ? { defaultMethods, ...config[url] }[method] : defaultMethods[method]
  const calculatedResult = func(original, body)
  localStorage.setItem(url, JSON.stringify(calculatedResult))
  success(JSON.parse(localStorage.getItem(url)))
}

export default fakeFetch