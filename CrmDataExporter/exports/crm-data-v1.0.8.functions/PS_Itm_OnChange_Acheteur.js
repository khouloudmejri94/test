function()
{
	console.log('Alimentation du bum et zm');
	var vacheteur = top.MyApp.GetItemValue("ItmExtAcheteur", top.MyData_View);
	var vBUM = '';
	var vZM = '';
	var sQuery = "Select top 1 BUM.titulaire as BUM , ZM.titulaire as ZM from sysadm.am0 tit ";
	sQuery += "Left join sysadm.am0 BUM on BUM.fonction = 'Manager Achat Opérationnel' and BUM.xzone NOT LIKE 'ZONE MANAGER%' ";
	sQuery += "and BUM.titulaire in (Select personne from sysadm.res_liees where vue_equipe = tit.team_name and vue_ressource != 'TEMP') ";
	sQuery += "And BUM.bactive = 1 ";
	sQuery += "Left join sysadm.am0 ZM on ZM.fonction = 'Manager Achat Opérationnel' ";
	sQuery += "and ZM.xzone LIKE 'ZONE MANAGER%' ";
	sQuery += "and ZM.titulaire in (Select personne from sysadm.res_liees where vue_equipe = tit.team_name and vue_ressource != 'TEMP' ) ";
	sQuery += "And ZM.bactive = 1 ";
	sQuery += "where tit.template is null and (BUM.titulaire is not null or ZM.titulaire is not null) "; //and '" + vacheteur +"'";
	
	
	// + vacheteur +"'";
	var sQueryRes = top.MyApp.fctGetQryResult(sQuery, false, 0, 1);
	//console.log(sQueryRes);
	var fullcount = top.MyApp.GetItemAttributeFromXML(sQueryRes, "Result", "FullCount");
	if (parseInt(fullcount) === 1) {
	    vBUM = top.MyApp.GetItemAttributeFromXML(sQueryRes, "ResName", "Val", "../id", 1);
	    vZM = top.MyApp.GetItemAttributeFromXML(sQueryRes, "ResName-1", "Val", "../id", 1);
	}
	
	console.log('BUM et ZM alimentés :', vBUM, vZM);
	
	top.MyApp.SetItemValue('ItmExtBUM',vBUM);
	top.MyApp.SetItemValue('ItmExtZM',vZM);
	
	PS_Itm_OnChange_Cible();
	
	console.log("fin on change acheteur");
}