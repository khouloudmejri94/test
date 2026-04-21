function()
{
	
	function()
	{
	  if(top.MyApp.GetItemValue("ReqExtTabecart") !="")
	  {
	   top.MyApp.SetItemAttribute("ReqExtPaiement", "className", "Mandatory");      
	   top.MyApp.CurrentSetting.Catalog["ReqExtPaiement"].Mn=1;
	  }
	  else
	  {
	   top.MyApp.SetItemAttribute("ReqExtPaiement", "className", "");      
	   top.MyApp.CurrentSetting.Catalog["ReqExtPaiement"].Mn=-1;
	  }  
	}
	
	if(top.CurrentSetting.nChapMode!="Reset")
	{
	
	 if(top.MyApp.UserSetting.User.ProfileInitials!="LTG" && top.MyApp.UserSetting.User.ProfileInitials!="ADMF" && top.MyApp.UserSetting.User.ProfileInitials!="ADMT")
	 {
	  var arrChampDC = ["ReqExtCentrale","ReqExtCommentaire","ReqExtDateAnalyse","ReqExtDateDA","ReqExtDateDerModif","ReqExtDateEcheance","ReqExtDateEvt","ReqExtDateFARDispo","ReqExtDateSaisie","ReqExtEcartFAR","ReqExtHistorique","ReqExtPaiement","ReqExtPourecart","ReqExtPTF","ReqExtTabecart","ReqExtDateDerModifLog","ReqExtDateEvtLog","ReqExtMtFraisAnnHT","ReqExtDateRecepmarch"]
	  for(var i=0 ; i<arrChampDC.length; i++)
	  { 
	     var objchamp = top.MyApp.FindItem(arrChampDC[i],top.MyData_View);
	     if(objchamp ) objchamp.readOnly= true
	     top.MyApp.SetItemAttribute(arrChampDC[i] ,"className","disable" ,top.MyData_View);
	
	     var objchamp2 = top.MyApp.FindItem(arrChampDC[i]+"Btn",top.MyData_View);
	     if(objchamp2 )  objchamp2.disabled=true;
	  }
	
	  if(top.MyApp.FindItem("ReqExtTabecartBtn"))  top.MyApp.FindItem("ReqExtTabecartBtn").disabled=true;
	 } 
	
	
	 var objTableauEcarts = top.MyApp.FindItem("ReqExtTabecart", top.MyDataView);
	 if(objTableauEcarts)
	 {
	      objTableauEcarts.onchange= function() { fctChangeTableauEcarts(); }
	 }  
	
	 fctChangeTableauEcarts();
	
	
	}
		var objMnt;
	
	try
	{
	
	objMnt = top.MyApp.FindItem("ReqExtMtFraisAnnHT", top.MyDataView);
	
	
	if(objMnt)
	{
	    objMnt.onclick = function() 
	       {
	                  top.MyApp.OpenDlg("Alert",["Attention " , "Attention modification de l'écart FAR/Facture en montant et en % nécessaire "]) ;
	       }
	}
	
	}catch(e){
	alert(e.message)
	}
}