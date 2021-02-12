let defaults = {
  crud: {
    profile: {
      name: 'اﻷسم العلني',
      primaryAddress: 'العنوان الاساسي',
      primaryTelephone: 'الهاتف الاساسي',
      secondaryTelephone: 'الهاتف الثانوي'
    },
    roles: 'النطاق (وكيل: BR , EM فرع )'
  }
}

export default {
  welcome: 'مرحبا',
  ROLE_ADMIN: 'الشركة',
  apiFilter: {
    "no filter selected": 'لم يتم تحديد إي عامل تصفية',
    accounts: {
      id: 'رقم الحساب',
      name: 'أسم الصندوق المخصص',
      type: 'النوع ( حوالات= 20 , عمولات= 2 )',
      user: {
        Profile: {
          name: 'أسم الحساب'
        },
        roles: 'النطاق ( BR فرع )'
      },
      watcherUser: {
        Profile: {
          name: 'أسم الحساب'
        },
        roles: 'نطاق مراقب الصندوق (وكيل: BR , EM فرع )'
      },
    },
    o_levelings: {
      id: 'رقم القيد ( أرقام فقط )',
      name: 'أسم الصندوق المخصص',
      global_statement: 'البيان',
      creditorStatement: 'بيان الدائن',
      creditorCommission: 'عمولة الدائن',
      debtorStatement: 'بيان المدين',
      debtorCommission: 'عمولة المدين',
      adjustments: {
        firstAmount: 'مبلغ المدين',
        secondAmount: 'مبلغ الدائن'
      },
    },
    countries: {
      id: 'المفتاح',
      name: 'اﻷسم',
    },
    cities: {
      id: 'المفتاح',
      name: 'أسم المدينة',
      Country: {
        name: 'أسم الدولة',
      }
    },
    limit_country_currencies: {
      id: 'المفتاح',
      Country: {
        name: 'أسم البلد'
      },
      Currency: {
        name: 'أسم العملة'
      },
      minSendingTransfer: 'أقل قيمة لأرسال الحوالة',
      maxSendingTransfer: 'أقصى قيمة ﻷرسال الحوالة',
      minReceivingTransfer: 'أقل قيمة لإستلام الحوالة',
      maxReceivingTransfer: 'أقصى قيمة لإستلام الحوالة'
    },
    users: {
      id: 'المفتاح',
      username: 'أسم المستخدم ( تسجيل الدخول )',
      Position: {
        name: 'أسم المنصب'
      },
      Profile: defaults.crud.profile,
      myBranch: {
        Profile: defaults.crud.profile
      },
      roles: defaults.crud.roles
    }
  }
}
