function()
{
	// nouveau Contact
	/*
	 top.MyApp.OpenDlg("Alert", ["Attention", "Merci de ne pas oublier de creer le contact","YesNo"]);
	             if (top.MyApp.AppSetting.dlgReturn[0]){
	             top.MyApp.OpenData_View("Per",'',"Open",'','','');
	            return false;
	               }
	*/
	
	   
	           var supplier= top.MyApp.GetItemValue("CpyNRID",top.MyData_View);
	           var vSQL2 = "select pe0_nrid as Mcontact  from sysadm.sp0 where so0_nrid ='"+supplier+"' ";
	           var oRes2 = top.MyApp._gfctExtReq(vSQL2);
	           var oXmlDoc2 = InitXml(oRes2);   
	           var oRows2 = FindItem("Flds", oXmlDoc2, true); 
	           if(GetItemValue("Mcontact", oRows2[0])  != ""  && GetItemValue("Mcontact", oRows2[0])  != null )
	  
	            { 
	             var resultat =   GetItemValue("Mcontact", oRows2[0]);
	             top.MyApp.OpenDlg("Alert", ["Attention", "Merci de ne pas oublier de creer le contact","YesNo"]);
	             if (top.MyApp.AppSetting.dlgReturn[0]){
	             top.MyApp.OpenData_View("Per",'resultat',"Open",'','','');
	            return false;
	               }
	            }
	   delete oQryObj2;
		return ;
}