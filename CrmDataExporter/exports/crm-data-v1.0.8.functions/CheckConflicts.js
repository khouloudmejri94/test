function()
{
// This script can be used to track the conflicts after an insertion or an update in the chapters
// Company, Person and Lead. By default, the application checks twins automatically.
// From version 7.10.100 onwards, you can deactivate it and for specific purposes modify the
// standard behavior with this script.
// To deactivate the automatic detection by the application, go to the the Selligent X@ Application 
// Config Tool, Miscellaneous and check/uncheck the conflict detection for one or more chapters (Cpy/Per/Lea). 
// After that, you can attach this script to specific events in the corresponding chapters.
// This script is generic and works for the three chapters (Cpy/Per/Lea).
// To reproduce the original functionality, you have to attach this script to the events OnAfterInsert and
// OnAfterUpdate, but it is possible to attach it to OnBeforeInsert and OnBeforeUpdate instead.
// Note that in business scripts, events OnBeforeInsert and OnAfterInsert are triggered by a copy also.
// To prevent the insertion or update because of the conflicts you have detected, you can throw an exception
// of type Selligent.Library.Exceptions.ConflictException() -- see commented code below. The web application 
// will abort the operation and show the conflict dialog box.
// Of course you can also work from different copies of the script in order to have different behaviour in 
// differents chapters, e.g. change the field list, customise the query that determines how a conflict is 
// detected, change the window title.
// The implementation of this conflict detection mecanism via script is now possible in all other chapters.
var ChapterLN : String = CurrentChapter.LogicalName;
if (IsNameUpdated(ChapterLN))
{
var CurrentNRID : String = CurrentRecord[ChapterLN + "NRID"];
var ConflictFieldsList : String[] = GetFieldsList(ChapterLN);
var ConflictList : SelectionList = CreateSelligentObject("SelectionList", CurrentSessionID);
// The third parameter indicates if the QBE must be case sensitive or not (for on Oracle only).
ConflictList.QBE(0, -1, "[" + String.Join("],[", ConflictFieldsList) + "]", GetConflictCondition(ChapterLN), "", false);
var ConflictXml : String = ConflictList.GetXml(XmlOptions.NotNullFields);
var ConflictXmlUtil : Selligent.Library.Xml.XMLUtil = InitXml(ConflictXml);
var ConflictNodes : XmlNodeList = FindItem("Flds", ConflictXmlUtil, true);
var NodeCount : Int32 = ConflictNodes.Count;
for(var NodeLoop : Int32 = 0; NodeLoop < NodeCount; NodeLoop ++)
{
var ConflictNode : XmlNode = ConflictNodes[NodeLoop];
var ConflictNRID : String = GetItemValue(ChapterLN + "NRID", ConflictNode);
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
var ConflictMessage : String = "A record with the same name already exists, this record has nevertheless been inserted.";
CurrentChapter.AddConflict(ConflictMessage, ConflictRow);
}
}
// Change the conflict dlg title.
CurrentChapter.ConflictWindowTitle = "Conflict list.";
}
// If you attach the script to events OnBeforeInsert and OnBeforeUpdate and you want to stop the current operation,
// you can throw a ConflictException. The conflict dlg will be shown, and no changes will be made in the database.
// Do not throw it in a script attached to an OnAfterInsert or OnAfterUpdate operation.
//
//if (NodeCount > 1)
// throw new Selligent.Library.Exceptions.ConflictException();
}