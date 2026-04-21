function SS_OSa_DV_Ressource_BeforeInst()
{
	try {
		var oQryObj1 = CreateSelligentObject("SqlHelper", CurrentSessionID);
		var vSQL1 = "select set_us_profile_init as usr from sysadm.set_us1  where template is null and nom = :strUserNom";
		var oRes1 = oQryObj1.ExecuteSql(vSQL1);
		var oXmlDoc1 = InitXml(oRes1);
		var oRows1 = FindItem("Flds", oXmlDoc1, true);
		var profil = GetItemValue("usr", oRows1[0]);
		if (profil != 'MNG_ACH_OPR' && Session["ResAdmSalon"] != '1' && profil != 'ADMT') {
			throw "Profile not autorised to execute this action!";
		} else {
			return true;
		}
		//HAS DEB Liberer object SQL
		try {
			oQryObj1.Dispose();
			FreeSelligentObject(oQryObj1);
		} catch (e) {
			Selligent.Library.Monitor.Tracer.Write("################################ SS_OSa_DV_Ressource_BeforeInst  : échec libération objet “Selligent” #############################");
		}
		//HAS DEB Liberer object SQL
	
	} catch (e) {
		throw e + " !! Access Denied";
	}
}