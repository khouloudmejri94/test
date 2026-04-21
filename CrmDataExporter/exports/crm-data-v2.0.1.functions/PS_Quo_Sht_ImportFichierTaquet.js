function PS_Quo_Sht_ImportFichierTaquet()
{
	//DEBUT FTC@MASAO - MANTIS 14379 - 12/01/2018
	
	if (top.MyApp.CurrentSetting.nChapMode != "Reset") {
	    //HAS : Script d'importation d'un fichiers Excel vers la table xcreateusers
	    //Vérif Securité
	    var v_Client = top.MyApp.GetItemValue("QuoExtClient");
	    var ProfilSecu = top.MyApp.UserSetting.User.ProfileInitials;
	   
	    var vListProfilsValides = "ADMT;ADMF;ADMFT;ACH_TER;ASS_ACH;MAN_HA_TER,ASS_CO;MAN_HA_ASS;QUA";
	   
	   
	   var vProfNeg = "LEAD_NEG;NEG_EXP;NEG_SEN;NEG_JUN;NEG_CNF;MNG_ACH_OPR";
	    var vProf = top.MyApp.UserSetting.User.ProfileInitials;
	    if (vListProfilsValides.indexOf(vProf) == -1 && vProfNeg.indexOf(vProf) == -1) {
	     top.MyApp.OpenDlg("Alert", ["Attention", top.MyApp.arrTranslations["Cette fonctionalité est disponible uniquement pour les Administrateur Techiques et Acheteurs."]]);
	     return false;
	    }
	   
	    top.MyApp.FindItem("QuoExtValeurAchat1").disabled = false;
	    top.MyApp.CurrentSetting.Catalog.QuoExtValeurAchat1.Ed = 1;
	    top.MyApp.SetItem("QuoExtValeurAchat1", "contentEditable", true, top.MyData_View);
	    top.MyApp.FindItem("QuoExtDeviseAchat").disabled = false;
	    top.MyApp.CurrentSetting.Catalog.QuoExtDeviseAchat.Ed = 1;
	    top.MyApp.SetItem("QuoExtDeviseAchat", "contentEditable", true, top.MyData_View);
	    top.MyApp.FindItem("QuoExtValeurVente1").disabled = false;
	    top.MyApp.CurrentSetting.Catalog.QuoExtValeurVente1.Ed = 1;
	    top.MyApp.SetItem("QuoExtValeurVente1", "contentEditable", true, top.MyData_View);
	    top.MyApp.FindItem("QuoExtDeviseVente").disabled = false;
	    top.MyApp.CurrentSetting.Catalog.QuoExtDeviseVente.Ed = 1;
	    top.MyApp.SetItem("QuoExtDeviseVente", "contentEditable", true, top.MyData_View);
	    // HAS DEB Achat 2020 données Proforma
	    top.MyApp.FindItem("QuoExtValeurProforma").disabled = false;
	    top.MyApp.CurrentSetting.Catalog.QuoExtValeurProforma.Ed = 1;
	    top.MyApp.SetItem("QuoExtValeurProforma", "contentEditable", true, top.MyData_View);
	    top.MyApp.FindItem("QuoExtDeviseProforma").disabled = false;
	    top.MyApp.CurrentSetting.Catalog.QuoExtDeviseProforma.Ed = 1;
	    top.MyApp.SetItem("QuoExtDeviseProforma", "contentEditable", true, top.MyData_View);
	    top.MyApp.FindItem("QuoExtPaysFacturation").disabled = false;
	    top.MyApp.CurrentSetting.Catalog.QuoExtPaysFacturation.Ed = 1;
	    top.MyApp.SetItem("QuoExtPaysFacturation", "contentEditable", true, top.MyData_View);
	     
	     top.MyApp.FindItem("QuoExtCoutTest").disabled = false;
	    top.MyApp.CurrentSetting.Catalog.QuoExtCoutTest.Ed = 1;
	     top.MyApp.SetItem("QuoExtCoutTest", "contentEditable", true, top.MyData_View);
	     
	     top.MyApp.FindItem("QuoExtDeviseTest").disabled = false;
	    top.MyApp.CurrentSetting.Catalog.QuoExtDeviseTest.Ed = 1;
	     top.MyApp.SetItem("QuoExtDeviseTest", "contentEditable", true, top.MyData_View);
	    top.MyApp.FindItem("QuoExtDeviseMarge").disabled = false;
	    top.MyApp.CurrentSetting.Catalog.QuoExtDeviseMarge.Ed = 1;
	    top.MyApp.SetItem("QuoExtDeviseMarge", "contentEditable", true, top.MyData_View);
	    top.MyApp.FindItem("QuoExtValMargeNego").disabled = false;
	    top.MyApp.CurrentSetting.Catalog.QuoExtValMargeNego.Ed = 1;
	    top.MyApp.SetItem("QuoExtValMargeNego", "contentEditable", true, top.MyData_View);
	     
	    //Browse le fichier
	   
	    //url vers le WDS de'ouverture d'un fichier excel
	   
	    var strURL = top.MyApp.AppSetting.RootPath + "UICache/DynaScreen/" + top.MyApp.UserSetting.User.Database + "/38791249429748.aspx?SID=" + top.MyApp.AppSetting.sstrSID;
	   
	   
	    //construction d'un Form pas affiché avec 2 cmhamps hidden , les champs de paramètre commeQuoNRID 
	    top.MyApp.$("body").append("<form id=frmUploadXL name=frmUploadXL enctype='multipart/form-data' method='post' action='" + strURL + "' target=fraRSAsynchronous>"
	    + "<input type=file id='browseCustom' name='browseCustom' style='display:none'><input type='hidden' id='QuoNRID' name='QuoNRID' ><input type='hidden' id='QuoExtClient' name='QuoExtClient' > </form>");
	   
	    //passage valeur parametre QuoNRID
	    top.MyApp.$("#QuoNRID").val(top.MyApp.GetItemValue('QuoNRID') );
	    top.MyApp.$("#QuoExtClient").val(top.MyApp.GetItemValue("QuoExtClient") );
	   // top.MyApp.$("#QuoExtClient").val('QuoExtClient');
	   
	   
	    top.MyApp.$("#browseCustom").trigger("click");
	    top.MyApp.$("#browseCustom").change(function ()
	    {
	     top.AppSetting.dlgReturn = [top.MyApp.$("#browseCustom").val(), top.MyApp.$("#QuoNRID").val()];
	     top.MyApp.frmUploadXL.submit();
	     // fermer le WDS strURL
	      top.MyApp.$("#frmUploadXL").remove();
	   });
	    
	   }
}