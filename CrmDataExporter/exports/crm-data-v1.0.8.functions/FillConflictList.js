// Make the detection in one chapter
function(ChapterLogicalName : String, CurrentOwners : String)
{
var CurrentChapterLN : String = CurrentChapter.LogicalName;
var CurrentNRID : String = CurrentRecord[CurrentChapterLN + "NRID"];
var StartDate : String = FormatDate(CurrentRecord[CurrentChapterLN + "StartDate"]);
var EndDate : String = FormatDate(CurrentRecord[CurrentChapterLN + "EndDate"]);
var StartTime : String =CurrentRecord[CurrentChapterLN + "StartTime"];
var EndTime : String = CurrentRecord[CurrentChapterLN + "EndTime"];
var ConflictFieldsList : String[] = GetFieldsList(ChapterLogicalName);
var SqlStatement : System.Text.StringBuilder = new System.Text.StringBuilder();
SqlStatement.AppendFormat("select distinct [" + String.Join("],[", ConflictFieldsList) +"] from [{0}], [{0}Ownr] ", ChapterLogicalName);
SqlStatement.AppendFormat("where [{0}NRID] = [{0}Ownr{0}NRID] and [{0}BasicStatus]=1 and ([{0}Owner] in (", ChapterLogicalName);
SqlStatement.Append(CurrentOwners);
SqlStatement.AppendFormat(") or [{0}OwnrName] in (", ChapterLogicalName);
SqlStatement.Append(CurrentOwners);
SqlStatement.AppendFormat(")) and (([{0}StartTime] is not null and [{0}EndTime] is not null) and ", ChapterLogicalName);
SqlStatement.AppendFormat("([{0}StartDate] < '{1}' or ([{0}StartDate] = '{1}' and [{0}StartTime] < '{2}')) and ", ChapterLogicalName, EndDate, EndTime);
SqlStatement.AppendFormat("([{0}EndDate] > '{1}' or ([{0}EndDate] = '{1}' and [{0}EndTime] > '{2}'))) ", ChapterLogicalName, StartDate, StartTime);
SqlStatement.Append(" order by 3, 5, 4, 6");
var ConflictList : SelectionList = CreateSelligentObject("SelectionList", CurrentSessionID);
ConflictList.Open(0, -1, SqlStatement.ToString());
var ConflictXml : String = ConflictList.GetXml(XmlOptions.NotNullFields);
var ConflictXmlUtil : Selligent.Library.Xml.XMLUtil = InitXml(ConflictXml);
var ConflictNodes : XmlNodeList = FindItem("Flds", ConflictXmlUtil, true);
var NodeCount : Int32 = ConflictNodes.Count;
for(var NodeLoop : Int32 = 0; NodeLoop < NodeCount; NodeLoop ++)
{
var ConflictNode : XmlNode = ConflictNodes[NodeLoop];
var ConflictNRID : String = GetItemValue(ChapterLogicalName + "NRID", ConflictNode);
if (ConflictNRID != CurrentNRID)
{
var ConflictRow : SelectionRow = new SelectionRow();
var FieldsCount = ConflictFieldsList.Length;
for(var FieldsLoop = 0; FieldsLoop < FieldsCount; FieldsLoop ++)
{
var FieldName : String = ConflictFieldsList[FieldsLoop];
var FieldValue : String = GetItemValue(FieldName, ConflictNode);
ConflictRow.Fields[FieldName] = FieldValue;
}
// You can customize the message for each conflict (appears as a tooltip in the conflict dlg)
var ConflictMessage : String = "A conflict has been detected.";
// The third parameter can be used if you have records of more than one chapter in the conflict dlg.
CurrentChapter.AddConflict(ConflictMessage, ConflictRow, ChapterLogicalName);
}
}
return NodeCount - 1;
}