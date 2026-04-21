function AfterLoad_FP_30779165225291()
{
	
	var vStatFair = top.MyApp.GetItemValue("OSaExtStatut");
	
	
	if (top.MyApp.CurrentSetting.nChapMode === "Reset") {
	    
	        const vSht = top.MyApp.FindItem("Sht30518322314450");
	        if (vSht) vSht.disabled = true;
	    
	} else {    if (vStatFair != "En dépôt de dossier" && vStatFair != "En suivi" && vStatFair != "Clos" ) {
	        const vSht = top.MyApp.FindItem("Sht30518322314450");
	        if (vSht) vSht.disabled = true;
	    } else {        const vSht = top.MyApp.FindItem("Sht30518322314450");
	                  if (vSht) vSht.disabled = false;}
	}
	
	
		console.log("=== START Commercial Assessment Dashboard ===");
	
	let tableHTML = `
	<div style="width:100%; margin:0 auto; padding:20px; font-family:'Segoe UI',Arial,sans-serif; font-size:14px; background:#f8f9fa; border-radius:12px; box-shadow:0 8px 25px rgba(0,0,0,0.1);">
	    <h2 style="margin:0 0 20px 0; color:#1565c0; font-size:19px; text-align:center; font-weight:600;">
	        Cards Follow up
	    </h2>
	    <div style="overflow-x:auto; border-radius:10px; box-shadow:0 4px 15px rgba(0,0,0,0.08);">
	        <table style="width:100%; min-width:750px; border-collapse:collapse; background:white; font-size:13px;">
	            <thead>
	                <tr style="background:#28A8D6; color:white; font-weight:600; text-transform:uppercase; letter-spacing:0.8px;">
	                    <th style="padding:12px 10px; text-align:center; min-width:120px;">VISTOR Team</th>
	                    <th colspan="3" style="padding:12px 10px; text-align:center; border-left:2px solid rgba(255,255,255,0.3);">FICHE A</th>
	                    <th colspan="3" style="padding:12px 10px; text-align:center; border-left:2px solid rgba(255,255,255,0.3);">FICHE B</th>
	                    <th style="padding:12px 10px; text-align:center; border-left:2px solid rgba(255,255,255,0.3); min-width:80px;">FICHE C</th>
	                    <th style="padding:12px 10px; text-align:center; border-left:2px solid rgba(255,255,255,0.3); min-width:90px;">Affairs Created</th>
	                </tr>
	                <tr style="background:#e3f2fd; color:#333; font-weight:600; font-size:12px;">
	                    <th style="padding:10px;"></th>
	                    <th style="padding:10px; color:#c62828;">In Progress</th>
	                    <th style="padding:10px; color:#2e7d32;">Processed</th>
	                    <th style="padding:10px; color:#1565c0; font-weight:700;">Total A</th>
	                    <th style="padding:10px; color:#c62828;">In Progress</th>
	                    <th style="padding:10px; color:#2e7d32;">Processed</th>
	                    <th style="padding:10px; color:#1565c0; font-weight:700;">Total B</th>
	                    <th style="padding:10px; color:#1565c0; font-weight:700;">Total C</th>
	                    <th style="padding:10px; color:#6a1b9a; font-weight:700;"> </th>
	                </tr>
	            </thead>
	            <tbody>`;
	
	
	const vSalonCode = top.MyApp.GetItemValue("OSaExtCodeEdit") || "";
	const vOsaNRID = top.MyApp.GetItemValue("OSaNRID") || 0;
	
	if (!vSalonCode || vSalonCode.trim() === "") {
	    tableHTML += `<tr><td colspan="9" style="text-align:center; padding:50px; background:#ffebee;  font-weight:600; font-size:15px;">
	        Reset Mode - No data loaded
	    </td></tr>`;
	} else {
	
	    const vUserName = top.MyApp.UserSetting.User.Name;
	    const strSqlCards = `
	        WITH AuthorizedTeams AS (
	        SELECT vue_equipe 
	        FROM sysadm.res_liees 
	        WHERE personne = '${vUserName}'
	  ), 
	  t AS (
	            SELECT x.nrid,
	                    x.salon,
	                    [V].team_name,
	                    x.stock_type,
	                    ActAff.no_dossier,
	                    x.hi0_nrid,
	                    x.TEMPLATE,
	                    CASE
	                        WHEN x.hi0_nrid IS NULL OR EXISTS (
	                            SELECT 1 FROM sysadm.hi0 h WITH (NOLOCK)
	                            WHERE h.nrid = x.hi0_nrid AND h.status = 'A FAIRE'
	                        ) THEN 'In progress'
	                        ELSE 'Processed'
	                    END AS Status
	            FROM sysadm.xact_salon AS x
	            INNER JOIN sysadm.am0 AS [V] ON [V].titulaire = x.userName
	            LEFT JOIN sysadm.hi0 AS hi0 ON hi0.nrid = x.hi0_nrid AND hi0.template IS NULL AND hi0.status = 'FAIT'
	            LEFT JOIN sysadm.hi0 AS ActAff ON ActAff.nrid = hi0.hi0_nrid AND ActAff.template IS NULL
	   LEFT JOIN AuthorizedTeams auth_m ON [V].team_name = auth_m.vue_equipe
	            WHERE x.template IS NULL
	              AND x.SALON =  '${vSalonCode}'
	     AND ( NOT EXISTS (SELECT 1 FROM AuthorizedTeams) 
	      OR auth_m.vue_equipe IS NOT NULL
	         ) 
	    
	        )
	        SELECT x.team_name,
	                COUNT(CASE WHEN x.stock_type = 'A' AND x.Status = 'In progress' THEN 1 END) AS A_InProgress,
	                COUNT(CASE WHEN x.stock_type = 'A' AND x.Status = 'Processed' THEN 1 END) AS A_Processed,
	                COUNT(CASE WHEN x.stock_type = 'B' AND x.Status = 'In progress' THEN 1 END) AS B_InProgress,
	                COUNT(CASE WHEN x.stock_type = 'B' AND x.Status = 'Processed' THEN 1 END) AS B_Processed,
	                COUNT(CASE WHEN x.stock_type = 'C' THEN 1 END) AS Total_C,
	                COUNT(CASE WHEN x.no_dossier IS NOT NULL THEN 1 END) AS Deals_Created
	        FROM t x
	        GROUP BY x.team_name
	        ORDER BY x.team_name
	    `;
	
	    const paramsCards = [{ name: 'Query', type: 'VARCHAR', direction: 'IN', size: 8000, value: strSqlCards }];
	    const paramsArrayCards = paramsCards.map(p => `${p.name}~${p.type}~${p.direction}~${p.size}~${p.value || ''}`).join("|");
	    const resultXmlCards = top.MyApp.ExecuteServerScript(42628290701856, ['sysadm.ExecuteDynamicQuery', paramsArrayCards]);
	
	    if (!resultXmlCards || resultXmlCards.indexOf("<Result") === -1) {
	        tableHTML += `<tr><td colspan="9" style="text-align:center; padding:40px; color:#d32f2f; background:#ffebee;">
	            Error executing Cards query
	        </td></tr>`;
	    } else {
	        const xmlDoc = top.MyApp.InitXmlCli(resultXmlCards);
	        const count = parseInt(xmlDoc.selectSingleNode("//Result")?.getAttribute("Count") || "0");
	
	        if (count === 0) {
	            tableHTML += `<tr><td colspan="9" style="text-align:center; padding:60px; color:#78909c; font-style:italic;">
	                No cards data for edition: <strong>${vSalonCode}</strong>
	            </td></tr>`;
	        } else {
	            const rows = xmlDoc.selectNodes("//Flds");
	            let grandA_InProg = 0, grandA_Proc = 0, grandA_Total = 0;
	            let grandB_InProg = 0, grandB_Proc = 0, grandB_Total = 0;
	            let grandC = 0, grandDeals = 0;
	
	            for (let i = 0; i < rows.length; i++) {
	                const row = rows[i];
	                const get = (field) => row.selectSingleNode(field)?.getAttribute("Val") || "0";
	
	                const team = get("team_name") || "Unassigned";
	                const a_inprog = parseInt(get("A_InProgress")) || 0;
	                const a_proc = parseInt(get("A_Processed")) || 0;
	                const b_inprog = parseInt(get("B_InProgress")) || 0;
	                const b_proc = parseInt(get("B_Processed")) || 0;
	                const c_total = parseInt(get("Total_C")) || 0;
	                const deals = parseInt(get("Deals_Created")) || 0;
	
	                const totalA = a_inprog + a_proc;
	                const totalB = b_inprog + b_proc;
	
	                grandA_InProg += a_inprog; grandA_Proc += a_proc; grandA_Total += totalA;
	                grandB_InProg += b_inprog; grandB_Proc += b_proc; grandB_Total += totalB;
	                grandC += c_total; grandDeals += deals;
	
	                const bg = i % 2 === 0 ? "#ffffff" : "#f5f9ff";
	
	                tableHTML += `
	                <tr style="background:${bg}; transition:all 0.2s;" onmouseover="this.style.background='#e1f5fe'" onmouseout="this.style.background='${bg}'">
	                    <td style="padding:12px 10px; text-align:left; font-weight:600; color:#333;">${team}</td>
	                    <td style="padding:12px; text-align:center; background:#ffebee; color:#c62828; font-weight:700;">${a_inprog}</td>
	                    <td style="padding:12px; text-align:center; background:#e8f5e9; color:#2e7d32; font-weight:700;">${a_proc}</td>
	                    <td style="padding:12px; text-align:center; background:#e3f2fd; color:#1565c0; font-weight:700; font-size:14px;">${totalA}</td>
	                    <td style="padding:12px; text-align:center; background:#ffebee; color:#c62828; font-weight:700;">${b_inprog}</td>
	                    <td style="padding:12px; text-align:center; background:#e8f5e9; color:#2e7d32; font-weight:700;">${b_proc}</td>
	                    <td style="padding:12px; text-align:center; background:#e3f2fd; color:#1565c0; font-weight:700; font-size:14px;">${totalB}</td>
	                    <td style="padding:12px; text-align:center; background:#e3f2fd; color:#1565c0; font-weight:700; font-size:14px;">${c_total}</td>
	                    <td style="padding:12px; text-align:center; background:#e3f2fd; color:#1565c0; font-weight:700;">${deals}</td>
	                </tr>`;
	            }
	
	            // Total général
	            tableHTML += `
	            <tr style="background:#28A8D6; color:white; font-weight:bold; font-size:14px;">
	                <td style="padding:14px 10px; text-align:center;">TOTAL</td>
	                <td style="padding:14px; text-align:center; background:#c62828;">${grandA_InProg}</td>
	                <td style="padding:14px; text-align:center; background:#2e7d32;">${grandA_Proc}</td>
	                <td style="padding:14px; text-align:center; color:white;">${grandA_Total}</td>
	                <td style="padding:14px; text-align:center; background:#c62828;">${grandB_InProg}</td>
	                <td style="padding:14px; text-align:center; background:#2e7d32;">${grandB_Proc}</td>
	                <td style="padding:14px; text-align:center; color:white;">${grandB_Total}</td>
	                <td style="padding:14px; text-align:center; color:white;">${grandC}</td>
	                <td style="padding:14px; text-align:center; color:white;">${grandDeals}</td>
	            </tr>`;
	        }
	    }
	}
	
	tableHTML += `
	            </tbody>
	        </table>
	    </div>
	
	    <!-- ========================== -->
	    <!-- NOUVEAU TABLEAU : Assessments commerciaux -->
	    <!-- ========================== -->
	    <h2 style="margin:40px 0 20px 0; color:#1565c0; font-size:19px; text-align:center; font-weight:600;">
	        Pilot Commercial Assessments
	    </h2>
	    <div style="overflow-x:auto; border-radius:10px; box-shadow:0 4px 15px rgba(0,0,0,0.08); margin-bottom:30px;">
	        <table style="width:100%; min-width:900px; border-collapse:collapse; background:white; font-size:13px;">
	            <thead>
	                <tr style="background:#28A8D6; color:white; font-weight:600; text-transform:uppercase; letter-spacing:0.8px;">
	                    <th style="padding:12px; text-align:center;">Date</th>
	                    <th style="padding:12px; text-align:center;">User</th>
	                    <th style="padding:12px; text-align:center;">Fair Type</th>
	                    <th style="padding:12px; text-align:center;">Supplier Type</th>
	                    <th style="padding:12px; text-align:center;">Halls Distrib.</th>
	                    <th style="padding:12px; text-align:center;">Coverage</th>
	                    <th style="padding:12px; text-align:center;">To Redo</th>
	                    <th style="padding:12px; text-align:center;">Competitors</th>
	                    <th style="padding:12px; text-align:center; width:300px;">Comments</th>
	                </tr>
	            </thead>
	            <tbody>`;
	
	// === 2. Deuxième requête : Historique des assessments ===
	if (vOsaNRID && vOsaNRID > 0) {
	    const strSqlAssess = `
	        SELECT CONVERT(varchar, xDate, 103) AS DateFr,
	               xUser as xUser,
	               xtype_salon as xtype_salon,
	               xtype_frn as xtype_frn,
	               xrepart_halls as xrepart_halls,
	               xcouverture as xcouverture,
	               xsalon_refaire as xsalon_refaire,
	               xnoms_concu as xnoms_concu,
	               xcomm_spec as xcomm_spec
	        FROM sysadm.x_fair_Com_Assessment
	        WHERE cosa_nrid = ${vOsaNRID}
	        ORDER BY xDate DESC
	    `;
	
	    const paramsAssess = [{ name: 'Query', type: 'VARCHAR', direction: 'IN', size: 4000, value: strSqlAssess }];
	    const paramsArrayAssess = paramsAssess.map(p => `${p.name}~${p.type}~${p.direction}~${p.size}~${p.value || ''}`).join("|");
	    const resultXmlAssess = top.MyApp.ExecuteServerScript(42628290701856, ['sysadm.ExecuteDynamicQuery', paramsArrayAssess]);
	
	    if (resultXmlAssess && resultXmlAssess.indexOf("<Result") !== -1) {
	        const xmlAssess = top.MyApp.InitXmlCli(resultXmlAssess);
	        const rowsAssess = xmlAssess.selectNodes("//Flds");
	
	        if (rowsAssess.length === 0) {
	            tableHTML += `<tr><td colspan="9" style="text-align:center; padding:40px; color:#78909c; font-style:italic;">
	                No commercial assessment recorded yet for this Edition.
	            </td></tr>`;
	        } else {
	            for (let i = 0; i < rowsAssess.length; i++) {
	                const r = rowsAssess[i];
	                const get = (f) => r.selectSingleNode(f)?.getAttribute("Val") || "";
	
	                const date = get("DateFr");
	                const user = get("xUser");
	                const fairType = top.MyApp.arrTranslations[get("xtype_salon")] || get("xtype_salon");
	                const supplierType =  top.MyApp.arrTranslations[get("xtype_frn")] || get("xtype_frn");
	                const halls = top.MyApp.arrTranslations[get("xrepart_halls")] || get("xrepart_halls");
	                const coverage =  top.MyApp.arrTranslations[get("xcouverture")] || get("xcouverture");
	                const redo =  top.MyApp.arrTranslations[get("xsalon_refaire")] || get("xsalon_refaire");
	                const competitors = get("xnoms_concu").replace(/\n/g, "<br>");
	                const comments = get("xcomm_spec").replace(/\n/g, "<br>");
	
	                const bg = i % 2 === 0 ? "#ffffff" : "#f8f9ff";
	
	                tableHTML += `
	                <tr style="background:${bg};">
	                    <td style="padding:10px; text-align:center; font-weight:600; color:#1565c0;">${date}</td>
	                    <td style="padding:10px; text-align:center; font-weight:600;">${user}</td>
	                    <td style="padding:10px; text-align:center; font-weight:600;">${fairType}</td>
	                    <td style="padding:10px; text-align:center; font-weight:600;">${supplierType}</td>
	                    <td style="padding:10px; text-align:center; font-weight:600;">${halls}</td>
	                    <td style="padding:10px; text-align:center; font-weight:600;">${coverage}</td>
	                    <td style="padding:10px; text-align:center; font-weight:600;">${redo}</td>
	                    <td style="padding:10px; text-align:left; max-width:200px; word-wrap:break-word; font-weight:600;">${competitors || "-"}</td>
	                    <td style="padding:10px; text-align:left; max-width:300px; word-wrap:break-word; font-size:12px; color:#444; font-weight:600;">${comments || "-"}</td>
	                </tr>`;
	            }
	        }
	    } else {
	        tableHTML += `<tr><td colspan="9" style="text-align:center; padding:40px; color:#d32f2f; background:#ffebee;">
	            Error loading assessment history
	        </td></tr>`;
	    }
	} else {
	    tableHTML += `<tr><td colspan="9" style="text-align:center; padding:40px; color:#78909c;">
	        Reset Mode - No data loaded
	    </td></tr>`;
	}
	
	tableHTML += `
	            </tbody>
	        </table>
	    </div>
	</div>`;  // fin du container principal
	
	// === Injection finale dans Selligent ===
	try {
	    const targetCell = top.MyApp.fraData_View.ifrView2.fraData.document.getElementById("tblMain");
	    if (targetCell) {
	        top.MyApp.ModifyLayout(targetCell, 1, 2, 15, 1, tableHTML, false);
	        console.log("=== BOTH DASHBOARDS INJECTED SUCCESSFULLY ===");
	    } else {
	        console.log("Target cell 'tblMain' not found");
	    }
	} catch (e) {
	    console.error("HTML injection error:", e);
	}
	
	console.log("=== END Dashboard Script ===");
}