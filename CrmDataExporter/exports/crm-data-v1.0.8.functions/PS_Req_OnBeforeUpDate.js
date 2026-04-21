function()
{
	if(top.MyApp.FindItem("ReqMcl30081515323540") != undefined)
	{
	
	if(top.MyApp.FindItem("ReqMcl30081515323540").value != "" && top.MyApp.FindItem("ReqMcl30081515323540").value != null)
	{
	
	     var arrChoice = top.MyApp.getChoices("ReqMcl30081515323540");
	     var vChoice = arrChoice.join("/");
	     top.MyApp.SetItemValue("ReqExtPlateforme", vChoice);
	}
	}
		try{
	 if(top.MyApp.GetItemValue("ReqExtStatutSuivi") == "Validée"){
	  var strSQLRes= "select RESOLUTION_COMPTABLE1,RESOLUTION_COMPTABLE2,RESOLUTION_PHYSIQUE1,RESOLUTION_PHYSIQUE2 from sysadm.xdeclaration where cal0_NRID = "+top.MyApp.GetItemValue("ReqNRID")+" ";
	  var arrRes = top.MyApp._gfctExtReq(strSQLRes);
	
	  for(var i =0; i < arrRes.length; i++){
	    if((arrRes[i][0] == "Demande d'avoir" || arrRes[i][1] == "Demande d'avoir") && top.MyApp.GetItemValue("ReqExtPremieredem") == ""){
	       top.MyApp.SetItemValue("ReqExtPremieredem","A preparer")
	    }
	    if((arrRes[i][0] == "Annulation" || arrRes[i][1] == "Annulation") && top.MyApp.GetItemValue("ReqExtAnnulation") == ""){
	       top.MyApp.SetItemValue("ReqExtAnnulation","A preparer")
	    }
	    if((arrRes[i][0] == "Clôture" || arrRes[i][1] == "Clôture") && top.MyApp.GetItemValue("ReqExtCloture") == ""){
	       top.MyApp.SetItemValue("ReqExtCloture","A preparer")
	    }
	    if((arrRes[i][2] == "Traitement" || arrRes[i][3] == "Traitement") && top.MyApp.GetItemValue("ReqExtTraitement") == ""){
	       top.MyApp.SetItemValue("ReqExtTraitement","A faire")
	    }
	    if((arrRes[i][2] == "Mise à disposition" || arrRes[i][3] == "Mise à disposition") && top.MyApp.GetItemValue("ReqExtMad") == ""){
	       top.MyApp.SetItemValue("ReqExtMad","A faire")
	    }
	    if((arrRes[i][2] == "Destruction" || arrRes[i][3] == "Destruction") && top.MyApp.GetItemValue("ReqExtDestruction") == ""){
	       top.MyApp.SetItemValue("ReqExtDestruction","A faire")
	    }
	   
	  }
	 }
	}catch(e){
	     alert("PS_Req_OnBeforeUpdate : "+e.mesage);
	}
}