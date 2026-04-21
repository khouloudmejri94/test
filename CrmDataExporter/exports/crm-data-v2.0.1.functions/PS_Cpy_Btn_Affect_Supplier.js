function PS_Cpy_Btn_Affect_Supplier()
{
	//PS_Cpy_Btn_Affect_Supplier
	// Initiales du profil attribué à l'utilisateur courant  
	var vProf = top.MyApp.UserSetting.User.ProfileInitials;
	var strName = top.MyApp.UserSetting.User.Name;
	var vPRange = top.MyApp.GetItemValue("CpyExtFamilleProd");
	var vCountry = top.MyApp.GetItemValue("CpyAddr1Country");
	var vConsigne  = top.MyApp.GetItemValue("CpyExtConsigne");
	
	var vProfPros2020 = "LEAD_PROS;LEAD_PROS_SEN;LEAD_PROS_JUN;MNG_PROS_SEN;MNG_PROS_ZON;PROS_JUN;PROS_SEN;MNG_PROS_JUN";
	var vProfNeg2020 = "LEAD_NEG;NEG_EXP;NEG_SEN;NEG_JUN;NEG_CNF";
	
	// Les conditions de passage  
	if (vProfPros2020.indexOf(vProf) == -1 && vProfNeg2020.indexOf(vProf) == -1 && vProf != 'ADMT' && vProf != 'ASS_ACH' && vProf != 'ACT') {
	 top.MyApp.OpenDlg("Alert", ["Attention", "Profile " + vProf + " not authorised for this action"]);
	 return false;
	}
	if (vConsigne != '' && vConsigne != null && vConsigne != undefined && vConsigne != 'SANS CONSIGNE') {
	    top.MyApp.OpenDlg("Alert", ["Attention", "Supplier linked to a consigne and could not be affected manually!"]);
	 return false;
	}
	
	if (vProf == 'ACT') {
	 // Pour le profil ACT, affectation directe sans compter
	 top.MyApp.SetItemValue("CpyExtActivateur", strName);
	 //top.MyApp.SetItemValue("CpyOwner", strName);
	 //top.MyApp.SetItemValue("CpyExtFlagAffect", '1');
	 top.MyApp.fraMenuBar.Execute("R_Save");
	} else if (top.MyApp.CustomSetting.OutSrc != "1") {
	 var vSQL = "select count (nrid) from sysadm.so0 where template is null and so0.titulaire != so0.xcreateur and so0.titulaire = '" + strName + "' and xetat_pepite = 'SAS'  and xvalid_sas = 'EN COURS'";
	 var arrRes = top.MyApp._gfctExtReq(vSQL);
	 if ((vProf == 'ASS_ACH' && arrRes[0][0] > 500) || (vProf != 'ASS_ACH' && arrRes[0][0] > 150)) {
	  top.MyApp.OpenDlg("Alert", ["Attention", "You reached the max number allowed reaffectation from sourcing \n Please complete validation for the followed suppliers"]);
	  return false;
	 } else {
	  if (vProfPros2020.indexOf(vProf) > -1) {
	   top.MyApp.SetItemValue("CpyExtProsp", strName);
	   top.MyApp.SetItemValue("CpyExtActivateur", "");
	   top.MyApp.SetItemValue("CpyExtAcht", "");
	  } else if (vProfNeg2020.indexOf(vProf) > -1) {
	   top.MyApp.SetItemValue("CpyExtAcht", strName);
	   top.MyApp.SetItemValue("CpyExtActivateur", "");
	   top.MyApp.SetItemValue("CpyExtProsp", "");
	  } else if (vProf == 'ASS_ACH') {
	   top.MyApp.SetItemValue("CpyExtACO", strName);
	   top.MyApp.SetItemValue("CpyExtActivateur", "");
	   top.MyApp.SetItemValue("CpyExtProsp", "");
	   vSQL = "select resmng.titulaire as buyer from sysadm.res_liees, sysadm.am0 resmng where res_liees.personne = resmng.titulaire and resmng.fonction = 'Negociateur' and res_liees.vue_ressource = '" + strName + "'";
	   arrRes = top.MyApp._gfctExtReq(vSQL);
	   if (arrRes.length == 1) {
	    top.MyApp.SetItemValue("CpyExtAcht", arrRes[0][0]);
	   }
	  }
	  top.MyApp.SetItemValue("CpyOwner", strName);
	  if (vProf == 'ASS_ACH' || vProf == 'SRC') {
	   var res = top.MyApp.ExecuteServerScript(42798853598940, [strName, vPRange, vCountry]);
	   if (res > 0) {
	    top.MyApp.SetItemValue("CpyExtValidSrc", 'Initial');
	   }
	  }
	  top.MyApp.SetItemValue("CpyExtFlagAffect", '1');
	  top.MyApp.fraMenuBar.Execute("R_Save");
	 }
	}
}