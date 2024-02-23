sap.ui.define([
    'sapOdata/controller/BaseController',
    'sap/ui/model/Filter',
    'sap/ui/model/FilterOperator'
], function(BaseController,Filter,FilterOperator) {
    'use strict';
    return BaseController.extend('sapOdata.controller.View1',{
        onInit:function(){
            this.oRouter = this.getOwnerComponent().getRouter();
        },
        callView:function(sId){
          //  var oview2 = this.getView().getParent().getParent().getDetailPages()[1];
           // this.getView().getParent().getParent().toDetail(oview2);
         
        },
        onDelete:function(oEvent){
            var line = oEvent.getParameter("listItem");
          //  var oList = this.getView().byId('idList');
            var oList = oEvent.getSource();
            oList.removeItem(line);
        },
        onClick:function(oEvent){
            //debugger;
            var oList = this.getView().byId('idList');
            var selectedItems = oList.getSelectedItems();
            selectedItems.forEach(element => {
            oList.removeItem(element);
           });
         
        },
        onManage:function(oEvent){
         //   this.oRouter = this.getOwnerComponent().getRouter();
         debugger;
            this.oRouter.navTo("add",{},true);
        },
        onSelect:function(oEvent){
         //   debugger;
            var oSelected = oEvent.getParameter("listItem").getBindingContextPath();
          //  var oView2 = this.getView().getParent().getParent().getDetailPages()[1];
          //  oSelected = 'json>' + oSelected;
            var sId = oSelected.split("/")[oSelected.split("/").length - 1];
            this.oRouter.navTo("detail",{
                id: sId
            })
           // oView2.bindElement(oSelected);
         //   this.callView(sId);
         //   this.callView(sId);
           
        },
        onSearch:function(oEvent){
            var oVal = oEvent.getParameter("query");
            if (!oVal) {
                var oVal = oEvent.getParameter("newValue");
            }
          //  var oFilter1 = new Filter("PRODUCT_ID",FilterOperator.Contains,oVal);
            var oFilter2 = new Filter("CATEGORY",FilterOperator.Contains,oVal);
            var oBinding = this.getView().byId('idList').getBinding('items');
         //   var oFilter = new Filter([oFilter1,oFilter2],false);
            oBinding.filter(oFilter2);
        }
        // :function(){
        //     debugger;
        //     this.oRouter = this.getOwnerComponent().getRouter();
        //     this.oRouter.navTo("add");
        // }
       
    });
    
});