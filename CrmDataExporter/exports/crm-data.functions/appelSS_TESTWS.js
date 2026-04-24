function appelSS_TESTWS()
{
	//alert( top.MyApp.ExecuteServerScript(39468669445142,[]) );
	//__PS_Cpy_SendExclude();
	
	var arrParams = []
	arrParams[0] = top.MyApp
	arrParams[1] = top.bWizard
	top.MyApp.OpenDlg('42491185326364', arrParams, top, undefined, undefined, undefined, undefined, function() {});
	
	// 41140769477538 (relation fournisseur)41140769477538
	// 41242164544440 (Action salon fournisseur)
	// 41140769477538 (Relation fournisseur)
	// 41678393427760 (Fiche salon manager)
	// 42548174321446 (Pairing Manager)
	// 40640657508944 (Back office upload transfert)
	// 42788081279940 (Send to WeCom)
	// 42628785536564 (get wecom ecternal contacts)
	// 42491185326364 (wecom submission form results)
	// 42628785536564 (wecom ecran prompt user get list External ID by User)--Pas utile
	// 42320085167154 (wecom ecran List Get External ID by User liste)
}