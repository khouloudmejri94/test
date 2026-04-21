function SS_Cpy_OnAfterUpdate()
{
	//RLM - 27/06/2014
	//Modif : RLM - 09/07/2014 (MAJ Poubelle)
	//Modif : JD - 20/03/2015 (MAJ AJOUT Poubelle - demande Amelie)
	//Modif : MH - 25/07/2016 MAJ AJOUT xGI_Zone
	/*
	var oQryObj2 = CreateSelligentObject("SqlHelper", CurrentSessionID);
	 if (CurrentRecord["CpyExtAcht"] != "" && CurrentRecord["CpyExtAcht"] != null){
	            var vSQL2 = "select res_mng.titulaire as mngach  from sysadm.am0  res_mng where  res_mng.fonction like '%Manager Achat%' and res_mng.team_name in (select res_user.team_name  from sysadm.am0 res_user where res_user.titulaire = '"+CurrentRecord["CpyExtAcht"]+"')";
	
	
	           var oRes2 = oQryObj2.ExecuteSql(vSQL2); 
	           var oXmlDoc2 = InitXml(oRes2);   
	           var oRows2 = FindItem("Flds", oXmlDoc2, true); 
	           if(GetItemValue("mngach", oRows2[0])  != ""  && GetItemValue("mngach", oRows2[0])  != null )
	  
	            { 
	             
	              var manager =  GetItemValue("mngach", oRows2[0]); 
	           }
	
	
	delete oQryObj2;
	}
	 
	var oQryObj2 = CreateSelligentObject("SqlHelper", CurrentSessionID);
	 if (CurrentRecord["CpyExtProsp"] != "" && CurrentRecord["CpyExtProsp"] != null){
	            var vSQL2 = "select res_mng.titulaire as mngprosp from sysadm.am0  res_mng where  res_mng.fonction like '%Manager Prospection%' and res_mng.team_name in (select res_user.team_name  from sysadm.am0 res_user where res_user.titulaire = '"+CurrentRecord["CpyExtProsp"]+"')  ";
	   var oRes2 = oQryObj2.ExecuteSql(vSQL2); 
	           var oXmlDoc2 = InitXml(oRes2);   
	           var oRows2 = FindItem("Flds", oXmlDoc2, true);
	
	
	 if(GetItemValue("mngprosp", oRows2[0])  != ""  && GetItemValue("mngprosp", oRows2[0])  != null )
	  
	            { 
	             
	              var mngprosp=  GetItemValue("mngprosp", oRows2[0]); 
	           }
	 delete oQryObj2;
	}
	
	
	
	var oQryObj2 = CreateSelligentObject("SqlHelper", CurrentSessionID);
	            var vSQL2 = "select (select team_name from sysadm.am0 where titulaire = '"+CurrentRecord["CpyOwner"]+"') as SecteurComp ";
	     var oRes2 = oQryObj2.ExecuteSql(vSQL2); 
	           var oXmlDoc2 = InitXml(oRes2);   
	           var oRows2 = FindItem("Flds", oXmlDoc2, true);
	  if(GetItemValue("SecteurComp", oRows2[0])  != ""  && GetItemValue("SecteurComp", oRows2[0])  != null )
	  
	            { 
	             
	              var SecteurComp =  GetItemValue("SecteurComp", oRows2[0]); 
	           }
	delete oQryObj2;
	
	
	   var intNridCpy = CurrentRecord['CpyNRID'] ;
	 var myCompany=CreateSelligentObject("Company",CurrentSessionID,true);
	 var myselectionrow : SelectionRow = new SelectionRow();
	 
	 myselectionrow.Fields["CpyExtManagerAchat"] =  manager;
	 myselectionrow.Fields["CpyExtSecteur"] =  SecteurComp;
	 myselectionrow.Fields["CpyExtManagerProspection"] =  mngprosp;
	 myCompany.Open(intNridCpy);
	 myCompany.SetAndSave(myselectionrow);
	
	
	*/
	
	
	try{
	
	
	
	 var CpyCode = CurrentRecord["CpyCode"];
	 
	 if(CpyCode.substring(0,4) != 'COMP'){
	 
	  var tabRequeteXml=[];
	 
	  /******************CONTACT******************/
	  tabRequeteXml["IvContact"]="select DISTINCT "
	  +"     s.cd Lifnr, "
	  +"     case when substring(p.prenom,1,30) is null then substring(p.personne,1,30) else substring(p.prenom+' '+p.personne,1,30) end as Name1, "
	  +"     sp.tel Tel, "
	  +"     sp.fax Fax, "
	  +"     sp.e_mail Mail, "
	  +"     case when sp.fonction = 'Responsable Logistique' then '09' else 'MK' END Pafkt "
	  +"from sysadm.V_so0 s,sysadm.V_pe0 p,sysadm.sp0 sp "
	  +"where "
	  +"    s.cd = '" + CpyCode + "' and s.cd not like 'COMP%'"
	  +"and sp.so0_nrid=s.nrid "
	  +"and sp.pe0_nrid=p.nrid "
	  +"and p.personne is not null "
	  +"and (sp.date_sortie is null or sp.date_sortie > GETDATE())";
	 
	 
	  /******************FOURNISSEUR******************/
	  tabRequeteXml["IvFrn"]="select DISTINCT "
	 +"     s.cd Lifnr, "
	 +"     substring(s.societe,1,35) as Name1, "
	 +"     substring(s.adresse,1,30) as Stras, "
	 +"     substring(s.loc,1,35) as Ort01, "
	 +"     substring(s.code_post,1,10) as Pstlz, '' Land1, "
	 +"     substring(s.prefixe_int + s.tel1,1,16) as Telf1, "
	 +"     substring(s.prefixe_int + s.tel2,1,16) as Telf2, "
	 +"     substring(s.fax,1,31) as Telfx, "
	 +"     'TR' ModeReg, "
	 +"     ' 60' DelaisReg, "
	 +"     '' JourReg, "
	 +"     a.xcode_sap as Ekgrp, "
	 +"     s.e_mail Mail, "
	 +"     case when p.code is null then p1.code else p.code end as Land12, " 
	 +"     substring(s.xsiret,1,11) Stcd2, "
	 +"     case when s.xPasdescompte = 1 then 1 else 0 end as Zdemesc, "
	 +"     case when s.xderog_perm = 1 then 1 else 0 end as Zpaicomp,"
	 +"     s.xclass_fourn as Zcodeabc,"
	 +"     substring(a.team_name,1,40) as ZequipAchat,"
	 +"     s.xInfoLogistique as ZinfoLitige,"
	 +"     a.xGI_Zone as ZadminGi, "
	 +"     substring(s.xMatFisc,1,18) as Stenr, "
	 +"     substring(CONVERT(VARCHAR(10),s.xDateValidMatFisc,103),1,2) + substring(CONVERT(VARCHAR(10),s.xDateValidMatFisc,103),4,2) + substring(CONVERT(VARCHAR(10),s.xDateValidMatFisc,103),7,4) as Revdb, "
	  +"    case when xlitige  = 1 then 'X'  else '0' end as Litige"  
	  +" from  "
	  +"  sysadm.V_so0 s LEFT OUTER JOIN sysadm.po2 p ON p.label = s.pays "
	  +"       LEFT OUTER JOIN sysadm.po2 p1 ON p1.label = s.pays_2 "
	  +" ,sysadm.am0 a "
	  +" where "
	  +"     s.cd = '" + CpyCode + "' and s.cd not like 'COMP%'"
	  +" and a.titulaire = s.titulaire ";
	 
	  var vRetourWS = BS_SRM_CallPostWS(tabRequeteXml, "ZCrmFrn", "urn:sap-com:document:sap:soap:functions:mc-style");
	  //var vRetourWS = BS_CDM_CallPostWS(tabRequeteXml, "ZCrmFrn", "urn:sap-com:document:sap:soap:functions:mc-style");
	 
	 
	 
	  //var MySql = CreateSelligentObject("SqlHelper",CurrentSessionID);
	  //var res = MySql.ExecuteSql("update sysadm.v_so0 set xflag_histo = 0 where xflag_histo = 1");
	 
	 }
	 
	  
	 
	 }catch(e){
	  ThrowMessage("Alert","Error on SS_Cpy_OnAfterUpdate " + e);
	 }
	
	
		if (Session["CLOTURE_EXPORT"] == true) {
	    var vNRID = CurrentRecord['CpyNRID'];
	    var MyCompany = CreateSelligentObject("Company", CurrentSessionID, true);
	    var myselectionrow: SelectionRow = new SelectionRow();
	    
	    myselectionrow.Fields["CpyExtPour"] = '';
	
	    myselectionrow.Fields["CpyExtValidExporter"] = '';
	    myselectionrow.Fields["CpyExtDateDemValExport"] = '';
	    myselectionrow.Fields["CpyExtUserDemValExport"] = '';
	
	    myselectionrow.Fields["CpyExtDateValExport"] = '';
	    myselectionrow.Fields["CpyExtUserValExport"] = '';
	
	    myselectionrow.Fields["CpyExtValDirExport"] = '';
	    myselectionrow.Fields["CpyExtDateValDirExport"] = '';
	    myselectionrow.Fields["CpyExtUserValDirExport"] = '';
	
	    myselectionrow.Fields["CpyExtChkExpZone"] = '';
	    myselectionrow.Fields["CpyExtExportZone"] = '';
	
	    myselectionrow.Fields["CpyExtFraisAnnexeText"] = '';
	
	    MyCompany.Open(vNRID);
	    MyCompany.SetAndSave(myselectionrow);
	
	    MyCompany.Dispose();
	    FreeSelligentObject(MyCompany);
	}
}