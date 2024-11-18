
export default {
  products: {
    //permission: 'isupply.products.manage',
    activated: true,
    authenticated: true,
    path: '/products/products/index',
    name: 'qproduct.admin.products',
    page: () => import('modules/qproduct/_pages/products'),
    layout: () => import('layouts/master.vue'),
    title: 'iproduct.cms.sidebar.adminProducts',
    icon: 'fa-light fa-boxes-stacked',
    subHeader: {
        refresh: true,
    }
  }
} 


