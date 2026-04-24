function __TESTLAMYAE()
{
	               
	
	     var MyQryObj = CreateSelligentObject("SqlHelper", CurrentSessionID);
	     var strQryItmDescr;
	     var vRes;
	     var objXml;
	     var strItmDescription;
	     var numPrixHt;
	     var MyQuery = MyQryObj.ExecuteSql("select  am0.titulaire, am0.team_name from sysadm.am0 where template is null");
	     var MyXmlDoc = InitXml(MyQuery);
	     var vtitulaire;
	     var vteam_name;
	
	
	     var MyRows1 = FindItem("Flds", MyXmlDoc, true);
	   
	     for (var i = 0; i <  MyRows1.Count; i++)
	     {
	                  vtitulaire= GetItemValue("ResName", MyRows1[i]);
	                  vteam_name= GetItemValue("ResTeamName", MyRows1[i]);
	                  Session[vtitulaire] = vteam_name;
	
	//return Session[vtitulaire] +"--" +  vtitulaire +"--"+ vteam_name;
	      }
	
	//Session["Fabienne FERRE"]="test";
	return Session["Fabienne FERRE"];
		return true;
}