import pages from 'src/setup/pages'

//task
export default [
    {
      title: 'iproduct.cms.sidebar.adminGroup', //store
      icon: 'fa-light fa-cash-register',
      children: [
        pages.qproduct.products,
        pages.qproduct.categories
      ]
    },
  ]
