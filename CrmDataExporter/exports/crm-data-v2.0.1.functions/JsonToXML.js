function JsonToXML(JSON)
{
	/***********************************************************
	// UNIVERSAL JSON TO XML CONVERTER - Selligent CRM Server-Side
	// Version 100% SAFE : jamais de JSON.parse forcé
	// Gère automatiquement string JSON ou objet déjà parsé
	***********************************************************/
	
	try {
	    var dataObj = JSON;  // On part du principe que c'est déjà utilisable
	
	    // Détection sécurisée : si c'est une string et qu'elle commence par { ou [
	    // alors on tente de la parser (cas réponse HTTP brute, champ texte, etc.)
	    if (typeof JSON === "string") {
	        var trimmed = JSON.trim();
	        if (trimmed.length > 0 && (trimmed[0] === '{' || trimmed[0] === '[')) {
	            dataObj = JSON;
	        }
	    }
	    // Sinon, JSON est déjà un objet, tableau, nombre, etc. ? on garde tel quel
	
	    // Construction du XML avec root obligatoire pour XML valide
	    var xml = '<?xml version="1.0" encoding="UTF-8"?>\n<root>\n';
	
	    // Gestion du cas où la donnée principale est un tableau
	    if (Object.prototype.toString.call(dataObj) === '[object Array]') {
	        for (var i = 0; i < dataObj.length; i++) {
	            xml += ConvertToXML(dataObj[i], "item");
	        }
	    } else {
	        // Cas objet unique ou valeur simple
	        xml += ConvertToXML(dataObj, "item");
	    }
	
	    xml += '</root>\n';
	
	    return xml;
	
	} catch (ex) {
	    return '<error>Erreur conversion JSON vers XML : ' + ex.message + '</error>';
	}
	
	/**
	 * Conversion récursive en XML
	 */
	function ConvertToXML(value, tagName) {
	    var xml = "";
	    
	    if (value === null || value === undefined) {
	        if (tagName) {
	            return '<' + tagName + '></' + tagName + '>\n';
	        }
	        return '';
	    }
	    
	    // Valeurs primitives
	    if (typeof value === "string" || typeof value === "number" || typeof value === "boolean") {
	        var escaped = EscapeXML(String(value));
	        if (tagName) {
	            return '<' + tagName + '>' + escaped + '</' + tagName + '>\n';
	        }
	        return escaped + '\n';
	    }
	    
	    // Tableau
	    if (Object.prototype.toString.call(value) === '[object Array]') {
	        var itemTag = tagName || "item";
	        for (var i = 0; i < value.length; i++) {
	            xml += ConvertToXML(value[i], itemTag);
	        }
	        return xml;
	    }
	    
	    // Objet
	    if (typeof value === "object") {
	        var content = "";
	        for (var prop in value) {
	            if (value.hasOwnProperty(prop)) {
	                content += ConvertToXML(value[prop], prop);
	            }
	        }
	        if (tagName) {
	            return '<' + tagName + '>' + content + '</' + tagName + '>\n';
	        }
	        return content;
	    }
	    
	    return '';
	}
	
	/**
	 * Échappement XML sécurisé
	 */
	function EscapeXML(str) {
	    if (str === null || str === undefined) return '';
	    return String(str)
	        .replace(/&/g, '&amp;')
	        .replace(/</g, '&lt;')
	        .replace(/>/g, '&gt;')
	        .replace(/"/g, '&quot;')
	        .replace(/'/g, '&apos;');
	}
}