sap.ui.define(['sapOdata/controller/BaseController',
               'sap/ui/model/json/JSONModel',
            'sap/m/MessageBox',
        'sap/m/MessageToast' ],
 function(BaseController,JSONModel,MessageBox,MessageToast) {
    'use strict';
    return BaseController.extend('sapOdata.controller.Add',{
        onInit:function(){
            var oJsonModel = new JSONModel({
                Product_data:{
                    PRODUCT_ID:'HT-1001',
                    TYPE_CODE:'PR',
                    CATEGORY:'Notebooks',
                    NAME:'Notebook Basic 17',
                    DESCRIPTION:'Notebook Basic 17 with 2,80 GHz quad core, 17" LCD, 4 GB DDR3 RAM, 500 GB Hard Disc, Windows 8 Pro',
                    SUPPLIER_ID:'0100000047',
                    SUPPLIER_NAME:'Becker Berlin',
                    TAX_TARIF_CODE:'1',
                    MEASURE_UNIT:'EA',
                    WEIGHT_MEASURE:'',
                    WEIGHT_UNIT:'',
                    PRICE:'100',
                    CURRENCY_CODE:'USD',
                    PRODUCT_PIC_URL:''
                }
            });
            this.getView().setModel(oJsonModel,'hulk');
            // SET model as global variable
            this.oLocalModel = oJsonModel;
        },
        onSave:function(oEvent){
            // get payload 
            debugger;
           var payload = this.oLocalModel.getProperty('/Product_data');
           // validata payload data
           if (!payload.PRODUCT_ID) {
            MessageBox.error('Empty Product ID Not Allowed');
           }
           var ODataModel = this.getOwnerComponent().getModel();
           ODataModel.create('/ProductSet',payload,{
            success:function(){
                MessageToast.show('Congratulation!!')
            },
            error:function(){
                MessageBox.error('Issue while creating record');
            },
           
           })

        },
        onClear:function(){
            debugger;
            this.oLocalModel.setProperty('/Product_data',{
                PRODUCT_ID:'',
                TYPE_CODE:'',
                CATEGORY:'',
                NAME:'',
                DESCRIPTION:'',
                SUPPLIER_ID:'0100000047',
                SUPPLIER_NAME:'Becker Berlin',
                TAX_TARIF_CODE:'',
                MEASURE_UNIT:'',
                WEIGHT_MEASURE:'',
                WEIGHT_UNIT:'',
                PRICE:'',
                CURRENCY_CODE:'',
                PRODUCT_PIC_URL:''
            })
        }

    });
});