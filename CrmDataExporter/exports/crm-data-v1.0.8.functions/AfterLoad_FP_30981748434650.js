function()
{
	var vOsaNRID = top.MyApp.GetItemValue("OSaNRID");
	var vStatFair = top.MyApp.GetItemValue("OSaExtStatut");
	console.log("vStatFair = [" + vStatFair + "]");
	 var vQuery = "SELECT count(1) nbr from  sysadm.x_fair_preco P where p.OSaNRID =  "+vOsaNRID+"  AND P.Status = 'Validated' and template is null" ;  
	
	        // Exécuter la requête
	        var oRes_count = top.MyApp._gfctExtReq(vQuery);
	        var nbr = 0;
	        nbr = oRes_count[0][0];
	
	if (top.MyApp.CurrentSetting.nChapMode === "Reset") {
	    
	        const vSht = top.MyApp.FindItem("Sht32799371387140");
	        if (vSht) vSht.disabled = true;
	    
	} else {    if ((vStatFair != "En préconisation" && vStatFair != "En préparation") || nbr == 0 ) {
	        const vSht = top.MyApp.FindItem("Sht32799371387140");
	        if (vSht) vSht.disabled = true;
	    } else {        const vSht = top.MyApp.FindItem("Sht32799371387140");
	                  if (vSht) vSht.disabled = false;}
	}
	
	
	
	
		//after load ressources
	let totalPilotes = 0;
	let totalReserve = 0;
	let totalPersonnes = 0;
	
	let tableHTML = `<div style="width:100%; padding:20px; font-family:'Segoe UI',Arial,sans-serif; background:#f8f9fa; border-radius:12px; box-shadow:0 4px 20px rgba(0,0,0,0.08); margin-top:10px;">`;
	
	const vOSaNRID = top.MyApp.GetItemValue("OSaNRID") || "";
	if (top.MyApp.CurrentSetting.nChapMode === 'Reset' || !vOSaNRID || vOSaNRID === "0") {
	    tableHTML += `<div style="padding:140px; text-align:center; color:#999; font-style:italic;">Reset Mode - No data loaded</div></div></div>`;
	    inject();
	    return;
	}
	
	const strSql = `SELECT
	    R.NOM AS Nom,
	    ISNULL(r.EQUIPE,'') AS Equipe,
	    ISNULL(r.FONCTION,'') AS Fonction,
	    R.JOUR1 AS Jour1, R.JOUR2 AS Jour2, R.JOUR3 AS Jour3, R.JOUR4 AS Jour4, R.JOUR5 AS Jour5,
	    R.isPilote AS isPilote,
	    R.Principale AS Principale
	    FROM sysadm.xsalon_ressources R
	    WHERE R.COSA0_NRID = ${vOSaNRID} AND (R.Template IS NULL OR R.Template != 2)
	    ORDER BY R.xDate DESC`;
	
	const resultXml = top.MyApp.ExecuteServerScript(30231053360342, [strSql]);
	
	if (!resultXml || resultXml.indexOf("<Result") === -1) {
	    tableHTML += `<div style="padding:140px; text-align:center; color:#d32f2f;">Erreur serveur</div></div></div>`;
	    console.log("Erreur SQL :", strSql);
	    inject();
	    return;
	}
	
	const xmlDoc = top.MyApp.InitXmlCli(resultXml);
	const rows = xmlDoc.selectNodes("//Flds");
	totalPersonnes = rows.length;
	
	if (totalPersonnes === 0) {
	    tableHTML += `<div style="padding:140px; text-align:center; color:#78909c; font-style:italic;">Aucune ressource affectée</div></div></div>`;
	    inject();
	    return;
	}
	
	// === CARTES STATISTIQUES EN HAUT ===
	tableHTML += `
	<style>
	    .stats {
	        display: flex;
	        gap: 16px;
	        justify-content: center;
	        flex-wrap: wrap;
	        margin-bottom: 24px;
	        padding: 8px 0;
	    }
	    .stat {
	        background: rgba(255,255,255,0.22);
	        backdrop-filter: blur(12px);
	        -webkit-backdrop-filter: blur(12px);
	        padding: 14px 24px;
	        border-radius: 50px;
	        text-align: center;
	        font-weight: 600;
	        color: white;
	        min-width: 110px;
	        box-shadow: 0 4px 15px rgba(0,0,0,0.1);
	        transition: transform 0.2s ease;
	    }
	    .stat:hover {
	        transform: translateY(-3px);
	    }
	    .stat svg {
	        width: 26px;
	        height: 26px;
	        margin: 0 auto 6px;
	        display: block;
	        stroke: currentColor;
	    }
	    .stat-num {
	        font-size: 28px;
	        font-weight: 700;
	        line-height: 1;
	        margin-bottom: 2px;
	    }
	    .stat-label {
	        font-size: 11px;
	        text-transform: uppercase;
	        letter-spacing: 0.8px;
	        opacity: 0.9;
	    }
	</style>
	
	<div class="stats">
	    <!-- Carte Total (sans réserves) - placeholder temporaire -->
	    <div class="stat" style="background: linear-gradient(135deg,#28A8D6,#1e88e5);">
	        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
	            <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path>
	            <circle cx="9" cy="7" r="4"></circle>
	            <path d="M22 21v-2a4 4 0 0 0-3-3.87"></path>
	            <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
	        </svg>
	        <div class="stat-num" id="placeholderTotalActif">0</div>
	        <div class="stat-label">Total</div>
	    </div>
	
	    <!-- Carte Pilotes -->
	    <div class="stat" style="background: linear-gradient(135deg,#28A8D6,#1e88e5);">
	        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
	            <path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"></path>
	        </svg>
	        <div class="stat-num" id="placeholderPilotes">0</div>
	        <div class="stat-label">Pilotes</div>
	    </div>
	
	    <!-- Carte Réserves -->
	    <div class="stat" style="background: linear-gradient(135deg,#28A8D6,#1e88e5);">
	        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
	            <circle cx="12" cy="12" r="10"></circle>
	            <polyline points="12 6 12 12 16 14"></polyline>
	        </svg>
	        <div class="stat-num" id="placeholderReserves">0</div>
	        <div class="stat-label">Réserves</div>
	    </div>
	</div>
	`;
	
	// === TABLEAU DES RESSOURCES ===
	tableHTML += `
	<div style="background:white; border-radius:12px; overflow:hidden; box-shadow:0 3px 15px rgba(0,0,0,0.08);">
	    <table style="width:100%; border-collapse:collapse;">
	        <thead>
	            <tr style="background:linear-gradient(135deg,#28A8D6,#1e88e5); color:white; font-size:13px; font-weight:700; text-transform:uppercase;">
	                <th style="width:30%; padding:16px 20px; text-align:left;">Ressource</th>
	                <th style="width:40%; padding:16px 20px; text-align:center;">
	                    <div style="display:inline-flex; gap:16px; align-items:center; justify-content:center;">
	                        <span style="width:18px; text-align:center; font-weight:800;">D1</span>
	                        <span style="width:18px; text-align:center; font-weight:800;">D2</span>
	                        <span style="width:18px; text-align:center; font-weight:800;">D3</span>
	                        <span style="width:18px; text-align:center; font-weight:800;">D4</span>
	                        <span style="width:18px; text-align:center; font-weight:800;">D5</span>
	                    </div>
	                </th>
	                <th style="width:30%; padding:16px 20px; text-align:center;">ROLE</th>
	            </tr>
	        </thead>
	        <tbody>`;
	
	for (let i = 0; i < rows.length; i++) {
	    const get = (f) => rows[i].selectSingleNode(f)?.getAttribute("Val") || "";
	    const nom = get("Nom") || "—";
	    const equipe = (get("Equipe") || "").trim();
	    const fonction = get("Fonction") || "";
	    const j1 = get("Jour1") === "1";
	    const j2 = get("Jour2") === "1";
	    const j3 = get("Jour3") === "1";
	    const j4 = get("Jour4") === "1";
	    const j5 = get("Jour5") === "1";
	    const isPilote = get("isPilote") === "1";
	    const principale = get("Principale") === "1";
	
	    const initials = nom.split(' ').map(n => n[0]).join('').substring(0,2).toUpperCase();
	    const dayDot = (a) => `<div style="width:18px;height:18px;border-radius:50%;background:${a?'#48bb78':'#e2e8f0'};display:inline-block;margin:0 8px;"></div>`;
	
	    let roleText = "Reserve";
	    if (isPilote) {
	        roleText = "Pilot";
	        totalPilotes++;
	    } else if (principale) {
	        roleText = "Standard";
	    } else {
	        roleText = "Reserve";
	        totalReserve++;
	    }
	
	    const isMarketing = equipe.toUpperCase() === "MARKETING";
	    if (isMarketing) roleText += " (Marketing)";
	
	    let roleColor = "#28A8D6";
	    if (roleText.includes("Pilot")) roleColor = "#e53e3e";
	    else if (roleText.includes("Reserve")) roleColor = "#f6ad55";
	    else if (isMarketing) roleColor = "#e91e63";
	
	    const badge = `<span style="background:${roleColor};color:white;padding:10px 32px;border-radius:30px;font-size:12px;font-weight:700;box-shadow:0 4px 15px ${roleColor}40;">${roleText}</span>`;
	
	    tableHTML += `
	            <tr style="border-bottom:1px solid #edf2f7;">
	                <td style="width:30%; padding:18px 20px; vertical-align:middle;">
	                    <div style="display:flex; align-items:center; gap:16px;">
	                        <div style="width:46px;height:46px;border-radius:50%;background:#28A8D6;color:white;display:flex;align-items:center;justify-content:center;font-weight:700;font-size:14px;">
	                            ${initials}
	                        </div>
	                        <div>
	                            <div style="font-weight:600;color:#2d3748;font-size:14.5px;">${nom}</div>
	                            <div style="color:#718096;font-size:13px;margin-top:2px;">${equipe} • ${fonction || 'Standard'}</div>
	                        </div>
	                    </div>
	                </td>
	                <td style="width:40%; padding:18px 20px; text-align:center; vertical-align:middle;">
	                    ${dayDot(j1)}${dayDot(j2)}${dayDot(j3)}${dayDot(j4)}${dayDot(j5)}
	                </td>
	                <td style="width:30%; padding:18px 20px; text-align:center; vertical-align:middle;">
	                    ${badge}
	                </td>
	            </tr>`;
	}
	
	tableHTML += `
	        </tbody>
	    </table>
	</div></div>`;
	
	// === MISE À JOUR DES COMPTEURS APRÈS LA BOUCLE ===
	const totalActif = totalPersonnes - totalReserve;
	
	// Remplacement des placeholders par les vraies valeurs
	tableHTML = tableHTML.replace(
	    '<div class="stat-num" id="placeholderTotalActif">0</div>',
	    '<div class="stat-num">' + totalActif + '</div>'
	);
	
	tableHTML = tableHTML.replace(
	    '<div class="stat-num" id="placeholderPilotes">0</div>',
	    '<div class="stat-num">' + totalPilotes + '</div>'
	);
	
	tableHTML = tableHTML.replace(
	    '<div class="stat-num" id="placeholderReserves">0</div>',
	    '<div class="stat-num">' + totalReserve + '</div>'
	);
	
	// === INJECTION DANS L'INTERFACE ===
	function() {
	    try {
	        const target = top.MyApp.fraData_View.ifrView2.fraData.document.getElementById("tblMain");
	        if (target) {
	            top.MyApp.ModifyLayout(target, 1, 2, 15, 1, tableHTML, false);
	            console.log("Injection réussie – Total sans réserves affiché correctement");
	        }
	    } catch (e) {
	        console.log("Erreur injection :", e);
	    }
	}
	
	inject();
}