function()
{
	try{
	     var vTypeSalon  = top.MyApp.GetItemValue("OSaExtType");
	     if(vTypeSalon == "Edition"){
	         var vSalon = top.MyApp.GetItemValue("OSaExtSalon");
	         var vDateDeb = top.MyApp.GetItemValue("OSaExtDateDeb");
	         var vSQL = "select xtype, xsalon, xcode_edit, xdate_deb, xnb_cp_suiv, xnb_am_suiv, xnb_cm_suiv, xnb_ac_mkt_suiv, xnb_ac_ter_suiv, xnb_gi_suiv from sysadm.cosa0 where xtype = 'Edition' and xsalon = '"+vSalon+"' and xdate_deb = (select MAX(xdate_deb) from sysadm.cosa0 where xtype = 'Edition' and xsalon = '"+vSalon+"' and xdate_deb <= '"+vDateDeb+"') order by xdate_deb desc";
	         var arrRes = top.MyApp._gfctExtReq(vSQL);
	         if(arrRes.Count != 0)
	         {
	             top.MyApp.SetItemValue("OSaExtNbCp",arrRes[0][4]);
	             top.MyApp.SetItemValue("OSaExtNbAm",arrRes[0][5]);
	             top.MyApp.SetItemValue("OSaExtNbCm",arrRes[0][6]);
	
	             top.MyApp.SetItemValue("OSaExtNbAcMkt",arrRes[0][7]);
	             top.MyApp.SetItemValue("OSaExtNbAcTer",arrRes[0][8]);
	             top.MyApp.SetItemValue("OSaExtNbAcGi",arrRes[0][9]);
	         }
	     }
	}catch(e){
	     alert(e.message);
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
		try{
	     var vTypeSalon  = top.MyApp.GetItemValue("OSaExtType");
	     if(vTypeSalon == "Edition"){
	          var vDateSalon  = top.MyApp.GetItemValue("OsaExtDateDeb",top.MyData_View);
	          var vDateCreation = new Date();
	          var d1Y = parseInt(vDateCreation.getYear());
	          var d2Y = parseInt(vDateSalon.substring(0,4));
	          var d1M = parseInt(vDateCreation.getMonth());
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
}