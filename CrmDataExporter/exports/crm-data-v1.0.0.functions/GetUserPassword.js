function _GetUserPassword(p_Initiales)
{
	if (!p_Initiales) return "";
	var objSqlHelper = CreateSelligentObject("SqlHelper", CurrentSessionID);
	var strXmlResult = objSqlHelper.ExecuteSql("SELECT passwrd FROM set_uspw WHERE init = '"+p_Initiales+"'");
	var myXmlDoc = InitXml(strXmlResult);
	var strEncryptPsw : String = GetItemAttribute("PswUserPassword", myXmlDoc, "Val");
	if (strEncryptPsw ) {
	return Selligent.Library.ObjectHelper.InvokeStaticMethod("Selligent.Library.Security","Selligent.Library.Security.CryptoHelper","DecryptUserPassword",strEncryptPsw);
	}
	return "";
}