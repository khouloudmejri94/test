// Check the horizontal security on a chapter for the current user.
function(ChapterLogicalName : String)
{
var CurrentSession = CreateSelligentObject("Session");
CurrentSession.Init(CurrentSessionID);
var SessionXml = CurrentSession.GetXml();
var SessionXmlUtil : Selligent.Library.Xml.XMLUtil = InitXml(SessionXml);
var HSecurityNode : XmlNode = FindItem("User/HSecurity", SessionXmlUtil);
var HSecurityValue : String = GetItemAttribute(ChapterLogicalName, HSecurityNode, "Access");
if (HSecurityValue == "-1")
return true;
return false;
}