function()
{
	//SS_Acn_OnAfterInsert Cpy
	
	if ( (CurrentRecord["AcnType"] == "A SUPPRIMER" || CurrentRecord["AcnObject"] == "SORTIE POUBELLE" || CurrentRecord["AcnType"] == "LOT DETECTE") && CurrentUserName != "SIM Integration"    ) // RLM 08.03.2016
	{
	    var intNridCpy = CurrentRecord['AcnCpyNRID'];
	    var myCompany = CreateSelligentObject("Company", CurrentSessionID, true);
	    var myselectionrow = new SelectionRow();
	
	    if (CurrentRecord["AcnType"] == "A SUPPRIMER") {
	        myselectionrow.Fields["CpyExtValidSas"] = "METTRE EN POUBELLE";
	        myselectionrow.Fields["CpyExtDemandeurEnPoubelle"] = CurrentUserName;
	
	        // HAS DEB 14/04/2020 : Remplir les champs obligatoires si la fiche va passer directement en poubelle
	        if (myselectionrow.Fields["CpyEmailAddress"] == "") {
	            myselectionrow.Fields["CpyEmailAddress"] = "Missing@ozeol.com";
	        }
	        if (myselectionrow.Fields["CpyExtComFrs"] == "") {
	            myselectionrow.Fields["CpyExtComFrs"] = CurrentRecord['AcnExtCommentaire'];
	        }
	        // HAS END 14/04/2020
	    } else if(CurrentRecord["AcnType"] == "SORTIE POUBELLE") {
	        myselectionrow.Fields["CpyExtValidSas"] = "SORTIE POUBELLE";
	        myselectionrow.Fields["CpyExtDemandeurDePoubelle"] = CurrentUserName;
	    }
	    else if(CurrentRecord["AcnType"] == "LOT DETECTE" && CurrentRecord["AcnStatus"] == "A FAIRE" && CurrentRecord["AcnNature"] == "PROPO") {
	        //on vérifie le statut du client
	        var oQryObj = CreateSelligentObject("SqlHelper", CurrentSessionID);
	        var nAcnCpyNRID = CurrentRecord["AcnCpyNRID"];
	
	        var vSQL = "select count(so0.nrid) as NBR from sysadm.so0 so0 where so0.nrid = '" + nAcnCpyNRID + "' and so0.xvalid_sas in ('A VALIDER' , 'COMPLETE') and so0.xetat_pepite = 'PEPITE' ";
	        var oResCpy = oQryObj.ExecuteSql(vSQL);
	        var oXmlDocCpy = InitXml(oResCpy);
	        var oRowsCpy = FindItem("Flds", oXmlDocCpy, true);
	
	        var vNbrAcn = GetItemValue("NBR", oRowsCpy[0]);  
	        if (vNbrAcn != 1 )  
	            {
	                        myselectionrow.Fields["CpyExtValidSas"] = "A VALIDER";
	                        myselectionrow.Fields["CpyExtDemandeurPepite"] = CurrentUserName;
	            }
	    }
	
	    myCompany.Open(intNridCpy);
	    myCompany.SetAndSave(myselectionrow);
	    delete myCompany;
	}
	
	if( CurrentRecord["AcnExtActivation"] == 1 && CurrentRecord["AcnStatus"] == "FAIT" )
	{
	 var intNridCpy2 = CurrentRecord['AcnCpyNRID'] ;
	 var myCompany2=CreateSelligentObject("Company",CurrentSessionID,true);
	 var myselectionrow2 : SelectionRow = new SelectionRow();
	 myselectionrow2.Fields["CpyExtActivation"] =  1;
	 myCompany2.Open(intNridCpy2);
	 myCompany2.SetAndSave(myselectionrow2);
	 delete myCompany2;
	}
	
	
		//Selligent.Library.Monitor.Tracer.Write("KELLLLLLLLLLLLLLLLLLLLLLCEARTEOPPPPPPPPPPPPPPPPPPPPP AFTERUPDATE" + Session["ACN_CREATE_OPP"], false);
	try
	{
	 if( Session["ACN_CREATE_OPP"] == true && CurrentRecord["AcnStatus"] =="FAIT" &&  CurrentRecord["AcnType"] == "LOT DETECTE" && CurrentRecord["AcnNature"] =="PROPO")  
	 {
	  var strOppRef =  CurrentRecord["AcnOppReference"];
	  SS_Opp_Create_Affaire_SAP(strOppRef);
	  //Selligent.Library.Monitor.Tracer.Write("KELLLLLLLLLLLLLLLLLLLLLLCEARTEOPPPPPPPPPPPPPPPPPPPPP" + Session["ACN_CREATE_OPP"], false);
	  //Selligent.Library.Monitor.Tracer.Write("KELLLLLLLLLLLLLLLLLLLLLLCEARTEOPPPPPPPPPPPPPPPPPPPPP" + strOppRef , false);
	  Session["ACN_CREATE_OPP"] = false;
	 }
	
	}
	catch(e)
	{
	 Session["ACN_CREATE_OPP"] = false;
	 Selligent.Library.Monitor.Tracer.Write("Erreur lors de l'appel de la méthode SS_Opp_Create_Affaire_SAP : "+ e, false);
	}
	 
		return true;
}