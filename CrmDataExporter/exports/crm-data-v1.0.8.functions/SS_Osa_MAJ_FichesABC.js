function()
{
	try
	{
	var objQuery = CreateSelligentObject("SqlHelper", CurrentSessionID);
	var xmlResult = "";
	var vSalon = CurrentRecord["OSaExtCodeEdit"];
	xmlResult = objQuery.ExecuteSql("select xliste_salon, SUM(case when objet = 'A' then 1 else 0 end) as FichesA, SUM(case when objet = 'B' then 1 else 0 end) as FichesB, SUM(case when objet = 'C' then 1 else 0 end) as FichesC from sysadm.hi0 where xliste_salon='"+vSalon+"' group by xliste_salon");
	ThrowMessage("Test",xmlResult);
	
	delete objQuery;
	delete(objQuery);
	catch(e)
	{
	   throw "Catch : " + e.message;
	   delete objQuery;
	   delete(objQuery);
	}
}