function(pAcnNRID,pIdAct,pPortefolio,pType,pContact,pQrCode,pFamilleProduit,pSiteWeb,pNumberPallet,pSuplierType,pDistrubutionEU,pInFrance,pBrandLicence,pTestReport,pResponsableStock,pManuFacturingPlant,pStockProduct,pQuantity,pClearanceDate,pUsername,pStatusSuplier,pUrlimgstock,pStockLocation,pClearanceReason,pUrlCard)
{
	//update Action Salon --SS_App_UpdateAction--41030993350746
	//Param : pAcnNRID, pIdAct, pPortefolio, pType, pContact, pQrCode, pFamilleProduit, pSiteWeb, pNumberPallet, 
	//Param : pSuplierType, pDistrubutionEU, pInFrance, pBrandLicence, pTestReport, pResponsableStock, pManuFacturingPlant, pStockProduct, 
	//Param : pQuantity, pClearanceDate, pUsername, pStatusSuplier, pUrlimgstock, pStockLocation, pClearanceReason)
	//Eliminated : pFonction  pStockTypeCRM  pActivity  
	try {
	    var vRetour = "";
	    if (pIdAct != '') {
	       var MyAcnObj = CreateSelligentObject("Action", CurrentSessionID, false);
	       MyAcnObj.Open(pAcnNRID);
	       var mySelectionRow = new SelectionRow();
	       mySelectionRow.Fields["AcnExtAppActID"] = pIdAct;
	       mySelectionRow.Fields["AcnExtPortfolio"] = pPortefolio;
	       mySelectionRow.Fields["AcnExtType"] = pType;
	       mySelectionRow.Fields["AcnExtContRenc"] = pContact;//Contact rencontré
	       mySelectionRow.Fields["AcnExtQrCode"] = pQrCode;
	       mySelectionRow.Fields["AcnExtFamilleProduit"] = pFamilleProduit;
	       mySelectionRow.Fields["AcnExtSiteWeb"] = pSiteWeb;
	       mySelectionRow.Fields["AcnExtNumberPallet"] = pNumberPallet;
	       mySelectionRow.Fields["AcnExtSuplierType"] = pSuplierType;
	       mySelectionRow.Fields["AcnExtDistribEU"] = pDistrubutionEU;
	       mySelectionRow.Fields["AcnExtInFrance"] = pInFrance;
	       mySelectionRow.Fields["AcnExtBrandLicence"] = pBrandLicence;
	       mySelectionRow.Fields["AcnExtTestReport"] = pTestReport;
	       mySelectionRow.Fields["AcnExtContApp"] = pResponsableStock;//Contact à appeler
	       mySelectionRow.Fields["AcnExtManufPlant"] = pManuFacturingPlant;
	       mySelectionRow.Fields["AcnExtStockProduct"] = pStockProduct;
	       mySelectionRow.Fields["AcnExtQuan"] = pQuantity;//Quantité
	       mySelectionRow.Fields["AcnExtPerDest"] = pClearanceDate;//Période désto
	       mySelectionRow.Fields["AcnExtProspecteur"] = pUsername;//Prospecteur du salon
	       mySelectionRow.Fields["AcnExtFrsStatus"] = pStatusSuplier;
	       mySelectionRow.Fields["AcnExtUrlimgstock"] = pUrlimgstock;
	       mySelectionRow.Fields["AcnExtLocProd"] = pStockLocation;//Localisation produits
	       mySelectionRow.Fields["AcnExtRaisdes"] = pClearanceReason;//Raison désto
	       mySelectionRow.Fields["AcnExtUrlCard"] = pUrlCard;//URL Carte visite
	       if (pContact != pResponsableStock) {
	          mySelectionRow.Fields["AcnExtResDes"] = '1';
	       }
	       MyAcnObj.SetAndSave(mySelectionRow);
	       vRetour = pAcnNRID;
	    }
	 } catch (e) {
	    vRetour = "KO Erreur SS_Acn_UpdateAction : " + e.message;
	 } finally {
	    FreeSelligentObject(MyAcnObj);
	    MyAcnObj.Dispose();
	    return vRetour;
	 }
}