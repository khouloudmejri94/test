function SS_Quo_MAJ_Date_Statut()
{
	/*
	if(CurrentRecord.IsUpdated("QuoExtStatOff"))
	{
	 var vStatut = CurrentRecord["QuoExtStatOff"];
	 
	 switch (vStatut)
	 {
	  case "02. A VALIDER":
	    
	    if(CurrentRecord["QuoExtDateAValider"] =="" || CurrentRecord["QuoExtDateAValider"] == null)  CurrentRecord["QuoExtDateAValider"] = DateTime.Now.ToString("dd/MM/yyyy");
	   break;
	  case "03. A NEGOCIER":
	   if(CurrentRecord["QuoExtDateANegocier"] =="" || CurrentRecord["QuoExtDateANegocier"] == null) CurrentRecord["QuoExtDateANegocier"] = DateTime.Now.ToString("dd/MM/yyyy");
	   break;
	  case "04. NEGOCIE":
	   if(CurrentRecord["QuoExtDateNegocie"] =="" || CurrentRecord["QuoExtDateNegocie"] == null) CurrentRecord["QuoExtDateNegocie"] = DateTime.Now.ToString("dd/MM/yyyy");
	   break;
	   case "04B. POSITIONNE":
	   if(CurrentRecord["QuoExtDatePositionne"] =="" || CurrentRecord["QuoExtDatePositionne"] == null) CurrentRecord["QuoExtDatePositionne"] = DateTime.Now.ToString("dd/MM/yyyy");
	   break;
	  case "05. COMMANDEE":
	   if(CurrentRecord["QuoExtDateCommandee"] =="" || CurrentRecord["QuoExtDateCommandee"] == null) CurrentRecord["QuoExtDateCommandee"] = DateTime.Now.ToString("dd/MM/yyyy");
	   break;
	  case "3. Perdue":
	   if(CurrentRecord["QuoExtDatePerdue"] =="" || CurrentRecord["QuoExtDatePerdue"] == null) CurrentRecord["QuoExtDatePerdue"] = DateTime.Now.ToString("dd/MM/yyyy");
	   break;   
	 }
	}
	*/
	
	 if (CurrentRecord.IsUpdated("QuoExtStatOff")) {
	  var vStatut = CurrentRecord["QuoExtStatOff"];
	  switch (vStatut) {
	   case "02. A VALIDER":
	    if (CurrentRecord["QuoExtDateAValider"] == "" || CurrentRecord["QuoExtDateAValider"] == null) CurrentRecord["QuoExtDateAValider"] = DateTime.Now.ToString("dd/MM/yyyy");
	    break;
	   case "1. Valorisé":
	    if (CurrentRecord["QuoExtDateANegocier"] == "" || CurrentRecord["QuoExtDateANegocier"] == null) CurrentRecord["QuoExtDateANegocier"] = DateTime.Now.ToString("dd/MM/yyyy");
	    break;
	   case "2. Négocié":
	    if (CurrentRecord["QuoExtDateNegocie"] == "" || CurrentRecord["QuoExtDateNegocie"] == null) CurrentRecord["QuoExtDateNegocie"] = DateTime.Now.ToString("dd/MM/yyyy");
	    break;
	   case "4. Acceptée":
	    if (CurrentRecord["QuoExtDatePositionne"] == "" || CurrentRecord["QuoExtDatePositionne"] == null) CurrentRecord["QuoExtDatePositionne"] = DateTime.Now.ToString("dd/MM/yyyy");
	    break;
	   case "5. Commandée":
	    if (CurrentRecord["QuoExtDateCommandee"] == "" || CurrentRecord["QuoExtDateCommandee"] == null) CurrentRecord["QuoExtDateCommandee"] = DateTime.Now.ToString("dd/MM/yyyy");
	    break;
	   case "3. Perdue":
	    if (CurrentRecord["QuoExtDatePerdue"] == "" || CurrentRecord["QuoExtDatePerdue"] == null) CurrentRecord["QuoExtDatePerdue"] = DateTime.Now.ToString("dd/MM/yyyy");
	    break;
	  }
	 }
}