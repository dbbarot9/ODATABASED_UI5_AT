sap.ui.define([
    'sapOdata/controller/BaseController',
    'sap/ui/core/routing/History',
    'sap/ui/core/Fragment',
    'sap/ui/model/Filter',
    'sap/ui/model/FilterOperator'
], function(BaseController,History,Fragment,Filter,FilterOperator) {
    'use strict';
    return BaseController.extend('sapOdata.controller.View2',{
        onInit:function(){
         //   debugger;
            this.oRouter = this.getOwnerComponent().getRouter();
            this.oRouter.getRoute("detail").attachMatched(this.getData,this);
        },
      //  ninja:'ninja turtle',
        getData:function(oRoute){
           debugger;
         //  alert(this.ninja);
            var sId = oRoute.getParameter('arguments').id;
            this.getView().bindElement("/" + sId,
            {
                expand:"To_supplier"
            });

        },
        popupVar: null,
        fieldVal:null,
        F4Help:function(oEvent){
            var that = this;
            debugger;
            this.fieldVal = oEvent.getSource();
            if (this.popupVar === null) {
                Fragment.load({
                    name:'sapOdata.fragments.popup',
                    type:'XML',
                    id:'popupData',
                    controller:this
                }).then(function(oFragment){
                    that.popupVar = oFragment;
                    that.popupVar.open();
                    that.getView().addDependent(that.popupVar);
                    that.popupVar.bindAggregation('items',{
                        path:'json>/cities',
                        template:new sap.m.StandardListItem({
                            title:'{json>name}',
                        description:'{json>state}'
                        })  
                    })
                });
            }
            else{
                that.popupVar.open();
                that.getView().addDependent(that.popupVar);
                that.popupVar.bindAggregation('items',{
                    path:'json>/cities',
                    template:new sap.m.StandardListItem({
                        title:'{json>name}',
                        description:'{json>state}'})
                    })
            }
            
        },
        onF4SearchPopup:function(oEvent){
            var data = oEvent.getParameter('value');
            var oFilter = new Filter('name',FilterOperator.Contains,data);
            var oBinding = oEvent.getSource().getBinding("items");
            oBinding.filter(oFilter);
        },
        onConfirm:function(oEvent){
            debugger;
            var selected = oEvent.getParameter("selectedItem");
            var title = selected.getTitle();
            this.fieldVal.setValue(title);

        },
        callView:function(){
           // this.oRouter = this.getOwnerComponent().getRouter();
            const oHistory = History.getInstance();
			const sPreviousHash = oHistory.getPreviousHash();

			if (sPreviousHash !== undefined) {
				window.history.go(-1);
			} else {
				const oRouter = this.getOwnerComponent().getRouter();
				oRouter.navTo("home", {}, true);
          //  this.getView().getParent().getParent().toMaster()[0];
          //  this.getView().getParent().getParent().toDetail()[0];
        }
    }
    });
    
});