function()
{
	/*************************************************************/
	// Société                             : MASAO
	// Nom script                          : SS_Req_OnBeforeUpdate
	// Infos Paramètres                    :
	// Auteur                              : MLE
	// Chapitre concerné                   : Litige
	// Date de création                    : 07/11/2013
	// Modifié par                         : MBA
	// Date de modification                : 20/11/2013
	// Commentaires                        :
	// Règles de gestion                   :  RG 12 + MàJ Champs fusion
	/*************************************************************/
		var objList = CreateSelligentObject("SelectionList", CurrentSessionID);
	/*
	// Récupération de l'ensemble des plateformes liées au Litige
	var objList = CreateSelligentObject("SelectionList", CurrentSessionID);
	var vSQL = "select ptf from sysadm.xdetection_logistique where template is null and cal0_nrid = " + CurrentRecord['ReqNRID'] + " order by ptf";
	objList.Open(0, -1, vSQL);
	var MyXml = objList.GetXml("AllFields");
	var MyXmlDoc = InitXml(MyXml);
	var MyNodes = FindItem("Flds", MyXmlDoc, true); 
	var arrPtf = [];
	// Stockage de l'ensemble des plateformes liées dans le tableau arrPtf
	if(MyNodes.Count > 0)
	{
	  for (var i = 0; i < MyNodes.Count; i++) 
	  {
	    arrPtf.push(GetItemValue("ExtDtctnLgstqPtf", MyNodes[i]));
	  }
	}
	// Mise à jour du champ masqué xplateforme utilisé dans la fusion de documents avec l'ensemble des plateformes liées concaténées
	var vPtf = arrPtf.join(' - ');
	if(arrPtf.length > 0 && CurrentRecord['ReqExtPlateforme'] != vPtf)
	{
	  CurrentRecord['ReqExtPlateforme'] = vPtf;
	}
	*/
	
	// Récupération de l'ensemble des descriptions chef produit liées au Litige
	var vSQL2 = "select commentaire from sysadm.xdeclaration where template is null and cal0_nrid = " + CurrentRecord['ReqNRID'] + " order by dmod desc";
	objList.Open(0, -1, vSQL2);
	var MyXml2 = objList.GetXml("AllFields");
	var MyXmlDoc2 = InitXml(MyXml2);
	var MyNodes2 = FindItem("Flds", MyXmlDoc2, true); 
	var arrDesc = [];
	// Stockage de l'ensemble des descriptions liées dans le tableau arrDesc
	if(MyNodes2.Count > 0)
	{
	  for (var i = 0; i < MyNodes2.Count; i++) 
	  {
	    arrDesc.push(GetItemValue("ExtDclrtnCommentaire", MyNodes2[i]));
	  }
	}
	// Mise à jour du champ masqué xdescription utilisé dans la fusion de documents avec l'ensemble des descriptions liées concaténées
	var vDesc = arrDesc.join(' - ');
	if(arrDesc.length > 0 && CurrentRecord['ReqExtDescription'] != vDesc)
	{
	  CurrentRecord['ReqExtDescription'] = vDesc;
	}
	
	delete objList;
	
	
	//MAJ Ref Selligent avec Ref Interne
	CurrentRecord["ReqReference"] = CurrentRecord["ReqExtRefInterne"]
		try
	{
	
	/*
	     if(CurrentRecord["ReqMcl30081515323540"] !="" || CurrentRecord["ReqExtDateDecla"]=="" )
	     {
	        CurrentRecord["ReqExtDateDecla"]= DateTime.Now.ToString("dd/MM/yyyy");
	     }
	
	*/
	     if(CurrentRecord.IsUpdated["ReqExtTabecart"] && (CurrentRecord["ReqExtTabecart"] =="Inutile" || CurrentRecord["ReqExtTabecart"] =="Non réalisable" || CurrentRecord["ReqExtTabecart"] =="Fait"))
	     {
	        // RG 13
	        CurrentRecord["ReqExtDateAnalyse"]= DateTime.Now.ToString("dd/MM/yyyy");
	     }
	
	     if(CurrentRecord.IsUpdated["ReqExtTabecart"] || CurrentRecord.IsUpdated["ReqExtCommentaire"] )
	     {
	        // RG 12
	        CurrentRecord["ReqExtDateDerModif"]= DateTime.Now.ToString("dd/MM/yyyy");
	     }
	
	     if(CurrentRecord["ReqExtStatutSuivi"]== "" || CurrentRecord["ReqExtStatutSuivi"]== null)
	     {
	          CurrentRecord["ReqExtStatutSuivi"]= "A faire";
	     }
	
	     if(CurrentRecord.IsUpdated("ReqStatus") && CurrentRecord["ReqStatus"] =="Clos" )
	     {
	        
	        CurrentRecord["ReqExtDatedecloture"]= DateTime.Now.ToString("dd/MM/yyyy");
	        CurrentRecord["ReqExtClotpar"]= CurrentUserName ;  
	          
	     } 
	
	     if(CurrentRecord.IsUpdated("ReqStatus") && CurrentRecord["ReqStatus"] =="Ouvert" )
	     {
	        
	        CurrentRecord["ReqExtDatedecloture"]= null ;
	        CurrentRecord["ReqExtClotpar"]= null ;  
	          
	     } 
	  
	}
	catch(e)
	{
	    throw "Error on SS_Req_OnBeforeUpdate " + e;
	}
		var vReqNrid = CurrentRecord["ReqNrid"];
	
	
	/****** Annulation regle de gestion A. Robin / 17/06/2014
	
	if (CurrentRecord.IsUpdated("ReqExtLitigecompClos") && CurrentRecord["ReqExtLitigecompClos"] == 1)
	{
	    if(SS_Req_CheckComtableOrPhysiqueDeclaration(vReqNrid, true))
	    {
	        CurrentRecord["ReqStatus"]= "Clos";
	    }
	}
	if (CurrentRecord.IsUpdated("ReqExtLitigephysClos") && CurrentRecord["ReqExtLitigephysClos"] == 1)
	{
	    if(SS_Req_CheckComtableOrPhysiqueDeclaration(vReqNrid, false))
	    {
	        CurrentRecord["ReqStatus"]= "Clos";
	    }
	}
	
	*/
		//appel du Web service SAP pour création des contacts litiges
	SS_Req_AppelWS();
		//#932 CBA 08.09.2016
	if(CurrentRecord["ReqExtStatutSuivi"] == "A valider MKT" && CurrentRecord.IsUpdated("ReqExtStatutSuivi"))
	{
	   CurrentRecord["ReqExtDateAvaliderMKT"] =  DateTime.Now.ToString("dd/MM/yyyy"); 
	}
		//#936 CBA
	
	try{
	    if(CurrentRecord.IsUpdated("ReqExtFournRisque")){
	          if(CurrentRecord["ReqExtFournRisque"] == "1"){
	               var vNRID = CurrentRecord["ReqCpyNRID"];
	               var myCompany=CreateSelligentObject("Company",CurrentSessionID,true); 
	               myCompany.Open(vNRID);
	               var MyXml = myCompany.GetXml("AllFields");
	               var MyXmlDoc = InitXml(MyXml );
	
	               var fourStrat = GetItemValue("CpyExtFournStrat", MyXmlDoc);
	               var classFourn = GetItemValue("CpyExtClassFourn", MyXmlDoc);
	
	               if( classFourn != "Risqué"){
	                    if (fourStrat != "1"){
	                            var mySelectionRow = new SelectionRow(); 
	                            mySelectionRow.Fields["CpyExtClassFourn"]="Risqué"; 
	                            myCompany.SetAndSave(mySelectionRow); 
	          
	                     }
	               }
	
	               delete myCompany;
	          }else{
	                    var vNRID = CurrentRecord["ReqCpyNRID"];
	                    var myCompany=CreateSelligentObject("Company",CurrentSessionID,true); 
	                    myCompany.Open(vNRID);
	                    var MyXml = myCompany.GetXml("AllFields");
	                    var MyXmlDoc = InitXml(MyXml);
	
	                    var classFourn = GetItemValue("CpyExtClassFourn", MyXmlDoc);
	          
	                    if( classFourn != "Classique"){
	                         var mySelectionRow  = new SelectionRow(); 
	                         mySelectionRow .Fields["CpyExtClassFourn"]="Classique"; 
	                         myCompany.SetAndSave(mySelectionRow ); 
	                    }
	               
	                    delete myCompany;  
	       
	          }
	
	    } 
	
	}catch(e){
	      return e.description;    
	}
	 
		return true;
}