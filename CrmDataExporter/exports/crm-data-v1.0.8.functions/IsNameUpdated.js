// Returns true if the company name and/or person name has been modified.
function(ChapterLN : String)
{
var IsUpdated : Boolean;
if (ChapterLN == "Lea")
IsUpdated = CurrentRecord.IsUpdated("LeaPerName") || CurrentRecord.IsUpdated("LeaCpyName");
else
IsUpdated = CurrentRecord.IsUpdated(ChapterLN + "Name");
return IsUpdated;
}