function PS_Osa_OnBeforeUpdate()
{
	try{
	     var vTypeSalon  = top.MyApp.GetItemValue("OSaExtType");
	     if(vTypeSalon == "Edition"){
	
	          var vDateSalon  = top.MyApp.GetItemValue("OsaExtDateDeb",top.MyData_View);
	          var vDateCreation = top.MyApp.GetItemValue("OsaExtDateCreat",top.MyData_View);
	          var d1Y = parseInt(vDateCreation.substring(0,4));
	          var d2Y = parseInt(vDateSalon.substring(0,4));
	          var d1M = parseInt(vDateCreation.substring(5,7));
	          var d2M = parseInt(vDateSalon.substring(5,7));
	          var diff = ((12*d2Y+d2M)-(12*d1Y+d1M));
	          if(diff <= 4){
	               top.MyApp.OpenDlg("Alert", ["Attention", "Attention, il y a moins de 4 mois entre votre Edition et la date du Salon."]);
	          }
	
	     }
	
	}catch(e){
	  alert(e.message);
	  return false;
	}
		try
	{
	     var vType = top.MyApp.GetItemValue("OSaExtType",top.MyData_View);
	     var vSalon = top.MyApp.GetItemValue("OSaExtSalon",top.MyData_View);
	     var vEdition = top.MyApp.GetItemValue("OSaExtCodeEdit",top.MyData_View);
	     var vSQL = "";
	     if(vType == "Salon"){
	          vSQL = "select count(*) from sysadm.cosa0 where xsalon='"+ vSalon +"' and xtype='"+ vType +"'";
	          var arrRes = top.MyApp._gfctExtReq(vSQL);
	          if(arrRes[0][0] != 0){
	               top.MyApp.OpenDlg("Alert", ["Attention", "Attention, ce Salon éxiste déja."]);
	               return false;
	          }
	     }/*else{
	          vSQL = "select count(*) from sysadm.cosa0 where xsalon='"+ vSalon +"' and xtype='"+ vType +"' and xcode_edit='"+ vEdition +"'";
	          var arrRes = top.MyApp._gfctExtReq(vSQL);
	          if(arrRes[0][0] != 0){
	               top.MyApp.OpenDlg("Alert", ["Attention", "Attention, cette Edition éxiste déja."]);
	               return false;
	          }
	     }*/
	}
	catch(e)
	{
	   alert("Catch : " + e.message);
	}
}