/**
 * @param {string} strChar
 */
function getSoundCode(strChar) {
	switch (strChar.toUpperCase()) {
		case "B":
		case "F":
		case "P":
		case "V":
			return "1";
		case "C":
		case "G":
		case "J":
		case "K":
		case "Q":
		case "S":
		case "X":
		case "Z":
			return "2";
		case "D":
		case "T":
			return "3";
		case "L":
			return "4";
		case "M":
		case "N":
			return "5";
		case "R":
			return "6";
	}
}

/*************************************************************************
* Soundex function
*      Original Version by U.S. Census Bureau in 1920s.
*
* Purpose: provides fuzzy comparisons by encoding characters in a word
*          according to rules described in GetSoundCode function.
* Inputs: the word to be encoded
* Outputs: the Soundex value as a string
**************************************************************************/
export default function soundex(strWord) {
	var strSoundex, strChar, strLastChar, intCount;	// local variables
	strSoundex = strWord.charAt(0).toUpperCase();  // get first character of word
	intCount = 1;  // next time thru loop get character no. 2
	
	// Check each subsequent character and encode until 4 character limit
	while ( (strSoundex.length < 4) && (intCount <= strWord.length) )
	{
		strChar = getSoundCode(strWord.charAt(intCount));
		if (strLastChar != strChar) // no duplicates allowed
			strSoundex = strSoundex + strChar; // build Soundex code
		strLastChar = strChar; // update last character checked
		intCount++; // next character number in word
	}
	// Here's the return value: limit/pad to four characters
	strSoundex = strSoundex + "000";
	return strSoundex.substr(0,4);
}