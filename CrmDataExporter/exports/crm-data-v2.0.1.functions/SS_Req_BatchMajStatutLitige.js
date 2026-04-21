function SS_Req_BatchMajStatutLitige()
{
	try
	{
	 //Déclaration objets
	 var objLitige =CreateSelligentObject("Request",CurrentSessionID, true);
	 var MySelectionRow :SelectionRow = new SelectionRow();
	 var MySelectionRowColl :SelectionRowCollection = new SelectionRowCollection();
	 var objSelectionList = CreateSelligentObject("SelectionList",CurrentSessionID);
	 //Requête permettant de récupérer les données à mettre à jour
	 var vSQL="select 1,'ReqExtRelance', 'A préparer', cal0.xrelance, cal0.xmise_demeure, cal0.nrid from sysadm.cal0 where template is null and nstatus =0 and xdate_prem_dem >= cast(getdate()-21 as date) "
	     +" union "
	     +" select 2, 'ReqExtMiseDemeure', 'A préparer', cal0.xrelance, cal0.xmise_demeure, cal0.nrid from sysadm.cal0 where template is null and nstatus =0 and xdate_mise_dem >= cast(getdate()-21 as date) "
	     +" order by 1 ";
	 
	 objSelectionList.Open(0,-1, vSQL)
	 var MyQuery=objSelectionList.GetXml("NotNullFields");
	 var MyXmlDoc = InitXml(MyQuery);
	 var MyRows = FindItem("Flds", MyXmlDoc, true);
	 var nCount=0;
	 var nCountMaj=0;
	 var nOrder, vLnToUpd, vValToUpd, vValOrigine, nReqNRID;
	 for(var i = 0; i < MyRows.Count; i++)
	 {
	  nCount++;
	  MySelectionRow = new SelectionRow();
	  nOrder = GetItemValue("Unknown-0", MyRows[i]);
	  vLnToUpd = GetItemValue("Unknown-1", MyRows[i]);
	  vValToUpd = GetItemValue("Unknown-1", MyRows[i]);
	  vValOrigine = GetItemValue(vLnToUpd, MyRows[i]);
	  nReqNRID = GetItemValue("ReqNRID", MyRows[i]);
	  
	  if(vValOrigine!=vValToUpd)
	  {
	   MySelectionRow.RowState = SelectionRowState.Updated;
	   MySelectionRow.Fields[vLnToUpd] = vValToUpd;
	   MySelectionRow.Keys["ReqNRID"] = nReqNRID;
	   MySelectionRowColl.Add(MySelectionRow);
	   nCountMaj++; 
	  }
	 }
	 //Sauvegarde en masse
	 objSelectionList.SetAndSave(MySelectionRowColl);
	 var vRetourXML=objSelectionList.GetXml("NotNullFields");
	}
	catch(e)
	{
	 return "Erreur maj Litige"+"\n\n\n"+e;
	}
	finally
	{
	 objLitige.Dispose();
	 delete objLitige;  
	 objSelectionList.Dispose();
	 delete objSelectionList;
	}
		return ;
}