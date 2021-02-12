<template>
  <div v-if="operation && isCompany">
    <v-dialog
      v-model="dialogEditionList"
      width="1000"
      :fullscreen="$vuetify.breakpoint.smAndDown"
    >
      <template v-slot:activator="{ on }">
        <v-list-item
          v-on="on"
          @click="getItems()"
        >
          <v-list-item-icon>
            <v-icon>
              mdi-clipboard-list-outline
            </v-icon>
          </v-list-item-icon>
          <v-list-item-title>
            {{ 'سجل العمليات' }}
          </v-list-item-title>
        </v-list-item>
      </template>

      <v-card>
        <v-card-title
          class="headline secondary white--text lighten-2"
          primary-title
        >
          {{ 'سجل العمليات' }}
        </v-card-title>

        <v-card-text class="pa-0">
          <v-data-table
            :headers="headers"
            :items="items"
            :items-per-page="100"
            hide-default-footer
            class="elevation-1 odd-even"
            group-by="تاريخ العملية"
            show-expand
          >
            <template v-slot:item.id="{ item }">
              <span :class="item.class">{{ item.id }}</span>
            </template>
            <template v-slot:item.fromAmount="{ item }">
              <balance :balance="item.fromAmount" />
            </template>
            <template v-slot:item.toAmount="{ item }">
              <balance :balance="item.toAmount" />
            </template>

            <template v-slot:expanded-item="{ headers, item }">
              <td :colspan="headers.length">
                <p class="pt-3" v-if="item.countingBoxes.length === 0">
                  {{ 'لايوجد سجلات إضافية مرتبطة.' }}
                </p>
                <p class="pt-3" v-else>
                  {{ 'جميع السجلات الأضافية المرتبطة:' }}
                  <v-data-table
                    class="mt-3"
                    :headers="countingBoxHeaders"
                    :items="item.countingBoxes"
                    hide-default-footer
                  ></v-data-table>
                </p>
              </td>
            </template>
          </v-data-table>
        </v-card-text>

        <v-divider />

        <v-card-actions>
          <v-spacer />
          <v-btn
            color="secondary"
            text
            @click="dialogEditionList = false"
          >
            إغلاق
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
  export default {
    components: {},
    props: {
      operation: {
        type: String,
        required: true,
      },
    },
    data () {
      return {
        dialogEditionList: false,
        items: [],
        headers: [
          { text: '#', value: 'id' },
          { text: 'ح /مدين', value: 'fromBox' },
          { text: 'مدين', value: 'fromAmount' },
          { text: 'العملة', value: 'fromCurrency' },
          { text: 'ح /دائن', value: 'toBox' },
          { text: 'دائن', value: 'toAmount' },
          { text: 'العملة', value: 'toCurrency' },
          { text: 'التاريخ', value: 'تاريخ العملية' },
          { text: 'تاريخ الحذف', value: 'deletedDate' },
        ],
        countingBoxHeaders: [
          { text: '#', value: 'id' },
          { text: 'الصندوق', value: 'box.name' },
          { text: 'العملة', value: 'box.currency.name' },
          { text: 'المبلغ', value: 'amount' },
          { text: 'الرصيد', value: 'balance' },
        ],
      }
    },
    computed: {
      isCompany () {
        return isAdmin()
      },
    },
    created () {},
    methods: {
      async getItems () {
        await this.api.countingBox.operationHistory(this.operation).then(data => {
          this.items = data.result
        })
      },
    },
  }
</script>
