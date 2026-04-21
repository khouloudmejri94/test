function AfterLoad_FP_42828373238556()
{
	// Quo : Controle qualité
	// AfterLoad_FP_42828373238556
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
	        <th style="width:4%; padding:8px; border:1px solid #ccc;">QC No</th>
	        <th style="width:8%; padding:8px; border:1px solid #ccc;">Req. Status</th>
	        <th style="width:8%; padding:8px; border:1px solid #ccc;">Requester</th>
	        <th style="width:6%; padding:8px; border:1px solid #ccc;">Req. Date</th>
	        <th style="width:7%; padding:8px; border:1px solid #ccc;">Req. Hour</th>
	        <th style="width:7%; padding:8px; border:1px solid #ccc;">Expected Date</th>
	        <th style="width:7%; padding:8px; border:1px solid #ccc;">Inspector Req. Date</th>
	        <th style="width:7%; padding:8px; border:1px solid #ccc;">Reception Date</th>
	        <th style="width:8%; padding:8px; border:1px solid #ccc;">QC Status</th>
	        <th style="width:7%; padding:8px; border:1px solid #ccc;">Valid. Date</th>
	        <th style="width:7%; padding:8px; border:1px solid #ccc;">Received By</th>
	        <th style="width:8%; padding:8px; border:1px solid #ccc;">QC Controller</th>
	        <th style="width:8%; padding:8px; border:1px solid #ccc;">QC Answer</th>
	        <th style="width:8%; padding:8px; border:1px solid #ccc;">Inspection place</th>
	      </tr>
	    </thead>
	    <tbody>
	`;
	if (top.MyApp.CurrentSetting.nChapMode != 'Reset') {
	  // Requête SQL
	  //var vCpyNRID = top.MyApp.GetItemValue("CpyNRID");
	  var vStrSQL = "select xcq.nrid as NridCQ,";
	  vStrSQL+= " xcq.no_CQ as NoCQ,";
	  vStrSQL+= " ISNULL(xcq.statutdemCQ, '') as ReqStatus,";
	  vStrSQL+= " ISNULL(xcq.UserDemCQ, '') as UserDemCQ,";
	  vStrSQL+= " ISNULL(CONVERT(VARCHAR, xcq.dateDemande, 103), '') as DateDemande,";
	  vStrSQL+= " ISNULL(xcq.heure_demande, '') as HeureDemande,";
	  vStrSQL+= " ISNULL(CONVERT(VARCHAR, xcq.dateprevuCQ , 103), '') as DatePrevuCQ,";
	  vStrSQL+= " ISNULL(CONVERT(VARCHAR, xcq.date_confirmeCQ , 103), '') as DateConfirmeCQ,";
	  vStrSQL+= " ISNULL(CONVERT(VARCHAR, xcq.dateRec , 103), '') as DateRec,";
	  vStrSQL+= " ISNULL(xcq.statutCQ, '') as StatutCQ,";
	  vStrSQL+= " ISNULL(CONVERT(VARCHAR, xcq.dateValidCQ , 103), '') as DateValidCQ,";
	  vStrSQL+= " ISNULL(xcq.cQValide, '') as CQValide,";
	  vStrSQL+= " ISNULL(xcq.contQualite, '') as ContQualite,";
	  vStrSQL+= " ISNULL(xcq.repControle, '') as RepControle,";
	  vStrSQL+= " ISNULL(xcq.xLieuInspection, '') as LieuInspection";
	  vStrSQL+= " from x_controle_qualite xcq inner join dc0 dc0 on dc0.nrid = xcq.dc0_nrid";
	  vStrSQL+= " where xcq.template is null";
	  vStrSQL+= " and dc0.template is null";
	  vStrSQL+= " and xcq.dc0_nrid = :QuoNRID order by xcq.no_CQ asc";
	
	  //alert(vStrSQL); // À commenter une fois testé
	  // Exécution via script serveur
	  var strResultat = top.MyApp.ExecuteServerScript(30231053360342, [vStrSQL]);
	  //alert(strResultat); // À commenter une fois testé
	
	  // Parsing XML résultat
	  var objXmlRes = top.MyApp.InitXmlCli(strResultat);
	
	  var objNridCQ = objXmlRes.getElementsByTagName("NridCQ");
	  var objNoCQ = objXmlRes.getElementsByTagName("NoCQ");
	  var objReqStatus = objXmlRes.getElementsByTagName("ReqStatus");
	  var objUserDemCQ = objXmlRes.getElementsByTagName("UserDemCQ");
	  var objDateDemande = objXmlRes.getElementsByTagName("DateDemande");
	  var objHeureDemande = objXmlRes.getElementsByTagName("HeureDemande");
	  var objDatePrevuCQ = objXmlRes.getElementsByTagName("DatePrevuCQ");
	  var objDateConfirmeCQ = objXmlRes.getElementsByTagName("DateConfirmeCQ");
	  var objDateRec = objXmlRes.getElementsByTagName("DateRec");
	  var objStatutCQ = objXmlRes.getElementsByTagName("StatutCQ");
	  var objDateValidCQ = objXmlRes.getElementsByTagName("DateValidCQ");
	  var objCQValide = objXmlRes.getElementsByTagName("CQValide");
	  var objContQualite = objXmlRes.getElementsByTagName("ContQualite");
	  var objRepControle = objXmlRes.getElementsByTagName("RepControle");
	  var objLieuInspection = objXmlRes.getElementsByTagName("LieuInspection");
	
	  
	  //top.MyApp.arrTranslations[PR] || PR
	  for (var i = 0; i < objNridCQ.length; i++) {
	    var v1 = objReqStatus[i].getAttribute("Val");
	    var v2 = objStatutCQ[i].getAttribute("Val");
	    //alert("defaut req status : "+v1);
	    var vReqStatus = top.MyApp.arrTranslations[v1] || v1;
	    var vRetStatus = top.MyApp.arrTranslations[v2] || v2;
	    //alert("trans value : "+vReqStatus);
	    tableHTML += `
	      <tr style="background-color:${i % 2 === 0 ? '#f9f9f9' : '#dcdcdc'};">
	        <td style="padding:8px; border:1px solid #ddd; text-align:center;">${objNoCQ[i].getAttribute("Val")}</td>
	        <td style="padding:8px; border:1px solid #ddd; word-wrap:break-word;">${vReqStatus}</td>
	        <td style="padding:8px; border:1px solid #ddd; text-align:center;">${objUserDemCQ[i].getAttribute("Val")}</td>
	        <td style="padding:8px; border:1px solid #ddd; text-align:center;">${objDateDemande[i].getAttribute("Val")}</td>
	        <td style="padding:8px; border:1px solid #ddd; text-align:center;">${objHeureDemande[i].getAttribute("Val")}</td>
	        <td style="padding:8px; border:1px solid #ddd; text-align:center;">${objDatePrevuCQ[i].getAttribute("Val")}</td>
	        <td style="padding:8px; border:1px solid #ddd; text-align:center;">${objDateConfirmeCQ[i].getAttribute("Val")}</td>
	        <td style="padding:8px; border:1px solid #ddd; text-align:center;">${vRetStatus}</td>
	        <td style="padding:8px; border:1px solid #ddd; text-align:center;">${objStatutCQ[i].getAttribute("Val")}</td>
	        <td style="padding:8px; border:1px solid #ddd; text-align:center;">${objDateValidCQ[i].getAttribute("Val")}</td>
	        <td style="padding:8px; border:1px solid #ddd; text-align:center;">${objCQValide[i].getAttribute("Val")}</td>
	        <td style="padding:8px; border:1px solid #ddd; text-align:center;">${objContQualite[i].getAttribute("Val")}</td>
	        <td style="padding:8px; border:1px solid #ddd; text-align:center;">${objRepControle[i].getAttribute("Val")}</td>
	        <td style="padding:8px; border:1px solid #ddd; text-align:center;">${objLieuInspection[i].getAttribute("Val")}</td>
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