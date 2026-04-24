function SS_Req_MAJ_Litige(pnReqNRID,pvListe_Arg)
{
	try
	{
	  var objReq = CreateSelligentObject("Request",CurrentSessionID,true); 
	  
	 var strRetourn ="S";
	 var myselectionrow : SelectionRow = new SelectionRow();
	 pvListe_Arg=pvListe_Arg.replace(/<_cutpv_\/>/gi, ";");
	 var arrInsert = pvListe_Arg.split("<_cut_/>");
	 for(var i=0;i<arrInsert.length;i++)
	 { 
	  var couple = arrInsert[i].split("<_cut1_/>");
	  myselectionrow.Fields[couple[0]] = couple[1];
	 }
	 
	 if(arrInsert.length > 0)
	 {
	  objReq.Open(pnReqNRID);
	  objReq.SetAndSave(myselectionrow);
	 }
	 
	}
	catch(e) 
	{ 
	 strRetourn =  "<ERROR Val=\" Erreur MAJ Litige : " + e.description  + "\"></ERROR>"; 
	}
	finally
	{
	 delete objReq;
	 return strRetourn
	}
}