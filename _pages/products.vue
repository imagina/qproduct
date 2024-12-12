<template>
  <div>
    <!-- tasks -->
    <div class="q-px-md">
      <dynamicList ref="dynamicList" :listConfig="listConfig" @new="() => $refs.crudComponent.create()">
      </dynamicList>
    </div>

    <!-- crud form -->
    <crud ref="crudComponent" :type="null" :crud-data="import('modules/qproduct/_crud/products')"
      @created="refreshDynamicList()" @updated="refreshDynamicList()" @deleted="refreshDynamicList()" />
    
    <!-- modal for prices -->
    <master-modal
      v-model="selectedRow.pricesModal"
      :title="$tr('iproduct.cms.prices')"
      width="460px"
      @hide="selectedRow.pricesModal = false"      
    >
      <prices    
        :prices="selectedRow.row.prices"
      />
    </master-modal>

    <inner-loading :visible="loading" />
  </div>
</template>
<script>
//Components
import dynamicList from 'modules/qsite/_components/master/dynamicList';
import prices from 'modules/qproduct/_components/prices.vue';
import moment from 'moment';
const dateFormat = 'YYYY/MM/DD';

export default {
  props: {},
  components: {
    dynamicList, 
    prices
  },
  watch: {},
  mounted() {
    this.$nextTick(function () {
      //this.init()
    });
  },
  data() {
    return {
      selectedRow: {
        pricesModal: false,        
        row: null
      },
      loading: false,
      listConfig: {
        apiRoute: 'apiRoutes.qproduct.products',
        pageActions: {
          extraActions: ['search', 'new', 'export']
        },
        read: {
          title: this.$tr('iproduct.cms.products'),
          tableProps: {
          },
          columns: [
            {
              name: 'id', label: this.$tr('isite.cms.form.id'), field: 'id', style: '',
              onClick: (val, row) => this.openShowModal(row)
            },
            {
              name: 'title', label: 'Producto', field: 'title',
              align: 'right', style: 'max-width: 250px',
              onClick: (val, row) => this.onUpdate(row)
            },                        
            /* price */
            {
              name: 'price', label: this.$tr('isite.cms.form.price'), field: 'price', align: 'center',              
              format: (val) => `$${val}`
            },
            /* status */
            {
              name: 'status', label: this.$tr('isite.cms.form.status'), field: 'status', align: 'center', style: 'width: 250px',
              format: (val, row) => row?.status == 1 ? this.$tr('isite.cms.label.enabled') : this.$tr('isite.cms.label.disabled'),
              dynamicField: {
                value: null,
                type: 'select',
                props: {
                  label: `${this.$tr('isite.cms.form.status')}`,
                  clearable: false,
                  options: [
                    { label: this.$tr('isite.cms.label.enabled'), value: "1" },
                    { label: this.$tr('isite.cms.label.disabled'), value: "0" }
                  ]
                }                
              }
            },
            /* observations */
            { name: 'observations', label: this.$tr('isite.cms.form.observations'), field: 'observations', align: 'center', style: 'width: 200px' },
            {
              name: 'actions', label: this.$tr('isite.cms.form.actions'),
              align: 'center'
            }
          ],
          requestParams: {
            include: 'prices'
          },
          filters: {
            provider: {
              value: [],
              type: 'select',
              quickFilter: true,
              props: {
                label: this.$tr('iproduct.cms.form.supplier'),
                clearable: true,
                useInput: true,                
              },
              loadOptions: {
                apiRoute: 'apiRoutes.quser.users',
                filterByQuery: true,
                select: {
                  label: 'email',
                  id: item => `${item.id}`
                }
              }
            },
            
            date: {
              value: {
                //type: 'customRange',
                //from: moment().startOf('week').format(dateFormat),
                //to: moment().endOf('week').format(dateFormat)
              },
              quickFilter: true,
              type: 'dateRange',
              props: {
                label: this.$tr('isite.cms.form.date'),
                clearable: true,
                removeTime: true,
                autoClose: true
              }
            },
            
          },

          help: {
            title: this.$tr('iproduct.cms.productManagement'),
            description: this.$tr('iproduct.cms.productManagement')
          }

        },
        actions: [
          {//show action
            icon: 'fa-light fa-eye',
            name: 'edit',
            label: this.$tr('isite.cms.label.show'),
            action: (item) => {
              this.onUpdate(item);
            }
          },
          {//Edit action
            icon: 'fa-light fa-pencil',
            name: 'edit',
            label: this.$tr('isite.cms.label.edit'),
            action: (item) => {
              this.onUpdate(item);
            }
          },
          {//Delete action
            icon: 'fa-light fa-trash-can',
            name: 'delete',
            label: this.$tr('isite.cms.label.delete'),
            action: (item) => {
              this.onDelete(item);
            }
          }
        ]
      }
    };
  },
  computed: {},
  methods: {
    init() {
    },
    refreshDynamicList() {
      this.selectedRow.showModal = false;
      this.selectedRow.row = null;
      this.$refs.dynamicList.getData({ page: 1 }, true);
    },

    async reloadRow(row) {
      const newRow = await this.$refs.dynamicList.reloadRow(row);
      this.selectedRow.row = newRow;
    },
    openShowModal(row) {
      this.selectedRow.row = row;
      this.selectedRow.showModal = true;
    },
    onUpdate(row) {
      console.log(row.title)
      this.$refs.crudComponent.update(row);
    },
    onDelete(row) {
      this.$refs.crudComponent.delete(row);
    }
  }
};
</script>
<style lang="scss">
.padding-none {
  padding: 0px !important;
}
</style>
