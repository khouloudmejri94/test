function SS_Per_OnBeforeInset()
{
	try {
		var nCpyNRID = CurrentRecord["PerCpyCpyNRID"];
		if (nCpyNRID != null && nCpyNRID != '') {
			var oQryObj = CreateSelligentObject("SqlHelper", CurrentSessionID);
			var vSQL = "select so0.titulaire as acheteur, so0.xcp as chef from so0 so0 where so0.nrid = '" + nCpyNRID + "'";
			var oRes = oQryObj.ExecuteSql(vSQL);
			var oXmlDoc = InitXml(oRes);
			var oRows = FindItem("Flds", oXmlDoc, true);
			if (oRows.Count != 0) {
				CurrentRecord["PerOwner"] = GetItemValue("acheteur", oRows[0]) + ";" + GetItemValue("chef", oRows[0]);
			}
			delete oQryObj;
		}
	} catch (e) {
		throw "PER before Insert" + e.message;
	} finally { // libération mémoire objet “Selligent”
	    FreeSelligentObject(oQryObj);
	    oQryObj.Dispose();
	}
}