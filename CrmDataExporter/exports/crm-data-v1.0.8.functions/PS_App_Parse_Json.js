function()
{
	//Parse JSON (copié de ton webhook)
	const jsonText = `{
	  "form":"IB0lxD",
	  "form_name":"Universal Product Stock Inquiry – Corrected Full Scenarios",
	  "entry":{
	    "token":"g2bbFSoS",
	    "serial_number":4,
	    "field_1":"Yes",
	    "field_5":["Option 1","Option 2"],
	    "field_8":"Yes",
	    "x_field_weixin_nickname":"?zZ~??",
	    "x_field_weixin_openid":"oLOHhjqhO1dHwAUZYBD33EdJC6HI",
	    "info_region":{
	      "country":"??",
	      "province":"???",
	      "city":null
	    }
	  }
	}`;
	
	// Parse en objet JavaScript
	const data = JSON.parse(jsonText);
	
	// Affiche quelques valeurs
	console.log("Form ID:", data.form);
	console.log("Form Name:", data.form_name);
	console.log("Token:", data.entry.token);
	console.log("Serial Number:", data.entry.serial_number);
	console.log("Field_1:", data.entry.field_1);
	console.log("Nickname:", data.entry.x_field_weixin_nickname);
	console.log("OpenID:", data.entry.x_field_weixin_openid);
	
	// Lire un tableau
	console.log("Field_5 options:");
	data.entry.field_5.forEach(opt => console.log(" - " + opt));
	
	// Lire un champ imbriqué
	console.log("Country:", data.entry.info_region.country);
	console.log("Province:", data.entry.info_region.province);
}