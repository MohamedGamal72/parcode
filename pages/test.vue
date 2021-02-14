<template>
  <parCode
    qrText="thank you"
    qrSize="80"
    qrColor="#000"
    qrBgColor="#fff"
    isPupup="true"
    dialogText="The dialog text"
    dialogTitle="dialig Title"
    dialogWidth="400"
    classOnBtn="danger"
    classOnDialogDiv="any-thing"
  >
    <template v-slot:text-before-QrCode>text-before-QrCode</template>
    <template v-slot:Qrcode></template>
    <template v-slot:text-after-QrCode>text-after-QrCode</template>
  </parCode>
</template>
<script>
import parCode from "@/components/parCode/qrtest";
export default {
  name: "test",
  components: {
    parCode,
  },
};
</script>
