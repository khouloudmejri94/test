function SS_App_AddNewSupplier_Contact(pSupplier,pFair,pTeleph,pMobile,pEmail,pFamilleProduit,pActivity,pRem,pAddr,pContact,pFonction,pWebsite)
{
	//Create supplier + contact
	//SS_App_AddNewSupplier_Contact -- 41331088475034
	// Param : pSupplier,pFair,pTeleph,pMobile,pEmail,pFamilleProduit,pActivity,pRem,pAddr,pContact,pFonction,pWebsite
	//return (pSupplier + ";" + pFair + ";" + pTeleph + ";" + pMobile + ";" + pEmail + ";" + pFamilleProduit + ";" + pActivity + ";" + pRem + ";" + pAddr + ";" + pContact + ";" + pFonction)
	
	//return ("Hello World");
	try {
		var vRetour = "";
		var vPe0Nrid = "";
		//var intCpyNRID = "";
	
		//Add New Supplier
		try {
			var vRetCreatCpy = SS_Cpy_Add_New_Supplier(pSupplier, pFair, pTeleph, pMobile, pEmail, pFamilleProduit, pActivity, pRem, pAddr, pWebsite);
			Selligent.Library.Monitor.Tracer.Write("HAAAAASS CALL ADD NEW SUPPLIER - SS_Cpy_Add_New_Supplier", false);
			Selligent.Library.Monitor.Tracer.Write('HAAAAASS Result New Supplier NRID ' + vRetCreatCpy, false);
			if (vRetCreatCpy.substring(0, 2) != "KO") {
				var intCpyNRID = vRetCreatCpy;
				vRetour = intCpyNRID;
			}
		} catch (e) {
			vRetour = "KO - HAS Unable to create supplier from Fair book! " + e.description.substring(0, 2000);
		}
		//si recuperation du NRID Fournisseur alors créer le contact
		try {
			if (vRetCreatCpy != '' && vRetCreatCpy != null && vRetCreatCpy != undefined) {
				if (pContact != '' && pContact != null && pContact != undefined) {
	                //découper le nom et le prenom du contact 
				    var Nameparts = pContact.Split(' ');
					if (Nameparts.Length >= 2) {
						var firstName = Nameparts[0]; // Prénom
						var lastName = Nameparts[1]; // Nom
					} else {
						var firstName = Nameparts[0]; // Prénom
						var lastName = Nameparts[0]; // Nom
					}
					//créer un nouveau contact
					var vRetCreatContact = SS_App_AddNewContact(vRetCreatCpy, firstName, lastName, pMobile, pSupplier, pFonction, pEmail, pTeleph);
					Selligent.Library.Monitor.Tracer.Write("HAAAAASS CALL ADD NEW CONTACT - SS_App_AddNewContact", false);
					Selligent.Library.Monitor.Tracer.Write('HAAAAASS Result New CONTACT NRID ' + vRetCreatContact, false);
					if (vRetCreatContact.substring(0, 2) != "KO") {
						vPe0Nrid = vRetCreatContact;
					}
					// Recuperer le NROD du nouveau contact
					if (vPe0Nrid != '' && vPe0Nrid != null && vPe0Nrid != undefined) {
						vRetour = intCpyNRID + "#" + vPe0Nrid
					}
				}
			}
		} catch (e) {
			vRetour = "KO - HAS ERROR CREATE NEW CONTACT : " + e.description.substring(0, 2000);
		}
	} catch (e) {
		vRetour = "KO - HAS ERROR CREATE NEW SUPPLIER + CONTACT : " + e.description.substring(0, 1000);
	} finally {
		return vRetour;
	}
}