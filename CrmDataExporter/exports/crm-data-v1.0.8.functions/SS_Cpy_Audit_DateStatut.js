function()
{
	// SS_Cpy_Audit_DateStatut
	var vStatAudit = CurrentRecord["CpyExtAuditStatus"];
	if (CurrentRecord.IsUpdated("CpyExtAuditStatus") == true) {
	    if (vStatAudit == 'A SUPPRIMER') {
	        CurrentRecord["CpyExtValidSas"] = "METTRE EN POUBELLE";
	        CurrentRecord["CpyExtAdtDatTodelete"] = DateTime.Now.ToString("dd/MM/yyyy");
	        CurrentRecord["CpyExtAdtUserTodelete"] = CurrentUserName ;
	    } else if (vStatAudit == 'A vérifier') {
	        CurrentRecord["CpyExtAdtDatToverify"] = DateTime.Now.ToString("dd/MM/yyyy");
	        CurrentRecord["CpyExtAdtUserToverify"] = CurrentUserName ;
	    } else if (vStatAudit == 'Approuvé') {
	        CurrentRecord["CpyExtAdtDatApprove"] = DateTime.Now.ToString("dd/MM/yyyy");
	        CurrentRecord["CpyExtAdtUserApprove"] = CurrentUserName ;
	        //Mobile
	        if (CurrentRecord["CpyExtPropMobile"] != '' && CurrentRecord["CpyExtPropMobile"] != null) {
	            CurrentRecord["CpyExtMobile"] = CurrentRecord["CpyExtPropMobile"];
	        }
	        //Email
	        if (CurrentRecord["CpyExtPropEmail"] != '' && CurrentRecord["CpyExtPropEmail"] != null) {
	            CurrentRecord["CpyEmailAddress"] = CurrentRecord["CpyExtPropEmail"];
	        }
	        //Famille de produit
	        if (CurrentRecord["CpyExtPropFamilProd"] != '' && CurrentRecord["CpyExtPropFamilProd"] != null) {
	            CurrentRecord["CpyExtFamilleProd"] = CurrentRecord["CpyExtPropFamilProd"];
	        }
	        //Nayure de produit
	        if (CurrentRecord["CpyExtPropNatprod"] != '' && CurrentRecord["CpyExtPropNatprod"] != null) {
	            CurrentRecord["CpyAddr1Department"] = CurrentRecord["CpyExtPropNatprod"];
	        }
	        //Rue
	        if (CurrentRecord["CpyExtPropStreet"] != '' && CurrentRecord["CpyExtPropStreet"] != null) {
	            CurrentRecord["CpyAddr1StrName"] = CurrentRecord["CpyExtPropStreet"];
	        }
	        //Ville
	        if (CurrentRecord["CpyExtPropCity"] != '' && CurrentRecord["CpyExtPropCity"] != null) {
	            CurrentRecord["CpyAddr1City"] = CurrentRecord["CpyExtPropCity"];
	        }
	        //Code postal
	        if (CurrentRecord["CpyExtPropPostcode"] != '' && CurrentRecord["CpyExtPropPostcode"] != null) {
	            CurrentRecord["CpyAddr1Postcode"] = CurrentRecord["CpyExtPropPostcode"];
	        }
	        //Region
	        if (CurrentRecord["CpyExtPropReg"] != '' && CurrentRecord["CpyExtPropReg"] != null) {
	            CurrentRecord["CpyAddr1County"] = CurrentRecord["CpyExtPropReg"];
	        }
	        //Pays
	        if (CurrentRecord["CpyExtPropCountry"] != '' && CurrentRecord["CpyExtPropCountry"] != null) {
	            CurrentRecord["CpyAddr1Country"] = CurrentRecord["CpyExtPropCountry"];
	        }
	        //Web
	        if (CurrentRecord["CpyExtPropWeb"] != '' && CurrentRecord["CpyExtPropWeb"] != null) {
	            CurrentRecord["CpyWebAddress"] = CurrentRecord["CpyExtPropWeb"];
	        }
	        //Type activité
	        if (CurrentRecord["CpyExtPropTypeActiv"] != '' && CurrentRecord["CpyExtPropTypeActiv"] != null) {
	            CurrentRecord["CpyExtTypeActiv"] = CurrentRecord["CpyExtPropTypeActiv"];
	        }
	    } else if (vStatAudit == 'Rejeté') {
	        CurrentRecord["CpyExtAdtDatReject"] = DateTime.Now.ToString("dd/MM/yyyy");
	        CurrentRecord["CpyExtAdtUserReject"] = CurrentUserName ;
	    } else if (vStatAudit == 'A VALIDER') {
	        CurrentRecord["CpyExtAdtDatToValid"] = DateTime.Now.ToString("dd/MM/yyyy");
	        CurrentRecord["CpyExtAdtUserToValid"] = CurrentUserName ;
	    }
	}
}