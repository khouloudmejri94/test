function SS_WDS_Extended_Search_Suppliers(pFrn,pEmail,pWebFrn,pAddrFrn,pMobile,pSiretFrn,ptel,pReqType)
{
	//SS_WDS_Extended_Search_Suppliers - 41688058318854
	var queryBuilder = new System.Text.StringBuilder();
	var strTableau = new System.Text.StringBuilder();
	//vReq.Append('SELECT so0.nrid as CpyNRID, so0.societe as CpyName from sysadm.v_so0 so0 where template is null and societe like @pFrn');
	
	var queryPart1 = "SELECT   * from ( SELECT  ISNULL(SO.Supplier, CT.Supplier) AS Supplier,   ISNULL(SO.OldName, CT.OldName) AS OldName,   ISNULL(SO.Siret, CT.Siret) AS Siret,   ISNULL(SO.Team, CT.Team) AS Team, ";
	var queryPart2 = "    ISNULL(SO.Buyer, CT.Buyer) AS Buyer,   ISNULL(SO.Owner, CT.Owner) AS Owner,   ISNULL(SO.Phone, CT.Phone) AS Phone,   ISNULL(SO.Mobile, CT.Mobile) AS Mobile,   ISNULL(SO.Prospector, CT.Prospector) AS Prospector,  ";
	var queryPart3 = "    ISNULL(SO.Country, CT.Country) AS Country,   ISNULL(SO.Portefolio, CT.Portefolio) AS Portefolio,   ISNULL(SO.Type, CT.Type) AS Type,   ISNULL(SO.Web, CT.Web) AS Web,   ISNULL(SO.Address, CT.Address) AS Address,  ";
	var queryPart4 = "    ISNULL(CT.prenom, '-') AS FirstName,   ISNULL(CT.nom, '-') AS LastName,   ISNULL(CT.email, '-') AS ContEmail,   ISNULL(CT.CtMobile, '-') AS ContMobile,   ISNULL(CT.CtTel, '-') AS ContTel , Isnull(SO.nrid, CT.So0Nrid) AS SocNrid, ISNULL(SO.Statut, CT.Statut) AS Statut,ISNULL(SO.CreationDate, CT.CreationDate) AS CreationDate ";
	var queryPart5 = " FROM (SELECT   so0.nrid,   CASE     WHEN so0.societe IS NULL THEN '-'     ELSE so0.societe   END AS Supplier,   CASE     WHEN so0.societe_2 IS NULL THEN '-'     ELSE so0.societe_2   END AS OldName,    ";
	var queryPart6 = "    so0.xsiret AS Siret,   so0.xSecteur AS Team,   CASE     WHEN so0.xacht IS NULL THEN '-'     ELSE so0.xacht   END AS Buyer,   CASE     WHEN so0.titulaire IS NULL THEN '-'     ELSE so0.titulaire   END AS Owner,  ";
	var queryPart7 = "    CASE     WHEN tel1 IS NULL THEN '-'     WHEN prefixe_int IS NULL THEN tel1     ELSE ISNULL(prefixe_int + tel1, 0)   END AS Phone,   CASE     WHEN so0.xMobile IS NULL THEN '-'     ELSE so0.xMobile   END AS Mobile,   ";
	var queryPart8 = "    CASE     WHEN so0.xprosp IS NULL THEN '-'     ELSE so0.xprosp   END AS Prospector,   CASE     WHEN so0.pays IS NULL THEN '-'     ELSE so0.pays   END AS Country,   ";
	var queryPart9 = "    CASE     WHEN so0.xetat_pepite IS NULL THEN '-'     ELSE so0.xetat_pepite   END AS Portefolio,   CASE     WHEN so0.xtypefrs IS NULL THEN '-'     ELSE so0.xtypefrs   END AS Type,CASE     WHEN so0.xdate_creat IS NULL THEN '-'     ELSE so0.xdate_creat   END AS CreationDate,  CASE     WHEN so0.type IS NULL THEN '-'     ELSE so0.type   END AS Statut, ";
	var queryPart10 = "    CASE     WHEN so0.web_link IS NULL THEN '-'     ELSE so0.web_link   END AS Web,   CASE     WHEN so0.adresse IS NULL THEN '-'     ELSE so0.adresse   END AS Address FROM sysadm.V_so0 so0   ";
	var queryPart11 = " WHERE so0.Template IS NULL AND ( societe LIKE @pFrn OR societe_2 LIKE @pFrn OR e_mail LIKE @pEmail OR web_link LIKE @pWebFrn OR adresse LIKE @pAddrFrn OR xMobile LIKE @pMobile OR xsiret LIKE @pSiretFrn OR tel1 LIKE @ptel )) SO   ";
	var queryPart12 = " FULL OUTER JOIN (SELECT   so0.nrid,   so0.societe AS Supplier,   CASE     WHEN so0.societe_2 IS NULL THEN '-'     ELSE so0.societe_2   END AS OldName,   so0.xsiret AS Siret,   so0.xSecteur AS Team,   ";
	var queryPart13 = "    CASE     WHEN so0.xacht IS NULL THEN '-'     ELSE so0.xacht   END AS Buyer,   CASE     WHEN so0.titulaire IS NULL THEN '-'     ELSE so0.titulaire   END AS Owner,   ";
	var queryPart14 = "    CASE     WHEN tel1 IS NULL THEN '-'     WHEN prefixe_int IS NULL THEN tel1     ELSE ISNULL(prefixe_int + tel1, 0)   END AS Phone,   CASE     WHEN so0.xMobile IS NULL THEN '-'     ELSE so0.xMobile   END AS Mobile,    ";
	var queryPart15 = "    CASE     WHEN so0.xprosp IS NULL THEN '-'     ELSE so0.xprosp   END AS Prospector,   CASE     WHEN so0.pays IS NULL THEN '-'     ELSE so0.pays   END AS Country,  CASE     WHEN so0.xetat_pepite IS NULL THEN '-'     ELSE so0.xetat_pepite   END AS Portefolio,   ";
	var queryPart16 = "    CASE     WHEN so0.xtypefrs IS NULL THEN '-'     ELSE so0.xtypefrs   END AS Type, CASE     WHEN so0.type IS NULL THEN '-'     ELSE so0.type   END AS Statut,CASE     WHEN so0.xdate_creat IS NULL THEN '-'     ELSE so0.xdate_creat   END AS CreationDate,   CASE     WHEN so0.web_link IS NULL THEN '-'     ELSE so0.web_link   END AS Web,   CASE     WHEN so0.adresse IS NULL THEN '-'     ELSE so0.adresse   END AS Address,   ";
	var queryPart17 = "    pe0.prenom AS prenom,   pe0.personne AS nom,   sp0.e_mail AS email,   sp0.so0_nrid AS So0Nrid,   sp0.mobile_phone AS CtMobile,   sp0.tel AS CtTel  ";
	var queryPart18 = " FROM sysadm.V_pe0 pe0  INNER JOIN sysadm.sp0   ON sp0.pe0_nrid = pe0.nrid INNER JOIN sysadm.so0   ON so0.nrid = sp0.so0_nrid WHERE sp0.template IS NULL AND pe0.template IS NULL AND so0.template IS NULL  ";
	var queryPart19 = " AND ( sp0.e_mail LIKE @pEmail OR sp0.mobile_phone LIKE @pMobile OR sp0.tel LIKE @ptel )) CT   ON CT.So0Nrid = SO.nrid  ";
	var queryPart20 = " union select 'FRS FR' as 'Supplier', '-' as 'OldName',Siret as 'Siret','France' as 'Sector', '-' as 'Buyer', '-' as 'Owner', '-' as 'Phone', '-' as 'Mobile', '-' as 'Prospector', '-' as 'Country', '-' as 'Portefolio', '-' as 'Type', '-' as 'Web', '-' as 'Address',   ";
	var queryPart21 = "  '-' AS FirstName,   '-' AS LastName,   '-' AS ContEmail,   '-' AS ContMobile,   '-' AS ContTel, foreign_NRID as SocNrid , '-' as 'Statut','' as 'CreationDate' from sysadm.x_frs_exclude where template is null and siret like @pSiretFrn   ) T  ";
	
	queryBuilder.Append(queryPart1);
	queryBuilder.Append(queryPart2);
	queryBuilder.Append(queryPart3);
	queryBuilder.Append(queryPart4);
	queryBuilder.Append(queryPart5);
	queryBuilder.Append(queryPart6);
	queryBuilder.Append(queryPart7);
	queryBuilder.Append(queryPart8);
	queryBuilder.Append(queryPart9);
	queryBuilder.Append(queryPart10);
	queryBuilder.Append(queryPart11);
	queryBuilder.Append(queryPart12);
	queryBuilder.Append(queryPart13);
	queryBuilder.Append(queryPart14);
	queryBuilder.Append(queryPart15);
	queryBuilder.Append(queryPart16);
	queryBuilder.Append(queryPart17);
	queryBuilder.Append(queryPart18);
	queryBuilder.Append(queryPart19);
	queryBuilder.Append(queryPart20);
	queryBuilder.Append(queryPart21);
	           
	var params = [
	    ["@pFrn", pFrn],
	    ["@pEmail", pEmail],
	    ["@pWebFrn", pWebFrn],
	    ["@pAddrFrn", pAddrFrn],
	    ["@pMobile", pMobile],
	    ["@pSiretFrn", pSiretFrn],
	    ["@ptel", ptel]
	];
	
	var dt  = ExecSqlParams(queryBuilder, params);
	//return queryBuilder.ToString();
	//return "fonction appele ExecSqlParams avec sultat : " + dt.Rows.Count;
	strTableau.Append('<table id="reAffectTable">');
	strTableau.Append('<tr><th>Supplier</th><th>OldName</th><th>Siret</th><th>Sector</th><th>Owner</th><th>Phone</th><th>Mobile</th><th>Country</th><th>Portefolio</th><th>Type</th><th>Web</th><th>Address</th><th>CtEmail</th><th>CtMobile</th><th>CtTel</th><th class="hidden-column">Hidden Nrid</th><th class="hidden-column">Hidden status</th><th class="hidden-column"> </th></tr>');
	
	if (dt.Rows.Count >= 1) {
	    if (dt.Rows.Count > 20) {
	
	        strTableau.Append('<tr onclick="copySpecificCell(this)">');
	
	        // 0 Supplier
	        strTableau.Append('<td>');
	        strTableau.Append('Too many results to be displayed! Please verify search parameters and retry.');
	        strTableau.Append('</td>');
	
	        // 1 OldName
	        strTableau.Append('<td>');
	        strTableau.Append('-');
	        strTableau.Append('</td>');
	
	        // 2 Siret
	        strTableau.Append('<td>');
	        strTableau.Append('-');
	        strTableau.Append('</td>');
	
	        // 3 Team
	        strTableau.Append('<td>');
	        strTableau.Append('-');
	        strTableau.Append('</td>');
	
	        // 4 Buyer
	       /*  strTableau.Append('<td>');
	        strTableau.Append(dt.Rows[i][4]);
	        strTableau.Append('</td>'); */
	
	        // 5 Owner
	        strTableau.Append('<td>');
	        strTableau.Append('-');
	        strTableau.Append('</td>');
	
	        // 6 Phone
	        strTableau.Append('<td>');
	        strTableau.Append('-');
	        strTableau.Append('</td>');
	
	        // 7 Mobile
	        strTableau.Append('<td>');
	        strTableau.Append('-');
	        strTableau.Append('</td>');
	
	        // 8 Prospector
	        /* strTableau.Append('<td>');
	        strTableau.Append(dt.Rows[i][8]);
	        strTableau.Append('</td>'); */
	
	        // 9 Country
	        strTableau.Append('<td>');
	        strTableau.Append('-');
	        strTableau.Append('</td>');
	        
	        // 10 Portefolio
	        strTableau.Append('<td>');
	        strTableau.Append('-');
	        strTableau.Append('</td>');
	
	        // 11 Type
	        strTableau.Append('<td>');
	        strTableau.Append('-');
	        strTableau.Append('</td>');
	
	        // 12 Web
	        strTableau.Append('<td>');
	        strTableau.Append('-');
	        strTableau.Append('</td>');
	
	        // 13 Address
	        strTableau.Append('<td>');
	        strTableau.Append('-');
	        strTableau.Append('</td>');
	
	        /*  // 14 FirstName
	        strTableau.Append('<td>');
	        strTableau.Append(dt.Rows[i][14]);
	        strTableau.Append('</td>');
	
	        // 15 LastName
	        strTableau.Append('<td>');
	        strTableau.Append(dt.Rows[i][15]);
	        strTableau.Append('</td>'); */
	        
	        // 16 ContEmail
	        strTableau.Append('<td>');
	        strTableau.Append('-');
	        strTableau.Append('</td>');
	
	        // 17 ContMobile
	        strTableau.Append('<td>');
	        strTableau.Append('-');
	        strTableau.Append('</td>');
	
	        // 18 ContTel
	        strTableau.Append('<td>');
	        strTableau.Append('-');
	        strTableau.Append('</td>');
	
	        // 19 NRID HIdden Column
	        strTableau.Append('<td class="hidden-column">');
	        strTableau.Append('-');
	        strTableau.Append('</td>');
	
	        // 20 status HIDDEN Column
	        strTableau.Append('<td class="hidden-column">');
	        strTableau.Append('-');
	        strTableau.Append('</td>');
	
	        // 21 Creation Date HIDDEN Column
	        strTableau.Append('<td class="hidden-column">');
	        strTableau.Append('-');
	        strTableau.Append('</td>');
	
	        // 22 Check Supplier Column
	        if(pReqType=="search"){
	            strTableau.Append('<td>');
	            strTableau.Append('</td>');
	        } else if(pReqType=="access"){
	            strTableau.Append('<td><input type="checkbox" class="row_checkbox" onchange="selectSupplier(this)"></td>');
	        }
	        strTableau.Append('</tr>');
	        
	    } else {
	        for (var i = 0; i < dt.Rows.Count; i++){
	            //return dt.Rows[0][0];
	            strTableau.Append('<tr onclick="copySpecificCell(this)">');
	    
	            // 0 Supplier
	            strTableau.Append('<td>');
	            strTableau.Append(dt.Rows[i][0]);
	            strTableau.Append('</td>');
	    
	            // 1 OldName
	            strTableau.Append('<td>');
	            strTableau.Append(dt.Rows[i][1]);
	            strTableau.Append('</td>');
	    
	            // 2 Siret
	            strTableau.Append('<td>');
	            strTableau.Append(dt.Rows[i][2]);
	            strTableau.Append('</td>');
	    
	            // 3 Team
	            strTableau.Append('<td>');
	            strTableau.Append(dt.Rows[i][3]);
	            strTableau.Append('</td>');
	    
	            // 4 Buyer
	           /*  strTableau.Append('<td>');
	            strTableau.Append(dt.Rows[i][4]);
	            strTableau.Append('</td>'); */
	    
	            // 5 Owner
	            strTableau.Append('<td>');
	            strTableau.Append(dt.Rows[i][5]);
	            strTableau.Append('</td>');
	    
	            // 6 Phone
	            strTableau.Append('<td>');
	            strTableau.Append(dt.Rows[i][6]);
	            strTableau.Append('</td>');
	    
	            // 7 Mobile
	            strTableau.Append('<td>');
	            strTableau.Append(dt.Rows[i][7]);
	            strTableau.Append('</td>');
	    
	            // 8 Prospector
	            /* strTableau.Append('<td>');
	            strTableau.Append(dt.Rows[i][8]);
	            strTableau.Append('</td>'); */
	    
	            // 9 Country
	            strTableau.Append('<td>');
	            strTableau.Append(dt.Rows[i][9]);
	            strTableau.Append('</td>');
	            
	            // 10 Portefolio
	            strTableau.Append('<td>');
	            strTableau.Append(dt.Rows[i][10]);
	            strTableau.Append('</td>');
	    
	            // 11 Type
	            strTableau.Append('<td>');
	            strTableau.Append(dt.Rows[i][11]);
	            strTableau.Append('</td>');
	    
	            // 12 Web
	            strTableau.Append('<td>');
	            strTableau.Append(dt.Rows[i][12]);
	            strTableau.Append('</td>');
	    
	            // 13 Address
	            strTableau.Append('<td>');
	            strTableau.Append(dt.Rows[i][13]);
	            strTableau.Append('</td>');
	    
	            /*  // 14 FirstName
	            strTableau.Append('<td>');
	            strTableau.Append(dt.Rows[i][14]);
	            strTableau.Append('</td>');
	    
	            // 15 LastName
	            strTableau.Append('<td>');
	            strTableau.Append(dt.Rows[i][15]);
	            strTableau.Append('</td>'); */
	            
	            // 16 ContEmail
	            strTableau.Append('<td>');
	            strTableau.Append(dt.Rows[i][16]);
	            strTableau.Append('</td>');
	    
	            // 17 ContMobile
	            strTableau.Append('<td>');
	            strTableau.Append(dt.Rows[i][17]);
	            strTableau.Append('</td>');
	    
	            // 18 ContTel
	            strTableau.Append('<td>');
	            strTableau.Append(dt.Rows[i][18]);
	            strTableau.Append('</td>');
	    
	            // 19 NRID HIdden Column
	            strTableau.Append('<td class="hidden-column">');
	            strTableau.Append(dt.Rows[i][19]);
	            strTableau.Append('</td>');
	    
	            // 20 status HIDDEN Column
	            strTableau.Append('<td class="hidden-column">');
	            strTableau.Append(dt.Rows[i][20]);
	            strTableau.Append('</td>');
	    
	            // 21 Creation Date HIDDEN Column
	            strTableau.Append('<td class="hidden-column">');
	            strTableau.Append(dt.Rows[i][21]);
	            strTableau.Append('</td>');
	    
	            // 22 Check Supplier Column
	            if(pReqType=="search"){
	                strTableau.Append('<td>');
	                strTableau.Append('</td>');
	            } else if(pReqType=="access"){
	                strTableau.Append('<td><input type="checkbox" class="row_checkbox" onchange="selectSupplier(this)"></td>');
	            }
	            strTableau.Append('</tr>');
	        }
	    }
	}
	strTableau.Append('</table>');
	return strTableau;
	
	//pReqType
	//return("my result count is : "+dt.Rows.Count);
	//return "fonction appele avec le param : " + vReq.ToString() ;
	//return "function SS_WDS_Extended_Search_Suppliers correctly called";
	
	
	 //ExecSqlParams
	//var vQuery = "SELECT so0.nrid as CpyNRID from sysadm.v_so0 so0 where template is null and societe like '" + nrFrn + "'  ";
	/*
	var vSqlParams = [];
	    for (var i = 0; i < vParams.length; i++) {
	        var vSqlParamObj = new System.Data.SqlClient.SqlParameter(vParams[i][0], vParams[i][1]);
	        vSqlParamObj.Direction = System.Data.ParameterDirection.Input;
	        vSqlParams.push(vSqlParamObj);
	    }
	    return Selligent.Application.Data.QueryHelper.ExecuteDataTable(System.Data.CommandType.Text, vQuery, vSqlParams);
	*/
	//return "Hello ExecSqlParams vQuery is : " + vQuery + " -- AND first on vParams is : " + vParams[0][1];
	//return "Hello ExecSqlParams vQuery is : " + vQuery;
}