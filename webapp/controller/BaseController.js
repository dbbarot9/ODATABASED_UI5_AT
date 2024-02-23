sap.ui.define(['sap/ui/core/mvc/Controller','sapOdata/util/formatter'
], function(Controller,myFormatter) {
    'use strict';
    return Controller.extend('sapOdata.controller.BaseController',{
        formatter:myFormatter
    });
    
});