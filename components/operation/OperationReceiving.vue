<template>
  <div class="h-inherit" v-if="operation && operation.state === $operation.state.ENABLE">
    <v-dialog
      v-model="dialog"
      max-width="450px"
      :fullscreen="$vuetify.breakpoint.xs"
    >
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          :class="buttonCLass"
          dark
          v-bind="attrs"
          v-on="on"
          @click="initialize"
        >
          <span >{{ buttonText }}</span>
          <v-icon > {{ buttonIcon }} </v-icon>
        </v-btn>
      </template>

      <v-form
        v-if="operation"
        lazy-validation
        ref="transferReceivingForm"
        @submit="receiveTransfer(transferReceiving)" onSubmit="return false"
      >
        <v-card v-if="transferReceiving.RI">
          <v-card-title class="headline white--text bg-primary">
            <div>
              <span>{{ 'تسليم الحوالة رقم:' }}</span>
              <span class="font-ltr pr-1 bold">{{ operation.code }}</span>
            </div>
          </v-card-title>

          <v-card-text class="pt-5">
            <div class="pb-4 text-center" v-if="operation.creditor">
              <h2 class="d-inline-block font-ltr pr-1 bold">{{ operation.creditor.amount }}</h2>
              <h2 class="d-inline-block pr-1 " :style="{color: operation.creditor.currency.color}">{{ operation.creditor.currency.name }}</h2>
            </div>

            <component
              :is="myEmployees.length > 15 ? 'v-autocomplete' : 'v-select'"
              v-if="myEmployees"
              v-model="transferReceiving.receivingEmployeeId"
              :items="myEmployees"
              item-text="name"
              item-value="id"
              label="دفع إلى حساب"
              outlined
            />

            <template v-if="operation.type === $operation.type.TRANSFER">
              <v-text-field
                v-model="transferReceiving.password"
                label="كلمة السر"
                required
                :rules="nameRules"
                outlined
              />

              <v-select
                v-model="transferReceiving.RI.id.type"
                :items="idTypes"
                item-text="name"
                item-value="name"
                label="نوع البطاقة"
                outlined
              />

              <v-file-input
                show-size
                counter
                outlined
                accept="image/png, image/jpeg, image/jpg, image/bmp"
                label="الصورة اﻷمامية للهوية"
                placeholder="رفع الصورة الأمامية للهوية أو جواز السفر"
                prepend-inner-icon="mdi-camera"
                prepend-icon=""
                v-on:change="uploadReceiverIdImage"
                ref="receiverImageFile"
                capture="camera"
              />
              <v-img class="mt-1 mb-5 overflow-hidden" style="max-height: 250px;"
                     v-if="$options.filters.arrayValid(transferReceiving.RI.id.imgs)"
                     :src="(ifProd ? '' : 'http://localhost:8000') + transferReceiving.RI.id.imgs[0].url"
              />

              <template v-else>
                <v-text-field
                  v-model="transferReceiving.RI.id.number"
                  :counter="20"
                  label="رقم البطاقة"
                  required
                  :rules="nameRules"
                  outlined
                />

                <v-text-field
                  v-model="transferReceiving.RI.fatherName"
                  class="font-ltr-input"
                  label="أسم اﻷب"
                  required
                  :rules="nameRules"
                  outlined
                />

                <v-text-field
                  v-model="transferReceiving.RI.motherName"
                  class="font-ltr-input"
                  label="أسم اﻷم"
                  required
                  :rules="nameRules"
                  outlined
                />

                <v-text-field
                  v-model="transferReceiving.RI.birthday"
                  class="font-ltr-input"
                  label="تاريخ الولادة"
                  required
                  :rules="nameRules"
                  outlined
                />
              </template>
            </template>
          </v-card-text>

          <v-divider></v-divider>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
              color="secondary"
              text
              @click="dialog = false"
            >
              إغلاق
            </v-btn>

            <v-btn
              color="primary"
              text
              type="submit"
              :loading="loading"
            >
              {{ 'إستلام' }}
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-form>
    </v-dialog>
  </div>
</template>


<script>
export default {
  components: {},
  props: {
    operation: {
      type: Object,
      require : true
    },
    buttonText: {
      type: String,
      default: 'تسليم'
    },
    buttonIcon: {
      type: String,
      default: 'keyboard_arrow_down'
    },
    buttonCLass: {
      type: String,
      default: 'text-secondary'
    }
  },
  data() {
    return {
      loading: false,
      dialog: false,
      receiverPassImageRules: [
        value => !value || value.size < 8000000 || 'أقصى حد لتحميل الصورة هو 8 MB!',
      ],
      transferReceiving: {
        id: null,
        password: '',
        RI: {
          fatherName: null,
          motherName: null,
          birthday: null,
          id: {
            type: 'هوية',
            number: '',
            imgs: []
          }
        },
      },
      idTypes: [
        { name: 'هوية'},
        { name: 'جواز سفر'},
        { name: 'دفتر عائلة'},
      ],
      nameRules: [
        v => !!v || 'حقل إلازمي',
      ],
      myEmployees: null
    }
  },
  created() {
    // this.initialize();
  },
  watch: {
    dialog(newVal) {
        this.$emit('input', this.dialog)
    }
  },
  computed: {
    ifProd() {
      return ifProd();
    },
    userId(){
      return 1
    },
    isAdmin(){
      return isAdmin();
    },
    isAdminOrBranch() {
      return isAdmin() || isBranch()
    },
    isSender() {
      return !!(this.operation.senderEmployee.id === this.userId ||
        (this.operation.senderEmployee.myBranch && this.operation.senderEmployee.myBranch.id === this.userId));
    },
  },
  methods: {
    async initialize(){
      this.transferReceiving.id = this.operation.id;

      // if (!ifProd()) {
      //   this.transferReceiving.password = 1;
      //   this.transferReceiving.RI.id.number = 1;
      //   this.transferReceiving.RI.birthday = 1;
      //   this.transferReceiving.RI.fatherName = 1;
      //   this.transferReceiving.RI.motherName = 1;
      // }

      if(this.isAdminOrBranch) {
        let api = this.api.user.index();

        if(isAdmin()) {
          api = this.api.user.indexFilterByRole('ROLE_EMPLOYEE', 999);
        }
        await api.then(data => {
          if(data && data.result && data.result.items && data.result.items.length > 0) { // سيتم أخفائها في حال كان الفرع ليس لديه اي وكلاء
            this.myEmployees = data.result.items;
            try {
              this.transferReceiving.receivingEmployeeId =
                this.myEmployees.filter(u => u.id === this.operation.creditor.id)[0].id;
            }catch {
            }
          }
        });
      } else {
        // to Employees
        this.transferReceiving.receivingEmployeeId = this.userId;
      }
    },
    async receiveTransfer(transfer) {
      if(transfer) {
        if(this.$refs.transferReceivingForm.validate())
        {
          this.loading = true

          let receivingFunc = this.api.transfer.receiving
          if(this.operation.type === this.$operation.type.CREDIT_TRANSFER) {
            receivingFunc = this.api.creditTransfer.receiving
          }

          receivingFunc(this.transferReceiving.id, this.transferReceiving)
            .then(async data => {
              if (data.state) {
                await this.$emit('reloadComponent');
                await this.initialize();
                this.dialog = false;
              }
            }).finally(() => {
            this.loading = false;
          })
        }
      }
    },
    async uploadReceiverIdImage(e) {
      if(e) {
        let data = new FormData();
        data.append('file', e);
        await this.api.operation.uploadReceiverImage(this.transferReceiving.id, data)
          .then(data => {
            if(data.state) {
              this.transferReceiving.RI.id.imgs.push({
                url: data.result.url
              })
            }
          })
      }else {
        this.transferReceiving.RI.id.imgs = [];
      }
    },
  },
}
</script>
