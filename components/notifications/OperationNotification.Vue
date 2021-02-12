<template>
  <div
    class="d-inline-block operation-notification"
  >
    <slot v-bind:fetch="fetch">
      <!--  Example to replace the btn-->
      <!--  <template v-slot:default="slotProps">   <v-btn @click="slotProps.fetch()">test</v-btn>  </template>-->
      <v-btn
        :style="{ backgroundColor: 'var(--v-operationState' + state + '-base)' }"
        :class="btnClass + ' elevation-1 operation-notification-btn'"
        :title="btnTitle"
        @click="fetch()"
      >
        <div v-if="btnText" class="font-ltr elevation-0">
          {{ btnText }}
          <v-icon :right="!!btnText" v-text="btnIcon"></v-icon>
        </div>
      </v-btn>
    </slot>

    <v-dialog
      v-model="dialog"
      max-width="380px"
      :fullscreen="$vuetify.breakpoint.xs"
    >
      <v-card>
        <v-card-title class="bg-primary">
          <span class="subheading bold text-accent">
            {{ company.name }}
          </span>
          <v-spacer></v-spacer>
          <v-btn
            icon
            small
            @click="dialog = false"
            class="dialog-close-btn"
          >
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-card-title>

        <div
          v-if="loading"
          class="d-flex justify-center align-center"
          :style="{ height: '170px' }"
        >
          <loading />
          <p v-text="loadingText"></p>
        </div>
        <div v-else>
          <v-data-iterator
            v-if="list"
            :items="list"
            hide-default-footer
            :items-per-page="1000"
            class="unset-height odd-even"
          >
            <template v-slot:item="props">
              <v-list dense class="py-0">
                <v-list-item>
                  <v-list-item-content
                    v-if="props.item.name"
                    style="max-width: 120px; min-width: 54px"
                  >
                    {{ props.item.name ? props.item.name + ': ' : '' }}
                  </v-list-item-content>
                  <v-list-item-content
                    :class="props.item.class || ''"
                    v-html="props.item.value"
                  ></v-list-item-content>
                </v-list-item>
              </v-list>
            </template>
          </v-data-iterator>
        </div>

        <v-bottom-navigation
          v-if="operation && operation.id"
          class="button-group-border"
        >
          <slot name="actions" v-bind="operation"></slot>

          <template v-if="isTransfer">
            <operation-clone-options
              :transfer="operation"
              :transferNotification="operationNotification"
            >
            </operation-clone-options>
          </template>

          <operation-actions-menu
            v-if="controller"
            :operation="operation"
            button-text="إجراءات"
            @reloadComponent="reloadNotification()"
            :controller="controller"
          />

          <div class="h-inherit" v-if="isAdmin">
            <v-menu offset-y left>
              <template v-slot:activator="{ on }">
                <v-btn
                  v-on="on"
                >
                  <span>{{ 'إدارة' }}</span>
                  <v-icon>mdi-playlist-edit</v-icon>
                </v-btn>
              </template>
              <v-list class="odd-even">
                <operation-history
                  :operation="operation.code"
                />
                <v-list-item @click="deleteOperation(operation.code)">
                  <v-list-item-icon>
                    <v-icon>
                      mdi-delete
                    </v-icon>
                  </v-list-item-icon>
                  <v-list-item-title>
                    {{  'حذف العملية'  }}
                  </v-list-item-title>
                </v-list-item>
              </v-list>
            </v-menu>
          </div>

          <template v-if="isTransferOrCreditTransfer">
            <operation-receiving
              :operation="operation"
              @reloadComponent="reloadNotification()"
            ></operation-receiving>
          </template>

        </v-bottom-navigation>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
  import OperationHistory from "../operation/OperationHistory";
  import OperationActionsMenu from "./OperationActionsMenu";
  import OperationReceiving from "../operation/OperationReceiving";
  import OperationCloneOptions from "../operation/OperationCloneOptions";
  

  export default {
    components: {
      OperationHistory,
      OperationActionsMenu,
      OperationReceiving
    },
    props: {
      path: {
        type: String,
        required: true,
        default : 0
      },
      btnText: {
        type: String,
        default: null
      },
      btnIcon: {
        type: String,
        default: null
      },
      btnColor: {
        type: String,
        default: null
      },
      btnTitle: {
        type: String,
        default: 'عرض بيانات التسوية'
      },
      btnClass: {
        type: String,
        default: ''
      },
      loadingText: {
        type: String,
        default: ' جاري تحميل بيانات'
      },
      controller: {
        type: Object,
        required: true,
      },
      state: {
        type: String|Number,
        required: true,
        default: 10
      }
    },
    data() {
      return {
        dialog: true,
        loading: false,
        list: null,
        operation: null,
        operationNotification: []
      }
    },
    created() {

    },
    computed: {
      isAdmin () {
        return isAdmin()
      },
      company() {
        return {
          name: 'أسم الشركة'
        };
      },
      isTransfer() {
        if(!this.operation) {
          return false;
        }

        return this.$operation.type.TRANSFER === this.operation.type;
      },
      isTransferOrCreditTransfer() {
        if(!this.operation) {
          return false;
        }

        return [ this.$operation.type.TRANSFER, this.$operation.type.CREDIT_TRANSFER ].includes(this.operation.type);
      },
    },
    methods: {
      async fetch () {
        this.dialog = true;
        if (this.path) {

          this.loading = true
          await this.axios.$get(this.path).then(data => { // 'leveling/' + this.code + '/show'
            this.setList(data.result)
            this.operation = data.result
          })
          .finally(() => {
            this.loading = false
          });
        }
      },
      async deleteOperation (code) {
        if (code) {
          this.loading = true
          await this.api.countingBox.deleteOperation(code).then(data => { // 'leveling/' + this.code + '/show'
            this.setList(data.result)
            this.operation = data.result
          })
          .finally(() => {
            this.loading = false
          });
        }
      },
      setOperation(operation) {
        this.setList(operation)
        this.operation = operation;
        this.dialog = true
      },
      setList (result) {
        if (result === null) { return [] }

        const fontLtr = 'font-ltr direction-ltr'

        if(result.type === this.$operation.type.LEVELING)
        {
          this.list = [
            { name: 'رقم القيد', value: result.code, class: fontLtr},
            { name: 'مالك القيد', value: result.owner },
            { name: 'منشئ القيد', value: result.creator },
            { name: 'التاريخ', value: result.date, class: fontLtr},
            { name: 'الحالة', value: result.stateHtml},
          ];

          if(result.debtor) {
            this.list.push(...[
              { name: 'مدين / لنا', value: result.debtor.name },
              { name: 'نوع العمولة', value: result.debtor.commissionType },
              { name: 'العمولة', value: result.debtor.commission, class: fontLtr},
              { name: 'المبلغ', value: result.debtor.amount, class: fontLtr},
              { name: 'العملة', value: result.debtor.currency.name },
              { name: 'البيان', value: result.debtor.statement },
            ])
          }

          if(result.creditor) {
            this.list.push(...[
              { name: 'دائن / علينا', value: result.creditor.name },
              { name: 'نوع العمولة', value: result.creditor.commissionType },
              { name: 'العمولة', value: result.creditor.commission, class: fontLtr},
              { name: 'المبلغ', value: result.creditor.amount, class: fontLtr},
              { name: 'العملة', value: '<div style="color:' + result.creditor.currency.color +  '">' + result.creditor.currency.name + '</div>' },
              { name: 'البيان', value: result.creditor.statement },
            ])
          }

          this.list.push(
            { name: 'ملاحظات', value: result.notes },
          )
        }
        else if(result.type === this.$operation.type.CURRENCY_EXCHANGE)
        {
            this.list = [
              { name: 'رقم التحويل', value: result.code, class: fontLtr},
              { name: 'منشئ العملية', value: result.owner},
              { name: 'الحالة', value: result.stateHtml},
              { name: 'التاريخ', value: result.date, class: fontLtr},
              { name: 'تاريخ الحذف', value: result.deletedDate, class: fontLtr},
              { name: 'مدين', value: result.fromBox},
              { name: 'المبلغ', value: result.fromAmount},
              { name: 'سعر التصريف', value: result.exchangePrice, class: fontLtr},
              { name: 'دائن', value: result.toBox},
              { name: 'المبلغ', value: result.toAmount},
            ]
        }
        else if(result.type === this.$operation.type.CREDIT_TRANSFER)
        {
          this.list = [
            { name: 'رقم اﻷشعار', value: result.code, class: fontLtr},
            { name: 'الحالة', value: result.stateHtml},
            { name: 'تاريخ اﻷنشاء', value: result.createdDate, class: fontLtr},
            { name: 'تاريخ الحذف', value: result.deletedDate, class: fontLtr},
            { name: 'المرسل', value: result.debtor.name},
            { name: 'المستلم', value: result.creditor.name},
            { name: 'المبلغ', value: result.creditor.amount},
            { name: 'العملة', value: '<div style="color:' + result.creditor.currency.color +  '">' + result.creditor.currency.name + '</div>' },
            { name: 'البيان', value: result.note},
          ]
        }
        else if(result.type === this.$operation.type.TRANSFER)
        {
          let transfer = result
          const fontLtr = 'font-ltr direction-ltr'
          const notification = transfer.notification
          this.list = [
            { name: 'اﻹشعار', value: transfer.transferNumber, class: fontLtr },
            { name: 'تاريخ اﻷصدار', value: transfer.createdDate, class: fontLtr },
            {
              name: 'تاريخ التعديل',
              value: transfer.notification.lastEditedDate === transfer.createdDate
                ? null
                : transfer.notification.lastEditedDate,
              class: fontLtr,
            },
            { name: 'تاريخ اﻷستلام', value: transfer.receivingDate },
            { name: 'المرسل', value: notification.sender.name },
            { name: 'المستفيد', value: notification.receiver.name },
            {
              name: 'هاتف المستفيد',
              value: notification.receiver.telephone.replace('+', '00'),
              style: 'text-align: left',
              class: fontLtr,
              isPhoneNumber: true,
            },
            {
              name: 'حالة الحوالة', value: transfer.stateHtml,
            },
            {
              name: 'المبلغ الصافي',
              value:
                '<div>' +
                '<span class="font-ltr">' + transfer.receivingAmount.toBalance() + '</span>' +
                '<span class="pr-2 bold" style="color:' + transfer.receivingCurrency.color + '">' + transfer.receivingCurrency.name + '</span>' +
                '</div>',
            },
            // { name: 'المدينة', value: transfer.receiverEmployee.city.name + ', ' + transfer.receiverEmployee.city.country.name },
            // { name: 'الفرع المرسل', value: transfer.senderEmployee.name },
            { name: 'الفرع المستلم', value: transfer.receiverEmployee.name + ' - ' + transfer.receiverEmployee.city.name + ', ' + transfer.receiverEmployee.city.country.name },
            { name: 'الهاتف', value: transfer.receiverEmployee.profile.secondaryTelephone.replace('+', '00'), class: fontLtr, isPhoneNumber: true },
            { name: 'العنوان', value: transfer.receiverEmployee.profile.primaryAddress },
            { name: 'ملاحظات', value: notification.note },
          ]

          if (transfer.transferPassword !== undefined && (transfer.receiverEmployee.id !== 1 || this.admin)) {
            this.list.splice(1, 0, { name: 'الرقم السري', value: '<span class="' + fontLtr + '">' + transfer.transferPassword + '</span>' })
          }

          if (notification.receiver.hasOwnProperty('whatsAppNotification')) {
            this.list.splice(7, 0,
              { name: 'حالة التبليغ', value: notification.receiver.whatsAppNotification ? 'تم إرسال التبليغ بنجاح.' : 'لم ينجح في إرسال التبليغ' })
          }

          if (transfer.details.RI) {
            const clickHereToSeeTheIdImage = 'أضغط هنا لفتح صورة الهوية'
            const receivingInfo = transfer.details.RI
            this.list.push(
              { name: 'نوع البطاقة', value: receivingInfo.id.type },
              { name: 'صورة الهوية', value: this.$options.filters.arrayValid(receivingInfo.id.imgs) ? `<a target="_blank" href="${receivingInfo.id.imgs[0].url}">${clickHereToSeeTheIdImage}</a>` : '' },
              { name: 'رقم البطاقة', value: receivingInfo.id.number || 'لم تعباً من الفرع المستلم' },
              { name: 'تاريخ الميلاد', value: receivingInfo.birthday || 'لم تعباً من الفرع المستلم' },
              { name: 'أسم اﻷب', value: receivingInfo.fatherName || 'لم تعباً من الفرع المستلم' },
              { name: 'أسم اﻷم', value: receivingInfo.motherName || 'لم تعباً من الفرع المستلم' },
            )
          }
        }

        this.list = this.list.filter(i => i.value);
      },
      async reloadNotification () {
        await this.fetch()
        this.$emit('reloadNotification')
      },
    }
  }
</script>

<style lang="scss">
  .operation-notification {
    &-btn {
      font-size: 14px !important;
      align-items: flex-end !important;
      align-content: center;
      border-radius: 2px;
      padding: 10px 10px 0 10px !important;

      div {
        background-color: rgba(233, 237, 238, 0.80);
        padding: 5px 10px;
        height: 35px;
        border-top-right-radius: 6px;
        border-top-left-radius: 6px;
        position: relative;
        top: 0;
        overflow: hidden;

        &:after {
          content: '';
          width: 80px;
          height: 80px;
          position: absolute;
          background-color: rgba(233, 237, 238, 0.30);
          top: -10px;
          right: -50px;
          //border-left: 0.1px solid rgba(75, 76, 76, 0.1);
          transform: rotate(15deg);
        }
      }
      i:before {
        font-size: 17px;
      }
    }
  }
</style>
