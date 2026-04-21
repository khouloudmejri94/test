function PS_Acn_Status_AddEvent()
{
	try {
	 var v_Type = top.MyApp.GetItemValue("AcnNature");
	 var v_Status = top.MyApp.GetItemValue("AcnStatus");
	 var v_Resultat = top.MyApp.GetItemValue("AcnType");
	 var vContact = top.MyApp.GetItemValue("AcnPerName");
	
	 
	 if (top.MyApp.CurrentSetting.nChapMode != "Reset") {
	  /*if (v_Type == "REMPLACE" && v_Status == "FAIT") {
	   top.MyApp._gfctSetClassName("AcnExtAffairAR", "NM");
	  } else {
	   top.MyApp._gfctSetClassName("AcnExtAffairAR", "UM");
	  }
	  if (v_Resultat == 'LOT DETECTE') {
	   //top.MyApp.SetItemAttribute("AcnSubject", "className", "Mandatory");
	   //top.MyApp.CurrentSetting.Catalog["AcnSubject"].Mn = 1;
	   top.MyApp._gfctSetClassName("AcnSubject", "NM");
	  } else {
	   top.MyApp._gfctSetClassName("AcnSubject", "UM");
	  }*/
	
	  // HAS DEB 29/09/2020 : Remplir le champ Téléphone du contact chargé contact
	  if (vContact != '' && vContact != null && vContact != undefined) {
	   //var vPerson = top.MyApp.GetItemValue("AcnPerName");
	   var vCpyNrid = top.MyApp.GetItemValue("AcnCpyNRID");
	   var strSQLRes = "select mobile_phone, e_mail, tel from sysadm.sp0 where personne = '" + vContact.replace(/'/g, "''") + "' and so0_nrid = '" + vCpyNrid + "' ";
	   var arrRes = top.MyApp._gfctExtReq(strSQLRes);
	   var nTelContact = arrRes[0][0];
	   var vEmailContact = arrRes[0][1];
	   var nFixContact = arrRes[0][2];
	   if (!isNaN(nFixContact)) {
	    top.MyApp.SetItemValue("AcnExtTelFixContact", nFixContact);
	   }
	   if (!isNaN(nTelContact)) {
	    top.MyApp.SetItemValue("AcnExtTelContact", nTelContact);
	   }
	   top.MyApp.SetItemValue("AcnExtMailContact", vEmailContact);
	  }
	 }
	 // HAS END 29/09/2020 : Remplir le champ Téléphone du contact chargé contact
	
	 // HAS DEB 01/10/2020 : SI appel tél contact Action alors déclencher popup qualification
	 //alert('ap  PS_Acn_Status_AddEvent');
	 if (top.MyApp.CurrentSetting.nChapMode != "Reset") {
	  var vFlagAppel = top.MyApp.GetItemValue("AcnExtFlagAppel");
	  if (vFlagAppel == '1' && v_Status == 'A FAIRE') {
	   var arrParams = []
	   arrParams[0] = top.MyApp
	   arrParams[1] = top.bWizard
	   //top.MyApp.OpenDlg('37501287699620', arrParams, top, undefined, undefined, undefined, undefined, function () {});
	   //top.MyApp.OpenDlg("37501287699620");
	  }
	 }
	 // HAS END 01/10/2020 : SI appel tél contact Action alors déclencher popup qualification
	} catch (e) {
	 alert(e.message);
	}
}