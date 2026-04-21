function(pOwner,pType,pPortefolio,pPhone,pEmail,pAdresse,pStockType,pClearance,pContact,pFonction,pNrid,pMobile,pSupplier,pUserEmail,pSalon,pQrCode,pIdAct,pFamilleProduit,pSiteWeb,pStockTypeCRM,pNumberPallet,pActivity,pSuplierType,pDistrubutionEU,pInFrance,pBrandLicence,pTestReport,pResponsableStock,pManuFacturingPlant,pStockProduct,pQuantity,pClearanceDate,pQualification,pReafectation,pUsername,pStatusSuplier,pUrlimgstock,pStockLocation,pClearanceReason,pUrlCard)
{
	//INTEGRATION ACTION SALON -- WS_Acn_Action_Salon -- 41249657540346
	//Param : pOwner,pType,pPortefolio,pPhone,pEmail,pAdresse,pStockType,pClearance,pContact,pFonction,pNrid,pMobile,pSupplier,pUserEmail,pSalon,pQrCode,pIdAct,
	//Param : pFamilleProduit,pSiteWeb,pStockTypeCRM,pNumberPallet,pActivity,pSuplierType,pDistrubutionEU,pInFrance,pBrandLicence,pTestReport,pResponsableStock,
	//Param : pManuFacturingPlant,pStockProduct,pQuantity,pClearanceDate,pQualification,pReafectation,pUsername,pStatusSuplier,pUrlimgstock,pStockLocation,pClearanceReason
	try {
		var MyQuery = CreateSelligentObject("SqlHelper", CurrentSessionID);
		var strSQL = "";
		var vRetour = "";
		var vPe0Nrid = 0;
		var Vhi0nrid = 0;
		var vStatAct = "";
		var vRaisResult = "";
		var vQualifAct = "";
		var FlagCpy = 0;
		var FlagAcn = 0;
		var newNRID = 0;
	
		//verifier si ancienne fiche salon ou nouvelle
		var vSQL = "select count(nrid) Fcount from sysadm.xact_salon where template is null and IdAct = '" + pIdAct + "' ";
		var MyResults = MyQuery.ExecuteSql(vSQL);
		var oXmlRes = InitXml(MyResults);
		var oRows = FindItem("Flds", oXmlRes, true);
		var NbRows = oRows.Count;
		if (oRows.Count > 0) {
			var pClearanceF = pClearance.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/'/g, "&#39;").replace(/"/g, "&quot;");
			var vcount = GetItemValue("Fcount", oRows[0]);
			//si nouvelle alors insérer la nouvelle fiche salon -- 36 fields
			if (vcount == 0) {
				strSQL = "INSERT INTO xact_salon " +
					" (IdAct, " +
					" so0_nrid, " +
					" adresse," +
					" date_insert ," +
					" email," +
					" mobile," +
					" portefeuille, " +
					" remarque, " +
					" stock_type, " +
					" titulaire, " +
					" type, " +
					" contact, " +
					" fonction, " +
					" tel, " +
					" societe, " +
					" userEmail, " +
					" salon, " +
					" QrCode, " +
					" famille_Produit, " +
					" site_web, " +
					" stock_type_crm, " +
					" NumberPallet, " +
					" Activity, " +
					" supplier_type, " +
					" distrubution_EU, " +
					" org_france, " +
					" brand_licence, " +
					" Rapport_test, " +
					" responsable_stock, " +
					" usine_fabrication, " +
					" produit_stock, " +
					" quantite, " +
					" date_destock, " +
					" Qualification, " +
					" ReafectTo, " +
					" userName, " +
					" statusSupplier, " +
					" url_img_stock, " +
					" stock_location, " +
					" clearance_reason, " +
					" UrlCard) " +
					" VALUES ('" + pIdAct + "'," +
					" '" + pNrid.replace('', '0') + "'," +
					" '" + pAdresse + "'," +
					" getdate()," +
					" '" + pEmail + "'," +
					" '" + pMobile + "'," +
					" '" + pPortefolio + "'," +
					" '" + pClearanceF + "'," +
					" '" + pStockType + "'," +
					" '" + pOwner + "'," +
					" '" + pType + "'," +
					" '" + pContact + "'," +
					" '" + pFonction + "'," +
					" '" + pPhone + "'," +
					" '" + pSupplier.substring(0, 50) + "'," +
					" '" + pUserEmail + "'," +
					" '" + pSalon + "'," +
					" '" + pQrCode + "'," +
					" '" + pFamilleProduit + "'," +
					" '" + pSiteWeb + "'," +
					" '" + pStockTypeCRM + "'," +
					" '" + pNumberPallet + "'," +
					" '" + pActivity + "'," +
					" '" + pSuplierType + "'," +
					" '" + pDistrubutionEU + "'," +
					" '" + pInFrance + "'," +
					" '" + pBrandLicence + "'," +
					" '" + pTestReport + "'," +
					" '" + pResponsableStock + "'," +
					" '" + pManuFacturingPlant + "'," +
					" '" + pStockProduct + "'," +
					" '" + pQuantity + "'," +
					" '" + pClearanceDate + "'," +
					" '" + pQualification + "'," +
					" '" + pReafectation + "'," +
					" '" + pUsername + "'," +
					" '" + pStatusSuplier + "'," +
					" '" + pUrlimgstock + "'," +
					" '" + pStockLocation + "'," +
					" '" + pClearanceReason + "'," +
					" '" + pUrlCard + "')  ";
	
				//////////Selligent.Library.Monitor.Tracer.Write("HAAAAASS Query INSERT", false);
				//////////Selligent.Library.Monitor.Tracer.Write(strSQL, false);
	
				var MyResults = MyQuery.ExecuteSql(strSQL);
				//////////Selligent.Library.Monitor.Tracer.Write("HAAAAASS Query INSERT RESULT" + MyResults, false);
	
				vSQL = "SELECT top 1 nrid as fSalonNRID from xact_salon where IdAct = '" + pIdAct + "' order by dmod desc";
				MyResults = MyQuery.ExecuteSql(vSQL);
				oXmlRes = InitXml(MyResults);
				var oRows1 = FindItem("Flds", oXmlRes, true);
				var NbRows1 = oRows1.Count;
				if (NbRows1 == 1) {
					newNRID = GetItemValue("fSalonNRID", oRows1[0]);
					//////////Selligent.Library.Monitor.Tracer.Write("HAAAAASS Query INSERT NEW NRID value : " + newNRID, false);
				}
				//vRetour = strSQL;
				vRetour = "Fair action correctly sent to CRM";
				//si ancienne alors mettre à jour ancienne fiche salon 33 fields
			} else if (vcount == 1) {
				strSQL = "UPDATE xact_salon set " +
					" adresse = '" + pAdresse + "' , " +
					" email = '" + pEmail + "' , " +
					" mobile = '" + pMobile + "' , " +
					" portefeuille = '" + pPortefolio + "' , " +
					" remarque = '" + pClearanceF + "' , " +
					" stock_type = '" + pStockType + "' , " +
					" titulaire = '" + pOwner + "' , " +
					" type = '" + pType + "' , " +
					" contact = '" + pContact + "' , " +
					" fonction = '" + pFonction + "' , " +
					" tel = '" + pPhone + "' , " +
					" societe = '" + pSupplier.substring(0, 50) + "' , " +
					" QrCode = '" + pQrCode + "' , " +
					" date_update = getdate() , " +
					//added fields
					" famille_Produit = '" + pFamilleProduit + "' ," +
					" site_web = '" + pSiteWeb + "' ," +
					" stock_type_crm = '" + pStockTypeCRM + "' ," +
					" NumberPallet = '" + pNumberPallet + "' ," +
					" Activity = '" + pActivity + "' ," +
					" supplier_type = '" + pSuplierType + "' ," +
					" distrubution_EU = '" + pDistrubutionEU + "' ," +
					" org_france = '" + pInFrance + "' ," +
					" brand_licence = '" + pBrandLicence + "' ," +
					" Rapport_test = '" + pTestReport + "' ," +
					" responsable_stock = '" + pResponsableStock + "' ," +
					" usine_fabrication = '" + pManuFacturingPlant + "' ," +
					" produit_stock = '" + pStockProduct + "' ," +
					" quantite = '" + pQuantity + "' ," +
					" date_destock = '" + pClearanceDate + "'," +
					" Qualification = '" + pQualification + "'," +
					" ReafectTo = '" + pReafectation + "'," +
					" userName = '" + pUsername + "'," +
					" statusSupplier = '" + pStatusSuplier + "'," +
					" url_img_stock = '" + pUrlimgstock + "'," +
					" stock_location = '" + pStockLocation + "'," +
					" clearance_reason = '" + pClearanceReason + "'," +
					" UrlCard = '" + pUrlCard + "' " +
					" where template is null and IdAct = '" + pIdAct + "' ";
	
				//MyQuery.ExecuteSql(strSQL);
				var vRes = MyQuery.ExecuteSql(strSQL);
				//////////Selligent.Library.Monitor.Tracer.Write("HAAAAASS Query UPDATE RESULT" + vRes, false);
	
				vSQL = "SELECT top 1 nrid as fSalonNRID from xact_salon where IdAct = '" + pIdAct + "' order by dmod desc";
				MyResults = MyQuery.ExecuteSql(vSQL);
				oXmlRes = InitXml(MyResults);
				var oRows1 = FindItem("Flds", oXmlRes, true);
				var NbRows1 = oRows1.Count;
				if (NbRows1 == 1) {
					newNRID = GetItemValue("fSalonNRID", oRows1[0]);
					//////////Selligent.Library.Monitor.Tracer.Write("HAAAAASS Query INSERT NEW NRID value : " + newNRID, false);
				}
				vRetour = "Fair action updated successfully !";
				//doublon action salon ===> erreur à vérifier
			} else if (vcount > 1) {
				vRetour = "Error : Many actions already existing with ID " + pIdAct + " !! ";
			}
			//découper le nom et le prenom du contact 
			var Nameparts = pContact.Split(' ');
			if (Nameparts.Length >= 2) {
				var firstName = Nameparts[0]; // Prénom
				var lastName = Nameparts[1]; // Nom
			} else {
				var firstName = Nameparts[0]; // Prénom
				var lastName = Nameparts[0]; // Nom
			}
			//////////Selligent.Library.Monitor.Tracer.Write("HAAAAASS param contact and soc nrid : " + pNrid + " to check contact : " + pContact, false);
			if (pContact != '' && pContact != null && pContact != undefined && pNrid != '') {
				//var firstName = Nameparts[0]; // Prénom
				//var lastName = Nameparts[1]; // Nom
				//chercher le contact
				vSQL = "SELECT top 1 pe0.nrid as Pe0Nrid, fonction as PerCpyFunction , e_mail as PerCpyEmailAddress, tel as PerCpyDirectPhNbr, mobile_phone as PerCpyMobilePhNbr from sysadm.pe0 inner join sysadm.sp0 on sp0.pe0_nrid = pe0.nrid where e_mail = '" + pEmail + "' and sp0.so0_nrid = '" + pNrid + "' ";
				MyResults = MyQuery.ExecuteSql(vSQL);
				oXmlRes = InitXml(MyResults);
				var oRows1 = FindItem("Flds", oXmlRes, true);
				var NbRows1 = oRows1.Count;
				//////////Selligent.Library.Monitor.Tracer.Write("HAS nombre exist meme contact" + NbRows1, false);
				//si contact existant alors recupérer son NRID
				if (NbRows1 == 1) {
					vPe0Nrid = GetItemValue("Pe0Nrid", oRows1[0]);
					var vFonction = GetItemValue("PerCpyFunction", oRows1[0]);
					var vEmail = GetItemValue("PerCpyEmailAddress", oRows1[0]);
					var vTel = GetItemValue("PerCpyDirectPhNbr", oRows1[0]);
					var vMobile = GetItemValue("PerCpyMobilePhNbr", oRows1[0]);
					var nDiff = 0;
					//////////Selligent.Library.Monitor.Tracer.Write("Param contact verif" + pFonction + "$" + vFonction + "$" + pEmail + "$" + vEmail + "$" + pPhone + "$" + vTel + "$" + pMobile + "$" + vMobile, false);
					if (pFonction != vFonction) {
						nDiff = 1;
					}
					if (pEmail != vEmail) {
						nDiff = 1;
					}
					if (pPhone != vTel) {
						nDiff = 1;
					}
					if (pMobile != vMobile) {
						nDiff = 1;
					}
					if (nDiff == 1) {
						//mettre à jour contact
						var vRetCreatContact = SS_App_UpdateContact(vPe0Nrid, vMobile, vFonction, vEmail, vTel);
						//////////Selligent.Library.Monitor.Tracer.Write("HAAAAASS UPDATE CONTACT INFO - SS_App_UpdateContact", false);
						//////////Selligent.Library.Monitor.Tracer.Write(vRetCreatContact, false);
						if (vRetCreatContact.substring(0, 2) != "KO") {
							//vPe0Nrid = vRetCreatContact;
							//////////Selligent.Library.Monitor.Tracer.Write("HAS UPDATE OLD CONTACT INFO - NRID = " + vRetCreatContact, false)
						}
					}
					MyResults = MyQuery.ExecuteSql("UPDATE xact_salon set pe0_nrid = '" + vPe0Nrid + "', Add_Supplier_contact = 1 where nrid = '" + newNRID + "' ");
				} else if (NbRows1 == '0') {
					//créer un nouveau contact
					var vRetCreatContact = SS_App_AddNewContact(pNrid, firstName, lastName, pMobile, pSupplier, pFonction, pEmail, pPhone);
					//////////Selligent.Library.Monitor.Tracer.Write("HAAAAASS ADD NEW CONTACT - SS_App_AddNewContact", false);
					//////////Selligent.Library.Monitor.Tracer.Write(vRetCreatContact, false);
					if (vRetCreatContact.substring(0, 2) != "KO") {
						vPe0Nrid = vRetCreatContact;
						MyResults = MyQuery.ExecuteSql("UPDATE xact_salon set pe0_nrid = '" + vPe0Nrid + "', Add_Supplier_contact = 1 where nrid = '" + newNRID + "' ");
					}
				}
			}
			//si Fournisseur exste deja
			if (pNrid != '') {
				// si LOT C alors on crée une action DONE pour le titulaire de la fiche
				if (pStockType == 'C') {
					var vRetCreatAct = SS_App_AddNewAction("FAIT", "RELANCE", pQualification, pOwner, pSupplier, pNrid, pContact, vPe0Nrid, pSalon, pStockType, pClearanceF);
					//////////Selligent.Library.Monitor.Tracer.Write("HAAAAASS SOCIETE CREE LOT C - SS_App_AddNewAction NRID = " + vRetCreatAct, false);
					if (vRetCreatAct > 0) {
						FlagAcn = 1;
						MyResults = MyQuery.ExecuteSql("UPDATE xact_salon set hi0_nrid = '" + vRetCreatAct + "', Add_Action = 1 where nrid = '" + newNRID + "' ");
						/////////*****************//////////update action with more details
						var vRetUpdtAct = SS_App_UpdateAction(vRetCreatAct, pIdAct, pPortefolio, pType, pContact, pQrCode, pFamilleProduit, pSiteWeb, pNumberPallet, pSuplierType, pDistrubutionEU, pInFrance, pBrandLicence, pTestReport, pResponsableStock, pManuFacturingPlant, pStockProduct, pQuantity, pClearanceDate, pUsername, pStatusSuplier, pUrlimgstock, pStockLocation, pClearanceReason, pUrlCard);
						//////////Selligent.Library.Monitor.Tracer.Write("HAAAAASS SOCIETE CREE LOT C - SS_App_UpdateAction NRID = " + vRetUpdtAct, false);
					}
					//si LOT A ou B alors on cherche l'action TO DO du titulaire
				} else if (pStockType == 'A' || pStockType == 'B') {
					//////////Selligent.Library.Monitor.Tracer.Write('HAS LOT A B' + pStockType, false);
					vSQL = "select top 1 nrid as hi0Nrid from hi0 where so0_nrid = '" + pNrid + "' and status = 'A FAIRE' and titulaire = '" + pOwner + "' ";
					MyResults = MyQuery.ExecuteSql(vSQL);
					oXmlRes = InitXml(MyResults);
					var oRows = FindItem("Flds", oXmlRes, true);
					var NbRows = oRows.Count;
					//////////Selligent.Library.Monitor.Tracer.Write('Nbr OLd TODO' + NbRows, false);
					if (NbRows > 0) {
						//Recuperer nrid de action TODO du titulaire
						Vhi0nrid = GetItemValue("hi0Nrid", oRows[0]);
					}
					if (pStockType == 'A') {
						vRaisResult = "LOT DETECTE";
						vQualifAct = pQualification;
						Selligent.Library.Monitor.Tracer.Write('Raison Qualif' + vRaisResult + " " + vQualifAct, false);
					} else if (pStockType == 'B') {
						vRaisResult = "RELANCE";
						vQualifAct = pQualification;
					}
					//Selligent.Library.Monitor.Tracer.Write('USER SALON' + vUserName , false);
					//////////Selligent.Library.Monitor.Tracer.Write('USER SALON = ' + pUsername, false);
					//////////Selligent.Library.Monitor.Tracer.Write("Param fiche salon Type = " + pType + ", statut = " + pStatusSuplier, false);
					if (pUsername == pOwner) {
						//si titulaire de la fiche alors on cloture l'ancienne TO DO
						//////////Selligent.Library.Monitor.Tracer.Write("HAAAAASS NRID ACN TO BE CLOSED - SS_App_CloseAction " + Vhi0nrid, false);
						var vRetCloAct = SS_App_CloseAction(Vhi0nrid);
						//////////Selligent.Library.Monitor.Tracer.Write("HAAAAASS CLOSE TODO - SS_App_CloseAction", false);
						//////////Selligent.Library.Monitor.Tracer.Write(vRetCloAct, false);
						//Et on cree une action TO DO au nom du owner de la iche salon
						var vRetCreatAct = SS_App_AddNewAction("A FAIRE", vRaisResult, vQualifAct, pOwner, pSupplier, pNrid, pContact, vPe0Nrid, pSalon, pStockType, pClearanceF);
						//////////Selligent.Library.Monitor.Tracer.Write("HAAAAASS SOCIETE CREE LOT  " + pStockType + "  - SS_App_AddNewAction NRID = " + vRetCreatAct, false);
						if (vRetCreatAct > 0) {
							FlagAcn = 1;
							MyResults = MyQuery.ExecuteSql("UPDATE xact_salon set hi0_nrid = '" + vRetCreatAct + "', Add_Action = 1 where nrid = '" + newNRID + "' ");
							/////////*****************//////////update action with more details
							var vRetUpdtAct = SS_App_UpdateAction(vRetCreatAct, pIdAct, pPortefolio, pType, pContact, pQrCode, pFamilleProduit, pSiteWeb, pNumberPallet, pSuplierType, pDistrubutionEU, pInFrance, pBrandLicence, pTestReport, pResponsableStock, pManuFacturingPlant, pStockProduct, pQuantity, pClearanceDate, pUsername, pStatusSuplier, pUrlimgstock, pStockLocation, pClearanceReason, pUrlCard);
							//////////Selligent.Library.Monitor.Tracer.Write("HAAAAASS SOCIETE CREE LOT " + pStockType + " - SS_App_UpdateAction NRID = " + vRetUpdtAct, false);
						}
					} else {
						//////////Selligent.Library.Monitor.Tracer.Write("non titulaire de la societe", false);
						//////////Selligent.Library.Monitor.Tracer.Write(vRetCreatAct, false);
						if (pType == "FOURNISSEUR" && pStatusSuplier == "ACTIF") {
							//////////Selligent.Library.Monitor.Tracer.Write("fournisseur ACTIF", false);
							//////////Selligent.Library.Monitor.Tracer.Write("HAAAAASS NRID ACN TO BE CLOSED - SS_App_CloseAction " + Vhi0nrid, false);
							//si Fournisseur Actif alors on cloture l'action TO DO 
							var vRetCloAct = SS_App_CloseAction(Vhi0nrid);
							//////////Selligent.Library.Monitor.Tracer.Write("HAAAAASS CLOSE TODO - SS_App_CloseAction", false);
							//////////Selligent.Library.Monitor.Tracer.Write(vRetCloAct, false);
							//et on crée une nouvelle action salon
							var vRetCreatAct = SS_App_AddNewAction("A FAIRE", vRaisResult, vQualifAct, pOwner, pSupplier, pNrid, pContact, vPe0Nrid, pSalon, pStockType, pClearanceF);
							//////////Selligent.Library.Monitor.Tracer.Write("HAAAAASS SOCIETE CREE LOT  " + pStockType + "  - SS_App_AddNewAction NRID = " + vRetCreatAct, false);
							if (vRetCreatAct > 0) {
								FlagAcn = 1;
								MyResults = MyQuery.ExecuteSql("UPDATE xact_salon set hi0_nrid = '" + vRetCreatAct + "', Add_Action = 1 where nrid = '" + newNRID + "' ");
								/////////*****************//////////update action with more details
								var vRetUpdtAct = SS_App_UpdateAction(vRetCreatAct, pIdAct, pPortefolio, pType, pContact, pQrCode, pFamilleProduit, pSiteWeb, pNumberPallet, pSuplierType, pDistrubutionEU, pInFrance, pBrandLicence, pTestReport, pResponsableStock, pManuFacturingPlant, pStockProduct, pQuantity, pClearanceDate, pUsername, pStatusSuplier, pUrlimgstock, pStockLocation, pClearanceReason, pUrlCard);
								//////////Selligent.Library.Monitor.Tracer.Write("HAAAAASS SOCIETE CREE LOT " + pStockType + " - SS_App_UpdateAction NRID = " + vRetUpdtAct, false);
							}
						} else {
							//////////Selligent.Library.Monitor.Tracer.Write("PAS fournisseur ACTIF", false);
							//////////Selligent.Library.Monitor.Tracer.Write("STAAAAAARRRRRTTT INSERT ACT TODO", false);
							if (pOwner == pReafectation) {
								//si Different de Fournisseur Actif et decide de garder la fiche ==> alors on cloture l'action TO DO 
								if (Vhi0nrid != '' && Vhi0nrid != null && Vhi0nrid != undefined) {
									var vRetCloAct = SS_App_CloseAction(Vhi0nrid);
									//////////Selligent.Library.Monitor.Tracer.Write("HAAAAASS CLOSE TODO - SS_App_CloseAction", false);
									//////////Selligent.Library.Monitor.Tracer.Write(vRetCloAct, false);
								}
							}
							//et on crée une nouvelle action salon
							//////////Selligent.Library.Monitor.Tracer.Write('Param Creat Action TODO' + "A FAIRE" + "#" + vRaisResult + "#" + vQualifAct + "#" + pSupplier + "#", false);
							var vRetCreatAct = SS_App_AddNewAction("A FAIRE", vRaisResult, vQualifAct, pReafectation, pSupplier, pNrid, pContact, vPe0Nrid, pSalon, pStockType, pClearanceF);
							//////////Selligent.Library.Monitor.Tracer.Write("HAAAAASS SOCIETE CREE  - NO TIT SOC - NO SUP ACTIF  " + pStockType + "  - SS_App_AddNewAction NRID = " + vRetCreatAct, false);
							if (vRetCreatAct > 0) {
								FlagAcn = 1;
								MyResults = MyQuery.ExecuteSql("UPDATE xact_salon set hi0_nrid = '" + vRetCreatAct + "', Add_Action = 1 where nrid = '" + newNRID + "' ");
								/////////*****************//////////update action with more details
								var vRetUpdtAct = SS_App_UpdateAction(vRetCreatAct, pIdAct, pPortefolio, pType, pContact, pQrCode, pFamilleProduit, pSiteWeb, pNumberPallet, pSuplierType, pDistrubutionEU, pInFrance, pBrandLicence, pTestReport, pResponsableStock, pManuFacturingPlant, pStockProduct, pQuantity, pClearanceDate, pUsername, pStatusSuplier, pUrlimgstock, pStockLocation, pClearanceReason, pUrlCard);
								//////////Selligent.Library.Monitor.Tracer.Write("HAAAAASS SOCIETE CREE LOT " + pStockType + " - SS_App_UpdateAction NRID = " + vRetUpdtAct, false);
							}
						}
						MyResults = MyQuery.ExecuteSql("INSERT INTO xso4 (Acht,so0_nrid,xstart_date,xvalideur) VALUES ('" + pUsername + "', '" + pNrid + "',GETDATE(), 'Business Card') ");
					}
					if (pUsername != pReafectation) {
						vSQL = "SELECT top 1 am0.e_mail as addremail from sysadm.so0 inner join sysadm.am0 on am0.titulaire = so0.titulaire where am0.template is null and so0.template is null and so0.nrid = '" + pNrid + "' ";
						MyResults = MyQuery.ExecuteSql(vSQL);
						oXmlRes = InitXml(MyResults);
						var oRows = FindItem("Flds", oXmlRes, true);
						var NbRows = oRows.Count;
						//////////Selligent.Library.Monitor.Tracer.Write('Count email owner = ' + NbRows, false);
						if (NbRows > 0) {
							//Recuperer adresse mail titulaire founisseur pour le notifier du stock
							var vEmailOwner = GetItemValue("addremail", oRows[0]);
							var vTitle = "New action salon created on your supplier : " + pSupplier;
							var vBody = "Hello, <br /><br />We inform you that an action with type " + pStockType + " was created on your supplier.<br /> Please check and complete the TO DO followup.<br />Sincerly,<br /><br />Admin Salon. ";
							_gfctSendMail("admin-salon@ozeol.com", pUserEmail, vTitle, vBody);
						}
					}
				}
				if (FlagAcn == 1) {
					MyQuery.ExecuteSql("UPDATE xact_salon set hi0_nrid = '" + vRetCreatAct + "', Add_Action = 1 where nrid = '" + pNrid + "'");
				}
			}
		}
	} catch (e) {
		vRetour = "HAS - WS OCR FAIR Error : " + e.description.substring(0, 10000);
	} finally {
		var MyQuery = CreateSelligentObject("SqlHelper", CurrentSessionID);
		var vMethode = "WS_Act_Salon";
		var vXmlRequest = ""; // pAdresse + ";" + "Date du jour" + ";" + pEmail + ";" + pPhone;
		vXmlRequest = pOwner + ";" + pType + ";" + pPortefolio + ";" + pPhone + ";" + pEmail + ";" + pAdresse + ";" + pStockType + ";" + pClearanceF + ";" + pContact + ";" + pFonction + ";" + pNrid + ";" + pMobile + ";" + pSupplier + ";" + pUserEmail + ";" + pSalon + ";" + pQrCode + ";" + pIdAct + ";" + pFamilleProduit + ";" + pSiteWeb + ";" + pStockTypeCRM + ";" + pNumberPallet + ";" + pActivity + ";" + pSuplierType + ";" + pDistrubutionEU + ";" + pInFrance + ";" + pBrandLicence + ";" + pTestReport + ";" + pResponsableStock + ";" + pManuFacturingPlant + ";" + pStockProduct + ";" + pQuantity + ";" + pClearanceDate + ";" + pQualification + ";" + pReafectation + ";" + pUsername + ";" + pStatusSuplier + ";" + pUrlimgstock + ";" + pStockLocation + ";" + pClearanceReason + ";" + pUrlCard;
		vXmlRequest = vXmlRequest.replace(/'/g, "''");
		MyQuery.ExecuteSql("insert into xlog_ws (xmethod, xappel, xretour, xdebug, xdate_log) values('" + vMethode + "', '" + vXmlRequest + "', '" + vRetour.replace(/'/g, "''") + "', NULL, getdate())");
		FreeSelligentObject(MyQuery);
		MyQuery.Dispose();
		return vRetour;
	}
}