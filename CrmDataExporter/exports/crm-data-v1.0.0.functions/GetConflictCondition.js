// Returns a condition that will be used in a QBE to find any conflicts in the database.
// For Company, the condition is to have the same company name (CpyName) 
// For Person, the condition is to have the same person name (PerName)
// For Lead, the condition is to have the same company name and person name (LeaCpyName and LeaPerName)
function GetConflictCondition(ChapterLN : String)
{
var ConflictCondition : String;
if (ChapterLN == "Lea")
{
var CurrentLeaPerName :String = CurrentRecord["LeaPerName"];
var CurrentLeaCpyName :String = CurrentRecord["LeaCpyName"];
ConflictCondition = "([LeaPerName] = '" + CurrentLeaPerName.Replace("'","''") + "' or [LeaPerName] is null) and ";
ConflictCondition += "([LeaCpyName] = '" + CurrentLeaCpyName.Replace("'","''") + "' or [LeaCpyName] is null) ";
}
else
{
var CurrentName :String = CurrentRecord[ChapterLN + "Name"];
ConflictCondition = "[" + ChapterLN + "Name] = '" + CurrentName.Replace("'","''") + "'";
}
return ConflictCondition;
}