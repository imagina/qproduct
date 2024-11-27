<template></template>
<script>

export default {
  data() {
    return {
      crudId: this.$uid()
    }
  },
  computed: {
    crudData() {
      return {
        crudId: this.crudId,
        entityName: config("main.qproduct.entityNames.category"),
        apiRoute: 'apiRoutes.qproduct.categories',
        permission: 'iproduct.categories',
        //extraFormFields: 'iblog.crud-fields.categories',
        create: {
          title: this.$tr('iproduct.cms.newCategory'),
        },
        read: {
          columns: [
            { name: 'id', label: this.$tr('isite.cms.form.id'), field: 'id', style: 'width: 50px' },
            { name: 'name', label: this.$tr('isite.cms.form.title'), field: 'title', align: 'rigth' },
            { name: 'slug', label: this.$tr('isite.cms.form.slug'), field: 'slug', align: 'left' },
            {
              name: 'status',
              label: this.$tr('isite.cms.form.status'),
              field: 'status',
              align: 'left',
              isTranslatable: true
            },
            {
              name: 'parent', label: this.$tr('isite.cms.form.parent'), field: 'parent', align: 'left',
              format: val => val ? (val.title ? val.title : '-') : '-'
            },
            {
              name: 'created_at', label: this.$tr('isite.cms.form.createdAt'), field: 'createdAt', align: 'left',
              format: val => val ? this.$trd(val) : '-',
            },
            {
              name: 'updated_at', label: this.$tr('isite.cms.form.updatedAt'), field: 'updatedAt', align: 'left',
              format: val => val ? this.$trd(val) : '-',
            },
            /*
            {
              name: 'deleted_at', label: this.$tr('itask.cms.form.deletedAt'), field: 'deletedAt', align: 'left',
              format: val => val ? this.$trd(val) : '-',
            },
            */
            { name: 'actions', label: this.$tr('isite.cms.form.actions'), align: 'left' },
          ],
          requestParams: { include: 'parent' },
          filters: {
            parentId: {
              value: null,
              type: 'treeSelect',
              props: {
                label: this.$tr('isite.cms.form.parent')
              },
              loadOptions: {
                apiRoute: 'apiRoutes.qproduct.categories',
                requestParams: { filter: { status: 1 } }
              }
            },
          }
        },
        update: {
          title: this.$tr('iblog.cms.updateCategory'),
          requestParams: { include: 'parent,buildable' }
        },
        delete: true,
        formLeft: {
          id: { value: '' },
          userId: { value: this.$store.state.quserAuth.userId },
          title: {
            value: '',
            type: 'input',
            isTranslatable: true,
            props: {
              label: `${this.$tr('isite.cms.form.title')}*`,
              rules: [
                val => !!val || this.$tr('isite.cms.message.fieldRequired')
              ],
            },
          },
          slug: {
            value: '',
            type: 'input',
            isTranslatable: true,
            props: {
              label: `${this.$tr('isite.cms.form.slug')}*`,
              rules: [
                val => !!val || this.$tr('isite.cms.message.fieldRequired')
              ],
            }
          },
          description: {
            name: "description",
            value: '',
            type: 'html',
            isTranslatable: true,
            props: {
              label: `${this.$tr('isite.cms.form.description')}*`,
              rules: [
                val => !!val || this.$tr('isite.cms.message.fieldRequired')
              ],
            }
          },
          summary: {
            value: '',
            type: 'input',
            isTranslatable: true,
            props: {
              label: `${this.$tr('isite.cms.form.summary')}*`,
              type: 'textarea',
              rows: "3",
              rules: [
                val => !!val || this.$tr('isite.cms.message.fieldRequired')
              ],
            },
          },
          advancedSummary: {
            value: '',
            type: 'html',
            isTranslatable: true,
            help: { description: this.$tr('icommerce.cms.form.advancedSummaryHelp') },
            props: {
              label: `${this.$tr('icommerce.cms.advancedSummary')}`
            }
          },
        },
        formRight: {
          status: {
            value: "1",
            type: 'select',
            isTranslatable: true,
            props: {
              label: `${this.$tr('isite.cms.form.status')}`,
              clearable: false,
              options: [
                { label: this.$tr('isite.cms.label.enabled'), value: "1" },
                { label: this.$tr('isite.cms.label.disabled'), value: "0" }
              ]
            }
          },

          parentId: {
            value: 0,
            type: 'treeSelect',
            props: {
              label: this.$tr('isite.cms.form.parent'),
              options: [
                { label: this.$tr('isite.cms.label.disabled'), value: 0 },
              ],
            },
            loadOptions: {
              apiRoute: 'apiRoutes.qproduct.categories',
              select: { label: 'title', id: 'id' },
              requestParams: { include: 'parent', filter: { status: 1 } }
            }
          },
          categoryId: {
            type: 'crud',
            permission: 'iappointment.appointments.edit-all',
            props: {
              crudType: 'select',
              crudData: import('modules/qappointment/_crud/categories'),
              crudProps: {
                label: `${this.$tr('isite.cms.form.category')}*`,
                rules: [
                //  val => !!val || this.$tr('isite.cms.message.fieldRequired')
                ],
              },
              config: {
                options: {
                  label: 'title', value: 'id'
                }
              }
            },
          },

          externalId: {
            value: 0,
            type: 'treeSelect',
            props: {
              label: this.$tr('isite.cms.form.externalId'),
              options: [
                { label: this.$tr('isite.cms.label.disabled'), value: 0 },
              ],
            },
            loadOptions: {
              apiRoute: 'apiRoutes.qproduct.categories',
              select: { label: 'title', id: 'id' },
              requestParams: { include: 'parent', filter: { status: 1 } }
            }
          },

          sku: {
            value: '',
            type: 'input',
            isTranslatable: true,
            props: {
              label: `${this.$tr('isite.cms.form.slug')}*`,
              rules: [
               // val => !!val || this.$tr('isite.cms.message.fieldRequired')
              ],
            }
          },

          reference: {
            value: '',
            type: 'input',
            isTranslatable: true,
            props: {
              label: `${this.$tr('isite.cms.form.reference')}*`,
              rules: [
                //val => !!val || this.$tr('isite.cms.message.fieldRequired')
              ],
            }
          },

          featured: {
            value: '0',
            type: 'checkbox',
            props: {
              label: this.$tr('iblog.cms.form.featured'),
              trueValue: '1',
              falseValue: '0',
            }
          },

          isInternal: {
              value: null,
              type: 'select',
              props: {
                label: this.$tr('isite.cms.form.type'),
                clearable: true,
                options: [
                  {label: this.$tr('isite.cms.label.internal'), value: 1},
                  {label: this.$tr('isite.cms.label.external'), value: 0},
                ],
              }
            },


        },
      }
    },
    //Crud info
    crudInfo() {
      return this.$store.state.qcrudComponent.component[this.crudId] || {}
    }
  },
}
</script>
