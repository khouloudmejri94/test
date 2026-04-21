function()
{
	
	
	var strQuery : String = "";
	strQuery += " select top 1 so0.societe, xsalon_exposants.so0_nrid, cosa0.date_deb, so0.titulaire, so0.xcp, cosa0.ref ";
	strQuery += " from sysadm.so0, sysadm.xsalon_exposants, sysadm.cosa0";
	//strQuery += " where so0.nrid = xsalon_exposants.so0_nrid and cosa0.nrid = xsalon_exposants.cosa0_nrid and cosa0.date_deb is not null";
	strQuery += " where so0.nrid = xsalon_exposants.so0_nrid and cosa0.nrid = xsalon_exposants.cosa0_nrid ";
	
	
	var objSqlHelper = CreateSelligentObject("SqlHelper", CurrentSessionID);
	var strResult : String = objSqlHelper.ExecuteSql(strQuery);
	
	return strResult ;
	var xmlResult = InitXml(strResult); 
	var fldsNodes = FindItems("Flds", xmlResult);
	var MyObject = CreateSelligentObject("RelationShip",CurrentSessionID);
	for (var i=0; i< fldsNodes.Count; i++) 
	{
	  var objAcn = CreateSelligentObject("Action", CurrentSessionID, true);
	  var mySelectionRow : SelectionRow = new SelectionRow();
	  objAcn.New();          
	  mySelectionRow.Fields["AcnCpyNRID"] = GetItemValue("ExtSlnExpsntsCpyNRID", xmlResult);
	  mySelectionRow.Fields["AcnCpyName"] = GetItemValue("CpyName", xmlResult);
	  
	  mySelectionRow.Fields["AcnNature"] = "TEL";
	  mySelectionRow.Fields["AcnStatus"] = "A FAIRE";
	  mySelectionRow.Fields["AcnType"] = "Fiche salon";
	  mySelectionRow.Fields["AcnObject"] = "A";
	  mySelectionRow.Fields["AcnExtCommentaire"] = "Prueba";
	  
	  
	  //mySelectionRow.Fields["AcnStartDate"] = GetItemValue("OSaDateDeb", xmlResult);
	  mySelectionRow.Fields["AcnStartDate"] = "01/01/2015";
	  
	  mySelectionRow.Fields["AcnExtAcheteur"] = GetItemValue("CpyOwner", xmlResult);
	  mySelectionRow.Fields["AcnExtCP"] = GetItemValue("CpyExtCp", xmlResult);
	  mySelectionRow.Fields["AcnExtListeSalon"] = GetItemValue("OSaReference", xmlResult);
	 
	 
	  objAcn.SetAndSave(mySelectionRow);
	  delete objAcn;
	}
	 delete MyObject;
	 delete objSqlHelper;
		return true;
}