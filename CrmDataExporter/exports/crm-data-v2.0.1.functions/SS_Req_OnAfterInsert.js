function SS_Req_OnAfterInsert()
{
	var vRef = CurrentRecord["ReqExtRefInterne"] ;
	var vSID = Session["MySID"] ;
	SS_Opp_SP_AddFolderRoles("Litiges/"+vRef ,vSID ); 
		//#936
	try
	{
	     var oQryObj = CreateSelligentObject("SqlHelper", CurrentSessionID);
	     var vSQL = "SELECT xclass_fourn,xflag_classique,xfourn_strat FROM sysadm.so0 where nrid ="+CurrentRecord["ReqCpyNRID"];
	     var oRes = oQryObj.ExecuteSql(vSQL);
	     var oXmlDoc = InitXml(oRes);  
	     var oRows = FindItem("Flds", oXmlDoc, true);
	     var vClass = GetItemValue("CpyExtClassFourn", oRows[0]); 
	     var vFlag  = GetItemValue("CpyExtFlagClassique", oRows[0]); 
	     var vStrat = GetItemValue("CpyExtFournStrat", oRows[0]); 
	     var vSQL = "SELECT COUNT(*) as ct FROM sysadm.cal0 WHERE so0_nrid ="+CurrentRecord["ReqCpyNRID"]+" and nrid !="+CurrentRecord["ReqNRID"];
	     var oRes = oQryObj.ExecuteSql(vSQL);
	     var oXmlDoc = InitXml(oRes);  
	     var oRows = FindItem("Flds", oXmlDoc, true);
	     var vLitCount = GetItemValue("ct", oRows[0]); 
	
	     if((vClass == "Classique") && (vFlag =="1") && ((vStrat !="1"))  ){
	          var myCompany=CreateSelligentObject("Company",CurrentSessionID,true); 
	          myCompany.Open(CurrentRecord["ReqCpyNRID"]); 
	          var mySelectionRow = new SelectionRow(); 
	          mySelectionRow.Fields["CpyExtClassFourn"]="Risqué";  
	  
	          myCompany.SetAndSave(mySelectionRow); 
	          delete  myCompany;       
	    }else if(vLitCount =="0"){
	     
	           var myCompany=CreateSelligentObject("Company",CurrentSessionID,true); 
	          myCompany.Open(CurrentRecord["ReqCpyNRID"]); 
	          var mySelectionRow = new SelectionRow(); 
	          mySelectionRow.Fields["CpyExtClassFourn"]="Classique";  
	  
	          myCompany.SetAndSave(mySelectionRow); 
	          delete  myCompany; 
	    
	    }
	
	}
	catch(e)
	{
	  //delete  myCompany;
	  throw " Erreur SS_Req_OnAfterInsert" + e.message;
	}
}