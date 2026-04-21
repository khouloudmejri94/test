function SS_TEST_EMAIL()
{
	try {
	
	    var smtp = new System.Net.Mail.SmtpClient("ozeol-com.mail.protection.outlook.com");
	
	    smtp.Port = 25; // ou 587 selon config
	    smtp.EnableSsl = false;
	
	    var mail = new System.Net.Mail.MailMessage();
	
	    mail.From = new System.Net.Mail.MailAddress("hichem.bouzaiene@ozeol.com");
	
	    mail.To.Add("hassen.bouzouita@ozeol.com");
	
	    mail.Subject = "TEST EMAIL Scheduled Rule";
	
	    mail.Body =
	        "Hello,<br/><br/>" +
	        "Email test OK from Scheduled Rule.<br/><br/>" +
	        "Regards.";
	
	    mail.IsBodyHtml = true;
	
	    smtp.Send(mail);
	
	    Selligent.Library.Monitor.Tracer.Write("TEST EMAIL SENT OK");
	
	    return true;
	
	}
	catch (ex) {
	
	    Selligent.Library.Monitor.Tracer.Write("TEST EMAIL ERROR : " + ex.toString());
	
	    return ex.toString();
	
	}
}