function SS_CS_Server_function_Test()
{
	/***********************************************************
	// Script CORRIGÉ: Parser JSON SANS JSON.parse() 
	// Selligent CRM Server-Side
	// FIX: Chaîne sur UNE SEULE LIGNE (compatible Selligent)
	***********************************************************/
	
	// ========== JSON EXEMPLE EN UNE SEULE LIGNE ==========
	var jsonData = '[{"vUserID":"user_001","vName":"Ahmed Bouzouita","vEmail":"ahmed@ozeol.com","vMobile":"+212612345678","vPosition":"IT Manager"},{"vUserID":"user_002","vName":"Fatima Hassan","vEmail":"fatima@ozeol.com","vMobile":"+212698765432","vPosition":"CRM Specialist"}]';
	
	var results = [];
	
	try {
	    // Étape 1: Extraire chaque objet JSON
	    var objectPattern = /\{[^{}]*\}/g;
	    var matches = jsonData.match(objectPattern);
	    
	    if (!matches || matches.length == 0) {
	        return "Aucun objet JSON trouvé";
	    }
	    
	    // Étape 2: Parser chaque objet
	    for (var i = 0; i < matches.length; i++) {
	        var jsonObj = matches[i];
	        
	        var vUserID = ExtractValue(jsonObj, "vUserID");
	        var vName = ExtractValue(jsonObj, "vName");
	        var vEmail = ExtractValue(jsonObj, "vEmail");
	        var vMobile = ExtractValue(jsonObj, "vMobile");
	        var vPosition = ExtractValue(jsonObj, "vPosition");
	        
	        var processed = {
	            id: vUserID,
	            name: vName,
	            email: vEmail,
	            mobile: vMobile,
	            role: vPosition,
	            status: "PROCESSED"
	        };
	        
	        results.push(processed);
	        Selligent.Library.Monitor.Tracer.Write("Traité: " + vName);
	    }
	    
	    var output = "OK: " + results.length + " contacts\n";
	    for (var j = 0; j < results.length; j++) {
	        output += results[j].name + " (" + results[j].email + ")\n";
	    }
	    
	    return output;
	    
	} catch (ex) {
	    return "ERREUR: " + ex.Message;
	}
	
	function ExtractValue(jsonString, key) {
	    try {
	        var regex = new RegExp('"' + key + '":"([^"]*)"', 'i');
	        var match = jsonString.match(regex);
	        if (match && match[1]) {
	            return match[1];
	        }
	        return "";
	    } catch (ex) {
	        return "";
	    }
	}
}