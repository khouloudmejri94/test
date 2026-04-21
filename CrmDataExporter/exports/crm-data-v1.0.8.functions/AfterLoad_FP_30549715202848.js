function()
{
	/*
	 ** MLE
	 ** MASAO
	 ** 22/11/2013
	 ** After Load FP : Cloture objet Métier Litige
	 */
	
	var objCacDestruc;
	var objCacRetourFourn;
	var objCacTraite;
	var vDateCurrent;
	
	if(top.CurrentSetting.nChapMode!="Reset")
	{
	    if(top.MyApp.UserSetting.User.ProfileInitials=="LTG" || top.MyApp.UserSetting.User.ProfileInitials == "ADMF" || top.MyApp.UserSetting.User.ProfileInitials == "ADMFT" || top.MyApp.UserSetting.User.ProfileInitials == "ADMT")
	    {
	
	
	objCacDestruc = top.MyApp.FindItem("ReqExtDesctrucCac", top.MyDataView);
	objCacRetourFourn = top.MyApp.FindItem("ReqExtRetourFourn");
	objCacTraite = top.MyApp.FindItem("ReqExtTraiteCac");
	vDateCurrent = top.MyApp.fctFormatDate(new Date(), top.MyApp.SYSTEM_DATE , top.MyApp.SYSTEM_DATE);
	if(objCacDestruc)
	{
	    objCacDestruc.onclick = function()
	     {
	               if(objCacDestruc.checked == true)
	        {
	        top.CurrentSetting.Catalog.ReqExtDateDestructClot.Ed = 1;
	        top.MyApp.SetItemValue("ReqExtDateDestructClot", vDateCurrent);
	        top.CurrentSetting.Catalog.ReqExtDateDestructClot.Ed = 0;
	        }
	               else if(objCacDestruc.checked == false)
	        {
	        top.CurrentSetting.Catalog.ReqExtDateDestructClot.Ed = 1;
	        top.MyApp.SetItemValue("ReqExtDateDestructClot", "");
	        top.CurrentSetting.Catalog.ReqExtDateDestructClot.Ed = 0;
	        }
	       };
	}
	if(objCacRetourFourn)
	{
	    objCacRetourFourn.onclick = function() 
	     {
	               if(objCacRetourFourn.checked == true)
	        {
	        top.CurrentSetting.Catalog.ReqExtDateRetFourn.Ed = 1;
	        top.MyApp.SetItemValue("ReqExtDateRetFourn", vDateCurrent);
	        top.CurrentSetting.Catalog.ReqExtDateRetFourn.Ed = 0;
	        }
	               else if(objCacRetourFourn.checked == false)
	        {
	        top.CurrentSetting.Catalog.ReqExtDateRetFourn.Ed = 1;
	        top.MyApp.SetItemValue("ReqExtDateRetFourn", "");
	        top.CurrentSetting.Catalog.ReqExtDateRetFourn.Ed = 0;
	        }
	    };
	}
	
	if(objCacTraite)
	{
	    objCacTraite.onclick = function() 
	     {
	              if(objCacTraite.checked == true)
	        {
	        top.CurrentSetting.Catalog.ReqExtDateTraitClot.Ed = 1;
	        top.MyApp.SetItemValue("ReqExtDateTraitClot", vDateCurrent);
	        top.CurrentSetting.Catalog.ReqExtDateTraitClot.Ed = 0;
	        }
	              else if(objCacTraite.checked == false)
	        {
	        top.CurrentSetting.Catalog.ReqExtDateTraitClot.Ed = 1;
	        top.MyApp.SetItemValue("ReqExtDateTraitClot", "");
	        top.CurrentSetting.Catalog.ReqExtDateTraitClot.Ed = 0;
	        }     
	    };
	}
	
	}
	}
		var objAvoir;
	var objAnnulation;
	var objCloture;
	var vReqNrid;
	var objXml;
	var vMontant;
	var vRes;
	var vDate;
	
	
	objAvoir = top.MyApp.FindItem("ReqExtAvoirRecu", top.MyDataView);
	objAnnulation = top.MyApp.FindItem("ReqExtAnnulationClot", top.MyDataView);
	objCloture = top.MyApp.FindItem("ReqExtClotureClot", top.MyDataView);
	vReqNrid = top.MyApp.GetItemValue("ReqNRID");
	vMontant = 0;
	vDate = top.MyApp.fctFormatDate(new Date(), top.MyApp.SYSTEM_DATE , top.MyApp.SYSTEM_DATE);
	
	if(top.CurrentSetting.nChapMode!="Reset")
	{
	    if(top.MyApp.UserSetting.User.ProfileInitials == "LTG" || top.MyApp.UserSetting.User.ProfileInitials == "ADMF" || top.MyApp.UserSetting.User.ProfileInitials == "ADMFT" || top.MyApp.UserSetting.User.ProfileInitials == "ADMT")
	    {
	
	
	
	if(objAvoir)
	{
	    objAvoir.onclick = function() {
	        if(objAvoir.checked == true)
	        {
	        vRes = top.MyApp.ExecuteServerScript(30331417223240, [vReqNrid, "Demande d''avoir"]);
	        objXml = top.MyApp.InitXmlCli(vRes);
	        vMontant = top.MyApp.GetItemAttributeFromXML(objXml, "montant_declaration", "Val")
	        top.MyApp.SetItemValue("ReqExtMtAvoirRecu" , vMontant);
	        top.CurrentSetting.Catalog.ReqExtDateAvoirRecu.Ed = 1;
	        top.MyApp.SetItemValue("ReqExtDateAvoirRecu", vDate);
	        top.CurrentSetting.Catalog.ReqExtDateAvoirRecu.Ed = 0;
	        }
	else if(objAvoir.checked == false)
	        {
	        top.CurrentSetting.Catalog.ReqExtDateAvoirRecu.Ed = 1;
	        top.MyApp.SetItemValue("ReqExtDateAvoirRecu", "");
	        top.CurrentSetting.Catalog.ReqExtDateAvoirRecu.Ed = 0;
	        }
	    }
	}
	if(objAnnulation)
	{
	    objAnnulation.onclick = function () {
	             if(objAnnulation.checked == true)
	        {
	        vRes = top.MyApp.ExecuteServerScript(30331417223240, [vReqNrid, "Annulation"]);
	        objXml = top.MyApp.InitXmlCli(vRes);
	        vMontant = top.MyApp.GetItemAttributeFromXML(objXml, "montant_declaration", "Val")
	        top.MyApp.SetItemValue("ReqExtMtAnnulation" , vMontant);
	        top.CurrentSetting.Catalog.ReqExtDateAnnulationClot.Ed = 1;
	        top.MyApp.SetItemValue("ReqExtDateAnnulationClot", vDate);
	        top.CurrentSetting.Catalog.ReqExtDateAnnulationClot.Ed = 0;
	        }
	               else if(objAnnulation.checked == false)
	        {
	        top.CurrentSetting.Catalog.ReqExtDateAnnulationClot.Ed = 1;
	        top.MyApp.SetItemValue("ReqExtDateAnnulationClot", "");
	        top.CurrentSetting.Catalog.ReqExtDateAnnulationClot.Ed = 0;
	        }
	    }
	}
	if(objCloture)
	{
	    objCloture.onclick = function () {
	             if(objCloture.checked == true)
	        {
	        vRes = top.MyApp.ExecuteServerScript(30331417223240, [vReqNrid, "Clôture"]);
	        objXml = top.MyApp.InitXmlCli(vRes);
	        vMontant = top.MyApp.GetItemAttributeFromXML(objXml, "montant_declaration", "Val")
	        top.MyApp.SetItemValue("ReqExtMtCloture" , vMontant);
	        top.CurrentSetting.Catalog.ReqExtDateClotureClot.Ed = 1;
	        top.MyApp.SetItemValue("ReqExtDateClotureClot", vDate);
	        top.CurrentSetting.Catalog.ReqExtDateClotureClot.Ed = 0;
	        }
	               else if(objCloture.checked == false)
	        {
	        top.CurrentSetting.Catalog.ReqExtDateClotureClot.Ed = 1;
	        top.MyApp.SetItemValue("ReqExtDateClotureClot", "");
	        top.CurrentSetting.Catalog.ReqExtDateClotureClot.Ed = 0;
	        }
	    }
	}
	 
	}
	}
		if(top.CurrentSetting.nChapMode!="Reset")
	{
	    if(top.MyApp.UserSetting.User.ProfileInitials!="LTG" && top.MyApp.UserSetting.User.ProfileInitials!="ADMF" && top.MyApp.UserSetting.User.ProfileInitials!="ADMFT" && top.MyApp.UserSetting.User.ProfileInitials!="ADMT")
	    {
	        var arrChampDC = ["ReqExtAvoirRecu","ReqExtAnnulationClot","ReqExtClotureClot","ReqExtLitigecompClos","ReqExtMtAvoirRecu","ReqExtMtAnnulation","ReqExtCloture","ReqExtDateAvoirRecu","ReqExtDateAnnulationClot","ReqExtDateClotureClot","ReqExtRetourFourn","ReqExtDesctrucCac","ReqExtTraiteCac","ReqExtLitigephysClos","ReqExtDateRetFourn","ReqExtDateDestructClot","ReqExtDateTraitClot"];
	        for(var i=0 ; i<arrChampDC.length; i++)
	        {
	            var objchamp = top.MyApp.FindItem(arrChampDC[i],top.MyData_View);
	            if(objchamp ) objchamp.disabled= true
	            //top.MyApp.SetItemAttribute(arrChampDC[i] ,"className","disable" ,top.MyData_View);//Probleme de visualisation NPActiver
	            var objchamp2 = top.MyApp.FindItem(arrChampDC[i]+"Btn",top.MyData_View);
	            if(objchamp2 )  objchamp2.disabled=true;
	        }
	    }
	}
}