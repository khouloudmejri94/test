function WS_Send_New_Submission_Notifications()
{
	
	
	    var MyQryObj = CreateSelligentObject("SqlHelper", CurrentSessionID);
	
	    var vCount = 0;
	    var vRetour = "OK";
	
	    try {
	
	        // =========================
	        // 1. GET DATA
	        // =========================
	        var vSQL = ""
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
	        Selligent.Library.Monitor.Tracer.Write(vSQL);
	        var xmlDoc = InitXml(MyQryObj.ExecuteSql(vSQL));
	        Selligent.Library.Monitor.Tracer.Write(MyQryObj.ExecuteSql(vSQL));
	        var nodes = FindItem("Flds", xmlDoc, true);
	
	        // =========================
	        // 2. SMTP CONFIG
	        // =========================
	        var smtp = new System.Net.Mail.SmtpClient("ozeol-com.mail.protection.outlook.com");
	        smtp.Port = 25;
	        smtp.EnableSsl = false;
	
	        // =========================
	        // 3. LOOP
	        // =========================
	        for (var i = 0; i < nodes.Count; i++) {
	
	            var n = nodes[i];
	
	            Selligent.Library.Monitor.Tracer.Write("1");
	
	            var submissionId = GetItemValue("SubmissionID", n);
	            var email = GetItemValue("e_mail", n);
	            var company = GetItemValue("Company_name", n);
	
	            if (!email) continue;
	
	            // =========================
	            // BUILD EMAIL BODY
	            // =========================
	            var emailBody = ''
	                + '<html><body>'
	                + '<h3>New Supplier Request</h3>'
	                + '<p><b>Company:</b> ' + company + '</p>'
	                + '<p><b>Submission ID:</b> ' + submissionId + '</p>'
	                + '</body></html>';
	            Selligent.Library.Monitor.Tracer.Write("2");
	            // =========================
	            // SEND EMAIL
	            // =========================
	            var mail = new System.Net.Mail.MailMessage();
	            mail.From = new System.Net.Mail.MailAddress("hichem.bouzaiene@ozeol.com");
	            Selligent.Library.Monitor.Tracer.Write("2");
	            mail.To.Add(email);
	            mail.Subject = "New Supplier Access Request";
	            mail.Body = emailBody;
	            mail.IsBodyHtml = true;
	
	            smtp.Send(mail);
	            Selligent.Library.Monitor.Tracer.Write("2");
	
	            // =========================
	            // UPDATE FLAG
	            // =========================
	            MyQryObj.ExecuteSql(
	                "UPDATE dbo.FormSubmissions SET Is_Notified = 1 WHERE SubmissionID = " + submissionId
	            );
	            Selligent.Library.Monitor.Tracer.Write("3");
	
	            vCount++;
	        }
	
	        vRetour = "OK|" + vCount + " emails sent";
	
	    } catch (ex) {
	
	        vRetour = "ERROR|" + ex.toString();
	        Selligent.Library.Monitor.Tracer.Write(vRetour);
	
	    } finally {
	
	        // =========================
	        // LOG
	        // =========================
	        var safeRetour = vRetour.replace(/'/g, "''");
	
	        MyQryObj.ExecuteSql(
	            "INSERT INTO xlog_ws (xmethod, xretour, xdate_log) " +
	            "VALUES ('WS_Send_New_Submission_Notifications', '" + safeRetour + "', GETDATE())"
	        );
	
	        if (MyQryObj) {
	            MyQryObj.Dispose();
	            FreeSelligentObject(MyQryObj);
	        }
	
	        return vRetour;
	    }
}