function __SS_Cpy_Check_Gi_Zone(pRequester,pCpyNRID)
{
	//Check GI Zone
	try {
	 var oQryObj = CreateSelligentObject("SqlHelper", CurrentSessionID);
	 var vAutZon = 0;
	 var vAuthorisedZone = "";
	
	 var vSQL = "select COUNT(so0.nrid) as AutZon from sysadm.so0 " +
	 " inner join sysadm.x_param_gi_zone z on z.LinkedZoneCode = SUBSTRING(pays, 1, 2) " +
	 " inner join sysadm.x_param_Plateau_zone p on p.Zone = z.UserPlateau " +
	 " inner join sysadm.am0 on am0.xPlateau = p.PLATEAU and am0.xBureau = p.BUREAU " +
	 " where " +
	 " am0.titulaire = '"+ pRequester +"' " +
	 " and so0.nrid = '"+ pCpyNRID +"' ";
	
	 var MyResults = oQryObj.ExecuteSql(vSQL);
	 var oXmlRes = InitXml(MyResults);
	 var oRows = FindItem("Flds", oXmlRes, true);
	 var NbRows = oRows.Count;
	 if (NbRows == 1) {
	  vAutZon = GetItemValue("AutZon", oRows[0]);
	  if (vAutZon == 1) {
	   return 1;
	  } else {
	   return 0;
	  }
	 }
	} catch (error) {
	 return "HAS - Error defining authorised zone " + error; 
	} finally {
	 oQryObj.Dispose(); // Libérer les ressources non managées en premier
	    FreeSelligentObject(oQryObj); // Libérer les ressources spécifiques
	}
}