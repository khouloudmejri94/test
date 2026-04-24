function SS_WeCom_Send_Notification()
{
	//SS_WeCom_Send_Notification 
	/********************************************************************
	 * NOTE:
	 * QueryHelper is used instead of SqlHelper because this function runs as a scheduled job (cron)
	 * without an active user session. SqlHelper requires a valid CurrentSessionID, which is not
	 * available in this context, while QueryHelper works independently of session state.
	 * 
	 * ********************************************************************/
	
	
	    var vCount = 0;
	    var vRetour = "OK";
	    var xAppel = "";
	
	    try {
	
	        // =========================
	        // 1. GET DATA
	        // =========================
	        var vQuery = ""
	            + "SELECT FormSubmissions.SubmissionID SubmissionID, "
	            + "       Is_Notified Is_Notified, "
	            + "       so0.titulaire AS Company_owner, "
	            + "       so0.societe AS Company_name, "
	            + "       am0.e_mail as e_mail "
	            + "FROM dbo.FormSubmissions "
	            + "INNER JOIN sysadm.pe0 ON pe0.xWeChat = Field4 AND Field4 != '' AND pe0.template IS NULL "
	            + "INNER JOIN sysadm.sp0 ON sp0.pe0_nrid = pe0.nrid AND sp0.template IS NULL "
	            + "INNER JOIN sysadm.so0 ON so0.nrid = sp0.so0_nrid AND so0.template IS NULL "
	            + "INNER JOIN sysadm.am0 ON am0.titulaire = so0.titulaire "
	            + "WHERE Is_Notified IS NULL";
	
	        //Selligent.Library.Monitor.Tracer.Write(vQuery);
	
	        var vSqlParams = [];
	
	        var dt = Selligent.Application.Data.QueryHelper.ExecuteDataTable(System.Data.CommandType.Text,vQuery,vSqlParams);
	
	
	        // =========================
	        // 2. GET SMTP SERVER
	        // =========================
	        var smtpServer = ""; 
	
	        try {
	
	            var smtpQuery = "SELECT TOP 1 name FROM SYSADM.set_smtp_server WHERE template IS NULL";
	            var smtpDt = Selligent.Application.Data.QueryHelper.ExecuteDataTable(System.Data.CommandType.Text, smtpQuery, []);
	
	            if (smtpDt.Rows.Count > 0 && smtpDt.Rows[0]["name"]) {
	                smtpServer = smtpDt.Rows[0]["name"];
	            }
	
	        } catch (smtpEx) {
	
	            Selligent.Library.Monitor.Tracer.Write("SMTP FETCH ERROR: " + smtpEx.toString());
	
	        }
	
	        // =========================
	        // 2. SMTP CONFIG
	        // =========================
	        var smtp = new System.Net.Mail.SmtpClient(smtpServer);
	        smtp.Port = 25;
	        smtp.EnableSsl = false;
	
	        // =========================
	        // 3. LOOP
	        // =========================
	        for (var i = 0; i < dt.Rows.Count; i++) {
	
	            var row = dt.Rows[i];
	
	            var submissionId = row["SubmissionID"];
	            var email = row["e_mail"];
	            var company = row["Company_name"];
	
	            if (!email) continue;
	
	            try {
	
	                // =========================
	                // BUILD EMAIL
	                // =========================
	                var emailBody = ''
	                + '<!DOCTYPE html><html><head><meta charset="utf-8"></head><body style="margin:0;padding:0;background:#f0f4f8;font-family:Arial,sans-serif;">'
	                + '<table width="100%" cellpadding="0" cellspacing="0" style="background:#f0f4f8;padding:30px 0;">'
	                + '<tr><td align="center">'
	                + '<table width="600" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:12px;overflow:hidden;box-shadow:0 4px 20px rgba(0,0,0,0.10);">'
	
	                /* HEADER */
	                + '<tr><td style="background:#28A8D6;padding:28px 32px;">'
	                + '<table width="100%" cellpadding="0" cellspacing="0"><tr>'
	                + '<td><span style="font-size:22px;font-weight:700;color:#ffffff;">New Wechat Submission Notification</span></td>'
	                + '<td align="right"><span style="background:rgba(255,255,255,0.20);color:#ffffff;font-size:12px;font-weight:600;padding:5px 14px;border-radius:99px;border:1px solid rgba(255,255,255,0.35);">NEW</span></td>'
	                + '</tr></table>'
	                + '</td></tr>'
	
	                /* INTRO */
	                + '<tr><td style="padding:28px 32px 0 32px;">'
	                + '<p style="margin:0 0 6px 0;font-size:15px;color:#2e3449;font-weight:600;">Hello,</p>'
	                + '<p style="margin:0 0 20px 0;font-size:13px;color:#5c667e;line-height:1.6;">'
	                + 'A new form submission has been assigned to your company. Please review the details below.'
	                + '</p>'
	                + '</td></tr>'
	
	                /* COMPANY */
	                + '<tr><td style="padding:0 32px 20px 32px;">'
	                + '<div style="background:#e8f6fb;border-left:4px solid #28A8D6;border-radius:8px;padding:14px 18px;">'
	                + '<p style="margin:0 0 2px 0;font-size:11px;font-weight:700;color:#28A8D6;text-transform:uppercase;">Company</p>'
	                + '<p style="margin:0;font-size:16px;font-weight:700;color:#1a2744;">'+company+'</p>'
	                + '</div>'
	                + '</td></tr>'
	
	                /* DETAILS TABLE */
	                + '<tr><td style="padding:0 32px 24px 32px;">'
	                + '<table width="100%" cellpadding="0" cellspacing="0" style="border:1px solid #eff1f5;border-radius:10px;overflow:hidden;">'
	
	                + '<tr style="background:#f8f9fb;">'
	                + '<td style="padding:11px 16px;width:40%;border-bottom:1px solid #eff1f5;">'
	                + '<span style="font-size:11px;font-weight:700;color:#9aa3b8;text-transform:uppercase;">Submission ID</span></td>'
	                + '<td style="padding:11px 16px;border-bottom:1px solid #eff1f5;">'
	                + '<span style="font-size:13px;color:#2e3449;font-weight:600;">'+submissionId+'</span></td>'
	                + '</tr>'
	
	                + '<tr>'
	                + '<td style="padding:11px 16px;width:40%;border-bottom:1px solid #eff1f5;">'
	                + '<span style="font-size:11px;font-weight:700;color:#9aa3b8;text-transform:uppercase;">Status</span></td>'
	                + '<td style="padding:11px 16px;border-bottom:1px solid #eff1f5;">'
	                + '<span style="display:inline-block;background:#e8f6fb;color:#28A8D6;font-size:12px;font-weight:700;padding:3px 10px;border-radius:99px;">Pending Review</span>'
	                + '</td></tr>'
	
	                + '</table>'
	                + '</td></tr>'
	
	                /* FOOTER */
	                + '<tr><td style="background:#f8f9fb;border-top:1px solid #eff1f5;padding:18px 32px;border-radius:0 0 12px 12px;">'
	                + '<p style="margin:0;font-size:11.5px;color:#9aa3b8;text-align:center;">'
	                + 'This is an automated message. Please do not reply.'
	                + '</p>'
	                + '</td></tr>'
	
	                + '</table>'
	                + '</td></tr></table>'
	                + '</body></html>';
	
	                var mail = new System.Net.Mail.MailMessage();
	                mail.From = new System.Net.Mail.MailAddress("hichem.bouzaiene@ozeol.com");
	                mail.To.Add(email);
	                mail.Subject = "New Supplier Access Request";
	                mail.Body = emailBody;
	                mail.IsBodyHtml = true;
	
	                smtp.Send(mail);
	
	                // =========================
	                // UPDATE FLAG (PARAMETERIZED)
	                // =========================
	                var updateQuery = "UPDATE dbo.FormSubmissions SET Is_Notified = 1 WHERE SubmissionID = @id";
	
	                xAppel += "SubmissionID: " + submissionId + " | ";
	
	                var updateParams = [];
	                var p = new System.Data.SqlClient.SqlParameter("@id", submissionId);
	                p.Direction = System.Data.ParameterDirection.Input;
	                updateParams.push(p);
	
	                Selligent.Application.Data.QueryHelper.ExecuteDataTable(System.Data.CommandType.Text,updateQuery,updateParams);
	
	                vCount++;
	
	            } catch (mailEx) {
	
	                Selligent.Library.Monitor.Tracer.Write("MAIL ERROR: " + mailEx.toString());
	
	            }
	        }
	
	        vRetour = "OK WS_Send_New_Submission_Notifications |" + vCount + " emails sent";
	        Selligent.Library.Monitor.Tracer.Write(vRetour);
	
	    } catch (ex) {
	
	        vRetour = "ERROR WS_Send_New_Submission_Notifications |" + ex.toString();
	        Selligent.Library.Monitor.Tracer.Write(vRetour);
	
	    } finally {
	
	            var logQuery = ""
	                + "INSERT INTO xlog_ws (NRID,xmethod, xretour, xdate_log , dmod ,RID , RMOD , xappel ) "
	                + "VALUES ( sysadm.GetSimpleNRID(getutcdate())  ,'WS_Send_New_Submission_Notifications', '" + vRetour + "', GETDATE(), GETDATE() , sysadm.GetSimpleRID(getutcdate(),'XLOSYN') , sysadm.GetSimpleRID(getutcdate(),'XLOSYN'), '"+xAppel+"')";
	
	            Selligent.Application.Data.QueryHelper.ExecuteDataTable(System.Data.CommandType.Text,logQuery,[]);
	
	        return vRetour;
	    }
}