function AfterLoad_FP_42550473208740()
{
	// Quo : Balance
	// AfterLoad_FP_42550473208740
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
	        <th style="width:4%; padding:8px; border:1px solid #ccc;">No</th>
	        <th style="width:8%; padding:8px; border:1px solid #ccc;">Status</th>
	        <th style="width:7%; padding:8px; border:1px solid #ccc;">Req.Date</th>
	        <th style="width:7%; padding:8px; border:1px solid #ccc;">Req. details</th>
	        <th style="width:7%; padding:8px; border:1px solid #ccc;">Log. Approve Date</th>
	        <th style="width:7%; padding:8px; border:1px solid #ccc;">Log. Details</th>
	        <th style="width:7%; padding:8px; border:1px solid #ccc;">Log. Done by</th>
	        <th style="width:8%; padding:8px; border:1px solid #ccc;">Fin. Balance Date</th>
	        <th style="width:7%; padding:8px; border:1px solid #ccc;">Balance Reply</th>
	        <th style="width:6%; padding:8px; border:1px solid #ccc;">Amount</th>
	        <th style="width:8%; padding:8px; border:1px solid #ccc;">Swift Date</th>
	        <th style="width:8%; padding:8px; border:1px solid #ccc;">Done BY</th>
	      </tr>
	    </thead>
	    <tbody>
	`;
	if (top.MyApp.CurrentSetting.nChapMode != 'Reset') {
	  // Requête SQL
	  //var vCpyNRID = top.MyApp.GetItemValue("CpyNRID");
	  var vStrSQL = "SELECT nrid as SldNrid, ";
	  vStrSQL+= " no_demande as NoSld, ";
	  vStrSQL+= " ISNULL(statut_Solde, '') as Status, ";
	  vStrSQL+= " ISNULL(CONVERT(VARCHAR, date_demande_solde , 103), '') as ReqDate, ";
	  vStrSQL+= " ISNULL(details_demande, '') as ReqDetails, ";
	  vStrSQL+= " ISNULL(CONVERT(VARCHAR, Date_Traitement , 103), '') as TraitDate, ";
	  vStrSQL+= " ISNULL(ReponseTraitement, '') as TraitRep, ";
	  vStrSQL+= " ISNULL(Solde_traite_par, '') as Valideur, ";
	  vStrSQL+= " ISNULL(CONVERT(VARCHAR, date_solde , 103), '') as DateSld, ";
	  vStrSQL+= " ISNULL(reponse_paiement, '') as Reponse, ";
	  vStrSQL+= " ISNULL(montant_solde, 0) as Mnt, ";
	  vStrSQL+= " ISNULL(CONVERT(VARCHAR, DateSwift , 103), '') as DateSwift, ";
	  vStrSQL+= " ISNULL(prise_charge_par, '') as PrisCharge";
	  vStrSQL+= " from sysadm.x_paiement_solde ";
	  vStrSQL+= " where dc0_nrid = :QuoNRID ";
	  vStrSQL+= " order by no_demande asc ";
	
	  //alert(vStrSQL); // À commenter une fois testé
	  // Exécution via script serveur
	  var strResultat = top.MyApp.ExecuteServerScript(30231053360342, [vStrSQL]);
	  //alert(strResultat); // À commenter une fois testé
	
	  // Parsing XML résultat
	  var objXmlRes = top.MyApp.InitXmlCli(strResultat);
	
	  var objSldNrid = objXmlRes.getElementsByTagName("SldNrid");
	  var objNoSld = objXmlRes.getElementsByTagName("NoSld");
	  var objStatus = objXmlRes.getElementsByTagName("Status");
	  var objReqDate = objXmlRes.getElementsByTagName("ReqDate");
	  var objReqDetails = objXmlRes.getElementsByTagName("ReqDetails");
	  var objTraitDate = objXmlRes.getElementsByTagName("TraitDate");
	  var objTraitRep = objXmlRes.getElementsByTagName("TraitRep");
	  var objValideur = objXmlRes.getElementsByTagName("Valideur");
	  var objDateSld = objXmlRes.getElementsByTagName("DateSld");
	  var objReponse = objXmlRes.getElementsByTagName("Reponse");
	  var objMnt = objXmlRes.getElementsByTagName("Mnt");
	  var objDateSwift = objXmlRes.getElementsByTagName("DateSwift");
	  var objPrisCharge = objXmlRes.getElementsByTagName("PrisCharge");
	
	  //top.MyApp.arrTranslations[PR] || PR
	  for (var i = 0; i < objSldNrid.length; i++) {
	    var v1 = objStatus[i].getAttribute("Val");
	    //alert("defaut req status : "+v1);
	    var vReqStatus = top.MyApp.arrTranslations[v1] || v1;
	    //alert("trans value : "+vReqStatus);
	    tableHTML += `
	      <tr style="background-color:${i % 2 === 0 ? '#f9f9f9' : '#dcdcdc'};">
	        <td style="padding:8px; border:1px solid #ddd; text-align:center;">${objNoSld[i].getAttribute("Val")}</td>
	        <td style="padding:8px; border:1px solid #ddd; word-wrap:break-word;">${vReqStatus}</td>
	        <td style="padding:8px; border:1px solid #ddd; text-align:center;">${objReqDate[i].getAttribute("Val")}</td>
	        <td style="padding:8px; border:1px solid #ddd; text-align:center;">${objReqDetails[i].getAttribute("Val")}</td>
	        <td style="padding:8px; border:1px solid #ddd; text-align:center;">${objTraitDate[i].getAttribute("Val")}</td>
	        <td style="padding:8px; border:1px solid #ddd; text-align:center;">${objTraitRep[i].getAttribute("Val")}</td>
	        <td style="padding:8px; border:1px solid #ddd; text-align:center;">${objValideur[i].getAttribute("Val")}</td>
	        <td style="padding:8px; border:1px solid #ddd; text-align:center;">${objDateSld[i].getAttribute("Val")}</td>
	        <td style="padding:8px; border:1px solid #ddd; text-align:center;">${objReponse[i].getAttribute("Val")}</td>
	        <td style="padding:8px; border:1px solid #ddd; text-align:center;">${objMnt[i].getAttribute("Val")}</td>
	        <td style="padding:8px; border:1px solid #ddd; text-align:center;">${objDateSwift[i].getAttribute("Val")}</td>
	        <td style="padding:8px; border:1px solid #ddd; text-align:center;">${objPrisCharge[i].getAttribute("Val")}</td>
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