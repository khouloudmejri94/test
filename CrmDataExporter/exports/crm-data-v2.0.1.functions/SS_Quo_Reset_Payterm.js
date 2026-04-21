function SS_Quo_Reset_Payterm(pQuoNRID)
{
	//SS_Quo_Reset_Payterm - Quo : Sht Reset payment term
	// HAS DEB 08/03/2023 : réinitiliser le flux de validation de modalité de paiement
	try {
	    var MyQryObj = CreateSelligentObject("SqlHelper", CurrentSessionID);
	    var objQuotation = CreateSelligentObject("Quotation", CurrentSessionID, true);
	    var mySelectionRow : SelectionRow = new SelectionRow();
	    objQuotation.Open(pQuoNRID);
	    mySelectionRow.Fields["QuoExtValAchDerogMdp"] = "";
	    mySelectionRow.Fields["QuoExtDateValAchDerogMdp"] = "";
	    mySelectionRow.Fields["QuoExtUserValAchDerogMdp"] = "";
	    mySelectionRow.Fields["QuoExtValDirDerogMdp"] = "";
	    mySelectionRow.Fields["QuoExtUserValDirDerogMdp"] = "";
	    mySelectionRow.Fields["QuoExtDateValDirDerogMdp"] = "";
	    mySelectionRow.Fields["QuoExtValMngzDerogMdp"] = "";
	    mySelectionRow.Fields["QuoExtUserValMngzDerogMdp"] = "";
	    mySelectionRow.Fields["QuoExtDateValMngzDerogMdp"] = "";
	    mySelectionRow.Fields["QuoExtValTlDerogMdp"] = "";
	    mySelectionRow.Fields["QuoExtUserValTlDerogMdp"] = "";
	    mySelectionRow.Fields["QuoExtDateValTlDerogMdp"] = "";
	    mySelectionRow.Fields["QuoExtPtValidatedDt"] = "";
	    mySelectionRow.Fields["QuoExtPtValidFlag"] = "";
	    mySelectionRow.Fields["QuoExtPtValidatedby"] = "";
	    
	    // Delete line from  sysadm.x_valid_healthcheck 
	
	    var vSQL = "delete from sysadm.x_valid_healthcheck   where template is null and dc0_nrid =  '" + pQuoNRID + "'";
	    var MyResults = MyQryObj.ExecuteSql(vSQL);
	
	
	    objQuotation.SetValues(mySelectionRow);
	    objQuotation.Save();
	    
	    if (MyQryObj) {
	        MyQryObj.Dispose();
	        FreeSelligentObject(MyQryObj);
	    }
	    
	} catch (e) {
	    throw "SS Quo Reset PayTerm call issue " + e;
	}
	// HAS END 08/03/2023 : réinitiliser le flux de validation de modalité de paiement
}