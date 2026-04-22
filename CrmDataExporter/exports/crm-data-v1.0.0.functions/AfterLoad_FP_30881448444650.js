function AfterLoad_FP_30881448444650()
{
	
	var vStatFair = top.MyApp.GetItemValue("OSaExtStatut");
	console.log("vStatFair = [" + vStatFair + "]");
	
	if (top.MyApp.CurrentSetting.nChapMode === "Reset") {
	    
	        const vSht = top.MyApp.FindItem("Sht42301384576234");
	        if (vSht) vSht.disabled = true;
	    
	} else {    if (vStatFair != "En préconisation") {
	        const vSht = top.MyApp.FindItem("Sht42301384576234");
	        if (vSht) vSht.disabled = true;
	    }
	}
	
	
		console.log("=== START RECOMMENDATIONS DISPLAY SCRIPT (WITH STATUS DIR & STATUS ZM) ===");
	let tableHTML = `
	<div style="width:100%; padding:15px; font-family:'Segoe UI',Arial,sans-serif; font-size:14px; background:#f8f9fa; border-radius:8px; box-shadow:0 4px 15px rgba(0,0,0,0.1);">
	    <div style="max-height:70vh; overflow:auto; border-radius:8px; border:1px solid #e0e0e0;">
	        <table style="width:100%; min-width:1700px; border-collapse:collapse; background:white;">
	            <thead>
	                <tr style="background:#23aad7; color:#ffffff; font-weight:600; text-transform:uppercase; letter-spacing:0.6px; position:sticky; top:0; z-index:10;">
	                    <th rowspan="2" style="padding:14px 8px; text-align:center; width:9%;">Creator</th>
	                    <th rowspan="2" style="padding:14px 8px; text-align:center; width:9%;">Team</th>
	                    <th rowspan="2" style="padding:14px 8px; text-align:center; width:5%;">Date</th>
	                    <th rowspan="2" style="padding:14px 8px; text-align:center; width:7%;">Attendance<br>Days</th>
	                    <th colspan="4" style="padding:14px 8px; text-align:center; width:24%; border-right: 2px solid #23aad7;">Marketing</th>
	                    <th colspan="6" style="padding:14px 8px; text-align:center; width:31%;">Ozeol</th>                  
	                    <th rowspan="2" style="padding:14px 8px; text-align:center; width:12%;">Status ZM</th>
	                    <th rowspan="2" style="padding:14px 8px; text-align:center; width:12%;">Status DIR</th>
	                    <th rowspan="2" style="padding:14px 8px; text-align:center; width:8%;">Action</th>
	                </tr>
	                <tr style="background:#e3f2fd; color:#000000; font-weight:600; font-size:13px; position:sticky; top:52px; z-index:10;">
	                    <th style="padding:11px; color:#1565c0; font-weight:700;">Pilot CP</th>
	                    <th style="padding:11px;">CP</th>
	                    <th style="padding:11px;">AM</th>
	                    <th style="padding:11px; border-right:2px solid #23aad7;">CM</th>
	                    <th style="padding:11px; color:#1565c0; font-weight:700;">Pilot OZEOL</th>
	                    <th style="padding:11px; font-weight:700;">PROS</th>
	                    <th style="padding:11px; font-weight:700;">NEG</th>
	                    <th style="padding:11px; font-weight:700;">TL</th>
	                    <th style="padding:11px; font-weight:700;">BUM</th>
	                    <th style="padding:11px; font-weight:700;">ZM</th>
	                </tr>
	            </thead>
	            <tbody>
	`;
	
	if (top.MyApp.CurrentSetting.nChapMode === 'Reset') {
	    tableHTML += `<tr><td colspan="18" style="text-align:center; padding:40px; color:#999; font-style:italic;">Reset Mode - No data loaded</td></tr>`;
	} else {
	    var userName = top.MyApp.UserSetting.User.Name  
	    var strSql = `
	            SELECT vue_equipe 
	            FROM sysadm.res_liees 
	            WHERE personne = '${userName}'
	        `;
	        var strResultat = top.MyApp.ExecuteServerScript(30231053360342, [strSql]);
	        var objXmlRes = top.MyApp.InitXmlCli(strResultat);
	        var objTeams = objXmlRes.getElementsByTagName("RsLsVueEquipe");
	        userTeams = [];
	        for (var i = 0; i < objTeams.length; i++) {
	            var team = objTeams[i].getAttribute("Val");
	            if (team) userTeams.push("'" + team.replace(/'/g, "''") + "'");
	        }
	
	    var teamCondition = userTeams.length > 0 ? `Team IN (${userTeams.join(',')})` : "1=1";
	    const vOSaNRID = top.MyApp.GetItemValue("OSaNRID") || "";
	    if (!vOSaNRID || vOSaNRID === "0") {
	        tableHTML += `<tr><td colspan="18" style="text-align:center; padding:40px; background:#ffebee; color:#c62828; font-weight:600;">Aucun salon sélectionné</td></tr>`;
	    } else {
	        const strSql = `SELECT
	            NRID AS ExtFrPrcNRID,
	            ISNULL(Team, 'NO TEAM') AS ExtFrPrcTeam,
	            Pilotcp AS ExtFrPrcPilotcp,
	            CpNb AS ExtFrPrcCpNb, AmNb AS ExtFrPrcAmNb, CmNb AS ExtFrPrcCmNb,
	            Pilotoz AS ExtFrPrcPilotoz,
	            Pros AS ExtFrPrcPros, NEG AS ExtFrPrcNEG, TL AS ExtFrPrcTL, BUM AS ExtFrPrcBUM, ZM AS ExtFrPrcZM,
	            AttendanceDays AS ExtFrPrcAttendanceDays,
	            Marketting AS ExtFrPrcMarketting,
	            Creationdate AS ExtFrPrcCreationdate,
	            Creator AS ExtFrPrcCreator,
	            Status AS ExtFrPrcStatus,
	            StatusZm AS ExtFrPrcStatusZm
	            FROM sysadm.x_fair_preco
	            WHERE OSaNRID = ${vOSaNRID}
	            and ${teamCondition} 
	            ORDER BY Creationdate DESC`;
	
	        const resultXml = top.MyApp.ExecuteServerScript(30231053360342, [strSql]);
	
	        if (!resultXml || resultXml.indexOf("<Result") === -1) {
	            tableHTML += `<tr><td colspan="18" style="text-align:center; padding:40px; color:#d32f2f;">Erreur serveur</td></tr>`;
	        } else {
	            const xmlDoc = top.MyApp.InitXmlCli(resultXml);
	            const count = parseInt(xmlDoc.selectSingleNode("//Result")?.getAttribute("Count") || "0");
	            let totalMarketing = 0;
	            let totalOzeol = 0;
	            let totalAttendanceDays = 0;
	
	            if (count > 0) {
	                const rows = xmlDoc.selectNodes("//Flds");
	                for (let i = 0; i < rows.length; i++) {
	                    const row = rows[i];
	                    const get = (f) => row.selectSingleNode(f)?.getAttribute("Val") || "";
	                    const nrid = get("ExtFrPrcNRID");
	                    const creator = (get("ExtFrPrcCreator") || "Inconnu").trim();
	                    const teamName = get("ExtFrPrcTeam");
	                    const pilotCp = get("ExtFrPrcPilotcp") || "";
	                    const cpNb = get("ExtFrPrcCpNb") || "0";
	                    const amNb = get("ExtFrPrcAmNb") || "0";
	                    const cmNb = get("ExtFrPrcCmNb") || "0";
	                    const pilotoz = get("ExtFrPrcPilotoz") || "";
	                    const prosOzeol = get("ExtFrPrcPros") || "0";
	                    const neg = get("ExtFrPrcNEG") || "0";
	                    const tl = get("ExtFrPrcTL") || "0";
	                    const bum = get("ExtFrPrcBUM") || "0";
	                    const zm = get("ExtFrPrcZM") || "0";
	                    const attendanceDays = get("ExtFrPrcAttendanceDays") || "0";
	                    const marketing = parseInt(get("ExtFrPrcMarketting")) || 0;
	                    const creationDate = get("ExtFrPrcCreationdate");
	
	                    const statusRaw = get("ExtFrPrcStatus") || "";
	                    const statusZmRaw = get("ExtFrPrcStatusZm") || "";
	
	                    totalMarketing += marketing;
	                    totalOzeol += parseInt(prosOzeol || 0) + parseInt(neg || 0) + parseInt(tl || 0) + parseInt(bum || 0) + parseInt(zm || 0);
	                    totalAttendanceDays += parseInt(attendanceDays || 0);
	
	                    let displayDate = "-";
	                    if (creationDate && creationDate.length >= 10) {
	                        const [y, m, d] = creationDate.substring(0, 10).split("-");
	                        displayDate = d + "/" + m + "/" + y;
	                    }
	
	                    const bg = i % 2 === 0 ? "#ffffff" : "#f8fbff";
	
	                    // === Director Status (Status) ===
	                    let dirBadgeHTML = "";
	                    if (statusRaw.trim() !== "") {
	                        const lower = statusRaw.trim().toLowerCase();
	                        if (lower === "validated") {
	                            dirBadgeHTML = `<span style="display:inline-block; padding:7px 16px; border-radius:20px; font-size:11px; font-weight:700; text-transform:uppercase; letter-spacing:0.8px; background:#27ae60; color:white;">Validated</span>`;
	                        } else if (lower === "not validated") {
	                            dirBadgeHTML = `<span style="display:inline-block; padding:7px 16px; border-radius:20px; font-size:11px; font-weight:700; text-transform:uppercase; letter-spacing:0.8px; background:#c0392b; color:white;">Not validated</span>`;
	                        } else if (lower === "to review") {
	                            dirBadgeHTML = `<span style="display:inline-block; padding:7px 16px; border-radius:20px; font-size:11px; font-weight:700; text-transform:uppercase; letter-spacing:0.8px; background:#e91e63; color:white;">To Review</span>`;
	                        } else if (lower === "to validate") {
	                            dirBadgeHTML = `<span style="display:inline-block; padding:7px 16px; border-radius:20px; font-size:11px; font-weight:700; text-transform:uppercase; letter-spacing:0.8px; background:#f39c12; color:white;">To Validate</span>`;
	                        } else {
	                            dirBadgeHTML = `<span style="display:inline-block; padding:7px 16px; border-radius:20px; font-size:11px; font-weight:700; text-transform:uppercase; letter-spacing:0.8px; background:#95a5a6; color:white;">${statusRaw.trim()}</span>`;
	                        }
	                    }
	
	                    // === ZM Status (StatusZm) ===
	                    let zmBadgeHTML = "";
	                    const zmLower = statusZmRaw.trim().toLowerCase();
	                    if (zmLower === "validated") {
	                        zmBadgeHTML = `<span style="display:inline-block; padding:7px 16px; border-radius:20px; font-size:11px; font-weight:700; text-transform:uppercase; letter-spacing:0.8px; background:#27ae60; color:white;">Validated</span>`;
	                    } else if (zmLower === "not validated") {
	                        zmBadgeHTML = `<span style="display:inline-block; padding:7px 16px; border-radius:20px; font-size:11px; font-weight:700; text-transform:uppercase; letter-spacing:0.8px; background:#c0392b; color:white;">Not validated</span>`;
	                    } else if (zmLower === "to review") {
	                        zmBadgeHTML = `<span style="display:inline-block; padding:7px 16px; border-radius:20px; font-size:11px; font-weight:700; text-transform:uppercase; letter-spacing:0.8px; background:#e91e63; color:white;">To Review</span>`;
	                    } else if (zmLower === "to validate" || statusZmRaw.trim() === "") {
	                        zmBadgeHTML = `<span style="display:inline-block; padding:7px 16px; border-radius:20px; font-size:11px; font-weight:700; text-transform:uppercase; letter-spacing:0.8px; background:#f39c12; color:white;">To Validate</span>`;
	                    } else {
	                        zmBadgeHTML = `<span style="display:inline-block; padding:7px 16px; border-radius:20px; font-size:11px; font-weight:700; text-transform:uppercase; letter-spacing:0.8px; background:#95a5a6; color:white;">${statusZmRaw.trim()}</span>`;
	                    }
	
	                    // === Edit Button - ALWAYS ENABLED ===
	                    const editOnClick = `event.stopPropagation(); var arrParams = []; arrParams[0] = ${nrid}; top.MyApp.OpenDlg('42390989148734', arrParams, top, undefined, undefined, undefined, undefined, function() {});`;
	
	                    tableHTML += `
	                    <tr style="background:${bg};" onmouseover="this.style.background='#e3f2fd'" onmouseout="this.style.background='${bg}'">
	                        <td style="padding:11px; border:1px solid #ddd; text-align:center; font-weight:600; color:#1565c0;">${creator}</td>
	                        <td style="padding:11px; border:1px solid #ddd; text-align:center; font-weight:500; color:#7f8c8d;">${teamName}</td>
	                        <td style="padding:11px; border:1px solid #ddd; text-align:center; font-size:12px; color:#555;">${displayDate}</td>
	                        <td style="padding:11px; border:1px solid #ddd; text-align:center; font-weight:600; color:#555;">${attendanceDays}</td>
	                        <td style="padding:11px; border:1px solid #ddd; text-align:center; font-weight:700; color:#1565c0;">${pilotCp}</td>
	                        <td style="padding:11px; border:1px solid #ddd; text-align:center;">${cpNb}</td>
	                        <td style="padding:11px; border:1px solid #ddd; text-align:center;">${amNb}</td>
	                        <td style="padding:11px; border:1px solid #ddd; text-align:center; border-right:2px solid #23aad7;">${cmNb}</td>
	                        <td style="padding:11px; border:1px solid #ddd; text-align:center; font-weight:700; color:#1565c0;">${pilotoz}</td>
	                        <td style="padding:11px; border:1px solid #ddd; text-align:center; font-weight:600;">${prosOzeol}</td>
	                        <td style="padding:11px; border:1px solid #ddd; text-align:center;">${neg}</td>
	                        <td style="padding:11px; border:1px solid #ddd; text-align:center;">${tl}</td>
	                        <td style="padding:11px; border:1px solid #ddd; text-align:center;">${bum}</td>
	                        <td style="padding:11px; border:1px solid #ddd; text-align:center;">${zm}</td>
	                        <td style="padding:11px; border:1px solid #ddd; text-align:center;">
	                            ${zmBadgeHTML}
	                        </td>
	                        <td style="padding:11px; border:1px solid #ddd; text-align:center;">
	                            ${dirBadgeHTML}
	                        </td>
	                        <td style="padding:11px; border:1px solid #ddd; text-align:center;">
	                            <button onclick="${editOnClick}" title="Edit preconisation"
	                                    style="background:#3498db; color:white; border:none; padding:10px 18px; border-radius:50px; cursor:pointer; display:flex; align-items:center; justify-content:center; gap:6px; transition:all 0.3s; box-shadow:0 2px 6px rgba(0,0,0,0.15);">
	                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
	                                    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
	                                    <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
	                                </svg>
	                            </button>
	                        </td>
	                    </tr>`;
	                }
	
	                tableHTML += `
	                <tr style="background:#e3f2fd; font-weight:bold; font-size:15px;">
	                    <td colspan="3" style="padding:14px; text-align:center; color:#1565c0;">Total :</td>
	                    <td style="padding:14px; text-align:center; color:#1976d2;">${totalAttendanceDays}</td>
	                    <td colspan="4" style="padding:14px; text-align:center; color:#1976d2; border-right:2px solid #23aad7;">
	                        Marketing : ${totalMarketing}
	                    </td>
	                    <td colspan="6" style="padding:14px; text-align:center; color:#1976d2;">
	                        Ozeol : ${totalOzeol}
	                    </td>
	                    <td colspan="3"></td>
	                </tr>`;
	            } else {
	                tableHTML += `<tr><td colspan="18" style="text-align:center; padding:50px; color:#78909c; font-style:italic;">Aucune préconisation trouvée</td></tr>`;
	            }
	        }
	    }
	}
	
	tableHTML += `
	            </tbody>
	        </table>
	    </div>
	</div>`;
	
	try {
	    const targetCell = top.MyApp.fraData_View.ifrView2.fraData.document.getElementById("tblMain");
	    if (targetCell) {
	        top.MyApp.ModifyLayout(targetCell, 1, 2, 15, 1, tableHTML, false);
	        console.log("=== TABLE UPDATED: EDIT BUTTON ALWAYS ENABLED ===");
	    }
	} catch (e) {
	    console.log("Injection error:", e);
	}
	
	console.log("=== END SCRIPT ===");
}