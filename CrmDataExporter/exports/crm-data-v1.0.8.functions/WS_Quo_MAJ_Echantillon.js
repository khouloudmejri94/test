function(pQuoOppReference,pQuoCustReference,pExtEchntlln1NoEchantillon,pExtEchntlln1StatusEchantillon,pExtEchntlln1DateDepot,pExtEchntlln1CommentaireEch,pExtEchntlln1DateReception,pExtEchntlln1ResponsableEch,pExtEchntlln1DateValidation,pExtEchntlln1NRID,pExtEchntlln1Revalorisation)
{
	//WS_Quo_MAJ_Echantillon  35011549629840
	    try {
	
	    var vMethode = "";
	    var vStatusEch = ""
	    switch (pExtEchntlln1StatusEchantillon) {
	        case "DE":
	            vStatusEch = "Demande d'envoi";
	            break;
	        case "DP":
	            vStatusEch = "Déposé";
	            break;
	        case "VL":
	            vStatusEch = "Validé";
	            break;
	        case "VC":
	            vStatusEch = "Validé sous condition";
	            break;
	        case "NV":
	            vStatusEch = "Non validé";
	            break;
	        case "SE":
	            vStatusEch = "Sans échantillon";
	            break;
	        case "RC":
	            vStatusEch = "Réceptionné";
	            break;
	        case "EV":
	            vStatusEch = "Envoyé";
	            break;
	        case "CS":
	            vStatusEch = "Confirmé sans échantillon";
	            break;
	        case "CC":
	            vStatusEch = "Confirmé commande avant échant";
	            break;
	        case "CE":
	            vStatusEch = "Commande avant échantillon";
	            break;
	        case "AN":
	            vStatusEch = "Annulé";
	            break;
	        default:
	            '';
	    }
	
	
	    var vReval = ""
	    switch (pExtEchntlln1Revalorisation) {
	        case "AB":
	            vReval = "Augmentation Baisse";
	            break;
	        case "AP":
	            vReval = "Augmentation de prix";
	            break;
	        case "BP":
	            vReval = "Baisse de prix";
	            break;
	        case "RS":
	            vReval = "Rien à Signaler";
	            break;
	        default:
	            '';
	    }
	    var vRetour = '';
	    var MyQryObj = CreateSelligentObject("SqlHelper", CurrentSessionID);
	    var mySelect = CreateSelligentObject("SelectionList", CurrentSessionID);
	        
	    var mySelectionRowCollection: SelectionRowCollection = new SelectionRowCollection();
	    var mySelectionRow: SelectionRow = new SelectionRow();
	
	    if (pQuoCustReference != "") {
	
	        vMethode = "WS_Quo_MAJ_Echantillon";
	        
	
	        mySelectionRow.Fields["ExtEchntlln1NoEchantillon"] = pExtEchntlln1NoEchantillon;
	        mySelectionRow.Fields["ExtEchntlln1StatusEchantillon"] = vStatusEch;
	        mySelectionRow.Fields["ExtEchntlln1DateDepot"] = pExtEchntlln1DateDepot;
	        mySelectionRow.Fields["ExtEchntlln1CommentaireEch"] = pExtEchntlln1CommentaireEch;
	        mySelectionRow.Fields["ExtEchntlln1DateReception"] = pExtEchntlln1DateReception;
	        mySelectionRow.Fields["ExtEchntlln1ResponsableEch"] = pExtEchntlln1ResponsableEch;
	        mySelectionRow.Fields["ExtEchntlln1DateValidation"] = pExtEchntlln1DateValidation;
	        mySelectionRow.Fields["ExtEchntlln1Revalorisation"] = vReval;
	        mySelectionRow.Keys["ExtEchntlln1NRID"] = pExtEchntlln1NRID;
	        mySelectionRow.RowState = Selligent.Application.Enum.SelectionRowState.Updated;
	        mySelectionRowCollection.Add(mySelectionRow);
	        var monRetour = mySelect.Open(0, 1, "select xech.no_echantillon, xech.status_echantillon, xech.date_depot, xech.commentaire_ech, xech.date_reception, xech.responsable_ech, xech.date_validation, xech.Type_Echt , xech.nrid from x_echantillon xech where xech.nrid = " + pExtEchntlln1NRID);
	        mySelect.SetAndSave(mySelectionRowCollection);
	
	
	        var MyXml = mySelect.GetXml("AllFields");
	        var MyXmlDoc = InitXml(MyXml);
	        if (GetItemAttribute("Result", MyXmlDoc, "FullCount") == '1') {
	            vRetour = "Echantillon mis à jour";
	        } else {
	            vRetour = "Echantillon non mis à jour";
	        }
	
	
	    } else {
	
	        vMethode = "WS_Opp_MAJ_Echantillon";
	        
	
	        mySelectionRow.Fields["ExtEchntllnAffrNoEchantillon"] = pExtEchntlln1NoEchantillon;
	        mySelectionRow.Fields["ExtEchntllnAffrStatusEchantillon"] = vStatusEch;
	        mySelectionRow.Fields["ExtEchntllnAffrDateDepot"] = pExtEchntlln1DateDepot;
	        mySelectionRow.Fields["ExtEchntllnAffrDateReception"] = pExtEchntlln1DateReception;
	        mySelectionRow.Fields["ExtEchntllnAffrResponsableEch"] = pExtEchntlln1ResponsableEch;
	        mySelectionRow.Fields["ExtEchntllnAffrDateValidation"] = pExtEchntlln1DateValidation;
	        mySelectionRow.Keys["ExtEchntllnAffrNRID"] = pExtEchntlln1NRID;
	        mySelectionRow.RowState = Selligent.Application.Enum.SelectionRowState.Updated;
	        mySelectionRowCollection.Add(mySelectionRow);
	        var monRetour = mySelect.Open(0, 1, "select xech.no_echantillon, xech.status_echantillon, xech.date_depot, xech.date_reception, xech.responsable_ech, xech.date_validation , xech.nrid from x_echantillon_Affair xech where xech.nrid = " + pExtEchntlln1NRID);
	        mySelect.SetAndSave(mySelectionRowCollection);
	
	
	        var MyXml = mySelect.GetXml("AllFields");
	        var MyXmlDoc = InitXml(MyXml);
	        if (GetItemAttribute("Result", MyXmlDoc, "FullCount") == '1') {
	            vRetour = "Echantillon mis à jour";
	        } else {
	            vRetour = "Echantillon non mis à jour";
	        }
	
	    }
	
	
	} catch (e) {
	    vRetour = e.description.substring(0, 2000);
	} finally {
	    
	    var vXmlRequest = pQuoOppReference + ";" + pQuoCustReference + ";" + pExtEchntlln1NoEchantillon + ";" + pExtEchntlln1StatusEchantillon + ";" + pExtEchntlln1DateDepot + ";" + pExtEchntlln1CommentaireEch + ";" + pExtEchntlln1DateReception + ";" + pExtEchntlln1ResponsableEch + ";" + pExtEchntlln1DateValidation + ";" + pExtEchntlln1NRID + ";" + pExtEchntlln1Revalorisation;
	    vXmlRequest = vXmlRequest.replace(/'/g, "''");
	    MyQryObj.ExecuteSql("insert into xlog_ws (xmethod, xappel, xretour, xdebug, xdate_log) values('" + vMethode + "', '" + vXmlRequest + "', '" + vRetour.replace(/'/g, "''") + "', '" + vRetour.replace(/'/g, "''") + "', getdate())");
	    
	
	    MyQryObj.Dispose();
	    FreeSelligentObject(MyQryObj);
	    
	    
	    mySelect.Dispose();
	    FreeSelligentObject(mySelect);
	
	
	
	    return vRetour;
	}
}