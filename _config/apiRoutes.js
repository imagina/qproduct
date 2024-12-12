const moduleName = 'iproduct';
const moduleVersion = 'v1';
const urlBase = `/${moduleName}/${moduleVersion}`


export default {
  urlBase: urlBase,
  version: moduleVersion, 
  products: `${urlBase}/products`,
  categories: `${urlBase}/categories`
}
