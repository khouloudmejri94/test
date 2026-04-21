function()
{
	// Quo : Logistique
	// AfterLoad_FP_42939073388570
	// Construction du tableau HTML
	let tableHTML = `
	<div style="width:100%; padding:10px;">
	  <table style="
	    width:100%;
	    table-layout: fixed;
	    font-family:Arial, sans-serif;
	    font-size:13px;
	    border-collapse:collapse;
	    box-shadow: 0 2px 6px rgba(0,0,0,0.1);
	  ">
	    <thead style="background-color:#23aad7; color:white;">
	      <tr>
	        <th style="width:4%; padding:8px; border:1px solid #ccc;">BKG No</th>
	        <th style="width:8%; padding:8px; border:1px solid #ccc;">Status</th>
	        <th style="width:7%; padding:8px; border:1px solid #ccc;">Req.Date</th>
	        <th style="width:7%; padding:8px; border:1px solid #ccc;">First SB. Date</th>
	        <th style="width:7%; padding:8px; border:1px solid #ccc;">End SB. Date</th>
	        <th style="width:7%; padding:8px; border:1px solid #ccc;">Last SB. Date</th>
	        <th style="width:7%; padding:8px; border:1px solid #ccc;">Consolid Start Date</th>
	        <th style="width:8%; padding:8px; border:1px solid #ccc;">Consolid End Date</th>
	        <th style="width:7%; padding:8px; border:1px solid #ccc;">Cancel. Date</th>
	        <th style="width:6%; padding:8px; border:1px solid #ccc;">CBM</th>
	        <th style="width:8%; padding:8px; border:1px solid #ccc;">Country Depart</th>
	        <th style="width:8%; padding:8px; border:1px solid #ccc;">Loading port</th>
	        <th style="width:8%; padding:8px; border:1px solid #ccc;">Booking Date</th>
	        <th style="width:8%; padding:8px; border:1px solid #ccc;">Delivery Date</th>
	        <th style="width:8%; padding:8px; border:1px solid #ccc;">ETA</th>
	        <th style="width:8%; padding:8px; border:1px solid #ccc;">ETD</th>
	        <th style="width:8%; padding:8px; border:1px solid #ccc;">Validated By</th>
	        <th style="width:8%; padding:8px; border:1px solid #ccc;">Reply</th>
	      </tr>
	    </thead>
	    <tbody>
	`;
	if (top.MyApp.CurrentSetting.nChapMode != 'Reset') {
	  // Requête SQL
	  //var vCpyNRID = top.MyApp.GetItemValue("CpyNRID");
	  var vStrSQL = "select nrid as BkgNRID, ";
	  vStrSQL+= " no_Booking as BkgNo, ";
	  vStrSQL+= " ISNULL(statut_Booking, '') as Status , ";
	  vStrSQL+= " ISNULL(CONVERT(VARCHAR, date_demande_booking , 103), '') as ReqDate , ";
	  vStrSQL+= " ISNULL(CONVERT(VARCHAR, Date_SB , 103), '') as FirstSbDate , ";
	  vStrSQL+= " ISNULL(CONVERT(VARCHAR, Date_fin_SB , 103), '') as DateFinSb , ";
	  vStrSQL+= " ISNULL(CONVERT(VARCHAR, Date_der_SB , 103), '') as dateDerSb , ";
	  vStrSQL+= " ISNULL(CONVERT(VARCHAR, Date_Deb_Consolid , 103), '') as DateDebConsolid , ";
	  vStrSQL+= " ISNULL(CONVERT(VARCHAR, Date_Fin_Consolid , 103), '') as DateFinConsolid , ";
	  vStrSQL+= " ISNULL(CONVERT(VARCHAR, Date_Annulation , 103), '') as DateAnnul , ";
	  vStrSQL+= " ISNULL(volume_CBM, 0) as CBM ,";
	  vStrSQL+= " ISNULL(code_paysDep, '') as CodePaysDep , ";
	  vStrSQL+= " ISNULL(port_chargement, '') as Port , ";
	  vStrSQL+= " ISNULL(CONVERT(VARCHAR, date_booking , 103), '') as BookDate , ";
	  vStrSQL+= " ISNULL(CONVERT(VARCHAR, date_livraison , 103), '') as LivDate, ";
	  vStrSQL+= " ISNULL(CONVERT(VARCHAR, ETA , 103), '') as ETA, ";
	  vStrSQL+= " ISNULL(CONVERT(VARCHAR, ETD , 103), '') as ETD, ";
	  vStrSQL+= " ISNULL(validateur_booking, '') as Valideur, ";
	  vStrSQL+= " ISNULL(reponse_booking, '') as Rep ";
	
	  vStrSQL+= " from sysadm.x_logistique  ";
	  vStrSQL+= " where dc0_nrid = :QuoNRID ";
	  vStrSQL+= " order by no_Booking asc ";
	
	  //alert(vStrSQL); // À commenter une fois testé
	  // Exécution via script serveur
	  var strResultat = top.MyApp.ExecuteServerScript(30231053360342, [vStrSQL]);
	  //alert(strResultat); // À commenter une fois testé
	
	  // Parsing XML résultat
	  var objXmlRes = top.MyApp.InitXmlCli(strResultat);
	
	  var objBkgNRID = objXmlRes.getElementsByTagName("BkgNRID");
	  var objBkgNo = objXmlRes.getElementsByTagName("BkgNo");
	  var objStatus = objXmlRes.getElementsByTagName("Status");
	  var objReqDate = objXmlRes.getElementsByTagName("ReqDate");
	  var objFirstSbDate = objXmlRes.getElementsByTagName("FirstSbDate");
	  var objDateFinSb = objXmlRes.getElementsByTagName("DateFinSb");
	  var objdateDerSb = objXmlRes.getElementsByTagName("dateDerSb");
	  var objDateDebConsolid = objXmlRes.getElementsByTagName("DateDebConsolid");
	  var objDateFinConsolid = objXmlRes.getElementsByTagName("DateFinConsolid");
	  var objDateAnnul = objXmlRes.getElementsByTagName("DateAnnul");
	  var objCBM = objXmlRes.getElementsByTagName("CBM");
	  var objCodePaysDep = objXmlRes.getElementsByTagName("CodePaysDep");
	  var objPort = objXmlRes.getElementsByTagName("Port");
	  var objBookDate = objXmlRes.getElementsByTagName("BookDate");
	  var objLivDate = objXmlRes.getElementsByTagName("LivDate");
	  var objETA = objXmlRes.getElementsByTagName("ETA");
	  var objETD = objXmlRes.getElementsByTagName("ETD");
	  var objValideur = objXmlRes.getElementsByTagName("Valideur");
	  var objRep = objXmlRes.getElementsByTagName("Rep");
	
	  //top.MyApp.arrTranslations[PR] || PR
	  for (var i = 0; i < objBkgNRID.length; i++) {
	    var v1 = objStatus[i].getAttribute("Val");
	    //alert("defaut req status : "+v1);
	    var vReqStatus = top.MyApp.arrTranslations[v1] || v1;
	    //alert("trans value : "+vReqStatus);
	    tableHTML += `
	      <tr style="background-color:${i % 2 === 0 ? '#f9f9f9' : '#dcdcdc'};">
	        <td style="padding:8px; border:1px solid #ddd; text-align:center;">${objBkgNo[i].getAttribute("Val")}</td>
	        <td style="padding:8px; border:1px solid #ddd; word-wrap:break-word;">${vReqStatus}</td>
	        <td style="padding:8px; border:1px solid #ddd; text-align:center;">${objReqDate[i].getAttribute("Val")}</td>
	        <td style="padding:8px; border:1px solid #ddd; text-align:center;">${objFirstSbDate[i].getAttribute("Val")}</td>
	        <td style="padding:8px; border:1px solid #ddd; text-align:center;">${objDateFinSb[i].getAttribute("Val")}</td>
	        <td style="padding:8px; border:1px solid #ddd; text-align:center;">${objdateDerSb[i].getAttribute("Val")}</td>
	        <td style="padding:8px; border:1px solid #ddd; text-align:center;">${objDateDebConsolid[i].getAttribute("Val")}</td>
	        <td style="padding:8px; border:1px solid #ddd; text-align:center;">${objDateFinConsolid[i].getAttribute("Val")}</td>
	        <td style="padding:8px; border:1px solid #ddd; text-align:center;">${objDateAnnul[i].getAttribute("Val")}</td>
	        <td style="padding:8px; border:1px solid #ddd; text-align:center;">${objCBM[i].getAttribute("Val")}</td>
	        <td style="padding:8px; border:1px solid #ddd; text-align:center;">${objCodePaysDep[i].getAttribute("Val")}</td>
	        <td style="padding:8px; border:1px solid #ddd; text-align:center;">${objPort[i].getAttribute("Val")}</td>
	        <td style="padding:8px; border:1px solid #ddd; text-align:center;">${objBookDate[i].getAttribute("Val")}</td>
	        <td style="padding:8px; border:1px solid #ddd; text-align:center;">${objLivDate[i].getAttribute("Val")}</td>
	        <td style="padding:8px; border:1px solid #ddd; text-align:center;">${objETA[i].getAttribute("Val")}</td>
	        <td style="padding:8px; border:1px solid #ddd; text-align:center;">${objETD[i].getAttribute("Val")}</td>
	        <td style="padding:8px; border:1px solid #ddd; text-align:center;">${objValideur[i].getAttribute("Val")}</td>
	        <td style="padding:8px; border:1px solid #ddd; text-align:center;">${objRep[i].getAttribute("Val")}</td>
	      </tr>
	    `;
	  }
	}
	tableHTML += `
	        </tbody>
	      </table>
	    </div>
	  `;
	
	
	  // Injection dans le formulaire CDM
	  top.MyApp.ModifyLayout(
	    top.MyApp.fraData_View.ifrView2.fraData.document.getElementById("tblMain"),
	    1, // Colonne
	    2, // Ligne
	    15, // Rowspan
	    1, // Colspan (étiré sur la largeur)
	    tableHTML,
	    false // Ce n'est pas un champ de formulaire
	  );
		return ;
}