function()
{
		if(top.CurrentSetting.nChapMode !="Open" ) return false;
	top.MyApp.fraMenuBar.Execute("R_Save");
	
	
	try{
	 var arrDocTrt = [];
	 if(top.MyApp.GetItemValue("ReqExtPremieredem") == 'A preparer'){
	   top.MyApp.fctExecuteQry("select convert(varchar(50),title) as Document, nrid as HIDDEN from sysadm.dm0 where key_words = 'ReqExtPremieredem' and ntype = 12 and template is null order by convert(varchar(50),title) ", 'Sélectionner le document Premiere demande à générer :');
	   arrDocTrt.push(top.MyApp.AppSetting.dlgReturn.DocNRID);
	 }
	 if(top.MyApp.GetItemValue("ReqExtRelance") == 'A preparer'){
	   top.MyApp.fctExecuteQry("select convert(varchar(50),title) as Document, nrid as HIDDEN from sysadm.dm0 where key_words = 'ReqExtRelance' and ntype = 12 and template is null order by convert(varchar(50),title) ", 'Sélectionner le document Relance à générer :');
	   arrDocTrt.push(top.MyApp.AppSetting.dlgReturn.DocNRID);
	 }
	 if(top.MyApp.GetItemValue("ReqExtMiseDemeure") == 'A preparer'){
	   top.MyApp.fctExecuteQry("select convert(varchar(50),title) as Document, nrid as HIDDEN from sysadm.dm0 where key_words = 'ReqExtMiseDemeure' and ntype = 12 and template is null order by convert(varchar(50),title) ", 'Sélectionner le document Mise en demeure à générer :');
	   arrDocTrt.push(top.MyApp.AppSetting.dlgReturn.DocNRID);
	 }
	 if(top.MyApp.GetItemValue("ReqExtAutreCourrier") == 'A preparer'){
	   top.MyApp.fctExecuteQry("select convert(varchar(50),title) as Document, nrid as HIDDEN from sysadm.dm0 where key_words = 'ReqExtAutreCourrier' and ntype = 12 and template is null order by convert(varchar(50),title) ", 'Sélectionner le document Autre Courrier à générer :');
	   arrDocTrt.push(top.MyApp.AppSetting.dlgReturn.DocNRID);
	 }
	 if(top.MyApp.GetItemValue("ReqExtAnnulation") == 'A preparer'){
	   top.MyApp.fctExecuteQry("select convert(varchar(50),title) as Document, nrid as HIDDEN from sysadm.dm0 where key_words = 'ReqExtAnnulation' and ntype = 12 and template is null order by convert(varchar(50),title) ", 'Sélectionner le document Annulation à générer :');
	   arrDocTrt.push(top.MyApp.AppSetting.dlgReturn.DocNRID);
	 }
	 if(top.MyApp.GetItemValue("ReqExtCloture") == 'A preparer'){
	   top.MyApp.fctExecuteQry("select convert(varchar(50),title) as Document, nrid as HIDDEN from sysadm.dm0 where key_words = 'ReqExtCloture' and ntype = 12 and template is null order by convert(varchar(50),title) ", 'Sélectionner le document Cloture à générer :');
	   arrDocTrt.push(top.MyApp.AppSetting.dlgReturn.DocNRID);
	 }
	 if(top.MyApp.GetItemValue("ReqExtCourMAD") == 'A preparer'){
	   top.MyApp.fctExecuteQry("select convert(varchar(50),title) as Document, nrid as HIDDEN from sysadm.dm0 where key_words = 'ReqExtCourMAD' and ntype = 12 and template is null order by convert(varchar(50),title) ", 'Sélectionner le document Courrier MAD à générer :');
	   arrDocTrt.push(top.MyApp.AppSetting.dlgReturn.DocNRID);
	 }
	
	
	 if(top.MyApp.GetItemValue("ReqExtMad") == 'A faire'){
	   top.MyApp.fctExecuteQry("select convert(varchar(50),title) as Document, nrid as HIDDEN from sysadm.dm0 where key_words = 'ReqExtMad' and ntype = 12 and template is null order by convert(varchar(50),title) ", 'Sélectionner le document MAD à générer :');
	   arrDocTrt.push(top.MyApp.AppSetting.dlgReturn.DocNRID);
	 }
	 if(top.MyApp.GetItemValue("ReqExtDestruction") == 'A faire'){
	   top.MyApp.fctExecuteQry("select convert(varchar(50),title) as Document, nrid as HIDDEN from sysadm.dm0 where key_words = 'ReqExtDestruction' and ntype = 12 and template is null order by convert(varchar(50),title) ", 'Sélectionner le document Destruction à générer :');
	   arrDocTrt.push(top.MyApp.AppSetting.dlgReturn.DocNRID);
	 }
	 if(top.MyApp.GetItemValue("ReqExtTraitement") == 'A faire'){
	   top.MyApp.fctExecuteQry("select convert(varchar(50),title) as Document, nrid as HIDDEN from sysadm.dm0 where key_words = 'ReqExtTraitement' and ntype = 12 and template is null order by convert(varchar(50),title) ", 'Sélectionner le document Traitement à générer :');
	   arrDocTrt.push(top.MyApp.AppSetting.dlgReturn.DocNRID);
	 }
	
	 if(arrDocTrt.length > 0)
	 {
	  var nDocs = top.MyApp.ExecuteServerScript(30261715353454, [top.MyApp.CurrentSetting.CurrentNRID, arrDocTrt.join('<_cut_/>'),top.MyApp.GetItemValue("ReqExtSocCAE")],null,null,true);
	
	     //console.log(nDocs);
	
	  //Alerte fin de traitement
	  top.MyApp.OpenDlg("Alert",["Attention", nDocs + " document(s) généré(s)."]);  
	     
	 }
	 else
	 {
	  top.MyApp.OpenDlg("Alert",["Attention", "Pas de modèle de document à faire ou à préparer, veuillez vérifier les status."]);    
	  return false //si pas de document généré on en met pas à jour les statuts
	 }
	}catch(e){
	 top.MyApp.OpenDlg("Alert",["Attention", e.message]);
	}
			var vTypeToUpd = "Creation";
	PS_Req_MajStatutLitige(vTypeToUpd);
	return true;
}