function PS_Opp_SP_AddRoles()
{
	var strRef = "";
	var strRefAffaire = "";
	var vDossier="Vide";
	
	if(top.MyApp.MySetting.CurrentData_View =="Cpy")
	{ 
	    strRef = top.MyApp.GetItemValue("CpyCode");
	    vDossier="Fournisseurs"; 
	}
	   
	if(top.MyApp.MySetting.CurrentData_View=="Opp")
	{ 
	    strRef = top.MyApp.GetItemValue("OppReference");
	    vDossier="Affaires"; 
	} 
	
	if(top.MyApp.MySetting.CurrentData_View =="Quo")
	{
	    strRefAffaire = top.MyApp.GetItemValue("QuoOppReference");
	    vDossierAffaire =  "Affaires";
	    strRef = top.MyApp.GetItemValue("QuoCustReference");
	    vDossier="Affaires/"+strRefAffaire;// +"/Offres"; 
	}
	
	if(top.MyApp.MySetting.CurrentData_View=="Req")
	{ 
	    strRef = top.MyApp.GetItemValue("ReqExtRefInterne");
	    vDossier="Litiges"; 
	} 
	
	if(top.MyApp.MySetting.CurrentData_View=="Itm")
	{ 
	    strRef = top.MyApp.GetItemValue("ItmReference");
	    vDossier="Consignes"; 
	} 
	
	if(top.MyApp.MySetting.CurrentData_View=="OSa")
	{ 
	    strRefEdition = top.MyApp.GetItemValue("OSaExtCodeEdit");
	    strRefSalon  = top.MyApp.GetItemValue("OSaExtSalon");
	    if( top.MyApp.GetItemValue("OSaExtSalon") =="Edition")
	    {
	       strRef =  strRefSalon  + "/" + strRefEdition ;
	    } 
	    else
	    {
	       strRef =  strRefSalon   ;
	
	
	
	
	    }
	    vDossier="Salons"; 
	} 
	
	
	
	if(strRefAffaire !="")
	{
	  //Vérification de l'existence du dossier affaire pour les offres
	  var strXMLAffaire = top.MyApp.ExecuteServerScript(30892165595487, [strRefAffaire,vDossierAffaire ]); //SS_Opp_SP_AddRoles
	}
	
	if(strRef  !="")
	{
	    var strXMLAcn = top.MyApp.ExecuteServerScript(30892165595487, [strRef,vDossier]); //SS_Opp_SP_AddRoles
	    //top.MyApp.OpenView("Opp" , "FP" , 30521757638542 , "ifrView3" , true , "");
	    return strXMLAcn  ;
	}
		return true;
}