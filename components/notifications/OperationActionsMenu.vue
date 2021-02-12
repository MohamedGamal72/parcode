<template>
  <div v-if="operation && items.length" class="h-inherit">
    <v-menu offset-y left>
      <template v-slot:activator="{ on }">
        <v-btn class="primary--text" v-on="on">
          <span class="success--text">{{ buttonText }}</span>
          <v-icon class="success--text"> {{ buttonIcon }} </v-icon>
        </v-btn>
        
      </template>

      <v-list class="odd-even">
        <v-list-item v-if="loading">
          <v-list-item-title style="width: 150px">
            <v-progress-linear
              color="primary accent-4"
              indeterminate
              rounded
              height="4"
            ></v-progress-linear>
          </v-list-item-title>
        </v-list-item>
        <template
          v-else
        >
          <v-list-item
            v-for="(item, index) in items"
            :key="index"
            @click="push(item)"
          >
            <v-list-item-icon class="ml-4" v-if="item.icon">
              <v-icon small :color="item.color">{{ item.icon }}</v-icon>
            </v-list-item-icon>
            <v-list-item-title>
              {{ item.title }}
            </v-list-item-title>
          </v-list-item>
        </template>

      </v-list>
    </v-menu>

    <template v-if="dialogComponent">
   
      <component
        :is="dialogComponentName"
        v-model="dialogComponent"
        :transfer="operation"
      ></component>
    </template>

  </div>
</template>

<script>
  import OperationReceiving from "../operation/OperationReceiving";
  export default {
    components: {
      OperationReceiving,
    },
    props: {
      operation: {
        type: Object,
        require : true
      },
      buttonText: {
        type: String,
        default: 'إجراءات'
      },
      buttonIcon: {
        type: String,
        default: 'mdi-cog-refresh'
      },
      buttonCLass: {
        type: String,
        default: 'primary'
      },
      controller: {
        type: Object,
        required: true,
      }
    },
    data() {
      return {
        loading: false,
        dialogComponentName: null,
        dialogComponent: false
      }
    },
    created() {
      this.initialize();
    },
    computed: {
      ifProd() {
        return ifProd();
      },
      userId(){
        return 1;
      },
      isAdmin(){
        return isAdmin();
      },
      isAdminOrBranch() {
        return isAdmin() || isBranch()
      },
      isEnable() {
        return this.operation.state === this.$operation.state.ENABLE
      },
      isFinished() {
        return this.operation.state === this.$operation.state.FINISHED
      },
      isAnyFreezing() {
        return [this.$operation.state.FREEZING, this.$operation.state.ADMIN_FREEZING].includes(this.operation.state);
      },
      isTransfer() {
        return this.$operation.type.TRANSFER === this.operation.type;
      },
      isTransferOrCreditTransfer() {
        return [ this.$operation.type.TRANSFER, this.$operation.type.CREDIT_TRANSFER ].includes(this.operation.type);
      },
      items() {
        if(!this.operation || this.operation.state === undefined) {
          return [];
        }

        if(
          this.operation.state === this.$operation.state.FINISHED ||
          this.operation.state === this.$operation.state.DELETED
        ) {
          return []
        }

        // resources OperationState.php
        // muse be in computed, to waiting roles from computed
        let items = [
          // قمنا بفحص المرسل , او فرع المرسل, او المدير
          // {
          //   title: 'تسليم',
          //   // يمكن أن يرسل الفرع الحوالة , ويريد أن يستلمها من فرع وكيل تابع له
          //   active: this.isTransferOrCreditTransfer && this.isEnable /* && this.operation.receiverEmployee.id === this.userId*/,
          //   router: 'operation-receiving',
          //   icon: 'keyboard_arrow_down',
          //   color: 'primary'
          // },
          {
            title: 'تعديل',
            active: (isAdmin() || this.isSender) && this.isTransfer, //يمكن التعديل على الحوالات المجمدة
            path: 'edit',
            icon: 'mdi-square-edit-outline',
            color: 'primary'
          },
          {
            title: 'تجميد',
            active: (isAdmin() || this.isSender) && this.isEnable && this.isTransfer, // لايسمح للمرسل بفك تجميد الاعتماد
            router: this.controller.freezing,
            attributes: [this.operation.id, 'freezing'],
            icon: 'mdi-steering',
            color: 'info'
          },
          {
            title: 'فك تجميد',
            active:
              ( isAdmin() && this.isAnyFreezing && this.isTransferOrCreditTransfer) ||
              ( this.isSender && this.operation.state === this.$operation.state.FREEZING), // فقط لو كان تجميد الافرع
            router: this.controller.freezing,
            attributes: [this.operation.id, 'unFreezing'],
            icon: 'mdi-steering-off',
            color: 'info'
          },
          {
            title: 'تجميد ( كشركة )',
            active: this.isAdmin && !this.isAnyFreezing && this.isTransferOrCreditTransfer, // ليست مجمدة مسبقاً
            router: this.controller.freezing,
            attributes: [this.operation.id, 'companyFreezing'],
            icon: 'mdi-snowflake-alert',
            color: 'info'
          },
          {
            title: 'إلغاء',
            active: this.isTransfer && (isAdmin() || this.isSender),
            router: this.controller.cancelling,
            attributes: [this.operation.id],
            icon: 'mdi-cancel',
            color: 'danger'
          },
          {
            title: 'حذف العملية',
            active: isAdmin(),
            router: this.api.countingBox.deleteOperation,
            attributes: [this.operation.id],
            icon: 'mdi-delete',
            color: 'danger'
          },
        ];

        return items.filter(i => i.active);
      },
      isSender() {
        if(!this.operation.senderEmployee) {
          return false;
        }

        return !!(this.operation.senderEmployee.id === this.userId ||
          (this.operation.senderEmployee.myBranch && this.operation.senderEmployee.myBranch.id === this.userId));
      },
    },
    methods: {
      async initialize(){},
      async push(item) {

        if(typeof item.router === 'string') {
            this.dialogComponentName = item.router;
            this.dialogComponent = true;
            return;
        }
        if(confirm('هل أنت متئكد من هذا اﻷجراء')) {
          this.loading = true
          await item.router(...item.attributes).then(async (data) => {
            if(data.state) {
              await this.$emit('reloadComponent');
              await this.initialize();
            }
          }).finally(() => {
            this.loading = false;
          })
        }
      },
    },
  }
</script>
