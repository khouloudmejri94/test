// Returns a list of the fields that must be visible in the conflict dlg. 
// Note that the NRID must be in the list if you want the dlg to show the links on the records.
// By default, the fields on level 0 and 1 will be displayed in the conflic dlg.
function GetFieldsList(ChapterLN : String)
{
var FieldsListIdentifier : String = CurrentDatabase + "||" + ChapterLN + "||ConflictFieldsList";
var FieldsList : String[];
// The Application object is used here to avoid to make a query each time. The result is stored in
// a memory variable to boost the performance. Pay attention not to store too much data in it to 
// avoid memory bottlenecks. 
if (Application.Contains(FieldsListIdentifier))
{
FieldsList = Application[FieldsListIdentifier];
}
else
{
var FieldsSelectionList : SelectionList = CreateSelligentObject("SelectionList", CurrentSessionID);
FieldsSelectionList.Open(0, -1, "select [CatFldLogicName] from [CatFld], [Chapter] where [CatFldTbName]=[ChapterMainTbName] and [ChapterLogicName]='" + ChapterLN + "' and [CatFldVwrLevel] in (0,1) order by [CatFldVwrLevel], [CatFldVwrPosition]");
var FieldsXml : String = FieldsSelectionList.GetXml(XmlOptions.NotNullFields);
var FieldsXmlUtil : Selligent.Library.Xml.XMLUtil = InitXml(FieldsXml);
var FieldsNodes : XmlNodeList = FindItem("Flds", FieldsXmlUtil, true);
var FieldsCount : Int32 = FieldsNodes.Count;
FieldsList = new String[FieldsCount + 1];
for(var Loop : Int32 = 0; Loop < FieldsCount; Loop ++)
{
var FieldNode : XmlNode = FieldsNodes[Loop];
FieldsList[Loop] = GetItemValue("CatFldLogicName", FieldNode);
}
FieldsList[FieldsCount] = ChapterLN + "NRID";
Application[FieldsListIdentifier] = FieldsList;
}
return FieldsList;
}