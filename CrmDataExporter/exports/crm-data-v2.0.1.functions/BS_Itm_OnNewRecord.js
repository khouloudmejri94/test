function BS_Itm_OnNewRecord()
{
	try {
	    CurrentRecord['ItmExtCreateur'] = CurrentUserName;
	    CurrentRecord['ItmExtDateCreation'] = System.DateTime.Now;
	    CurrentRecord['ItmExtStatut'] = 'BROUILLON';
	
	    CurrentRecord["ItmExtAcheteur"] = CurrentUserName;
	
	    CurrentRecord['ItmExtProlongation'] = 0;
	
	
	} catch (e) {
	    throw e.description;
	} finally {}
}