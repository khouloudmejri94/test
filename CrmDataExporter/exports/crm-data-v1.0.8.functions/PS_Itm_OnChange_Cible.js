function()
{
	console.log("Affichage et alimentation du champ binôme");
	var select = top.MyApp.FindItem("ItmExtLstBinome", top.MyData_View);
	var vacheteur = top.MyApp.GetItemValue("ItmExtAcheteur", top.MyData_View);
	console.log(vacheteur);
	var vProspecteurs = [];
	var vCible = top.MyApp.GetItemValue("ItmExtCible", top.MyData_View);
	var binomeHnd = top.MyApp.FindItem('ItmExtLstBinome', top.MyData_View);
	var sQuery = "";
	var pLn = "ResName";
	
	if (vCible == "BINOME") {
	    pLn = "ExtPrsPrsNgTitulaireRef1";
	    sQuery = "select titulaire_ref1 from sysadm.x_pairs_pros_neg where (End_date >= getdate() or End_date is null) and titulaire_ref2 = '" + vacheteur + "'";
	} else if (vCible == "NESTING") {
	    sQuery = "select distinct titulaire from sysadm.am0 ";
	    sQuery += "inner join sysadm.am6 on am6.template is null and am6.am0_nrid = am0.nrid and am6.ap00_name = 'Famille de produit' ";
	    sQuery += "inner join (select ar0.ref ,  XACHETEUR , am6.ap01_name , am6.ap00_name, am0.nrid , am0.xplateau ";
	    sQuery += "from sysadm.ar0 inner join sysadm.am0 on am0.titulaire = ar0.XACHETEUR ";
	    sQuery += "inner join sysadm.am6 on am6.template is null and am6.am0_nrid = am0.nrid and am6.ap00_name = 'Famille de produit' ";
	    sQuery += "where ar0.template is null and am0.template is null and xAcheteur = '" + vacheteur + "')s on am6.ap01_name = s.ap01_name ";
	    sQuery += "and am0.fonction = 'Prospecteur' and (am0.team_name like '%ZAD%' or am0.team_name like '%NESTING%')  and s.xplateau = am0.xplateau";
	}
	/*else if (vCible == "PUBLIC") {
	    sQuery = "select distinct titulaire from sysadm.am0 ";
	    sQuery += "inner join sysadm.am6 on am6.template is null and am6.am0_nrid = am0.nrid and am6.ap00_name = 'Famille de produit' ";
	    sQuery += "inner join (select ar0.ref ,  XACHETEUR , am6.ap01_name , am6.ap00_name, am0.nrid , am0.xplateau ";
	    sQuery += "from sysadm.ar0 inner join sysadm.am0 on am0.titulaire = ar0.XACHETEUR ";
	    sQuery += "inner join sysadm.am6 on am6.template is null and am6.am0_nrid = am0.nrid and am6.ap00_name = 'Famille de produit' ";
	    sQuery += "where ar0.template is null and am0.template is null and xAcheteur = '"+vacheteur +"')s on am6.ap01_name = s.ap01_name and am0.fonction = 'Prospecteur' and s.xplateau = am0.xplateau";
	}*/
	else {
	    vCible = "";
	}
	
	
	if (vCible == "BINOME" || (vCible == "NESTING" && top.MyApp.CustomSetting.AdmFonction == "Coach prospection")) {
	    var sQueryRes = top.MyApp.fctGetQryResult(sQuery, false, 0, 100);
	    //console.log(sQueryRes);
	    var fullcount = top.MyApp.GetItemAttributeFromXML(sQueryRes, "Result", "FullCount");
	    binomeHnd.hidden = false;
	
	    if (fullcount > 0) {
	        for (var i = 1; i <= fullcount; i++) {
	            vProspecteurs.push(top.MyApp.GetItemAttributeFromXML(sQueryRes, pLn, "Val", "../id", i));
	        }
	
	        top.MyApp.FindItem("ItmExtLstBinome", top.MyData_View).innerHTML = '';
	        console.log("Nombre de prospecteurs récupérés :", vProspecteurs.length);
	
	        vProspecteurs.forEach(binomeStr => {
	            const option = document.createElement('option');
	            option.value = binomeStr;
	            option.textContent = binomeStr;
	            select.appendChild(option);
	        });
	
	    } else {
	        top.MyApp.FindItem("ItmExtLstBinome", top.MyData_View).innerHTML = '';
	    }
	} else {
	    binomeHnd.hidden = true;
	    top.MyApp.FindItem("ItmExtLstBinome", top.MyData_View).innerHTML = '';
	}
}