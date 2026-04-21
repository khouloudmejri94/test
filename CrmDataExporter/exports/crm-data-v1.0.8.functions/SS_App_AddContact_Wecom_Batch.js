function(pToken,pContactsJson)
{
	try {
	    System.Net.ServicePointManager.SecurityProtocol = System.Net.SecurityProtocolType.Tls | System.Net.SecurityProtocolType.Tls11 | System.Net.SecurityProtocolType.Tls12;
	    System.Net.ServicePointManager.DefaultConnectionLimit = 100;
	
	    // Log incoming parameters and type
	    Selligent.Library.Monitor.Tracer.Write('Script started, pToken: ' + pToken + ', pContactsJson type: ' + typeof pContactsJson + ', value: ' + pContactsJson, false);
	
	    var results = [];
	    var vDepartment = [1];
	
	    // Parse and validate pContactsJson
	    try {
	        var contacts;
	        try {
	            // Replace with Selligent's actual JSON parser if System.JSON.Parse isn't available
	            contacts = System.JSON.Parse(pContactsJson);
	            Selligent.Library.Monitor.Tracer.Write('Parsed pContactsJson: ' + contacts, false);
	        } catch (parseError) {
	            Selligent.Library.Monitor.Tracer.Write('JSON parse error: ' + parseError.message + ', Stack: ' + parseError.stack, false);
	            contacts = [{
	                vUserID: pContactsJson.vUserID || "",
	                vName: pContactsJson.vName || "",
	                vMobile: pContactsJson.vMobile || "",
	                vEmail: pContactsJson.vEmail || "",
	                vPosition: pContactsJson.vPosition || ""
	            }];
	        }
	
	        if (!contacts || !contacts.length) {
	            Selligent.Library.Monitor.Tracer.Write('pContactsJson not iterable, treating as single contact', false);
	            contacts = [{
	                vUserID: pContactsJson.vUserID || "",
	                vName: pContactsJson.vName || "",
	                vMobile: pContactsJson.vMobile || "",
	                vEmail: pContactsJson.vEmail || "",
	                vPosition: pContactsJson.vPosition || ""
	            }];
	        }
	
	        // Log number of contacts
	        Selligent.Library.Monitor.Tracer.Write('Processing ' + contacts.length + ' contacts', false);
	
	        // Limit to 2 contacts to avoid rate limits
	        var maxContacts = Math.min(contacts.length, 2);
	        for (var i = 0; i < maxContacts; i++) {
	            try {
	                var contact = contacts[i];
	                if (!contact.vUserID || contact.vUserID.length < 1) {
	                    Selligent.Library.Monitor.Tracer.Write('Skipping contact ' + (i + 1) + ': invalid userID: ' + contact.vUserID, false);
	                    results.push({ userid: 'unknown', response: 'Error: Invalid or missing userID' });
	                    continue;
	                }
	
	                var url = "https://qyapi.weixin.qq.com/cgi-bin/user/create?access_token=" + pToken + "&debug=1";
	
	                var jon = new System.Text.StringBuilder();
	                jon.Append('{  "userid": "');
	                jon.Append(contact.vUserID);
	                jon.Append('",  "name": "');
	                jon.Append(contact.vName || '');
	                jon.Append('",  "mobile": "');
	                jon.Append(contact.vMobile || '');
	                jon.Append('",  "department": "');
	                jon.Append(vDepartment);
	                jon.Append('",  "email": "');
	                jon.Append(contact.vEmail || '');
	                jon.Append('",  "position": "');
	                jon.Append(contact.vPosition || '');
	                jon.Append('"  }');
	                Selligent.Library.Monitor.Tracer.Write('Contact ' + (i + 1) + ' payload: ' + jon, false);
	
	                var objRequest = System.Net.HttpWebRequest(System.Net.WebRequest.Create(url));
	                objRequest.Method = "POST";
	                objRequest.ContentType = "application/json";
	
	                var data = System.Text.Encoding.ASCII.GetBytes(jon);
	                objRequest.ContentLength = data.Length;
	                var stream = objRequest.GetRequestStream();
	                stream.Write(data, 0, data.Length);
	                stream.Close();
	                var oResponse = objRequest.GetResponse();
	
	                var oStream = oResponse.GetResponseStream();
	                var oStreamReader = new System.IO.StreamReader(oStream, System.Text.Encoding.UTF8);
	                var result = oStreamReader.ReadToEnd();
	                oStreamReader.Close();
	
	                Selligent.Library.Monitor.Tracer.Write('Contact ' + (i + 1) + ' response: ' + result, false);
	                results.push({ userid: contact.vUserID, response: result });
	
	                // Add 100ms delay to avoid rate limits (adjust as needed)
	                System.Threading.Thread.Sleep(100);
	            } catch (e) {
	                Selligent.Library.Monitor.Tracer.Write('Error processing contact ' + (i + 1) + ': ' + e.message + ', Stack: ' + e.stack, false);
	                results.push({ userid: contact.vUserID || 'unknown', response: 'Error: ' + e.message });
	            }
	        }
	    } catch (e) {
	        Selligent.Library.Monitor.Tracer.Write('Error accessing pContactsJson: ' + e.message + ', Stack: ' + e.stack, false);
	        return 'Error: Failed to process contacts - ' + e.message;
	    }
	
	    // Log final results
	    Selligent.Library.Monitor.Tracer.Write('Processed ' + results.length + ' contacts', false);
	    var resultString = "Batch processed: " + results.length + " contacts\n";
	    for (var i = 0; i < results.length; i++) {
	        resultString += "UserID: " + results[i].userid + ", Response: " + results[i].response + "\n";
	    }
	    Selligent.Library.Monitor.Tracer.Write('Final output: ' + resultString, false);
	
	    return resultString;
	} catch (e) {
	    Selligent.Library.Monitor.Tracer.Write('Fatal error in script: ' + e.message + ', Stack: ' + e.stack, false);
	    return 'Fatal error: ' + e.message;
	}
}