function()
{
	//url vers le WDS de'ouverture d'un fichier excel
	var strURL = AppSetting.RootPath + "UICache/DynaScreen/" + UserSetting.User.Database + "/38651249449740.aspx?SID=" + top.AppSetting.sstrSID;
	
	//construction d'un Form pas affcihé avec 2 cmhamps hidden , les champs de paramètre commeQuoNRID 
	top.MyApp.$("body").append("<form id=frmUploadXL name=frmUploadXL enctype='multipart/form-data' method='post' action='" + strURL + "' target=fraRSAsynchronous>"
	 + "<input type=file id='browseCustom' name='browseCustom' style='display:none'><input type='hidden' id='QuoNRID' name='QuoNRID' > </form>");
	
	//passage valeur parametre QuoNRID
	top.MyApp.$("#QuoNRID").val(top.MyApp.GetItemValue('QuoNRID') );
	top.MyApp.$("#browseCustom").trigger("click");
	top.MyApp.$("#browseCustom").change(function ()
	{
	 top.AppSetting.dlgReturn = [top.MyApp.$("#browseCustom").val(), top.MyApp.$("#QuoNRID").val()];
	 top.MyApp.frmUploadXL.submit();
	
	
	/* technique pour recuperer des retour autres que flux de fichier
	  top.MyApp.$.post( strURL , top.MyApp.$("#frmUploadXL").serialize(), function( data ) {
	  alert( "Data Loaded: " + data );
	});
	
	*/
	// fermer le WDS strURL
	 top.MyApp.$("#frmUploadXL").remove();
	});
}