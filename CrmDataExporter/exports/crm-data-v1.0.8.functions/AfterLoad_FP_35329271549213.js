function()
{
	// HAS DEB : Gestion des données obligatoires sur onglet Warehouse
	if (top.MyApp.CurrentSetting.nChapMode != 'Reset') {
	 var vProf = top.MyApp.UserSetting.User.ProfileInitials;
	 //var vProfNeg = "LEAD_NEG;NEG_EXP;NEG_SEN;NEG_JUN;NEG_CNF";
	 var vProfNeg = "LEAD_NEG;NEG_EXP;NEG_SEN;NEG_JUN;NEG_CNF;MNG_ACH_OPR;ACH_TER;ASS_ACH;MAN_HA_TER";
	 var vProfSCH = "ASS_SUP_CHN;LEAD_SUP_CHN";
	 // HAS DEB : Achat 2020 : si supply chain alors impossible de faire la demande de WH
	 var vOldCmd = top.MyApp.GetItemValue("QuoExtOldCmd");
	 if (vProfNeg.indexOf(vProf) != -1 && vOldCmd != '1') {
	  top.MyApp.CurrentSetting.Catalog["QuoExtStatutWH"].Ed = -1;
	 }
	 // HAS END : Achat 2020 : si supply chain alors impossible de faire la demande de WH
	 var OstatutWH = top.MyApp.FindItem('QuoExtStatutWH');
	 var statutWH = top.MyApp.GetItemValue('QuoExtStatutWH');
	 if (OstatutWH) {
	  if (statutWH == 'Demande Réception') {
	   //top.MyApp.SetItemAttribute("QuoExtStatutWH", "className", "Mandatory");
	   //top.MyApp.CurrentSetting.Catalog["QuoExtStatutWH"].Mn = 1;
	   top.MyApp._gfctSetClassName("QuoExtStatutWH", "NM");
	   //top.MyApp.SetItemAttribute("QuoExtNomContact", "className", "Mandatory");
	   //top.MyApp.CurrentSetting.Catalog["QuoExtNomContact"].Mn = 1;
	   top.MyApp._gfctSetClassName("QuoExtNomContact", "NM");
	   //top.MyApp.SetItemAttribute("QuoExtNumTel", "className", "Mandatory");
	   //top.MyApp.CurrentSetting.Catalog["QuoExtNumTel"].Mn = 1;
	   top.MyApp._gfctSetClassName("QuoExtNumTel", "NM");
	   //top.MyApp.SetItemAttribute("QuoExtEmailWH", "className", "Mandatory");
	   //top.MyApp.CurrentSetting.Catalog["QuoExtEmailWH"].Mn = 1;
	   top.MyApp._gfctSetClassName("QuoExtEmailWH", "NM");
	   //top.MyApp.SetItemAttribute("QuoExtVolumeCbmWH", "className", "Mandatory");
	   //top.MyApp.CurrentSetting.Catalog["QuoExtVolumeCbmWH"].Mn = 1;
	   top.MyApp._gfctSetClassName("QuoExtVolumeCbmWH", "NM");
	   //top.MyApp.SetItemAttribute("QuoExtDateLivPrevWH", "className", "Mandatory");
	   //top.MyApp.CurrentSetting.Catalog["QuoExtDateLivPrevWH"].Mn = 1;
	   top.MyApp._gfctSetClassName("QuoExtDateLivPrevWH", "NM");
	
	  } else {
	   top.MyApp.SetItemAttribute("QuoExtStatutWH", "className", "");
	   top.MyApp.CurrentSetting.Catalog["QuoExtStatutWH"].Mn = -1;
	   top.MyApp.SetItemAttribute("QuoExtNomContact", "className", "");
	   top.MyApp.CurrentSetting.Catalog["QuoExtNomContact"].Mn = -1;
	   top.MyApp.SetItemAttribute("QuoExtNumTel", "className", "");
	   top.MyApp.CurrentSetting.Catalog["QuoExtNumTel"].Mn = -1;
	   top.MyApp.SetItemAttribute("QuoExtEmailWH", "className", "");
	   top.MyApp.CurrentSetting.Catalog["QuoExtEmailWH"].Mn = -1;
	   top.MyApp.SetItemAttribute("QuoExtVolumeCbmWH", "className", "");
	   top.MyApp.CurrentSetting.Catalog["QuoExtVolumeCbmWH"].Mn = -1;
	   top.MyApp.SetItemAttribute("QuoExtDateLivPrevWH", "className", "");
	   top.MyApp.CurrentSetting.Catalog["QuoExtDateLivPrevWH"].Mn = -1;
	  }
	  OstatutWH.onchange = function () {
	   var OstatutWH = top.MyApp.FindItem('QuoExtStatutWH');
	   var statutWH = top.MyApp.GetItemValue('QuoExtStatutWH');
	   if (OstatutWH) {
	    if (statutWH == 'Demande Réception') {
	     //top.MyApp.SetItemAttribute("QuoExtStatutWH", "className", "Mandatory");
	     //top.MyApp.CurrentSetting.Catalog["QuoExtStatutWH"].Mn = 1;
	     top.MyApp._gfctSetClassName("QuoExtStatutWH", "NM");
	     //top.MyApp.SetItemAttribute("QuoExtNomContact", "className", "Mandatory");
	     //top.MyApp.CurrentSetting.Catalog["QuoExtNomContact"].Mn = 1;
	     top.MyApp._gfctSetClassName("QuoExtNomContact", "NM");
	     //top.MyApp.SetItemAttribute("QuoExtNumTel", "className", "Mandatory");
	     //top.MyApp.CurrentSetting.Catalog["QuoExtNumTel"].Mn = 1;
	     top.MyApp._gfctSetClassName("QuoExtNumTel", "NM");
	     //top.MyApp.SetItemAttribute("QuoExtEmailWH", "className", "Mandatory");
	     //top.MyApp.CurrentSetting.Catalog["QuoExtEmailWH"].Mn = 1;
	     top.MyApp._gfctSetClassName("QuoExtEmailWH", "NM");
	     //top.MyApp.SetItemAttribute("QuoExtVolumeCbmWH", "className", "Mandatory");
	     //top.MyApp.CurrentSetting.Catalog["QuoExtVolumeCbmWH"].Mn = 1;
	     top.MyApp._gfctSetClassName("QuoExtVolumeCbmWH", "NM");
	     //top.MyApp.SetItemAttribute("QuoExtDateLivPrevWH", "className", "Mandatory");
	     //top.MyApp.CurrentSetting.Catalog["QuoExtDateLivPrevWH"].Mn = 1;
	     top.MyApp._gfctSetClassName("QuoExtDateLivPrevWH", "NM");
	    } else {
	     top.MyApp.SetItemAttribute("QuoExtStatutWH", "className", "");
	     top.MyApp.CurrentSetting.Catalog["QuoExtStatutWH"].Mn = -1;
	     top.MyApp.SetItemAttribute("QuoExtNomContact", "className", "");
	     top.MyApp.CurrentSetting.Catalog["QuoExtNomContact"].Mn = -1;
	     top.MyApp.SetItemAttribute("QuoExtNumTel", "className", "");
	     top.MyApp.CurrentSetting.Catalog["QuoExtNumTel"].Mn = -1;
	     top.MyApp.SetItemAttribute("QuoExtEmailWH", "className", "");
	     top.MyApp.CurrentSetting.Catalog["QuoExtEmailWH"].Mn = -1;
	     top.MyApp.SetItemAttribute("QuoExtVolumeCbmWH", "className", "");
	     top.MyApp.CurrentSetting.Catalog["QuoExtVolumeCbmWH"].Mn = -1;
	     top.MyApp.SetItemAttribute("QuoExtDateLivPrevWH", "className", "");
	     top.MyApp.CurrentSetting.Catalog["QuoExtDateLivPrevWH"].Mn = -1;
	    }
	   }
	  };
	 }
	}
	// HAS DEB : Gestion des données obligatoires sur onglet Warehouse
}