// Format a date to the Business Server format.
function FormatDate(FieldValue : DateTime)
{
if (FieldValue)
return FieldValue.ToString("yyyy-MM-dd HH:mm:ss", System.Globalization.DateTimeFormatInfo.InvariantInfo);
return "";
}