function PS_Opp_Fiche_Liaison()
{
	//// 14.12.2015 -> CBA #464
	var strNRID = top.MyApp.GetItemValue("OppNRID");
	var strRef = top.MyApp.GetItemValue("OppReference");
	 
	   if(strNRID == undefined) return true;
	   if(strNRID == "") return true;
	var strAch = top.MyApp.GetItemValue("OppExtAcheteur");
	var strCP = top.MyApp.GetItemValue("OppExtChefproduit");
	
	     if( strAch == "" || strAch == null || strCP == "" || strCP== null  )
	          {
	               top.MyApp.OpenDlg("Alert",["", top.MyApp.arrTranslations["Merci de verifier que les zones ACH/CP sont remplies!"]]); 
	               return true;
	          }
	 
	   var arrMyArray=[];
	   arrMyArray[0] = strNRID ;
	   arrMyArray[1] = strRef;
	
	   var strSql = "select count(nrid) as 'Offres'  from sysadm.dc0 where do0_nrid='";
	   strSql += strNRID;
	   strSql += "'";
	   var strResultat = top.MyApp.ExecuteServerScript(30231053360342, [strSql], '', '', true);
	   var objXmlRes, objLabel, strLabel;
	   objXmlRes = new ActiveXObject("Microsoft.XMLDOM");
	   objXmlRes.async = false;
	   objXmlRes.loadXML(strResultat);     
	   
	   var objOffres = objXmlRes.getElementsByTagName("Offres");  
	
	    if((objOffres[0].getAttribute("Val")) == '0' )
	     {
	          var reponse = top.MyApp.ExecuteServerScript(32821919607548, [strNRID,strRef], '', '', true);
	        
	          if( reponse == "True")
	            {
	               top.MyApp.OpenDlg("Alert",["", top.MyApp.arrTranslations["La fiche liaison vient d'etre créée!"]]); 
	            }
	         else
	            {
	               top.MyApp.OpenDlg("Alert",["", top.MyApp.arrTranslations["Pas de fiche liaison generée!"]]); 
	            }
	     }
	    else
	     {
	          top.MyApp.OpenDlg("32122114564840",arrMyArray);
	     }
}