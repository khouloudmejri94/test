function()
{
	/*************************************************************/
	// Société                             : MASAO
	// Nom script                          : SS_Req_OnBeforeInsert
	// Infos Paramètres                    :
	// Auteur                              : MLE
	// Chapitre concerné                   : Litige
	// Date de création                    : 07/11/2013
	// Modifié par                         :
	// Date de modification                :
	// Commentaires                        :
	// Règles de gestion                   :
	/*************************************************************/
		try
	{
	    /*
	     if(CurrentRecord["ReqMcl30081515323540"] !="" || CurrentRecord["ReqExtDateDecla"]=="" )
	     {
	     CurrentRecord["ReqExtDateDecla"]= DateTime.Now.ToString("dd/MM/yyyy");
	     }
	     */
	    CurrentRecord["ReqExtLogcreat"]= CurrentUserName;
	    var vOppNrid = CurrentRecord["ReqOppNrid"];
	    var resXml = SS_Req_GetAllInfo(vOppNrid);
	 
	    // Adresse de livraison
	    CurrentRecord["ReqExtCodePostal"] = GetItemValue("CpyAddr1Postcode", resXml);
	    CurrentRecord["ReqExtNomFourn"] = GetItemValue("CpyName", resXml);
	    CurrentRecord["ReqExtNumFourn"] = GetItemValue("CpyCode", resXml); 
	    CurrentRecord["ReqExtVille"] = GetItemValue("CpyAddr1City", resXml);
	    CurrentRecord["ReqExtPays"] = GetItemValue("CpyAddr1Country", resXml);
	    CurrentRecord["ReqExtPays2"] = GetItemValue("CpyAddr1Country", resXml);
	    CurrentRecord["ReqExtAdresse1"] = GetItemValue("CpyAddr1StrNbr", resXml) + " " + GetItemValue("CpyAddr1StrName", resXml);
	    CurrentRecord["ReqExtAdresse2"] = GetItemValue("CpyAddr1Complt", resXml);
	    // Header
	    CurrentRecord["ReqExtMarche"] = GetItemValue("CpyExtMarche", resXml);
	    CurrentRecord["ReqExtCp"] = GetItemValue("CpyExtCp", resXml);
	    CurrentRecord["ReqExtAcheteur"] = GetItemValue("CpyOwner", resXml);
	    CurrentRecord["ReqExtEquipeAch"] = GetItemValue("ResTeamName", resXml);
	    CurrentRecord["ReqExtAcheteuroff"] = GetItemValue("acheteur_off", resXml);
	    CurrentRecord["ReqCpyName"] = GetItemValue("CpyName", resXml);
	    CurrentRecord["ReqCpyNRID"] = GetItemValue("CpyNRID", resXml); 
	    var ref =  "LI" + CurrentRecord["ReqOppReference"];
	    var MySql = CreateSelligentObject("SqlHelper",CurrentSessionID);
	    var res = MySql.ExecuteSql("select count(*) as 'number' from [Req] where [ReqExtRefInterne] = '" + ref + "' and [ReqMasterOrDel] <> 2");
	 
	    var xml = InitXml(res);
	    if(GetItemValue("number", xml) == "0")
	    {
	        CurrentRecord["ReqExtRefInterne"] = ref
	        CurrentRecord["ReqReference"] = ref
	    }
	    else
	    {
	        ThrowMessage("Erreur Litige","Erreur Impossible de créer : Il existe déjà un litige sur cette affaire. Référence : " + ref);
	    }
	
	}
	catch(e)
	{
	    throw e;
	}
	 
		//appel du Web service SAP pour création des contacts litiges
	SS_Req_AppelWS();
}