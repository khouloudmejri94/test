function()
{
	//RLM - 13/05/2014
	
	try{
	 alert("Creation DOC");
	 var arrDocTrt = [];
	 if(top.MyApp.GetItemValue("ReqExtPremieredem") == 'A preparer'){
	   top.MyApp.fctExecuteQry("select convert(char,title) as Document, nrid as HIDDEN from sysadm.dm0 where key_words = 'ReqExtPremieredem' and ntype = 12 and template is null ", 'Sélectionner le document à générer :');
	   arrDocTrt.push(top.MyApp.AppSetting.dlgReturn.DocNRID);
	 }
	 if(top.MyApp.GetItemValue("ReqExtRelance") == 'A preparer'){
	   top.MyApp.fctExecuteQry("select convert(char,title) as Document, nrid as HIDDEN from sysadm.dm0 where key_words = 'ReqExtRelance' and ntype = 12 and template is null ", 'Sélectionner le document à générer :');
	   arrDocTrt.push(top.MyApp.AppSetting.dlgReturn.DocNRID);
	 }
	 if(top.MyApp.GetItemValue("ReqExtMiseDemeure") == 'A preparer'){
	   top.MyApp.fctExecuteQry("select convert(char,title) as Document, nrid as HIDDEN from sysadm.dm0 where key_words = 'ReqExtMiseDemeure' and ntype = 12 and template is null ", 'Sélectionner le document à générer :');
	   arrDocTrt.push(top.MyApp.AppSetting.dlgReturn.DocNRID);
	 }
	 if(top.MyApp.GetItemValue("ReqExtAutreCourrier") == 'A preparer'){
	   top.MyApp.fctExecuteQry("select convert(char,title) as Document, nrid as HIDDEN from sysadm.dm0 where key_words = 'ReqExtAutreCourrier' and ntype = 12 and template is null ", 'Sélectionner le document à générer :');
	   arrDocTrt.push(top.MyApp.AppSetting.dlgReturn.DocNRID);
	 }
	 if(top.MyApp.GetItemValue("ReqExtAnnulation") == 'A preparer'){
	   top.MyApp.fctExecuteQry("select convert(char,title) as Document, nrid as HIDDEN from sysadm.dm0 where key_words = 'ReqExtAnnulation' and ntype = 12 and template is null ", 'Sélectionner le document à générer :');
	   arrDocTrt.push(top.MyApp.AppSetting.dlgReturn.DocNRID);
	 }
	 if(top.MyApp.GetItemValue("ReqExtCloture") == 'A preparer'){
	   top.MyApp.fctExecuteQry("select convert(char,title) as Document, nrid as HIDDEN from sysadm.dm0 where key_words = 'ReqExtCloture' and ntype = 12 and template is null ", 'Sélectionner le document à générer :');
	   arrDocTrt.push(top.MyApp.AppSetting.dlgReturn.DocNRID);
	 }
	 if(top.MyApp.GetItemValue("ReqExtMad") == 'A faire'){
	   top.MyApp.fctExecuteQry("select convert(char,title) as Document, nrid as HIDDEN from sysadm.dm0 where key_words = 'ReqExtMad' and ntype = 12 and template is null ", 'Sélectionner le document à générer :');
	   arrDocTrt.push(top.MyApp.AppSetting.dlgReturn.DocNRID);
	 }
	 if(top.MyApp.GetItemValue("ReqExtDestruction") == 'A faire'){
	   top.MyApp.fctExecuteQry("select convert(char,title) as Document, nrid as HIDDEN from sysadm.dm0 where key_words = 'ReqExtDestruction' and ntype = 12 and template is null ", 'Sélectionner le document à générer :');
	   arrDocTrt.push(top.MyApp.AppSetting.dlgReturn.DocNRID);
	 }
	 if(top.MyApp.GetItemValue("ReqExtTraitement") == 'A faire'){
	   top.MyApp.fctExecuteQry("select convert(char,title) as Document, nrid as HIDDEN from sysadm.dm0 where key_words = 'ReqExtTraitement' and ntype = 12 and template is null ", 'Sélectionner le document à générer :');
	   arrDocTrt.push(top.MyApp.AppSetting.dlgReturn.DocNRID);
	 }
	
	 alert(arrDocTrt[0]);
	
	 if(arrDocTrt.length > 0)
	 {
	  var nDocs = top.MyApp.ExecuteServerScript(30261715353454, [top.MyApp.CurrentSetting.CurrentNRID, arrDocTrt.join('<_cut_/>')],null,null,true);
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
}