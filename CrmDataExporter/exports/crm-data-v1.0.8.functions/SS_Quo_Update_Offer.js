function(pQuoNRID,pConsignee,pConsolidation,pvDeliveryT,pGrossW,pvDiscountF,pModeTransport)
{
	var vResult = "";
	try {
	  var MyObj = CreateSelligentObject("Quotation", CurrentSessionID, false);
	  MyObj.Open(pQuoNRID);
	  var mySelectionRow = new SelectionRow();
	  mySelectionRow.Fields["QuoExtConsignee"] = pConsignee;
	  mySelectionRow.Fields["QuoExtConsolidation"] = pConsolidation;
	  mySelectionRow.Fields["QuoExtGrossWeight"] = pGrossW;
	  mySelectionRow.Fields["QuoExtDeliveryTime"] = pvDeliveryT;
	  mySelectionRow.Fields["QuoExtDiscount"] = pvDiscountF;
	  mySelectionRow.Fields["QuoExtModeTransport"] = pModeTransport;
	  MyObj.SetAndSave(mySelectionRow);
	  vResult = "OK";
	} catch (e) {
	  vResult = "KO : "+e.message;
	} finally {
	  return vResult ;
	}
	
	
	/*try {
	    var MyObj = CreateSelligentObject("Quotation", CurrentSessionID, false);
	    MyObj.Open(pQuoNRID);
	    var mySelectionRow = new SelectionRow();
	    mySelectionRow.Fields["QuoExtConsignee"] = pConsignee;
	    mySelectionRow.Fields["QuoExtConsolidation"] = pConsolidation;
	    mySelectionRow.Fields["QuoExtGrossWeight"] = pGrossW;
	    mySelectionRow.Fields["QuoExtDeliveryTime"] = pvDeliveryT;
	    mySelectionRow.Fields["QuoExtDiscount"] = pvDiscountF;
	    mySelectionRow.Fields["QuoExtModeTransport"] = pModeTransport;
	    MyObj.SetAndSave(mySelectionRow);
	} catch (e) {
	    return e.message;
	}*/
}