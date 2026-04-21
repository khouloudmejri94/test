function AfterLoad_FP_42460873247338()
{
	let tableHTML = `
	  <div style="width:100%; padding:10px;">
	    <table style="
	      width:100%;
	      table-layout: fixed;
	      font-family: Arial, sans-serif;
	      font-size: 13px;
	      border-collapse: collapse;
	      box-shadow: 0 2px 6px rgba(0,0,0,0.1);
	    ">
	      <thead style="background-color: #23aad7; color: white;">
	        <tr>
	          <th style="width:10%; padding:8px; border:1px solid #ccc;">Code Saison</th>
	          <th style="width:20%; padding:8px; border:1px solid #ccc;">Group</th>
	          <th style="width:20%; padding:8px; border:1px solid #ccc;">Family</th>
	          <th style="width:20%; padding:8px; border:1px solid #ccc;">Sub Family</th>
	          <th style="width:35%; padding:8px; border:1px solid #ccc;">IFLS</th>
	          <th style="width:5%; padding:8px; border:1px solid #ccc;">Action</th>
	        </tr>
	      </thead>
	      <tbody>
	`;
	
	if (top.MyApp.CurrentSetting.nChapMode !== 'Reset') {
	  const vCpyNRID = top.MyApp.GetItemValue("CpyNRID");
	
	  const vStrSQL = `
	    SELECT NRID AS NRID, 
	           code_saison AS SAISON, 
	           groupe AS GROUPE, 
	           famille AS FAMILLE, 
	           sous_famille AS SFAMILLE, 
	           LIB_IFLS AS LIBIFLS 
	    FROM sysadm.x_supplier_IFLS 
	    WHERE template IS NULL AND so0_nrid = '${vCpyNRID}' order by Groupe , Famille , sous_famille , LIBIFLS
	  `;
	
	  const strResultat = top.MyApp.ExecuteServerScript(30231053360342, [vStrSQL]);
	  const objXmlRes = top.MyApp.InitXmlCli(strResultat);
	
	  if (objXmlRes) {
	    const objNRID = objXmlRes.getElementsByTagName("NRID");
	    const objCodeSaison = objXmlRes.getElementsByTagName("SAISON");
	    const objGroupe = objXmlRes.getElementsByTagName("GROUPE");
	    const objFamille = objXmlRes.getElementsByTagName("FAMILLE");
	    const objSFamille = objXmlRes.getElementsByTagName("SFAMILLE");
	    const objLIBIFLS = objXmlRes.getElementsByTagName("LIBIFLS");
	
	    for (let i = 0; i < objNRID.length; i++) {
	      const nrid = objNRID[i] && objNRID[i].getAttribute && objNRID[i].getAttribute("Val") 
	        ? objNRID[i].getAttribute("Val") 
	        : "";
	      const codeSaison = objCodeSaison[i] && objCodeSaison[i].getAttribute && objCodeSaison[i].getAttribute("Val") 
	        ? objCodeSaison[i].getAttribute("Val") 
	        : "";
	      const groupe = objGroupe[i] && objGroupe[i].getAttribute && objGroupe[i].getAttribute("Val") 
	        ? objGroupe[i].getAttribute("Val") 
	        : "";
	      const famille = objFamille[i] && objFamille[i].getAttribute && objFamille[i].getAttribute("Val") 
	        ? objFamille[i].getAttribute("Val") 
	        : "";
	      const sFamille = objSFamille[i] && objSFamille[i].getAttribute && objSFamille[i].getAttribute("Val") 
	        ? objSFamille[i].getAttribute("Val") 
	        : "";
	      const libIFLS = objLIBIFLS[i] && objLIBIFLS[i].getAttribute && objLIBIFLS[i].getAttribute("Val") 
	        ? objLIBIFLS[i].getAttribute("Val") 
	        : "";
	
	      const groupeTrans = top.MyApp.arrTranslations[groupe] || groupe;
	      const familleTrans = top.MyApp.arrTranslations[famille] || famille;
	      const sFamilleTrans = top.MyApp.arrTranslations[sFamille] || sFamille;
	      const libIFLSTrans = top.MyApp.arrTranslations[libIFLS] || libIFLS;
	
	      if (nrid) {
	        tableHTML += `
	          <tr id="row_${i}" style="background-color: ${i % 2 === 0 ? '#f9f9f9' : '#dcdcdc'};">
	            <td style="padding: 8px; border: 1px solid #ddd; text-align: center;">${codeSaison}</td>
	            <td style="padding: 8px; border: 1px solid #ddd; text-align: center;">${groupeTrans}</td>
	            <td style="padding: 8px; border: 1px solid #ddd; text-align: center;">${familleTrans}</td>
	            <td style="padding: 8px; border: 1px solid #ddd; text-align: center;">${sFamilleTrans}</td>
	            <td style="padding: 8px; border: 1px solid #ddd; text-align: center;">${libIFLSTrans}</td>
	            <td style="padding: 8px; border: 1px solid #ddd; text-align: center;">
	              <button onclick="if (confirm(\'Are you sure you want to delete this line ?\')) { const row = top.MyApp.fraData_View.ifrView2.fraData.document.getElementById(\'row_${i}\'); if (row) row.parentNode.removeChild(row); const deleteSQL = \'UPDATE sysadm.x_supplier_IFLS SET template = 2 WHERE NRID = \\\'${nrid}\\\'\'; top.MyApp.ExecuteServerScript(30231053360342, [deleteSQL]); }" style="background-color: #ff6666; color: white; border: none; padding: 5px 10px; cursor: pointer; border-radius: 12px; transition: background-color 0.3s ease;" onmouseover="this.style.backgroundColor=\'#23aad7\';" onmouseout="this.style.backgroundColor=\'#ff6666\';">Delete</button>
	            </td>
	          </tr>
	        `;
	      }
	    }
	
	    if (objNRID.length === 0) {
	      tableHTML += `
	        <tr>
	          <td colspan="6" style="padding: 8px; border: 1px solid #ddd; text-align: center; color: #888;">
	            No Data Found
	          </td>
	        </tr>
	      `;
	    }
	  } else {
	    tableHTML += `
	      <tr>
	        <td colspan="6" style="padding: 8px; border: 1px solid #ddd; text-align: center; color: #888;">
	          Error Loading Data
	        </td>
	      </tr>
	    `;
	  }
	}
	
	tableHTML += `
	      </tbody>
	    </table>
	  </div>
	`;
	
	// Inject table into CDM form
	top.MyApp.ModifyLayout(
	  top.MyApp.fraData_View.ifrView2.fraData.document.getElementById("tblMain"),
	  1, // Column
	  2, // Row
	  15, // Rowspan
	  1, // Colspan (full width)
	  tableHTML,
	  false // Not a form field
	);
	
		return ;
}