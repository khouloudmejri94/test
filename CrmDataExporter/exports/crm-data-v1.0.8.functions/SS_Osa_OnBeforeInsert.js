function()
{
	
	try
	{
	
	      var oQryObj = CreateSelligentObject("SqlHelper", CurrentSessionID);
	      var vSQL = "select cosa0.xpays,cosa0.xnb_expo,cosa0.nrid from sysadm.cosa0 cosa0 where cosa0.xsalon = '" + CurrentRecord["OsaExtSalon"]+ "' and cosa0.xtype = 'Salon' and cosa0.template is null";
	      var oRes = oQryObj.ExecuteSql(vSQL);
	      var oXmlDoc = InitXml(oRes);  
	      var oRows = FindItem("Flds", oXmlDoc, true);
	      if(oRows.Count != 0)
	      {
	        CurrentRecord["OSaExtPays2"]    =  GetItemValue("OSaExtPays", oRows[0]) ;
	        CurrentRecord["OSaExtNbExpoIg"] = GetItemValue("OSaExtNbExpo", oRows[0]);
	        
	      }
	      delete oQryObj;
	
	   // CurrentRecord["OSaExtPays2"] = GetItemValue("OSaExtPays", resXml);
	  //  CurrentRecord["OSaExtNbExpoIg"] = GetItemValue("OSaExtNbExpo", resXml);
	 
	}
	catch(e)
	{
	    throw e;
	}   
	
	 
		try {
	 if (CurrentRecord["OSaExtType"] == "Edition" || CurrentRecord["OSaExtType"] == "Visite Client" || CurrentRecord["OSaExtType"] == "Tournée FRS") {
	
	  var vCodeEdit = "";
	  var vSemaine = CurrentRecord["OSaSemaine"];
	  var vNumSalon = CurrentRecord["OSaNumSalon"];
	
	  //Création du code edition : Année - Mois - Pays - Nom Salon
	  var oQryObj = CreateSelligentObject("SqlHelper", CurrentSessionID);
	  var vSQL = "select label as label, code as code from sysadm.po2 where label = '" + CurrentRecord["OSaExtPays2"] + "'";
	  var oRes = oQryObj.ExecuteSql(vSQL);
	  var oXmlDoc = InitXml(oRes);
	  var oRows = FindItem("Flds", oXmlDoc, true);
	  if (oRows.Count != 0) {
	   var vPays = GetItemValue("code", oRows[0])
	  }
	  var vAnnee = CurrentRecord["OSaExtDateDeb"];
	  var vMois = CurrentRecord["OSaExtDateDeb"];
	  var vMoisCo = vMois.Month;
	  if (vMoisCo > 9) {
	   vMoisCo = vMoisCo;
	  } else {
	   vMoisCo = "0" + vMoisCo;
	  }
	var vSalon = CurrentRecord["OSaExtSalon"];
	var vNumSalon = CurrentRecord["OSaNumSalon"];
	var vPhase = CurrentRecord["OSaPhase"];
	
	if (CurrentRecord["OSaExtType"] == "Edition") {
	    
	    if (vSalon != null && vSalon !== "") {
	        if (vNumSalon != null && vNumSalon !== "") {
	            vSalon += " " + vNumSalon; 
	        }
	    }
	
	    if (vPhase == null) {
	        vCodeEdit = vAnnee.Year + "-" + vPays + "-" + vMoisCo + "-" + vSalon;
	    } else {
	        vCodeEdit = vAnnee.Year + "-" + vPays + "-" + vMoisCo + "-" + vSalon + " " + vPhase;
	    }
	} else if (CurrentRecord["OSaExtType"] == "Tournée FRS") {
	            vCodeEdit = (vAnnee.Year + "-" + vPays + "-" + vMoisCo + "-" + vSalon);
	        } else if (CurrentRecord["OSaExtType"] == "Visite Client") {
	   vCodeEdit = (vAnnee.Year + "-" + vPays + "-" + vMoisCo + "-" + vSalon + "-W" + vSemaine);
	  }
	  CurrentRecord["OSaExtCodeEdit"] = vCodeEdit;
	 }
	 //Test de l'unicité de l'edition
	 var MySql = CreateSelligentObject("SqlHelper", CurrentSessionID);
	 var res = MySql.ExecuteSql("select count(*) as 'number' from sysadm.cosa0 where xcode_edit='" + CurrentRecord["OSaExtCodeEdit"] + "' and template is null");
	 var xml = InitXml(res);
	 if (GetItemValue("number", xml) != "0") {
	  ThrowMessage("Erreur Edition", "L'edition " + CurrentRecord["OSaExtCodeEdit"] + " existe deja!");
	 }
	} catch (e) {
	 throw e;
	}
		if(CurrentRecord["OSaExtType"] == "Edition" || CurrentRecord["OSaExtType"] == "Visite Client" || CurrentRecord["OSaExtType"] == "Tournée FRS"){
	    CurrentRecord["OSaExtDateCreat"] = DateTime.Now.ToString("dd/MM/yyyy");
	    CurrentRecord["OSaExtStatut"] = "En préconisation";
	    CurrentRecord["OSaCreateur"] = CurrentUserName;
	}
		try{
	
	
	
	
	
	 if(CurrentRecord["OSaExtType"] == "Edition" || CurrentRecord["OSaExtType"] == "Visite Client" || CurrentRecord["OSaExtType"] == "Tournée FRS"){
	//Totaux onglet Préconisation
	
	
	
	
	var vNbCP = CurrentRecord["OSaExtNbCp"];
	var vNbAM = CurrentRecord["OSaExtNbAm"];
	var vNbCM = CurrentRecord["OSaExtNbCm"];
	var vTotMkt = (vNbCP+vNbAM+vNbCM);
	
	
	
	
	var vNbCLE = CurrentRecord["OSaExtNbAcMkt"];
	var vNbSED = CurrentRecord["OSaExtNbAcTer"];
	var vNbGI = CurrentRecord["OSaExtNbAcGi"];
	var vNbPros = CurrentRecord["OSaExtPROS"];
	var vNbAch = CurrentRecord["OSaExtACH"];
	var vTotAch = (vNbCLE + vNbSED + vNbGI + vNbPros + vNbAch);
	
	
	
	
	CurrentRecord["OSaExtNbTotMkt"] = vTotMkt;
	CurrentRecord["OSaExtNbTotAch"] = vTotAch; 
	
	
	
	
	
	//Totaux onglet Bilan Commercial
	
	
	
	
	var vNbFicheA = CurrentRecord["OSaExtNbreFichesA"];
	var vNbFicheB = CurrentRecord["OSaExtNbreFichesB"];
	var vNbFicheC = CurrentRecord["OSaExtNbreFichesC"];
	var vTotFiche = (vNbFicheA+vNbFicheB+vNbFicheC);
	
	
	
	
	CurrentRecord["OSaExtNbreFichesTot"] = vTotFiche; 
	
	
	
	
	
	//Totaux onglet Bilan Ressources
	
	
	
	
	var vNbCPN = CurrentRecord["OSaExtNbCpBilan"];
	var vNbAMN = CurrentRecord["OSaExtNbAmBilan"];
	var vNbCMN = CurrentRecord["OSaExtNbCmBilan"];
	var vNbCLEN = CurrentRecord["OSaExtNbAcMktBilan"];
	var vNbSEDN = CurrentRecord["OSaExtNbAcTerBilan"];
	var vNbGIN = CurrentRecord["OSaExtNbAcGiBilan"];
	var vTotN = (vNbCPN+vNbAMN+vNbCMN+vNbCLEN+vNbSEDN+vNbGIN);
	
	
	
	
	CurrentRecord["OSaExtNbTotPersn"] = vTotN;
	
	
	
	
	var vNbCPN1 = CurrentRecord["OSaExtNbCpSuiv"];
	var vNbAMN1 = CurrentRecord["OSaExtNbAmSuiv"];
	var vNbCMN1 = CurrentRecord["OSaExtNbCmSuiv"];
	var vNbCLEN1 = CurrentRecord["OSaExtNbAcMktSuiv"];
	var vNbSEDN1 = CurrentRecord["OSaExtNbAcTerSuiv"];
	var vNbGIN1 = CurrentRecord["OSaExtNbGiSuiv"];
	var vTotN1 = (vNbCPN1+vNbAMN1+vNbCMN1+vNbCLEN1+vNbSEDN1+vNbGIN1);
	
	
	
	
	CurrentRecord["OSaExtNbTotN1Suiv"] = vTotN1;
	 }
	}catch(e){
	 throw "Catch : " + e.message;
	}
	
	
	
	
	 
	
	
	
	
	 
	
	
	
		try{
	
	
	
	
	 if(CurrentRecord["OSaExtType"] == "Edition" || CurrentRecord["OSaExtType"] == "Visite Client" || CurrentRecord["OSaExtType"] == "Tournée FRS"){
	
	
	
	
	  if(CurrentRecord["OSaExtDateFin"] == null || CurrentRecord["OSaExtDateFin"] == undefined){
	    CurrentRecord["OSaExtDateFin"] = CurrentRecord["OSaExtDateDeb"];
	  }
	
	
	
	
	
	  var vDateDeb = CurrentRecord["OSaExtDateDeb"];
	  var vDateFin = CurrentRecord["OSaExtDateFin"];
	
	
	
	
	  var dtDateDeb = new DateTime(vDateDeb.Year,vDateDeb.Month,vDateDeb.Day,0,0,0);
	  var dtDateFin = new DateTime(vDateFin.Year,vDateFin.Month,vDateFin.Day,0,0,0);
	  var ajoutJ = new TimeSpan(1,0,0,0);
	
	
	
	
	  //CurrentRecord["OSaExtNbreJour"] = DateTime.Compare(dtDateFin,dtDateDeb)+1;
	  CurrentRecord["OSaExtJour1"] = dtDateDeb;
	
	
	
	
	  dtDateDeb = dtDateDeb.Add(ajoutJ);
	  if(DateTime.Compare(dtDateDeb,dtDateFin) <= 0){
	    CurrentRecord["OSaExtJour2"] = dtDateDeb;
	  }else{
	    CurrentRecord["OSaExtJour2"] = "";
	  }
	
	
	
	
	  dtDateDeb = dtDateDeb.Add(ajoutJ);
	  if(DateTime.Compare(dtDateDeb,dtDateFin) <= 0){
	    CurrentRecord["OSaExtJour3"] = dtDateDeb;
	  }else{
	    CurrentRecord["OSaExtJour3"] = "";
	  }
	
	
	
	
	  dtDateDeb = dtDateDeb.Add(ajoutJ);
	  if(DateTime.Compare(dtDateDeb,dtDateFin) <= 0){
	    CurrentRecord["OSaExtJour4"] = dtDateDeb;
	  }else{
	    CurrentRecord["OSaExtJour4"] = "";
	  }
	
	
	
	
	  dtDateDeb = dtDateDeb.Add(ajoutJ);
	  if(DateTime.Compare(dtDateDeb,dtDateFin) <= 0){
	    CurrentRecord["OSaExtJour5"] = dtDateDeb;
	  }else{
	    CurrentRecord["OSaExtJour5"] = "";
	  }
	
	
	
	
	 }
	}catch(e){
	 throw "Catch S BeforeInsert DateRessource : " + e.message;
	}
	
	
	
	
	 
		 if(CurrentRecord["OSaExtType"] == "Edition" || CurrentRecord["OSaExtType"] == "Visite Client" || CurrentRecord["OSaExtType"] == "Tournée FRS"){
	     var ville = CurrentRecord["OSaExtVille"];
	     CurrentRecord["OSaExtHotelKmDe"] = ville;
	
	
	
	
	     var nbreExpo = CurrentRecord["OSaExtNbExpoIg"];
	     var nbrePotent = CurrentRecord["OSaExtPotentiel"];
	     CurrentRecord["OSaExtRappExpo"] = nbreExpo;
	     CurrentRecord["OSaExtRappPoten"] = nbrePotent;
	
	
	
	
	
	 }
}