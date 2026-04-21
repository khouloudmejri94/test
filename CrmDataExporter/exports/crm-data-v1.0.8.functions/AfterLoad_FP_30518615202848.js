function()
{
	/*
	 ** MLE
	 ** MASAO
	 ** 22/11/2013
	 ** After Load FP : SUIVI objet Métier Litige
	 */
	var objStatut;
	var vDateCurrent;
	objStatut = top.MyApp.FindItem("ReqExtStatutSuivi", top.MyDataView);
	vDateCurrent = top.MyApp.fctFormatDate(new Date(), top.MyApp.SYSTEM_DATE , top.MyApp.SYSTEM_DATE);
	if (objStatut)
	{
	    objStatut.onchange = function () {
	        if(objStatut.value == "Validée")
	        {
	            top.CurrentSetting.Catalog.ReqExtDateValidDecla.Ed = 1;
	            top.MyApp.SetItemValue("ReqExtDateValidDecla",vDateCurrent);
	            top.CurrentSetting.Catalog.ReqExtDateValidDecla.Ed = 0;
	        }
	    };
	}
	 
		if(top.CurrentSetting.nChapMode!="Reset")
	{
	    if(top.MyApp.UserSetting.User.ProfileInitials!="LTG" && top.MyApp.UserSetting.User.ProfileInitials!="ADMF" && top.MyApp.UserSetting.User.ProfileInitials!="ADMT")
	    {
	        var arrChampDC = [ "ReqExtCentrale", "ReqExtAnnulation", "ReqExtAutreCourrier", "ReqExtCloture", "ReqExtDateAnnul", "ReqExtDateAutreCou", "ReqExtDateClotSuivi", "ReqExtDateDestruc", "ReqExtDatemad", "ReqExtDateMiseDem", "ReqExtDatePremDem", "ReqExtDateRel", "ReqExtDateTraite", "ReqExtDateValidDecla", "ReqExtDestruction", "ReqExtDossGereJuri", "ReqExtMad", "ReqExtMiseDemeure", "ReqExtMiseDemeure", "ReqExtMotifAnnu", "ReqExtMotifClot", "ReqExtPremiereDem", "ReqExtPremieredem", "ReqExtRelance", "ReqExtRelance", "ReqExtStatutSuivi", "ReqExtTraitement"];
	        for(var i=0 ; i<arrChampDC.length; i++)
	        {
	            //top.MyApp.CurrentSetting.Catalog[arrChampDC[i]].Ed=-1
	            var objchamp = top.MyApp.FindItem(arrChampDC[i],top.MyData_View);
	            if(objchamp ) objchamp.disabled= true
	            top.MyApp.SetItemAttribute(arrChampDC[i] ,"className","disable" ,top.MyData_View);
	            var objchamp2 = top.MyApp.FindItem(arrChampDC[i]+"Btn",top.MyData_View);
	            if(objchamp2 )  objchamp2.disabled=true;
	        }
	        top.MyApp.FindItem("Sht30887915493844").disabled = true;
	        top.MyApp.FindItem("Sht30160917483058").disabled = true;
	    }
	}
	
	
	var ObjStatus = top.MyApp.FindItem("ReqStatus");
	
	if (ObjStatus && ObjStatus.value == "Clos" && top.MyApp.UserSetting.User.ProfileInitials !="ADMT" && top.MyApp.UserSetting.User.ProfileInitials !="ADMF" )
	{
	    var btnCreation = top.MyApp.FindItem("Sht30887915493844");
	    btnCreation.disabled = true;
	    var btnEnvoi = top.MyApp.FindItem("Sht30160917483058");
	    btnEnvoi.disabled = true;
	}
		if(top.CurrentSetting.nChapMode!="Reset")
	{
	
	var vDate = top.MyApp.fctFormatDate(new Date(), top.MyApp.SYSTEM_DATE,  top.MyApp.SYSTEM_DATE );  
	var objReqExtPremieredem = top.MyApp.FindItem("ReqExtPremieredem", top.MyDataView);
	if(objReqExtPremieredem)
	{
	 objReqExtPremieredem.onchange= function()
	 {
	  if(top.MyApp.GetItemValue("ReqExtPremieredem") == "Envoyé")
	  {
	   top.MyApp.SetItemValue("ReqExtDatePremDem", vDate);      
	  }
	  else
	  {
	   top.MyApp.SetItemValue("ReqExtDatePremDem", ""); 
	  }  
	 };
	}
	
	
	
	//Relance
	var objReqExtRelance = top.MyApp.FindItem("ReqExtRelance", top.MyDataView);
	if(objReqExtRelance)
	{
	 objReqExtRelance.onchange= function()
	 {
	  if(top.MyApp.GetItemValue("ReqExtRelance") == "Envoyé")
	  {
	   top.MyApp.SetItemValue("ReqExtDateRel", vDate);      
	  }
	  else
	  {
	   top.MyApp.SetItemValue("ReqExtDateRel", ""); 
	  }  
	 };
	}
	
	
	
	//Mise en demeure
	var objReqExtMiseDemeure = top.MyApp.FindItem("ReqExtMiseDemeure", top.MyDataView);
	if(objReqExtMiseDemeure)
	{
	 objReqExtMiseDemeure.onchange= function()
	 {
	  if(top.MyApp.GetItemValue("ReqExtMiseDemeure") == "Envoyé")
	  {
	   top.MyApp.SetItemValue("ReqExtDateMiseDem", vDate);      
	  }
	  else
	  {
	   top.MyApp.SetItemValue("ReqExtDateMiseDem", ""); 
	  }  
	 };
	}
	
	
	
	//Autre Courrier
	var objReqExtAutreCourrier = top.MyApp.FindItem("ReqExtAutreCourrier", top.MyDataView);
	if(objReqExtAutreCourrier)
	{
	 objReqExtAutreCourrier.onchange= function()
	 {
	  if(top.MyApp.GetItemValue("ReqExtAutreCourrier") == "Envoyé")
	  {
	   top.MyApp.SetItemValue("ReqExtDateAutreCou", vDate);      
	  }
	  else
	  {
	   top.MyApp.SetItemValue("ReqExtDateAutreCou", ""); 
	  }  
	 };
	}
	
	//MAD : Mise à disposition
	var objReqExtMad = top.MyApp.FindItem("ReqExtMad", top.MyDataView);
	if(objReqExtMad)
	{
	 objReqExtMad.onchange= function()
	 {
	  if(top.MyApp.GetItemValue("ReqExtMad") == "Fait")
	  {
	      top.MyApp.SetItemValue("ReqExtDatemad", vDate);      
	  }
	  else
	  {
	      top.MyApp.SetItemValue("ReqExtDatemad", ""); 
	  }  
	 };
	}
	
	
	
	//Destruction
	var objReqExtDestruction = top.MyApp.FindItem("ReqExtDestruction", top.MyDataView);
	if(objReqExtDestruction)
	{
	 objReqExtDestruction.onchange= function()
	 {
	  if(top.MyApp.GetItemValue("ReqExtDestruction") == "Fait")
	  {
	      top.MyApp.SetItemValue("ReqExtDateDestruc", vDate);      
	  }
	  else
	  {
	      top.MyApp.SetItemValue("ReqExtDateDestruc", ""); 
	  }  
	 };
	}
	
	
	
	
	
	//Traitement
	var objReqExtTraitement = top.MyApp.FindItem("ReqExtTraitement", top.MyDataView);
	if(objReqExtTraitement)
	{
	 objReqExtTraitement.onchange= function()
	 {
	  if(top.MyApp.GetItemValue("ReqExtTraitement") == "Fait")
	  {
	      top.MyApp.SetItemValue("ReqExtDateTraite", vDate);      
	  }
	  else
	  {
	      top.MyApp.SetItemValue("ReqExtDateTraite", ""); 
	  }  
	 };
	}
	
	
	
	//Annulée
	var objReqExtAnnulation = top.MyApp.FindItem("ReqExtAnnulation", top.MyDataView);
	if(objReqExtAnnulation)
	{
	 objReqExtAnnulation.onchange= function()
	 {
	  if(top.MyApp.GetItemValue("ReqExtAnnulation") == "Fait")
	  {
	      top.MyApp.SetItemValue("ReqExtDateAnnul", vDate);      
	  }
	  else
	  {
	      top.MyApp.SetItemValue("ReqExtDateAnnul", ""); 
	  }  
	 };
	}
	//Clotures
	var objReqExtCloture = top.MyApp.FindItem("ReqExtCloture", top.MyDataView);
	if(objReqExtCloture)
	{
	 objReqExtCloture.onchange= function()
	 {
	  if(top.MyApp.GetItemValue("ReqExtCloture") == "Fait")
	  {
	 top.MyApp.SetItemValue("ReqExtDateClotSuivi", vDate);      
	  }
	  else
	  {
	 top.MyApp.SetItemValue("ReqExtDateClotSuivi", ""); 
	  }  
	 };
	}
	
	} 
		//JSO 05.06.2015
	/*
	try{
	  if(top.MyApp.CurrentSetting.nChapMode == "Open"){
	    top.MyApp._gfctPutButtonGauche('ReqExtCommentaireSuivi', "top.MyApp._gfctAfficheInfos('"+top.MyApp.GetItemValue("ReqNRID")+"','cal0','xcommentaire_suivi')", '', false, '?');
	  }
	 }catch(e){
	   alert(e.message);
	}
	*/
		var vButton1 = top.MyApp.FindItem("Sht33588781501846");
	var vButton2 = top.MyApp.FindItem("Sht33820581371848");
	var vButton3 = top.MyApp.FindItem("Sht33628186404552");
	
	var vInput1 = top.MyApp.FindItem("ReqExtDateRelanceCP");
	var vInput2 = top.MyApp.FindItem("ReqExtDateRelanceCM");
	var vInput3 = top.MyApp.FindItem("ReqExtDateRelanceDirMKT");
	
	var vInputBtn1 = top.MyApp.FindItem("ReqExtDateRelanceCPBtn");
	var vInputBtn2 = top.MyApp.FindItem("ReqExtDateRelanceCMBtn");
	var vInputBtn3 = top.MyApp.FindItem("ReqExtDateRelanceDirMKTBtn");
	
	if(top.CurrentSetting.nChapMode=="Reset"){
	     vButton1.disabled = true; 
	     vButton2.disabled = true;
	     vButton3.disabled = true;
	}else{
	     if(top.MyApp.GetItemValue("ReqExtDateRelanceCP") == ""){
	          vButton1.disabled = false;
	     }else{
	          vButton1.disabled = true;
	          //vInput1.disabled = true;
	          vInputBtn1.disabled = true;
	     }
	     if(top.MyApp.GetItemValue("ReqExtDateRelanceCM") == ""){
	          vButton2.disabled = false;
	     }else{
	          vButton2.disabled = true;
	          //vInput2.disabled = true;
	          vInputBtn2.disabled = true;
	     }
	     if(top.MyApp.GetItemValue("ReqExtDateRelanceDirMKT") == ""){
	          vButton3.disabled = false;
	     }else{
	          vButton3.disabled = true;
	          vInput3.disabled = true;
	          vInputBtn3.disabled = true;
	     }
	}
}