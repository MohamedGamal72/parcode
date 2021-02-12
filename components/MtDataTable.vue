<template>
  <div id="app" style="direction: ltr">
    Count Frozn Rows:<v-textField v-model="countRows"/>
    <ejs-grid ref='grid' id='Grid'  :showColumnMenu='true' :filterSettings='filterSettings' :columnMenuOpen='columnMenuOpen' :allowResizing='true' :frozenRows="countRows" :allowReordering='true' :dataSource="data" :allowPaging="true" :toolbar='toolbarOptions' height='272px' :allowPdfExport='true' :allowExcelExport='true' :toolbarClick='toolbarClick' :allowSorting='true'  :allowFiltering='true' :allowGrouping='true' :pageSettings='pageSettings'>
      <e-columns>
        <e-column field='OrderID' headerText='Order ID' textAlign='Right' width=90 ></e-column>
        <e-column field='CustomerID' headerText='Customer ID' width=120></e-column>
        <e-column field='Freight' headerText='Freight' textAlign='Right' width=90></e-column>
      </e-columns>
      <e-aggregates>
        <e-aggregate>
          <e-columns>
            <e-column type="Sum" field="Freight" format="C2" :footerTemplate='footerSum'></e-column>
          </e-columns>
        </e-aggregate>
      </e-aggregates>
    </ejs-grid>
  </div>
</template>
<script>
  import Vue from "vue";
  import { GridPlugin, Page, Sort,ColumnMenu, Filter, Group, Aggregate,Toolbar, PdfExport,ExcelExport,Search,Reorder,Resize } from "@syncfusion/ej2-vue-grids";
 // import { L10n, setCulture } from '@syncfusion/ej2-base';
  Vue.use(GridPlugin);
 // setCulture('de-DE');
  export default {
    runtimeCompiler: true,
    data() {
      return {
        data: [
          { OrderID: 10248, CustomerID: 'VINET', Freight: 32.38 },
          { OrderID: 10249, CustomerID: 'TOMSP', Freight: 11.61 },
          { OrderID: 10250, CustomerID: 'HANAR', Freight: 65.83 },
          { OrderID: 10251, CustomerID: 'VICTE', Freight: 41.34 },
          { OrderID: 10252, CustomerID: 'SUPRD', Freight: 51.3 },
          { OrderID: 10253, CustomerID: 'HANAR', Freight: 58.17 },
          { OrderID: 10254, CustomerID: 'CHOPS', Freight: 22.98 },
          { OrderID: 10255, CustomerID: 'RICSU', Freight: 148.33 },
          { OrderID: 10256, CustomerID: 'WELLI', Freight: 13.97 }
        ],
        countRows:0,
        filterSettings: {type: 'Menu'},
        toolbarOptions: ['PdfExport','ExcelExport','Print', 'Search'],
        pageSettings: { pageSizes: true, pageSize: 5 },
        footerSum: function () {
          return  { template : Vue.component('sumTemplate', {
            template: `<span>Sum: {{data.Sum}}</span>`,

            data () {return { data: {}};}
          })
          }
        }
      };
    },
    provide: {
      grid: [Page, Sort, Filter, Group, Aggregate,Toolbar,ColumnMenu, PdfExport,ExcelExport,Search,Reorder,Resize]
    },
    methods: {
      columnMenuOpen: function (args) {
        for (let item of args.items) {
          if (item.text === 'Filter' && args.column.field === 'OrderID') {
            item.hide = true;
          } else {
            item.hide = false;
          }
        }
      },
      toolbarClick(args) {
        if (args.item.id === 'Grid_pdfexport') { // 'Grid_pdfexport' -> Grid component id + _ + toolbar item name
          this.$refs.grid.pdfExport();
        }
        if (args.item.id === 'Grid_excelexport') { // 'Grid_excelexport' -> Grid component id + _ + toolbar item name
          this.$refs.grid.excelExport();
        }
      }
    },
  }

</script>
<style>
  @import "../node_modules/@syncfusion/ej2-vue-grids/styles/material.css";
</style>


{% endraw %}
