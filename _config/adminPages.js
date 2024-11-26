
export default {
  products: {
    permission: 'iproduct.products.manage',
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
  },
  categories: {
    permission: 'iproduct.categories.manage',
    activated: true,
    authenticated: true,
    path: '/products/categories/index',
    name: 'qproducts.admin.categories',
    crud : import('modules/qproduct/_crud/categories'),
    page: () => import('modules/qcrud/_pages/admin/crudPage'),
    layout: () => import('layouts/master.vue'),
    title: 'iproduct.cms.sidebar.adminCategories',
    icon: 'fa-light fa-layer-group',
    subHeader: {
      refresh: true,
    }
  },
} 


