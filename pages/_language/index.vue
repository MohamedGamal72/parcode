<template>
  <div>
    <v-container>
      <h1>Hi</h1>
      <operation-notification
        ref="operationShow"
        path=""
        :controller="{}"
        :state="$operation.state.ENABLE"
        :btnText="'T123121111'"
      ></operation-notification>
      <Datatable></Datatable>
    </v-container>

  </div>

</template>

<script>
  import OperationNotification from "../../components/notifications/OperationNotification.Vue";
  import Datatable from "../../components/MtDataTable.vue";

  export default {
    components: {
      OperationNotification,Datatable
    },
    name: 'Home',
    data () {
      return {

      }
    },
    computed: {

    },
    created () {
      let data = {
        "result": {
          "id": 101198,
          "type": 20,
          "senderEmployee": {
            "id": 3,
            "username": "ابوكنان2",
            "name": "ابوكنان x",
            "nameWithCity": "برلين - ابوكنان x",
            "city": {
              "id": 4,
              "name": "برلين",
              "country": {
                "id": 2,
                "name": "المانيا "
              }
            },
            "account_status": true,
            "isWorking": false,
            "workData": {
              "myWorkStatus": false,
              "MyDateOfBackToWork": null,
              "noteToCustomers": "",
              "noteToColleagues": "",
              "workPlanTime": "أختبار مواعيد الدوام"
            },
            "role": "ROLE_EMPLOYEE",
            "profile": {
              "id": 2,
              "accountId": 100000002,
              "name": "ابوكنان x",
              "city": {
                "id": 4,
                "name": "برلين",
                "country": {
                  "id": 2,
                  "name": "المانيا "
                }
              },
              "primaryTelephone": "+4917621413020",
              "secondaryTelephone": "",
              "primaryAddress": "ابوكنان",
              "secondaryAddress": ""
            },
            "authorizedDevices": [

            ],
            "currency_exchange": {

            },
            "isCompany": false,
            "isBranch": false,
            "isEmployee": true,
            "position": {
              "id": 3,
              "name": "منصب عام"
            },
            "myBranch": {
              "id": 2,
              "name": "ابوكنان x"
            }
          },
          "receiverEmployee": {
            "id": 210,
            "username": "مرسين جانودي2",
            "name": " جانودي",
            "nameWithCity": "اسطنبول -  جانودي",
            "city": {
              "id": 10,
              "name": "اسطنبول",
              "country": {
                "id": 4,
                "name": "تركيا"
              }
            },
            "account_status": true,
            "isWorking": false,
            "workData": {
              "myWorkStatus": false,
              "MyDateOfBackToWork": null,
              "noteToCustomers": "",
              "noteToColleagues": "",
              "workPlanTime": ""
            },
            "role": "ROLE_EMPLOYEE",
            "profile": {
              "id": 119,
              "accountId": 100000119,
              "name": " جانودي",
              "city": {
                "id": 10,
                "name": "اسطنبول",
                "country": {
                  "id": 4,
                  "name": "تركيا"
                }
              },
              "primaryTelephone": "+905317377710",
              "secondaryTelephone": "00905317377710",
              "primaryAddress": "شركة جانودي   مقابل الكركون قرب ال 101A",
              "secondaryAddress": ""
            },
            "authorizedDevices": [

            ],
            "currency_exchange": {

            },
            "isCompany": false,
            "isBranch": false,
            "isEmployee": true,
            "position": {
              "id": 95,
              "name": "منصب عام"
            },
            "myBranch": {
              "id": 209,
              "name": " جانودي"
            }
          },
          "sendingAmount": 100,
          "sendingCurrency": {
            "id": 1,
            "name": "الدولار الامريكي",
            "symbol": "دولا2ر",
            "color": "#007BFF",
            "iso": "USD",
            "isBase": true,
            "html": {
              "component": "v-chip",
              "props": {
                "color": "#007BFF",
                "text-color": "white",
                "small": true,
                "v-html": "دولا2ر"
              }
            }
          },
          "receivingAmount": 100,
          "receivingCurrency": {
            "id": 1,
            "name": "الدولار الامريكي",
            "symbol": "دولا2ر",
            "color": "#007BFF",
            "iso": "USD",
            "isBase": true,
            "html": {
              "component": "v-chip",
              "props": {
                "color": "#007BFF",
                "text-color": "white",
                "small": true,
                "v-html": "دولا2ر"
              }
            }
          },
          "isAdvanced": false,
          "transferNumber": "T101198",
          "code": "T101198",
          "state": 10,
          "stateHtml": "<div class=\"font-rtl text-secondary-1\">فعال</div>",
          "createdDate": "31-12-2020 - 00:20",
          "التاريخ": "31-12-2020",
          "receivingDate": null,
          "details": [

          ],
          "notification": {
            "sender": {
              "name": "حوالة للأختبار",
              "telephone": "+4917621413020"
            },
            "receiver": {
              "name": "حوالة للأختبار",
              "telephone": "+4917621413020",
              "whatsAppNotification": false
            },
            "note": "",
            "lastEditedDate": "31-12-2020 - 00:20"
          },
          "transferPassword": 6220,
          "commissionsList": [
            {
              "TC": 1,
              "ESC": 0,
              "SC": 2,
              "CCR": 0.5,
              "RC": 0.5,
              "ERC": 0
            }
          ]
        },
        "state": true,
        "alert": [],
        "redirect": null
      };

      this.$nextTick(() => {
        this.$refs.operationShow.setOperation(data.result)
      })
    },
  }
</script>
