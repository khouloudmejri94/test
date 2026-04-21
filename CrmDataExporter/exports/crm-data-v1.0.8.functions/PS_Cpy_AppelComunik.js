function()
{
	//alert("Welcome to PS_Cpy_AppelComunik");
	//[D]Communik
	try {
	 //var vProfiluser    = top.MyApp.UserSetting.User.ProfileInitials;
	 var vUserName = top.MyApp.UserSetting.User.Name;
	 //var vItemLblCnK  = top.MyApp.FindItem("Label36761706113050");
	 var vItemPrefix = top.MyApp.GetItemValue("CpyIntPrefix");
	 var vItemTel = top.MyApp.GetItemValue("CpyPhoneNbr");
	 var vQualifdef = encodeURIComponent("Appel Non Qualifié");
	 //var vQualifdef = 1;
	 var vFrnNo = top.MyApp.GetItemValue("CpyNRID");
	 var vIdSession = "select xPseudo from sysadm.am0 where titulaire = '" + vUserName + "'";
	 var vSession = top.MyApp._gfctExtReq(vIdSession);
	 //alert(vSession);
	 //alert("helloCPY 3");
	 var url = null;
	url = top.MyApp.CustomSetting.tabGlobalVar["CAL_WS"];
	 //https://ozeol.comunikcrm.info/vvciwa/api/webagent/call/ozeol_preprod/Agent9/0021656105889/1/
	 //url = 'https://ozeol.comunikcrm.info/vvci/api/webagent/call/ozeol/';
	 //url = 'https://ozeol.comunikcrm.info/vvciwa/api/webagent/call/ozeol_preprod/';
	 url += vSession + "/";
	 url += vItemPrefix;
	 url += vItemTel;
	 url = url + "/" + vQualifdef + "/" + new Date().getTime();
	 //alert(url);
	 
	 // appel WS 
	 var resultat = top.MyApp.ExecuteServerScript(38638253316548, [url]);
	 var myData = eval("(" + resultat + ")");
	 alert(myData.message + " via Comunik");
	 var vSqlAcn = "SELECT max(nrid) from sysadm.hi0 where so0_nrid = ";
	 vSqlAcn += vFrnNo;
	 vSqlAcn += " and ref = 'TEL' and status = 'A FAIRE'  and titulaire = :strUserNom";
	 //alert(vSqlAcn);
	 var mySelectionNRID = top.MyApp._gfctExtReq(vSqlAcn);
	 //alert("your selection is: " + mySelectionNRID);
	 var n = Number(mySelectionNRID);
	 if (n != "" && n !== null) {
	  //appel du script _gsfctExecuteSql
	  var strResultat = top.MyApp.ExecuteServerScript(37219487709614, [n]);
	  //alert("result");
	  //var check = "select xFlagComunik from sysadm.hi0 where nrid = "+n+" and ref = 'TEL' and status = 'A FAIRE'";
	  //var myCheck = top.MyApp._gfctExtReq(check);
	  //alert(myCheck);
	  top.MyApp.OpenData_View("Acn", n.valueOf(), "Open", "", "", "");
	  //alert("tatu");
	 } else {
	  var strResultat = top.MyApp.ExecuteServerScript(37189387549615);
	  var vSqlAcn = "SELECT max(nrid) from sysadm.hi0 where so0_nrid = ";
	  vSqlAcn += vFrnNo;
	  vSqlAcn += " and ref = 'TEL' and status = 'A FAIRE' and titulaire = :strUserNom";
	  //alert(vSqlAcn);
	  var mySelectionNRID = top.MyApp._gfctExtReq(vSqlAcn);
	  //alert("your selection is: " + mySelectionNRID);
	  var n = Number(mySelectionNRID);
	  if (n != "" && n !== null) {
	   //appel du script _gsfctExecuteSql
	   var strResultat = top.MyApp.ExecuteServerScript(37219487709614, [n]);
	   //alert("result");
	   //var check = "select xFlagComunik from sysadm.hi0 where nrid = "+n+" and ref = 'TEL' and status = 'A FAIRE'";
	   //var myCheck = top.MyApp._gfctExtReq(check);
	   //alert(myCheck);
	   top.MyApp.OpenData_View("Acn", n.valueOf(), "Open", "", "", "");
	   //alert("tatu");
	  }
	
	  /* function() {
	       top.MyApp.SetItem("AcnCpyName", "Value", top.MyApp.GetItemValue("CpyName", top.MyData_View), top.My_DataView);
	   }
	   top.MyApp.OpenData_View("Acn", "", "New", "top.MyApp.fraData_View.AcnFill()", '', '');*/
	 }
	} catch (e) {
	 alert("PS_Cpy_AppelComunik - Communik : " + e.message);
	}
	//[F]Communik
		return ;
}