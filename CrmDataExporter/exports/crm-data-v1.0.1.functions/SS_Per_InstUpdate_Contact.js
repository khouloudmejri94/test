function SS_Per_InstUpdate_Contact()
{
	//var vFrsPortfolio = top.MyApp.GetItemAttributeFromXML(top.MyApp.AppSetting["Cpy"].Record_XML,"CpyExtEtatPepite","Val");
	
	var intNridCpy = CurrentRecord['PerCpyCpyNRID'];
	var oQryObj2 = CreateSelligentObject("SqlHelper", CurrentSessionID);
	 
	var vSQL2 = "select cd as code from so0 where nrid  = '"+ intNridCpy +"' ";
	var oRes2 = oQryObj2.ExecuteSql(vSQL2); 
	var oXmlDoc2 = InitXml(oRes2);   
	var oRows2 = FindItem("Flds", oXmlDoc2, true); 
	var CpyCode =  GetItemValue("code", oRows2[0]); 
	delete oQryObj2;
	
	if(CpyCode.substring(0,4) != 'COMP'){
	    var myCompany = CreateSelligentObject("Company", CurrentSessionID, true);
	    var myselectionrow: SelectionRow = new SelectionRow();
	    myCompany.Open(intNridCpy);
	    
	    myselectionrow.Fields["CpyExtAppelContact"] = '1';
	    myselectionrow.Fields["CpyExtAppelContact"] = '0';
	    myCompany.SetAndSave(myselectionrow);
	    
	}
}