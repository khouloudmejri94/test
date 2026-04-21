function(pOwner,pCountry)
{
	//Check GI Zone
	try {
		var vResult = 0;
		var oQryObj = CreateSelligentObject("SqlHelper", CurrentSessionID);
		var vAutZon = 0;
		var vAuthorisedZone = "";
		var vSQL = "select COUNT(*) as AutZon from sysadm.am0 " +
			" inner join sysadm.x_param_Plateau_zone plz on plz.Plateau = am0.xPlateau and plz.Bureau = am0.xBureau " +
			" inner join sysadm.x_param_gi_zone giz on giz.UserPlateau = plz.Zone " +
			" where " +
			" am0.titulaire =  '" + pOwner + "' " +
			" AND giz.LinkedZoneCode = SUBSTRING('"+pCountry+"', 1, 2) ";
		
		var MyResults = oQryObj.ExecuteSql(vSQL);
		var oXmlRes = InitXml(MyResults);
		var oRows = FindItem("Flds", oXmlRes, true);
		var NbRows = oRows.Count;
		//ThrowMessage("Alert","verif zone NbRows = " + NbRows);
		if (NbRows == 1) {
			vAutZon = GetItemValue("AutZon", oRows[0]);
			//ThrowMessage("Alert","vAutZon = " + vAutZon);
			if (vAutZon == 1) {
				vResult = 1;
			} else {
				vResult = 0;
			}
			Console.WriteLine("HB : Autorised zone : " + vAutZon);
			return vResult;
		}
	} catch (error) {
		vResult = "HAS - Error defining authorised zone : " + error;
	} finally {
		oQryObj.Dispose(); // Libérer les ressources non managées en premier
		FreeSelligentObject(oQryObj); // Libérer les ressources spécifiques
		return vResult;
	}
}