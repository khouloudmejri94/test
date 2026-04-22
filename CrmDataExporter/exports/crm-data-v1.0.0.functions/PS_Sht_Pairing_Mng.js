function PS_Sht_Pairing_Mng()
{
	//alert( top.MyApp.ExecuteServerScript(39468669445142,[]) );
	//__PS_Cpy_SendExclude();
	
	var arrParams = []
	arrParams[0] = top.MyApp
	arrParams[1] = top.bWizard
	top.MyApp.OpenDlg('42548174321446', arrParams, top, undefined, undefined, undefined, undefined, function() {});
	
	// 41140769477538 (relation fournisseur)41140769477538
	// 41242164544440 (Action salon fournisseur)
	// 41140769477538 (Relation fournisseur)
	// 41678393427760 (Fiche salon manager)
	// 42548174321446 (Pairing Manager)
}