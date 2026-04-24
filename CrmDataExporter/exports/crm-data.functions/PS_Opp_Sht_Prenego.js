function PS_Opp_Sht_Prenego()
{
	// Initiales du profil attribué à l'utilisateur courant
	var vProf = top.MyApp.UserSetting.User.ProfileInitials;
	var vUser = top.MyApp.UserSetting.User.Name;
	var vFamille = top.MyApp.GetItemValue('OppExtFamille');
	var vProfNeg = "LEAD_NEG;NEG_EXP;NEG_SEN;NEG_JUN;NEG_CNF";
	
	// Les conditions de passage
	if (vProfNeg.indexOf(vProf) == -1 && vProf != "ADMT") {
	  top.MyApp.OpenDlg("Alert", ["Attention", "Profile " + vProf + " not authorised for this action"]);
	  return false;
	} else {
	  top.MyApp.CurrentSetting.Catalog["OppStatus"].Ed = 1;
	  top.MyApp.Custom_IncompletBtn = true;
	  top.MyApp.SetItemValue('OppStatus', '01.B PRENEGOCIATION');
	  if (top.MyApp.SetItemValue("OppExtAcheteur")== '' || top.MyApp.SetItemValue("OppExtAcheteur")== null ) {
	   top.MyApp.SetItemValue("OppExtAcheteur", vUser);
	  }
	  
	  PS_Opp_Header_Status();
	  top.MyApp.CurrentSetting.Catalog["OppStatus"].Ed = 0;
	
	  top.MyApp.SetItemValue("OppExtEmailAvis", "1");
	  top.MyApp.fraMenuBar.Execute("R_Save");
	  top.MyApp.fraMenuBar.Execute("R_Consult");
	}
}