function()
{
	try {
	    var oQryObj = CreateSelligentObject("SqlHelper", CurrentSessionID);
	    if (CurrentUserName != 'SIM Integration') {
	        CurrentRecord["PerExtDateDerniereModif"] = DateTime.Now.ToString("dd/MM/yyyy");
	        CurrentRecord["PerExtModificateur"] = CurrentUserName;
	        // Hich 02/07/2021 Tracer la modification d'email erroné
	        if (CurrentRecord.IsUpdated("PerCpyEmailAddress") && CurrentRecord["PerExtCodeFailure"] != '' && CurrentRecord["PerExtCodeFailure"] != null) {
	            CurrentRecord["PerExtModificateurEmail"] = CurrentUserName;
	            CurrentRecord["PerExtDateModifEmail"] = DateTime.Now.ToString("dd/MM/yyyy");
	            CurrentRecord["PerExtFlagCorrected"] = 1;
	        }
	        // Hich 27/05/2025 : Enregistrer la date de vérification si PerExtVerifEmail est mis à jour
	        if (CurrentRecord.IsUpdated("PerExtVerifEmail")) {
	            CurrentRecord["PerExtDateVerifEmail"] = DateTime.Now.ToString("dd/MM/yyyy");
	        }
	    }
	    // Hich 22/06/2021 Si SMC envoi code Failure email 
	    if (CurrentRecord.IsUpdated("PerExtCodeFailure")) {
	        if (CurrentRecord["PerExtCodeFailure"] != '' && CurrentRecord["PerExtCodeFailure"] != null) {
	            var nCodeFailure = CurrentRecord["PerExtCodeFailure"];
	            var vSQL = "select S.Shortcode As Shortcode , S.Description as Description from x_statut_email S where S.Code =  '" + nCodeFailure + "'";
	            var oRes = oQryObj.ExecuteSql(vSQL);
	            var oXmlDoc = InitXml(oRes);
	            var oRows = FindItem("Flds", oXmlDoc, true);
	            if (oRows.Count != 0) {
	                CurrentRecord["PerExtShortcodeFailure"] = GetItemValue("Shortcode", oRows[0]);
	                CurrentRecord["PerExtDescriptionFailure"] = GetItemValue("Description", oRows[0]);
	            }
	        }
	    }
	    if (CurrentRecord["PerExtCodeFailure"] == '' || CurrentRecord["PerExtCodeFailure"] == null) {
	        CurrentRecord["PerExtShortcodeFailure"] = '';
	        CurrentRecord["PerExtDescriptionFailure"] = '';
	    }
	} catch (e) {
	    throw "Error on SS_Per_OnBeforeUpdate " + e;
	} finally { // libération mémoire objet “Selligent”
	    FreeSelligentObject(oQryObj);
	    oQryObj.Dispose();
	}
}