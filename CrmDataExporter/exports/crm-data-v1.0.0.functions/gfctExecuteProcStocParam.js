function _gfctExecuteProcStocParam(p_ProcStoc,p_ParamsString )
{
	var oSql = CreateSelligentObject("SqlHelper", CurrentSessionID);
	
	try {
	    // p_ProcStoc  = Nom de la procédure
	    // p_ParamsString  = Chaîne avec tous les paramètres séparés par "|"
	    // Format: "ParamName1~Type1~Direction1~Size1~Value1|ParamName2~Type2~Direction2~Size2~Value2"
	    
	    
	    
	    
	    // Préparer les paramètres pour la procédure stockée
	    var storedProcParams = new Array();
	    
	    if (p_ParamsString != null && p_ParamsString != "") {
	        // Séparer les paramètres
	        var params = p_ParamsString.split("|");
	        
	        for (var i = 0; i < params.length; i++) {
	            var paramParts = params[i].split("~");
	            
	            if (paramParts.length == 5) {
	                storedProcParams.push(
	                    new StoredProcParam(
	                        paramParts[0],  // name
	                        paramParts[1],  // type
	                        paramParts[2],  // direction
	                        parseInt(paramParts[3]),  // size
	                        paramParts[4]   // value
	                    )
	                );
	            }
	        }
	    }
	    
	    // Exécuter la procédure
	    var xml = oSql.ExecuteStoredProc(p_ProcStoc, storedProcParams);
	    return xml;
	}
	catch (e) {
	    return "Erreur dans le script Exec ProcStoc: " + e.description;
	}
	finally {
	    if (oSql) {
	        FreeSelligentObject(oSql);
	        oSql.Dispose();
	    }
	}
}