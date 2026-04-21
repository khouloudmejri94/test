function()
{
	
	/*try
	{
	 // Hich 22/06/2021 Si SMC envoi code Failure email 
	 var nCodeFailure = CurrentRecord["PerExtCodeFailure"];
	 //if(CurrentUserName == 'SIM Integration')
	 //{
	  if(nCodeFailure != null && nCodeFailure != '')
	  {
	   var oQryObj = CreateSelligentObject("SqlHelper", CurrentSessionID);
	   var vSQL = "select S.Shortcode As Shortcode , S.Description as Description from x_statut_email S where S.Code =  '" + nCodeFailure + "'";
	     var oRes = oQryObj.ExecuteSql(vSQL);
	     var oXmlDoc = InitXml(oRes);  
	     var oRows = FindItem("Flds", oXmlDoc, true);
	     if(oRows.Count != 0)
	     {
	    CurrentRecord["PerExtShortcodeFailure"] = GetItemValue("Shortcode", oRows[0]);
	    CurrentRecord["PerExtDescriptionFailure"] = GetItemValue("Description", oRows[0]);
	     }
	     delete oQryObj;
	
	  }
	 //}
	}
	catch(e)
	{
	     throw "Error on SS_Per_OnAfterUpdate " + e;
	}
	CurrentRecord["PerExtShortcodeFailure"] = 'CodeFail1';
	CurrentRecord["PerExtDescriptionFailure"] = 'DescFail1';
	*/
	
	SS_Per_InstUpdate_Contact();
}