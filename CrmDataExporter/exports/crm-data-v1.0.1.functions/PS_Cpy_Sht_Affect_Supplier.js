function PS_Cpy_Sht_Affect_Supplier()
{
	// Initiales du profil attribué à l'utilisateur courant
	var vProf = top.MyApp.UserSetting.User.ProfileInitials;
	var strName = top.MyApp.UserSetting.User.Name;
	var vProfPros2020 = "LAED_PROS_SEN;LEAD_PROS_JUN;MNG_PROS_SEN;MNG_PROS_ZON;PROS_JUN;PROS_SEN;MNG_PROS_JUN";
	var vProfNeg2020 = "LEAD_NEG;NEG_EXP;NEG_SEN;NEG_JUN;NEG_CNF";
	// Les conditions de passage
	if (vProfPros2020.indexOf(vProf) == -1 && vProfNeg2020.indexOf(vProf) == -1 && vProf != 'ADMT') {
	 top.MyApp.OpenDlg("Alert", ["Attention", "Profile " + vProf + " not authorised for this action"]);
	 return false;
	}
	var vSQL = "select count (*) from sysadm.so0 where template is null and so0.titulaire != so0.xcreateur and so0.titulaire = '" + strName + "' and xetat_pepite = 'SAS'  and xvalid_sas = 'EN COURS'"
	var arrRes = top.MyApp._gfctExtReq(vSQL);
	if (arrRes[0][0] >= 50) {
	 top.MyApp.OpenDlg("Alert", ["Attention", "The max allowed reaffectation from sourcing is 50 \n Please complete validation for the followed suppliers"]);
	 return false;
	} else {
	 top.MyApp.SetItemValue("CpyOwner", strName);
	 top.MyApp.SetItemValue("CpyExtProsp", strName);
	 top.MyApp.SetItemValue("CpyExtFlagAffect", '1');
	 top.MyApp.fraMenuBar.Execute("R_Save");
	 top.MyApp.fraMenuBar.Execute("R_Consult");
	 //top.MyApp.fraMenuBar.Execute("T_Refresh");
	}
}