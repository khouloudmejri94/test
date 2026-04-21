function WS_Req_MAJ_Detection_Comptable(p_ref_ltg,pvListe_Arg)
{
	try
	{
	  var objSQL = CreateSelligentObject("SelectionList", CurrentSessionID); 
	  var objReq = CreateSelligentObject("Request",CurrentSessionID,true); 
	  
	 var strRetourn ="S";
	 var myselectionrow : SelectionRow = new SelectionRow();
	 myselectionrow.Fields["ReqExtRefInterne"]     =  p_ref_ltg;
	 myselectionrow.Fields["ReqExtDateDerModif"]     =  DateTime.Now.ToString("dd/MM/yyyy");
	 myselectionrow.Fields["ReqExtTabecart"] = "A faire";
	
	
	 var saveListArg = pvListe_Arg;
	 
	
	 pvListe_Arg=pvListe_Arg.replace(/<_cutpv_\/>/gi, ";");
	 var arrInsert = pvListe_Arg.split("<_cut_/>");
	
	 for(var i=0;i<arrInsert.length;i++)
	 { 
	  var couple = arrInsert[i].split("<_cut1_/>");
	    if (couple[1]== undefined){
	      couple[1]= null;
	    }
	  myselectionrow.Fields[couple[0]] = couple[1];
	 }
	   
	 var vSQL =  "select nrid from sysadm.cal0 where   xref_interne= '"+p_ref_ltg+"'  ";
	 objSQL.Open(0,-1, vSQL);
	 var vXmlRes = objSQL.GetXml("AllFields");
	 var oXmlRes = InitXml(vXmlRes);
	 var oNodes = FindItem("Flds", oXmlRes, true);
	
	 if(oNodes.Count > 0)
	 {
	  var nReqNRID = GetItemValue("ReqNRID",oNodes[0]);
	  objReq.Open(nReqNRID);
	  objReq.SetAndSave(myselectionrow);
	
	  var strSQLHist,vReqInsertHisto,vResReqHist;
	  strSQLHist = CreateSelligentObject("SqlHelper", CurrentSessionID); 
	  vReqInsertHisto = "INSERT INTO xecart_histo(cal0_nrid,xDateDA,xDateEcheance,xDateEvt,xDateFARDispo,xDateRecepmarch,xDateSaisie,xEcartFAR,xPaiement,xPourecart,xPTF,xMtFraisAnnHT) VALUES("+nReqNRID+",convert(date,'"+myselectionrow.Fields["ReqExtDateDA"]+"',103),convert(date,'"+myselectionrow.Fields["ReqExtDateEcheance"]+"',103),convert(date,'"+myselectionrow.Fields["ReqExtDateEvt"]+"',103),convert(date,'"+myselectionrow.Fields["ReqExtDateFARDispo"]+"',103),convert(date,'"+myselectionrow.Fields["ReqExtDateRecepmarch"]+"',103),convert(date,'"+myselectionrow.Fields["ReqExtDateSaisie"]+"',103),'"+myselectionrow.Fields["ReqExtEcartFAR"]+"','"+myselectionrow.Fields["ReqExtPaiement"]+"','"+myselectionrow.Fields["ReqExtPourecart"]+"','"+myselectionrow.Fields["ReqExtPTF"]+"','"+myselectionrow.Fields["ReqExtMtFraisAnnHT"]+"')";
	  vResReqHist = strSQLHist.ExecuteSql(vReqInsertHisto);
	 
	
	
	  var oSql = CreateSelligentObject("SqlHelper",CurrentSessionID);
	  var vMethode = "WS_Req_MAJ";
	  var vXmlRequest = saveListArg.replace(/'/g, "''");
	  oSql.ExecuteSql("insert into xlog_ws (xmethod, xappel, xretour, xdebug, xdate_log) values('" + vMethode + "', '" + vXmlRequest + "', '', '', getdate())");
	  delete oSql;
	    
	
	 } 
	 else
	 {
	
	    var vSQL1 = "select nrid , ref, so0_nrid, societe from sysadm.do0 where ref = substring('"+p_ref_ltg+"',3,20)";
	    objSQL.Open(0,-1, vSQL1);
	    var vXmlOpp = objSQL.GetXml("AllFields");
	    var oXmlOpp = InitXml(vXmlOpp);
	    var oNodesOpp = FindItem("Flds", oXmlOpp, true);
	    if(oNodesOpp.Count > 0)
	    {
	        myselectionrow.Fields["ReqCpyNRID"]  = GetItemValue("OppCpyNRID",oNodesOpp[0]);
	        myselectionrow.Fields["ReqCpyName"]  = GetItemValue("OppCpyName",oNodesOpp[0]);
	        myselectionrow.Fields["ReqOppNRID"]  = GetItemValue("OppNRID",oNodesOpp[0]);
	        myselectionrow.Fields["ReqOppReference"]  = GetItemValue("OppReference",oNodesOpp[0]);  
	    }
	    else
	    {
	        strRetourn = "Erreur L'affaire du litige n'existe pas";
	        return false;
	    }
	
	    objReq.New();
	    objReq.SetAndSave(myselectionrow);
	 }
	}
	catch(e) 
	{ 
	 strRetourn = "Erreur WS_Req_MAJ_Detection_Comptable : "+ e.description 
	    var MyQuery = CreateSelligentObject("SqlHelper",CurrentSessionID);
	    var vMethode = "WS_MAJ_Litiges";
	    var vXmlRequest = "Litiges : " + p_ref_ltg + " - " + pvListe_Arg;
	    var vRetour = strRetourn;
	    //MyQuery.ExecuteSql("insert into xlog_ws (xmethod, xappel, xretour, xdebug, xdate_log) values('" + vMethode + "', '" + vXmlRequest + "', '" + vRetour + "', '" + vRetour + "', getdate())");
	    delete MyQuery;
	
	}
	finally
	{
	 delete objReq;
	 delete objSQL;
	 return strRetourn
	}
}