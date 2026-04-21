function AfterLoad_Header_1000084()
{
	PS_Itm_loadiflsname();
	
	 var universHnd = top.MyApp.FindItem("ItmExtUnivers", top.MyData_View);
	 if (universHnd ) {
	  top.MyApp.fctRemoveEvent(universHnd, "change", PS_Itm_loadiflsname);
	  top.MyApp.fctAddEvent(universHnd, "change", PS_Itm_loadiflsname);
	 }
	
	
	 var familleHnd = top.MyApp.FindItem("ItmExtFam", top.MyData_View);
	 if (familleHnd ) {
	  top.MyApp.fctRemoveEvent(familleHnd, "change", PS_Itm_loadiflsname);
	  top.MyApp.fctAddEvent(familleHnd , "change", PS_Itm_loadiflsname);
	 }
	
	var ssFamilleHnd = top.MyApp.FindItem("ItmExtSousFam", top.MyData_View);
	 if (ssFamilleHnd ) {
	  top.MyApp.fctRemoveEvent(ssFamilleHnd, "change", PS_Itm_loadiflsname);
	  top.MyApp.fctAddEvent(ssFamilleHnd, "change", PS_Itm_loadiflsname);
	 }
	
	
	
	 // === MODIFICATION DU LABEL Label42558985328954 : ALIGNEMENT À DROITE FORCÉ (COMME TON CODE ORIGINAL) ===
	
	// ?? Trouver l’ancien label
	var oldLabel = top.MyApp.FindItem("Label42558985328954", top.MyApp.CurrentSetting.CurrentView);
	
	// Si trouvé, on recrée et remplace (exactement comme ton exemple avec le select)
	if (oldLabel) {
	    // Récupérer le texte actuel du label (sans modification)
	    var currentText = oldLabel.innerHTML || oldLabel.textContent || "";
	
	    // Créer le nouveau span (comme ton <select>)
	    var newLabel = document.createElement('span');
	    newLabel.id = 'Label42558985328954'; // Garde le même ID
	    newLabel.textContent = currentText + " :";  // Texte identique
	
	    // === FORCER L'ALIGNEMENT À DROITE + SUPPRIMER PADDING (pour contrer les styles existants) ===
	    newLabel.style.cssText = 'text-align: right !important; padding: 0 !important;';
	
	    // Remplacer l’ancien par le nouveau (comme ton replaceChild)
	    oldLabel.parentNode.replaceChild(newLabel, oldLabel);
	
	    // === FORCER SUR LE PARENT (td ou div) AU CAS OÙ LE STYLE EST BLOQUÉ PAR TABLEAU ===
	    var parent = newLabel.parentNode;
	    if (parent) {
	        parent.style.cssText += '; text-align: right !important; padding-left: 0 !important; padding-right: 0 !important;';
	    }
	
	    // Force repaint complet (Selligent peut ignorer sinon)
	    void newLabel.offsetHeight; // trigger reflow
	    if (parent) void parent.offsetHeight;
	
	
	} else {
	    console.log("Label Label42558985328954 non trouvé.");
	}
	
	
		
	//console.log("Header");
	var vMode = top.MyApp.CurrentSetting.nChapMode;
	var vProfiluser = top.MyApp.UserSetting.User.ProfileInitials;
	var vUserName = top.MyApp.UserSetting.User.Name;
	
	if (vMode == "New" || vMode == "Open") {
	
	 var createurHnd = top.MyApp.FindItem("ItmExtAcheteur", top.MyData_View);
	 if (createurHnd) {
	  top.MyApp.fctRemoveEvent(createurHnd, "change", PS_Itm_OnChange_Acheteur);
	  top.MyApp.fctAddEvent(createurHnd, "change", PS_Itm_OnChange_Acheteur);
	 }
	
	 var DateDebHnd = top.MyApp.FindItem("ItmExtDateDeb", top.MyData_View);
	 if (DateDebHnd) {
	  top.MyApp.fctRemoveEvent(DateDebHnd, "change", PS_Itm_OnChange_DateDebut);
	  top.MyApp.fctAddEvent(DateDebHnd, "change", PS_Itm_OnChange_DateDebut);
	 }
	
	 var DateFinHnd = top.MyApp.FindItem("ItmExtDateFin", top.MyData_View);
	 if (DateFinHnd) {
	  top.MyApp.fctRemoveEvent(DateFinHnd, "change", PS_Itm_OnChange_DateFin);
	  top.MyApp.fctAddEvent(DateFinHnd, "change", PS_Itm_OnChange_DateFin);
	 }
	
	 var CibleHnd = top.MyApp.FindItem("ItmExtCible", top.MyData_View);
	 if (CibleHnd) {
	  top.MyApp.fctRemoveEvent(CibleHnd, "change", PS_Itm_OnChange_Cible);
	  top.MyApp.fctAddEvent(CibleHnd, "change", PS_Itm_OnChange_Cible);
	 }
	
	    var SourceHnd = top.MyApp.FindItem("ItmExtSource", top.MyData_View);
	 if (SourceHnd) {
	  top.MyApp.fctRemoveEvent(SourceHnd, "change", PS_Itm_OnChange_Source);
	  top.MyApp.fctAddEvent(SourceHnd, "change", PS_Itm_OnChange_Source);
	 }
	
	   var TypeHnd = top.MyApp.FindItem("ItmExtType", top.MyData_View);
	 if (TypeHnd ) {
	  top.MyApp.fctRemoveEvent(TypeHnd , "change", PS_Itm_OnChange_Type);
	  top.MyApp.fctAddEvent(TypeHnd , "change", PS_Itm_OnChange_Type);
	 }
	
	if (top.MyApp.GetItemValue("ItmExtStatut", top.MyData_View)== "INCOMPLETE") {
	    top.MyApp.SetItem("ItmExtCommentaires", "style.visibility", "", top.MyData_View);
	    top.MyApp.SetItem("ItmExtCommentaires", "parentElement.previousSibling.style.visibility", "");
	    top.MyApp._gfctSetClassName("ItmExtCommentaires", "NM");
	} else {
	    top.MyApp.SetItem("ItmExtCommentaires", "style.visibility", "hidden", top.MyData_View);
	    top.MyApp.SetItem("ItmExtCommentaires", "parentElement.previousSibling.style.visibility", "hidden");
	    top.MyApp._gfctSetClassName("ItmExtCommentaires", "UM");
	}
	
	}
	
		
	
	var vStatut = top.MyApp.GetItemValue("ItmExtStatut");
	
	
	
	var btnAVALIDER = top.MyApp.FindItem('Sht42400073139556', top.MyData_View);
	var btnVALIDER = top.MyApp.FindItem('Sht42728273159556', top.MyData_View);
	var btnCLOTURER = top.MyApp.FindItem('Sht42601173259556', top.MyData_View);
	var btnARENOUVELER = top.MyApp.FindItem('Sht42077973279556', top.MyData_View);
	var btnRENOUVELER = top.MyApp.FindItem('Sht42599373269556', top.MyData_View);
	var btnREJETER= top.MyApp.FindItem('Sht42099681359352', top.MyData_View);
	var btnINCOMPLETE= top.MyApp.FindItem('Sht42698781349352', top.MyData_View);
	var btnAFFECTER= top.MyApp.FindItem('Sht42349073239726', top.MyData_View);
	
	if (btnAVALIDER) btnAVALIDER.disabled = true;
	if (btnVALIDER)  btnVALIDER.disabled = true;
	if (btnCLOTURER) btnCLOTURER.disabled = true;
	if (btnARENOUVELER) btnARENOUVELER.disabled = true;
	if (btnRENOUVELER) btnRENOUVELER.disabled = true;
	if (btnREJETER) btnREJETER.disabled = true;
	if (btnINCOMPLETE) btnINCOMPLETE.disabled = true;
	if (btnAFFECTER) btnAFFECTER.disabled = true;
	
	if(top.MyApp.CurrentSetting.nChapMode == "Open") {
	
	  if (vStatut == "BROUILLON") {
	   if (btnAVALIDER) btnAVALIDER.disabled = false;
	   if (btnVALIDER)  btnVALIDER.disabled = false;
	   if (btnCLOTURER) btnCLOTURER.disabled = false;  
	  }
	
	  if (vStatut == "AVALIDER") {
	   if (btnVALIDER)  btnVALIDER.disabled = false;
	   if (btnINCOMPLETE) btnINCOMPLETE.disabled = false;
	   if (btnCLOTURER) btnCLOTURER.disabled = false;
	   if (btnREJETER) btnREJETER.disabled = false;  
	  }
	
	  if (vStatut == "VALIDER") {
	   if (btnCLOTURER) btnCLOTURER.disabled = false;
	   if (btnARENOUVELER) btnARENOUVELER.disabled = false;
	   if (btnAFFECTER ) btnAFFECTER.disabled = false;
	
	  }
	
	  if (vStatut == "EXPIRER") {
	   if (btnARENOUVELER) btnARENOUVELER.disabled = false;  
	  }
	
	  if (vStatut == "ARENOUVELER") {
	   if (btnRENOUVELER) btnRENOUVELER.disabled = false;
	   if (btnCLOTURER) btnCLOTURER.disabled = false;   
	  }
	
	  if (vStatut == "RENOUVELER") {
	   if (btnCLOTURER) btnCLOTURER.disabled = false;
	   if (btnARENOUVELER) btnARENOUVELER.disabled = false; 
	   if (btnAFFECTER ) btnAFFECTER.disabled = false; 
	 }
	
	
	  if (vStatut == "INCOMPLETE") {
	   if (btnAVALIDER) btnAVALIDER.disabled = false;   
	 }
	
	}
	
	
	
	
	
		
	
	var vProf= top.MyApp.UserSetting.User.ProfileInitials;
	
	
	var vListProfilsValides = "LEAD_NEG;ADMT;ADMF;ADMFT";
	
	var vInAcheteur = top.MyApp.FindItem("ItmExtAcheteur");
	
	if (vListProfilsValides.indexOf(vProf) > -1) {
	
	    
	    if (vInAcheteur) vInAcheteur.disable = false;
	}
	else {
	
	    if (vInAcheteur) vInAcheteur.disable = true;
	}
	
	 
	
	
		//console.log("header binome");
	var vacheteur = top.MyApp.GetItemValue("ItmExtAcheteur", top.MyData_View);
	var vCible = top.MyApp.GetItemValue("ItmExtCible", top.MyData_View);
	
	
	    var vProspecteurs = [];
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
	    sQuery += "and am0.fonction = 'Prospecteur' and am0.bactive = 1 and (am0.team_name like '%ZAD%' or am0.team_name like '%NESTING%')  and s.xplateau = am0.xplateau";
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
	  
	
	    var sQueryRes = top.MyApp.fctGetQryResult(sQuery, false, 0, 100);
	    //console.log(sQueryRes);
	    var fullcount = top.MyApp.GetItemAttributeFromXML(sQueryRes, "Result", "FullCount");
	    if (fullcount > 0) {
	        for (var i = 1; i <= fullcount; i++) {
	            vProspecteurs.push(top.MyApp.GetItemAttributeFromXML(sQueryRes, pLn, "Val", "../id", i));
	        }
	
	    }
	
	    //console.log(vProspecteurs);
	    const input = top.MyApp.FindItem("Label42437978512464", top.MyData_View);
	
	    // 2. Créer le nouveau champ <select multiple>
	    const select = document.createElement('select');
	    select.id = 'ItmExtLstBinome'; // garder le même ID si nécessaire
	    select.name = 'ItmExtLstBinome';
	    select.textContent = 'Binome(s) ';
	    select.multiple = true;
	    select.style.width = '223px';
	    select.style.height = '50px';
	
	
	    vProspecteurs.forEach(binomeStr => {
	        const option = document.createElement('option');
	        option.value = binomeStr;
	        option.textContent = binomeStr;
	        select.appendChild(option);
	    });
	
	    top.MyApp.FindItem("Label42437978512464", top.MyData_View).parentNode.replaceChild(select, input);
	
	
	    select.addEventListener('change', () => {
	        const selectedValues = Array.from(select.selectedOptions).map(opt => opt.value);
	        //console.log('vProspecteurs sélectionnées :', selectedValues);
	        // ici tu peux aussi les stocker dans une variable globale ou les injecter ailleurs dans le DOM
	        top.MyApp.SetItemValue('ItmExtBinome', selectedValues.join(','));
	    });
	
	    if (vMode == 'Open') {
	        // Exemple de valeur par défaut
	        const defaultValues = top.MyApp.GetItemValue("ItmExtBinome", top.MyData_View);
	        // Séparation des valeurs par une virgule
	        const valuesArray = defaultValues.split(',');
	        // Récupération du select
	        const select = top.MyApp.FindItem("ItmExtLstBinome", top.MyData_View);
	        // Préselection des options
	        for (let option of select.options) {
	            if (valuesArray.includes(option.value)) {
	                option.selected = true;
	            }
	        }
	    }
	
	
	if ((vMode == "New" || vMode == "Open") && (vCible == "BINOME" || (vCible == "NESTING" && top.MyApp.CustomSetting.AdmFonction == "Coach prospection"))) {
	    top.MyApp.FindItem('ItmExtLstBinome', top.MyData_View).hidden = false;
	} else {
	    top.MyApp.FindItem('ItmExtLstBinome', top.MyData_View).hidden = true;
	}
		
	if (top.MyApp.GetItemValue("ItmExtStatut") == "CLOTURER" || top.MyApp.GetItemValue("ItmExtStatut") == "REJETER") {
	    top.MyApp.fraMenuBar.UpdateMenuItem('R_Edit', 'Di');
	    top.MyApp.fraMenuBar.UpdateMenuItem('R_Save', 'Di');
	} else {
	    top.MyApp.fraMenuBar.UpdateMenuItem('R_Edit', 'E');
	    top.MyApp.fraMenuBar.UpdateMenuItem('R_Save', 'E');
	}
	
		if (top.MyApp.CurrentSetting.nChapMode == "Open") {
	    if (top.MyApp.GetItemValue("ItmExtDateValider") == '') {
	        top.MyApp.FindItem('ItmExtDateDebBtn', top.MyData_View).disabled = true;
	        top.MyApp.FindItem('ItmExtDateFinBtn', top.MyData_View).disabled = true;
	    } else {
	        top.MyApp.FindItem('ItmExtDateDebBtn', top.MyData_View).disabled = false;
	        top.MyApp.FindItem('ItmExtDateFinBtn', top.MyData_View).disabled = false;
	    }
	}
}