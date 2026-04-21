function(vOppNrid)
{
	/*************************************************************/
	// Société                             : MASAO
	// Nom script                          : SS_Req_GetAdrFacturation
	// Infos Paramètres                    :
	// Auteur                              : MLE
	// Chapitre concerné                   : Litige
	// Date de création                    : 07/11/2013
	// Modifié par                         :
	// Date de modification                :
	// Commentaires                        :
	// Règles de gestion                   :
	/*************************************************************/
		try{
	    var MySql = CreateSelligentObject("SqlHelper",CurrentSessionID);
	    /*
	     var res = MySql.ExecuteSql("select [CpyName], [CpyAddr1Postcode], [CpyAddr1City], [CpyAddr1Country], [CpyAddr1StrNbr], [CpyAddr1StrName], [CpyAddr1Complt] , [CpyExtMarche] , [CpyExtCp] , [CpyOwner]" +
	     " from [Cpy] where [CpyNRID] = " + vCpyNrid);
	     */
	    var res = MySql.ExecuteSql(
	        "SELECT four.nrid, four.societe, four.code_post, four.adresse, four.pays, four.loc, four.street_nb, four.complement, four.xmarche, four.xcp, four.titulaire, res.team_name, four.cd," +
	            "(select top 1 xAcht from sysadm.dc0 where do0_nrid = aff.nrid AND xAcht IS NOT NULL) as acheteur_off" +
	            " FROM sysadm.do0 as aff " +
	            " JOIN sysadm.so0 as four ON aff.so0_nrid = four.nrid " +
	            " JOIN sysadm.am0 as res ON four.titulaire = res.titulaire " +
	            "WHERE aff.nrid = " + vOppNrid);
	    var xml = InitXml(res);
	//return myResult;
	    return xml;
	}
	catch (e)
	{
	        throw  "Error in SS_Req_GetAdrFacturation " + e;
	}
	finally
	{
	    delete MySql;
	}
}