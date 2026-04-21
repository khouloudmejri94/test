function SS_Osa_OnBeforeUpdate()
{
	try {
	
	
	 if (CurrentRecord["OSaExtType"] == "Edition" || CurrentRecord["OSaExtType"] == "Visite Client" || CurrentRecord["OSaExtType"] == "Tournée FRS") {
	  //Totaux onglet Préconisation
	  var vNbCP = CurrentRecord["OSaExtNbCp"];
	  var vNbAM = CurrentRecord["OSaExtNbAm"];
	  var vNbCM = CurrentRecord["OSaExtNbCm"];
	  var vTotMkt = (vNbCP + vNbAM + vNbCM);
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
	  var vTotFiche = (vNbFicheA + vNbFicheB + vNbFicheC);
	  CurrentRecord["OSaExtNbreFichesTot"] = vTotFiche;
	  //Totaux onglet Bilan Ressources
	  var vNbCPN = CurrentRecord["OSaExtNbCpBilan"];
	  var vNbAMN = CurrentRecord["OSaExtNbAmBilan"];
	  var vNbCMN = CurrentRecord["OSaExtNbCmBilan"];
	  var vNbCLEN = CurrentRecord["OSaExtNbAcMktBilan"];
	  var vNbSEDN = CurrentRecord["OSaExtNbAcTerBilan"];
	  var vNbGIN = CurrentRecord["OSaExtNbAcGiBilan"];
	  var vTotN = (vNbCPN + vNbAMN + vNbCMN + vNbCLEN + vNbSEDN + vNbGIN);
	  CurrentRecord["OSaExtNbTotPersn"] = vTotN;
	  var vNbCPN1 = CurrentRecord["OSaExtNbCpSuiv"];
	  var vNbAMN1 = CurrentRecord["OSaExtNbAmSuiv"];
	  var vNbCMN1 = CurrentRecord["OSaExtNbCmSuiv"];
	  var vNbCLEN1 = CurrentRecord["OSaExtNbAcMktSuiv"];
	  var vNbSEDN1 = CurrentRecord["OSaExtNbAcTerSuiv"];
	  var vNbGIN1 = CurrentRecord["OSaExtNbGiSuiv"];
	  var vTotN1 = (vNbCPN1 + vNbAMN1 + vNbCMN1 + vNbCLEN1 + vNbSEDN1 + vNbGIN1);
	  CurrentRecord["OSaExtNbTotN1Suiv"] = vTotN1;
	 }
	} catch (e) {
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
	
	
	
	
	
	  var dteEcart = dtDateFin - dtDateDeb;
	
	
	
	
	  if(int(dteEcart.ToString().split(".")[0])+1 > 0){
	     //CurrentRecord["OSaExtNbreJour"] = int(dteEcart.ToString().split(".")[0])+1;
	   }else{
	     ThrowMessage("Alerte",'Date fin anterieure date debut')
	     return false;
	     }
	  
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