function PS_Itm_OnBeforeInsertUpdate()
{
	var select = top.MyApp.FindItem("ItmExtLstBinome", top.MyData_View);
	console.log('onbefore insertupdate');
	if (top.MyApp.GetItemValue("ItmExtCible", top.MyData_View) == 'BINOME') {
	
	    // Vérifier si la liste contient des options
	    if (select.options.length === 0) {
	        console.log('La liste est vide.');
	        top.MyApp.asyncOpenDlg("Alert", ["Alerte", "Cet acheteur n'a pas de binômes, veuillez sélectionner un autre"], null, false, null, null, null, function(p) {});
	        return false;
	
	    } else {
	        // Vérifier s'il y a une sélection
	        if (select.selectedOptions.length > 0) {
	            console.log('Au moins un élément est sélectionné.');
	            //return true;
	        } else {
	            console.log('Aucun élément sélectionné.');
	            top.MyApp.asyncOpenDlg("Alert", ["Alerte", "Veuillez sélectionner un binôme"], null, false, null, null, null, function(p) {});
	            return false;
	
	        }
	    }
	} 
		
	var vFicheMofified = top.MyApp.GetItemAttributeFromXML(top.MyApp.CurrentSetting.Record_XML, "Result", "blnModified");
	var vStatut = top.MyApp.GetItemValue("ItmExtStatut", top.MyData_View);
	var vStatutModified = top.MyApp.GetItemAttributeFromXML(top.MyApp.CurrentSetting.Record_XML, "ItmExtStatut", "blnModified");
	var vBinomeModified = top.MyApp.GetItemAttributeFromXML(top.MyApp.CurrentSetting.Record_XML, "ItmExtBinome", "blnModified");
	
	var xmlDoc = top.MyApp.CurrentSetting.Record_XML;
	
	// --- Sélectionne la balise <Flds> ---
	var flds = xmlDoc.querySelector("Flds");
	
	// --- Compte les enfants avec blnModified="true" ---
	var countModified = Array.from(flds.children).filter(node =>
	    node.getAttribute("blnModified") === "true"
	).length;
	
	console.log("Nombre de balises avec blnModified='true' :", countModified);
	
	if (vBinomeModified && countModified == 1) {
	    return true;
	} else {
	    if (vFicheMofified && vStatut != "BROUILLON" && !vStatutModified) {
	        top.MyApp.asyncOpenDlg("Alert", ["Alerte", "Votre consigne a été modifiée. Si vous continuer la sauvegarde, elle passera au statut Brouillon.\n voulez vous continuer?", "YesNo"], null, false, null, null, null, function(p) {});
	        if (top.MyApp.AppSetting.dlgReturn[0] == true) {
	            top.MyApp.SetItemValue('ItmExtStatut', 'BROUILLON');
	        } else {
	            return false;
	        }
	    }
	
	}
}