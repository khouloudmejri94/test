function(pSupplier,pFair,pTeleph,pMobile,pEmail,pFamilleProduit,pActivity,pRem,pAddr,pContact,pFonction,pWebsite,pSource,pSpecifySource,pProductNature)
{
	// SS_App_AddNewSupplier_Contact_Sourcing -- 42869565668368
	// Param : pSupplier, pFair, pTeleph, pMobile, pEmail, pFamilleProduit, pActivity, pRem, pAddr, pContact, pFonction, pWebsite, pSource, pSpecifySource, pProductNature
	// pFair est ignoré dans la logique mais doit être passé à SS_Cpy_Add_New_Supplier
	try {
	    var vRetour = "";
	    var vPe0Nrid = "";
	    //var intCpyNRID = "";
	
	    // Add New Supplier
	    try {
	        var vRetCreatCpy = SS_Cpy_Add_New_Supplier(
	            pSupplier, 
	            pFair, 
	            pTeleph, 
	            pMobile, 
	            pEmail, 
	            pFamilleProduit, 
	            pActivity, 
	            pRem, 
	            pAddr, 
	            pWebsite, 
	            pSource, 
	            pSpecifySource, 
	            pProductNature
	        );
	
	        if (vRetCreatCpy.substring(0, 2) != "KO") {
	            var intCpyNRID = vRetCreatCpy;
	            vRetour = intCpyNRID;
	        }
	    } catch (e) {
	        vRetour = "KO - Unable to create supplier from Fair book! " + e.description.substring(0, 2000);
	    }
	    // Si récupération du NRID Fournisseur alors créer le contact
	    try {
	        if (vRetCreatCpy != '' && vRetCreatCpy != null && vRetCreatCpy != undefined) {
	            if (pContact != '' && pContact != null && pContact != undefined) {
	                // Découper le nom et le prénom du contact
	                var Nameparts = pContact.Split(' ');
	                if (Nameparts.Length >= 2) {
	                    var firstName = Nameparts[0]; // Prénom
	                    var lastName = Nameparts[1]; // Nom
	                } else {
	                    var firstName = Nameparts[0]; // Prénom
	                    var lastName = Nameparts[0]; // Nom
	                }
	                // Créer un nouveau contact
	                var vRetCreatContact = SS_App_AddNewContact(vRetCreatCpy, firstName, lastName, pMobile, pSupplier, pFonction, pEmail, pTeleph);
	
	                if (vRetCreatContact.substring(0, 2) != "KO") {
	                    vPe0Nrid = vRetCreatContact;
	                }
	                // Récupérer le NRID du nouveau contact
	                if (vPe0Nrid != '' && vPe0Nrid != null && vPe0Nrid != undefined) {
	                    vRetour = intCpyNRID + "#" + vPe0Nrid;
	                }
	            }
	        }
	
	    } catch (e) {
	        vRetour = "KO - ERROR CREATE NEW CONTACT : " + e.description.substring(0, 2000);
	    }
	} catch (e) {
	    vRetour = "KO - ERROR CREATE NEW SUPPLIER + CONTACT : " + e.description.substring(0, 1000);
	} finally {
	    return vRetour;
	}
}