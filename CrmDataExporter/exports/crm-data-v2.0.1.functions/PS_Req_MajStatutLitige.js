function PS_Req_MajStatutLitige(pvTypeToUpd)
{
	var vReqNRID = top.MyApp.GetItemValue("ReqNRID", top.MyData_View);
	var vPremiereDemande = top.MyApp.GetItemValue("ReqExtPremieredem", top.MyData_View);
	var vRelance = top.MyApp.GetItemValue("ReqExtRelance", top.MyData_View);
	var vMiseDemeure = top.MyApp.GetItemValue("ReqExtMiseDemeure", top.MyData_View);
	var tabToUpd = [];
	if(pvTypeToUpd=="Creation")
	{
	 //Premiere demande
	 if(top.MyApp.GetItemValue("ReqExtPremieredem") =="A preparer")  tabToUpd ["ReqExtPremieredem"] = "A signer";
	 //Courrier MAD
	 if(top.MyApp.GetItemValue("ReqExtCourMAD") =="A preparer")  tabToUpd ["ReqExtCourMAD"] = "A signer";
	 //Relance
	 if(top.MyApp.GetItemValue("ReqExtRelance") =="A preparer")  tabToUpd ["ReqExtRelance"] = "A signer";
	 //Mise en demeure
	 if(top.MyApp.GetItemValue("ReqExtMiseDemeure") =="A preparer")  tabToUpd ["ReqExtMiseDemeure"] = "A signer";
	 //Autre Courier
	 if(top.MyApp.GetItemValue("ReqExtAutreCourrier") =="A preparer")  tabToUpd ["ReqExtAutreCourrier"] = "A signer";
	 //MAD : Mise à disposition
	 if(top.MyApp.GetItemValue("ReqExtMad") =="A faire") tabToUpd ["ReqExtMad"] = "Fait";
	 //Destruction
	 if(top.MyApp.GetItemValue("ReqExtDestruction") =="A faire") tabToUpd ["ReqExtDestruction"] = "Fait";
	 //ReqExtTraitement
	 if(top.MyApp.GetItemValue("ReqExtTraitement") =="A faire") tabToUpd ["ReqExtTraitement"] = "Fait"; 
	
	 //Annulation
	 if(top.MyApp.GetItemValue("ReqExtAnnulation") == "A preparer") tabToUpd ["ReqExtAnnulation"] = "A valider";
	 //Cloture
	 if(top.MyApp.GetItemValue("ReqExtCloture")    == "A preparer") tabToUpd ["ReqExtCloture"]  = "A valider"; 
	
	}
	else
	{
	 if(pvTypeToUpd=="Envoi")
	 {
	  var vDate = top.MyApp.fctFormatDate(new Date(), top.MyApp.SYSTEM_DATE,  top.MyApp.SYSTEM_DATE ); 
	  
	  //Premiere demande
	  if(top.MyApp.GetItemValue("ReqExtPremieredem") =="A signer") { tabToUpd ["ReqExtPremieredem"] = "Envoyé";  tabToUpd ["ReqExtDatePremDem"] =vDate; }
	  //Courrier MAD
	  if(top.MyApp.GetItemValue("ReqExtCourMAD") =="A signer") { tabToUpd ["ReqExtCourMAD"] = "Envoyé";   tabToUpd ["ReqExtDatecourMad"] =vDate; }
	  //Relance
	  if(top.MyApp.GetItemValue("ReqExtRelance") =="A signer") { tabToUpd ["ReqExtRelance"] = "Envoyé";   tabToUpd ["ReqExtDateRel"] =vDate; }
	  //Mise en demeure
	  if(top.MyApp.GetItemValue("ReqExtMiseDemeure") =="A signer") { tabToUpd ["ReqExtMiseDemeure"] = "Envoyé";     tabToUpd ["ReqExtDateMiseDem"] =vDate; }
	  //Autre Courrier
	  if(top.MyApp.GetItemValue("ReqExtAutreCourrier") =="A signer") { tabToUpd ["ReqExtAutreCourrier"] = "Envoyé";     tabToUpd ["ReqExtDateAutreCou"] =vDate; }
	  //MAD : Mise à disposition
	  if(top.MyApp.GetItemValue("ReqExtMad") =="Fait") { tabToUpd ["ReqExtMad"] = "Envoyé";   tabToUpd ["ReqExtDatemad"] =vDate; }
	  //Destruction
	  if(top.MyApp.GetItemValue("ReqExtDestruction") =="Fait") { tabToUpd ["ReqExtDestruction"] = "Envoyé";   tabToUpd ["ReqExtDateDestruc"] =vDate; }
	  //Traitement
	  if(top.MyApp.GetItemValue("ReqExtTraitement") =="Fait") { tabToUpd ["ReqExtTraitement"] = "Envoyé";   tabToUpd ["ReqExtDateTraite"] =vDate; }
	
	  //Annulée
	  if(top.MyApp.GetItemValue("ReqExtAnnulation") =="A valider") {    tabToUpd ["ReqExtDateAnnul"] =vDate; }
	  //Clotures
	  if(top.MyApp.GetItemValue("ReqExtCloture")    =="A valider") {    tabToUpd ["ReqExtDateClotSuivi"] =vDate; }
	
	 }
	}
	var vParamToUpd = "";
	for (var i in tabToUpd)
	{
	  
	 vParamToUpd = i+"<_cut1_/>"+tabToUpd[i]
	 top.MyApp.SetItemValue(i, tabToUpd[i], top.MyData_View)
	}
	
	/*
	//SS_Req_MAJ_Litige
	if(vParamToUpd !="")
	{
	 var vRetour = top.MyApp.ExecuteServerScript("30939617252556", [vReqNRID, vParamToUpd]);
	}
	*/
	
	top.MyApp.fraMenuBar.Execute("R_Save");
		return ;
}