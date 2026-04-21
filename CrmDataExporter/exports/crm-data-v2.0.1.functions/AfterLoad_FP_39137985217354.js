function AfterLoad_FP_39137985217354()
{
	// HAS DEB 26102022 : Aduit - si demande de suppression alors champ commenatire obligatoire
	if (top.MyApp.CurrentSetting.nChapMode != 'Reset') {
	    var vProf = top.MyApp.UserSetting.User.ProfileInitials;
	    var OstatutAdt = top.MyApp.FindItem('CpyExtAuditStatus');
	    var vStatutAdt = top.MyApp.GetItemValue('CpyExtAuditStatus');
	    if (OstatutAdt) {
	        if (vStatutAdt == 'A SUPPRIMER') {
	            top.MyApp._gfctSetClassName("CpyExtCommAdt", "NM");
	        } else {
	            top.MyApp._gfctSetClassName("CpyExtCommAdt", "UM");
	        }
	        OstatutAdt.onchange = function() {
	            var OstatutAdt = top.MyApp.FindItem('CpyExtAuditStatus');
	            var vStatutAdt = top.MyApp.GetItemValue('CpyExtAuditStatus');
	            if (OstatutAdt) {
	                if (vStatutAdt == 'A SUPPRIMER') {
	                    top.MyApp._gfctSetClassName("CpyExtCommAdt", "NM");
	                } else {
	                    top.MyApp._gfctSetClassName("CpyExtCommAdt", "UM");
	                }
	            }
	        };
	    }
	}
	// HAS END 26102022 : Aduit - si demande de suppression alors champ commenatire obligatoire
}