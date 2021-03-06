export default [
  {
    title: "Comparison Functions",
    label: ["Comparison functions", "Description"],
    data: [
      {
        key: "value1 = value2",
        value:
          "Returns TRUE if value1 is equal to value2; returns UNKNOWN if value1 or value2 is NULL.",
      },
      {
        key: "value1 <> value2",
        value:
          "Returns TRUE if value1 is not equal to value2; returns UNKNOWN if value1 or value2 is NULL.",
      },
      {
        key: "value1 > value2",
        value:
          "Returns TRUE if value1 is greater than value2; returns UNKNOWN if value1 or value2 is NULL.",
      },
      {
        key: "value1 >= value2",
        value:
          "Returns TRUE if value1 is greater than or equal to value2; returns UNKNOWN if value1 or value2 is NULL.",
      },
      {
        key: "value1 < value2",
        value:
          "Returns TRUE if value1 is less than value2; returns UNKNOWN if value1 or value2 is NULL.",
      },
      {
        key: "value1 <= value2",
        value:
          "Returns TRUE if value1 is less than or equal to value2; returns UNKNOWN if value1 or value2 is NULL.",
      },
      {
        key: "value IS NULL",
        value: "Returns TRUE if value is NULL.",
      },
      {
        key: "value IS NOT NULL",
        value: "Returns TRUE if value is not NULL.",
      },
      {
        key: "value1 IS DISTINCT FROM value2",
        value:
          "Returns TRUE if two values are not equal. NULL values are treated as identical here.\nE.g., 1 IS DISTINCT FROM NULL returns TRUE; NULL IS DISTINCT FROM NULL returns FALSE.",
      },
      {
        key: "value1 IS NOT DISTINCT FROM value2",
        value:
          "Returns TRUE if two values are equal. NULL values are treated as identical here.\nE.g., 1 IS NOT DISTINCT FROM NULL returns FALSE; NULL IS NOT DISTINCT FROM NULL returns TRUE.",
      },
      {
        key: "value1 BETWEEN [ ASYMMETRIC | SYMMETRIC ] value2 AND value3",
        value:
          "By default (or with the ASYMMETRIC keyword), returns TRUE if value1 is greater than or equal to value2 and less than or equal to value3. With the SYMMETRIC keyword, returns TRUE if value1 is inclusively between value2 and value3. When either value2 or value3 is NULL, returns FALSE or UNKNOWN.\nE.g., 12 BETWEEN 15 AND 12 returns FALSE; 12 BETWEEN SYMMETRIC 15 AND 12 returns TRUE; 12 BETWEEN 10 AND NULL returns UNKNOWN; 12 BETWEEN NULL AND 10 returns FALSE; 12 BETWEEN SYMMETRIC NULL AND 12 returns UNKNOWN.",
      },
      {
        key: "value1 NOT BETWEEN [ ASYMMETRIC | SYMMETRIC ] value2 AND value3",
        value:
          "By default (or with the ASYMMETRIC keyword), returns TRUE if value1 is less than value2 or greater than value3. With the SYMMETRIC keyword, returns TRUE if value1 is not inclusively between value2 and value3. When either value2 or value3 is NULL, returns TRUE or UNKNOWN.\nE.g., 12 NOT BETWEEN 15 AND 12 returns TRUE; 12 NOT BETWEEN SYMMETRIC 15 AND 12 returns FALSE; 12 NOT BETWEEN NULL AND 15 returns UNKNOWN; 12 NOT BETWEEN 15 AND NULL returns TRUE; 12 NOT BETWEEN SYMMETRIC 12 AND NULL returns UNKNOWN.",
      },
      {
        key: "string1 LIKE string2 [ ESCAPE char ]",
        value:
          "Returns TRUE if string1 matches pattern string2; returns UNKNOWN if string1 or string2 is NULL. An escape character can be defined if necessary.\nNote: The escape character has not been supported yet.",
      },
      {
        key: "string1 NOT LIKE string2 [ ESCAPE char ]",
        value:
          "Returns TRUE if string1 does not match pattern string2; returns UNKNOWN if string1 or string2 is NULL. An escape character can be defined if necessary.\nNote: The escape character has not been supported yet.",
      },
      {
        key: "string1 SIMILAR TO string2 [ ESCAPE char ]",
        value:
          "Returns TRUE if string1 matches SQL regular expression string2; returns UNKNOWN if string1 or string2 is NULL. An escape character can be defined if necessary.\nNote: The escape character has not been supported yet.",
      },
      {
        key: "string1 NOT SIMILAR TO string2 [ ESCAPE char ]",
        value:
          "Returns TRUE if string1 does not match SQL regular expression string2; returns UNKNOWN if string1 or string2 is NULL. An escape character can be defined if necessary.\nNote: The escape character has not been supported yet.",
      },
      {
        key: "value1 IN (value2 [, value3]* )",
        value:
          "Returns TRUE if value1 exists in the given list (value2, value3, ...). When (value2, value3, ...). contains NULL, returns TRUE if the element can be found and UNKNOWN otherwise. Always returns UNKNOWN if value1 is NULL.\nE.g., 4 IN (1, 2, 3) returns FALSE; 1 IN (1, 2, NULL) returns TRUE; 4 IN (1, 2, NULL) returns UNKNOWN.",
      },
      {
        key: "value1 NOT IN (value2 [, value3]* )",
        value:
          "Returns TRUE if value1 does not exist in the given list (value2, value3, ...). When (value2, value3, ...). contains NULL, returns FALSE if value1 can be found and UNKNOWN otherwise. Always returns UNKNOWN if value1 is NULL.\nE.g., 4 NOT IN (1, 2, 3) returns TRUE; 1 NOT IN (1, 2, NULL) returns FALSE; 4 NOT IN (1, 2, NULL) returns UNKNOWN.",
      },
      {
        key: "EXISTS (sub-query)",
        value:
          "Returns TRUE if sub-query returns at least one row. Only supported if the operation can be rewritten in a join and group operation.\nNote: For streaming queries the operation is rewritten in a join and group operation. The required state to compute the query result might grow infinitely depending on the number of distinct input rows. Please provide a query configuration with valid retention interval to prevent excessive state size. See Query Configuration for details.",
      },
      {
        key: "value IN (sub-query)",
        value:
          "Returns TRUE if value is equal to a row returned by sub-query.\nNote: For streaming queries the operation is rewritten in a join and group operation. The required state to compute the query result might grow infinitely depending on the number of distinct input rows. Please provide a query configuration with valid retention interval to prevent excessive state size. See Query Configuration for details.",
      },
      {
        key: "value NOT IN (sub-query)",
        value:
          "Returns TRUE if value is not equal to every row returned by sub-query.\nNote: For streaming queries the operation is rewritten in a join and group operation. The required state to compute the query result might grow infinitely depending on the number of distinct input rows. Please provide a query configuration with valid retention interval to prevent excessive state size. See Query Configuration for details.",
      },
    ],
  },
  {
    title: "Logical Functions",
    label: ["Logical functions", "Description"],
    data: [
      {
        key: "boolean1 OR boolean2",
        value:
          "Returns TRUE if boolean1 is TRUE or boolean2 is TRUE. Supports three-valued logic.\nE.g., TRUE OR UNKNOWN returns TRUE.",
      },
      {
        key: "boolean1 AND boolean2",
        value:
          "Returns TRUE if boolean1 and boolean2 are both TRUE. Supports three-valued logic.\nE.g., TRUE AND UNKNOWN returns UNKNOWN.",
      },
      {
        key: "NOT boolean",
        value:
          "Returns TRUE if boolean is FALSE; returns FALSE if boolean is TRUE; returns UNKNOWN if boolean is UNKNOWN.",
      },
      {
        key: "boolean IS FALSE",
        value:
          "Returns TRUE if boolean is FALSE; returns FALSE if boolean is TRUE or UNKNOWN.",
      },
      {
        key: "boolean IS NOT FALSE",
        value:
          "Returns TRUE if boolean is TRUE or UNKNOWN; returns FALSE if boolean is FALSE.",
      },
      {
        key: "boolean IS TRUE",
        value:
          "Returns TRUE if boolean is TRUE; returns FALSE if boolean is FALSE or UNKNOWN.",
      },
      {
        key: "boolean IS NOT TRUE",
        value:
          "Returns TRUE if boolean is FALSE or UNKNOWN; returns FALSE if boolean is TRUE.",
      },
      {
        key: "boolean IS UNKNOWN",
        value:
          "Returns TRUE if boolean is UNKNOWN; returns FALSE if boolean is TRUE or FALSE.",
      },
      {
        key: "boolean IS NOT UNKNOWN",
        value:
          "Returns TRUE if boolean is TRUE or FALSE; returns FALSE if boolean is UNKNOWN.",
      },
    ],
  },
  {
    title: "Arithmetic Functions",
    label: ["Arithmetic functions", "Description"],
    data: [
      {
        key: "+ numeric",
        value: "Returns numeric.",
      },
      {
        key: "- numeric",
        value: "Returns negative numeric.",
      },
      {
        key: "numeric1 + numeric2",
        value: "Returns numeric1 plus numeric2.",
      },
      {
        key: "numeric1 - numeric2",
        value: "Returns numeric1 minus numeric2.",
      },
      {
        key: "numeric1 * numeric2",
        value: "Returns numeric1 multiplied by numeric2.",
      },
      {
        key: "numeric1 / numeric2",
        value: "Returns numeric1 divided by numeric2.",
      },
      {
        key: "POWER(numeric1, numeric2)",
        value: "Returns numeric1 raised to the power of numeric2.",
      },
      {
        key: "ABS(numeric)",
        value: "Returns the absolute value of numeric.",
      },
      {
        key: "MOD(numeric1, numeric2)",
        value:
          "Returns the remainder (modulus) of numeric1 divided by numeric2. The result is negative only if numeric1 is negative.",
      },
      {
        key: "SQRT(numeric)",
        value: "Returns the square root of numeric.",
      },
      {
        key: "LN(numeric)",
        value: "Returns the natural logarithm (base e) of numeric.",
      },
      {
        key: "LOG10(numeric)",
        value: "Returns the base 10 logarithm of numeric.",
      },
      {
        key: "LOG2(numeric)",
        value: "Returns the base 2 logarithm of numeric.",
      },
      {
        key: "LOG(numeric2)\nLOG(numeric1, numeric2)",
        value:
          "When called with one argument, returns the natural logarithm of numeric2. When called with two arguments, this function returns the logarithm of numeric2 to the base numeric1.\nNote: Currently, numeric2 must be greater than 0 and numeric1 must be greater than 1.",
      },
      {
        key: "EXP(numeric)",
        value: "Returns e raised to the power of numeric.",
      },
      {
        key: "CEIL(numeric)\nCEILING(numeric)",
        value:
          "Rounds numeric up, and returns the smallest number that is greater than or equal to numeric.",
      },
      {
        key: "FLOOR(numeric)",
        value:
          "Rounds numeric down, and returns the largest number that is less than or equal to numeric.",
      },
      {
        key: "SIN(numeric)",
        value: "Returns the sine of numeric.",
      },
      {
        key: "SINH(numeric)",
        value:
          "Returns the hyperbolic sine of numeric.\nThe return type is DOUBLE.",
      },
      {
        key: "COS(numeric)",
        value: "Returns the cosine of numeric.",
      },
      {
        key: "TAN(numeric)",
        value: "Returns the tangent of numeric.",
      },
      {
        key: "TANH(numeric)",
        value:
          "Returns the hyperbolic tangent of numeric.\nThe return type is DOUBLE.",
      },
      {
        key: "COT(numeric)",
        value: "Returns the cotangent of a numeric.",
      },
      {
        key: "ASIN(numeric)",
        value: "Returns the arc sine of numeric.",
      },
      {
        key: "ACOS(numeric)",
        value: "Returns the arc cosine of numeric.",
      },
      {
        key: "ATAN(numeric)",
        value: "Returns the arc tangent of numeric.",
      },
      {
        key: "ATAN2(numeric1, numeric2)",
        value:
          "Returns the arc tangent of a coordinate (numeric1, numeric2).",
      },
      {
        key: "COSH(numeric)",
        value:
          "Returns the hyperbolic cosine of NUMERIC.\nReturn value type is DOUBLE.",
      },
      {
        key: "DEGREES(numeric)",
        value:
          "Returns the degree representation of a radian numeric.",
      },
      {
        key: "RADIANS(numeric)",
        value:
          "Returns the radian representation of a degree numeric.",
      },
      {
        key: "SIGN(numeric)",
        value: "Returns the signum of numeric.",
      },
      {
        key: "ROUND(numeric, integer)",
        value:
          "Returns a number rounded to integer decimal places for numeric.",
      },
      {
        key: "PI",
        value:
          "Returns a value that is closer than any other values to pi.",
      },
      {
        key: "E()",
        value:
          "Returns a value that is closer than any other values to e.",
      },
      {
        key: "RAND()",
        value:
          "Returns a pseudorandom double value between 0.0 (inclusive) and 1.0 (exclusive).",
      },
      {
        key: "RAND(integer)",
        value:
          "Returns a pseudorandom double value between 0.0 (inclusive) and 1.0 (exclusive) with an initial seed integer. Two RAND functions will return identical sequences of numbers if they have the same initial seed.",
      },
      {
        key: "RAND_INTEGER(integer)",
        value:
          "Returns a pseudorandom integer value between 0 (inclusive) and integer (exclusive).",
      },
      {
        key: "RAND_INTEGER(integer1, integer2)",
        value:
          "Returns a pseudorandom integer value between 0 (inclusive) and the specified value (exclusive) with an initial seed. Two RAND_INTEGER functions will return identical sequences of numbers if they have the same initial seed and bound.",
      },
      {
        key: "UUID()",
        value:
          'Returns an UUID (Universally Unique Identifier) string (e.g., "3d3c68f7-f608-473f-b60c-b0c44ad4cc4e") according to RFC 4122 type 4 (pseudo randomly generated) UUID. The UUID is generated using a cryptographically strong pseudo random number generator.',
      },
      {
        key: "BIN(integer)",
        value:
          "Returns a string representation of integer in binary format. Returns NULL if integer is NULL.\nE.g. BIN(4) returns '100' and BIN(12) returns '1100'.",
      },
      {
        key: "HEX(numeric)\nHEX(string)\n      ",
        value:
          'Returns a string representation of an integer numeric value or a string in hex format. Returns NULL if the argument is NULL.\nE.g. a numeric 20 leads to "14", a numeric 100 leads to "64", a string "hello,world" leads to "68656C6C6F2C776F726C64".',
      },
      {
        key: "TRUNCATE(numeric1, integer2)",
        value:
          "Returns a numeric of truncated to integer2 decimal places. Returns NULL if numeric1 or integer2 is NULL.If integer2 is 0,the result has no decimal point or fractional part.integer2 can be negative to cause integer2 digits left of the decimal point of the value to become zero.This function can also pass in only one numeric1 parameter and not set Integer2 to use.If Integer2 is not set, the function truncates as if Integer2 were 0.\nE.g. truncate(42.345, 2) to 42.34. and truncate(42.345) to 42.0.",
      },
      {
        key: "PI()",
        value:
          "Returns the value of ?? (pi).\nOnly supported in blink planner.",
      },
    ],
  },
  {
    title: "String Functions",
    label: ["String functions", "Description"],
    data: [
      {
        key: "string1 || string2",
        value: "Returns the concatenation of string1 and string2.",
      },
      {
        key: "CHAR_LENGTH(string)\nCHARACTER_LENGTH(string)",
        value: "Returns the number of characters in string.",
      },
      {
        key: "UPPER(string)",
        value: "Returns string in uppercase.",
      },
      {
        key: "LOWER(string)",
        value: "Returns string in lowercase.",
      },
      {
        key: "POSITION(string1 IN string2)",
        value:
          "Returns the position (start from 1) of the first occurrence of string1 in string2; returns 0 if string1 cannot be found in string2.",
      },
      {
        key: "TRIM([ BOTH | LEADING | TRAILING ] string1 FROM string2)",
        value:
          "Returns a string that removes leading and/or trailing characters string1 from string2. By default, whitespaces at both sides are removed.",
      },
      {
        key: "LTRIM(string)",
        value:
          "Returns a string that removes the left whitespaces from string.\nE.g., LTRIM(' This is a test String.') returns \"This is a test String.\".",
      },
      {
        key: "RTRIM(string)",
        value:
          "Returns a string that removes the right whitespaces from string.\nE.g., RTRIM('This is a test String. ') returns \"This is a test String.\".",
      },
      {
        key: "REPEAT(string, integer)",
        value:
          "Returns a string that repeats the base string integer times.\nE.g., REPEAT('This is a test String.', 2) returns \"This is a test String.This is a test String.\".",
      },
      {
        key: "REGEXP_REPLACE(string1, string2, string3)",
        value:
          "Returns a string from string1 with all the substrings that match a regular expression string2 consecutively being replaced with string3.\nE.g., REGEXP_REPLACE('foobar', 'oo|ar', '') returns \"fb\".",
      },
      {
        key: "OVERLAY(string1 PLACING string2 FROM integer1 [ FOR integer2 ])",
        value:
          "Returns a string that replaces integer2 (string2's length by default) characters of string1 with string2 from position integer1.\nE.g., OVERLAY('This is an old string' PLACING ' new' FROM 10 FOR 5) returns \"This is a new string\"",
      },
      {
        key: "SUBSTRING(string FROM integer1 [ FOR integer2 ])",
        value:
          "Returns a substring of string starting from position integer1 with length integer2 (to the end by default).",
      },
      {
        key: "REPLACE(string1, string2, string3)",
        value:
          "Returns a new string which replaces all the occurrences of string2 with string3 (non-overlapping) from string1\nE.g., REPLACE('hello world', 'world', 'flink') returns \"hello flink\"; REPLACE('ababab', 'abab', 'z') returns \"zab\".",
      },
      {
        key: "REGEXP_EXTRACT(string1, string2[, integer])",
        value:
          "Returns a string from string1 which extracted with a specified regular expression string2 and a regex match group index integer.\nNote: The regex match group index starts from 1 and 0 means matching the whole regex. In addition, the regex match group index should not exceed the number of the defined groups.\nE.g. REGEXP_EXTRACT('foothebar', 'foo(.*?)(bar)', 2)\" returns \"bar\".",
      },
      {
        key: "INITCAP(string)",
        value:
          "Returns a new form of string with the first character of each word converted to uppercase and the rest characters to lowercase. Here a word means a sequences of alphanumeric characters.",
      },
      {
        key: "CONCAT(string1, string2,...)",
        value:
          "Returns a string that concatenates string1, string2, .... Returns NULL if any argument is NULL.\nE.g., CONCAT('AA', 'BB', 'CC') returns \"AABBCC\".",
      },
      {
        key: "CONCAT_WS(string1, string2, string3,...)",
        value:
          "Returns a string that concatenates string2, string3, ... with a separator string1. The separator is added between the strings to be concatenated. Returns NULL If string1 is NULL. Compared with CONCAT(), CONCAT_WS() automatically skips NULL arguments.\nE.g., CONCAT_WS('~', 'AA', NULL, 'BB', '', 'CC') returns \"AA~BB~~CC\".",
      },
      {
        key: "LPAD(string1, integer, string2)",
        value:
          "Returns a new string from string1 left-padded with string2 to a length of integer characters. If the length of string1 is shorter than integer, returns string1 shortened to integer characters.\nE.g., LPAD('hi',4,'??') returns \"??hi\"; LPAD('hi',1,'??') returns \"h\".",
      },
      {
        key: "RPAD(string1, integer, string2)",
        value:
          "Returns a new string from string1 right-padded with string2 to a length of integer characters. If the length of string1 is shorter than integer, returns string1 shortened to integer characters.\nE.g., RPAD('hi',4,'??') returns \"hi??\", RPAD('hi',1,'??') returns \"h\".",
      },
      {
        key: "FROM_BASE64(string)",
        value:
          "Returns the base64-decoded result from string; returns NULL if string is NULL.\nE.g., FROM_BASE64('aGVsbG8gd29ybGQ=') returns \"hello world\".",
      },
      {
        key: "TO_BASE64(string)",
        value:
          "Returns the base64-encoded result from string; returns NULL if string is NULL.\nE.g., TO_BASE64('hello world') returns \"aGVsbG8gd29ybGQ=\".",
      },
      {
        key: "ASCII(string)",
        value:
          "Returns the numeric value of the first character of string. Returns NULL if string is NULL.\nOnly supported in blink planner.\nE.g., ascii('abc') returns 97, and ascii(CAST(NULL AS VARCHAR)) returns NULL.",
      },
      {
        key: "CHR(integer)",
        value:
          "Returns the ASCII character having the binary equivalent to integer. If integer is larger than 255, we will get the modulus of integer divided by 255 first, and returns CHR of the modulus. Returns NULL if integer is NULL.\nOnly supported in blink planner.\nE.g., chr(97) returns a, chr(353) returns a, and ascii(CAST(NULL AS VARCHAR)) returns NULL.",
      },
      {
        key: "DECODE(binary, string)",
        value:
          "Decodes the first argument into a String using the provided character set (one of 'US-ASCII', 'ISO-8859-1', 'UTF-8', 'UTF-16BE', 'UTF-16LE', 'UTF-16'). If either argument is null, the result will also be null.\nOnly supported in blink planner.",
      },
      {
        key: "ENCODE(string1, string2)",
        value:
          "Encodes the string1 into a BINARY using the provided string2 character set (one of 'US-ASCII', 'ISO-8859-1', 'UTF-8', 'UTF-16BE', 'UTF-16LE', 'UTF-16'). If either argument is null, the result will also be null.\nOnly supported in blink planner.",
      },
      {
        key: "INSTR(string1, string2)",
        value:
          "Returns the position of the first occurrence of string2 in string1. Returns NULL if any of arguments is NULL.</p>\nOnly supported in blink planner.",
      },
      {
        key: "LEFT(string, integer)",
        value:
          "Returns the leftmost integer characters from the string. Returns EMPTY String if integer is negative. Returns NULL if any argument is NULL.\nOnly supported in blink planner.",
      },
      {
        key: "RIGHT(string, integer)",
        value:
          "Returns the rightmost integer characters from the string. Returns EMPTY String if integer is negative. Returns NULL if any argument is NULL.\nOnly supported in blink planner.",
      },
      {
        key: "LOCATE(string1, string2[, integer])",
        value:
          "Returns the position of the first occurrence of string1 in string2 after position integer. Returns 0 if not found. Returns NULL if any of arguments is NULL.\nOnly supported in blink planner.",
      },
      {
        key: "PARSE_URL(string1, string2[, string3])",
        value:
          "Returns the specified part from the URL. Valid values for string2 include 'HOST', 'PATH', 'QUERY', 'REF', 'PROTOCOL', 'AUTHORITY', 'FILE', and 'USERINFO'. Returns NULL if any of arguments is NULL.\nE.g., parse_url('http://facebook.com/path1/p.php?k1=v1&k2=v2#Ref1', 'HOST'), returns 'facebook.com'.\nAlso a value of a particular key in QUERY can be extracted by providing the key as the third argument string3.\nE.g., parse_url('http://facebook.com/path1/p.php?k1=v1&k2=v2#Ref1', 'QUERY', 'k1') returns 'v1'.\nOnly supported in blink planner.",
      },
      {
        key: "REGEXP(string1, string2)",
        value:
          "Returns TRUE if any (possibly empty) substring of string1 matches the Java regular expression string2, otherwise FALSE. Returns NULL if any of arguments is NULL.\nOnly supported in blink planner.",
      },
      {
        key: "REVERSE(string)",
        value:
          "Returns the reversed string. Returns NULL if string is NULL.\nOnly supported in blink planner.",
      },
      {
        key: "SPLIT_INDEX(string1, string2, integer1)",
        value:
          "Splits string1 by the delimiter string2, returns the integerth (zero-based) string of the split strings. Returns NULL if integer is negative. Returns NULL if any of arguments is NULL.\nOnly supported in blink planner.",
      },
      {
        key: "STR_TO_MAP(string1[, string2, string3]])",
        value:
          "Returns a map after splitting the string1 into key/value pairs using delimiters. string2 is the pair delimiter, default is ','. And string3 is the key-value delimiter, default is '='.\nOnly supported in blink planner.",
      },
      {
        key: "SUBSTR(string[, integer1[, integer2]])",
        value:
          "Returns a substring of string starting from position integer1 with length integer2 (to the end by default).\nOnly supported in blink planner.",
      },
    ],
  },
  {
    title: "Temporal Functions",
    label: ["Temporal functions", "Description"],
    data: [
      {
        key: "DATE string",
        value:
          'Returns a SQL date parsed from string in form of "yyyy-MM-dd".',
      },
      {
        key: "TIME string",
        value:
          'Returns a SQL time parsed from string in form of "HH:mm:ss".',
      },
      {
        key: "TIMESTAMP string",
        value:
          'Returns a SQL timestamp parsed from string in form of "yyyy-MM-dd HH:mm:ss[.SSS]".',
      },
      {
        key: "INTERVAL string range",
        value:
          "Parses an interval string in the form \"dd hh:mm:ss.fff\" for SQL intervals of milliseconds or \"yyyy-mm\" for SQL intervals of months. An interval range might be DAY, MINUTE, DAY TO HOUR, or DAY TO SECOND for intervals of milliseconds; YEAR or YEAR TO MONTH for intervals of months.\nE.g., INTERVAL '10 00:00:00.004' DAY TO SECOND, INTERVAL '10' DAY, or INTERVAL '2-10' YEAR TO MONTH return intervals.",
      },
      {
        key: "CURRENT_DATE",
        value: "Returns the current SQL date in the UTC time zone.",
      },
      {
        key: "CURRENT_TIME",
        value: "Returns the current SQL time in the UTC time zone.",
      },
      {
        key: "CURRENT_TIMESTAMP",
        value:
          "Returns the current SQL timestamp in the UTC time zone.",
      },
      {
        key: "LOCALTIME",
        value: "Returns the current SQL time in local time zone.",
      },
      {
        key: "LOCALTIMESTAMP",
        value:
          "Returns the current SQL timestamp in local time zone.",
      },
      {
        key: "EXTRACT(timeintervalunit FROM temporal)",
        value:
          "Returns a long value extracted from the timeintervalunit part of temporal.\nE.g., EXTRACT(DAY FROM DATE '2006-06-05') returns 5.",
      },
      {
        key: "YEAR(date)",
        value:
          "Returns the year from SQL date date. Equivalent to EXTRACT(YEAR FROM date).\nE.g., YEAR(DATE '1994-09-27') returns 1994.",
      },
      {
        key: "QUARTER(date)",
        value:
          "Returns the quarter of a year (an integer between 1 and 4) from SQL date date. Equivalent to EXTRACT(QUARTER FROM date).\nE.g., QUARTER(DATE '1994-09-27') returns 3.",
      },
      {
        key: "MONTH(date)",
        value:
          "Returns the month of a year (an integer between 1 and 12) from SQL date date. Equivalent to EXTRACT(MONTH FROM date).\nE.g., MONTH(DATE '1994-09-27') returns 9.",
      },
      {
        key: "WEEK(date)",
        value:
          "Returns the week of a year (an integer between 1 and 53) from SQL date date. Equivalent to EXTRACT(WEEK FROM date).\nE.g., WEEK(DATE '1994-09-27') returns 39.",
      },
      {
        key: "DAYOFYEAR(date)",
        value:
          "Returns the day of a year (an integer between 1 and 366) from SQL date date. Equivalent to EXTRACT(DOY FROM date).\nE.g., DAYOFYEAR(DATE '1994-09-27') returns 270.",
      },
      {
        key: "DAYOFMONTH(date)",
        value:
          "Returns the day of a month (an integer between 1 and 31) from SQL date date. Equivalent to EXTRACT(DAY FROM date).\nE.g., DAYOFMONTH(DATE '1994-09-27') returns 27.",
      },
      {
        key: "DAYOFWEEK(date)",
        value:
          "Returns the day of a week (an integer between 1 and 7; Sunday = 1) from SQL date date.Equivalent to EXTRACT(DOW FROM date).\nE.g., DAYOFWEEK(DATE '1994-09-27') returns 3.",
      },
      {
        key: "HOUR(timestamp)",
        value:
          "Returns the hour of a day (an integer between 0 and 23) from SQL timestamp timestamp. Equivalent to EXTRACT(HOUR FROM timestamp).\nE.g., HOUR(TIMESTAMP '1994-09-27 13:14:15') returns 13.",
      },
      {
        key: "MINUTE(timestamp)",
        value:
          "Returns the minute of an hour (an integer between 0 and 59) from SQL timestamp timestamp. Equivalent to EXTRACT(MINUTE FROM timestamp).\nE.g., MINUTE(TIMESTAMP '1994-09-27 13:14:15') returns 14.",
      },
      {
        key: "SECOND(timestamp)",
        value:
          "Returns the second of a minute (an integer between 0 and 59) from SQL timestamp. Equivalent to EXTRACT(SECOND FROM timestamp).\nE.g., SECOND(TIMESTAMP '1994-09-27 13:14:15') returns 15.",
      },
      {
        key: "FLOOR(timepoint TO timeintervalunit)",
        value:
          "Returns a value that rounds timepoint down to the time unit timeintervalunit.\nE.g., FLOOR(TIME '12:44:31' TO MINUTE) returns 12:44:00.",
      },
      {
        key: "CEIL(timepoint TO timeintervalunit)",
        value:
          "Returns a value that rounds timepoint up to the time unit timeintervalunit.\nE.g., CEIL(TIME '12:44:31' TO MINUTE) returns 12:45:00.",
      },
      {
        key: "(timepoint1, temporal1) OVERLAPS (timepoint2, temporal2)",
        value:
          "Returns TRUE if two time intervals defined by (timepoint1, temporal1) and (timepoint2, temporal2) overlap. The temporal values could be either a time point or a time interval.\nE.g., (TIME '2:55:00', INTERVAL '1' HOUR) OVERLAPS (TIME '3:30:00', INTERVAL '2' HOUR) returns TRUE; (TIME '9:00:00', TIME '10:00:00') OVERLAPS (TIME '10:15:00', INTERVAL '3' HOUR) returns FALSE.",
      },
      {
        key: "DATE_FORMAT(timestamp, string)",
        value:
          "Attention for old planner This function has serious bugs and should not be used for now. Please implement a custom UDF instead or use EXTRACT as a workaround.\nFor blink planner, this converts timestamp to a value of string in the format specified by the date format string. The format string is compatible with Java's SimpleDateFormat.",
      },
      {
        key: "TIMESTAMPADD(timeintervalunit, interval, timepoint)",
        value:
          "Returns a new time value that adds a (signed) integer interval to timepoint. The unit for interval is given by the unit argument, which should be one of the following values: SECOND, MINUTE, HOUR, DAY, WEEK, MONTH, QUARTER, or YEAR.\nE.g., TIMESTAMPADD(WEEK, 1, DATE '2003-01-02') returns 2003-01-09.",
      },
      {
        key: "TIMESTAMPDIFF(timepointunit, timepoint1, timepoint2)",
        value:
          "Returns the (signed) number of timepointunit between timepoint1 and timepoint2. The unit for the interval is given by the first argument, which should be one of the following values: SECOND, MINUTE, HOUR, DAY, MONTH, or YEAR. See also the Time Interval and Point Unit Specifiers table.\nE.g., TIMESTAMPDIFF(DAY, TIMESTAMP '2003-01-02 10:00:00', TIMESTAMP '2003-01-03 10:00:00') leads to 1.",
      },
      {
        key: "CONVERT_TZ(string1, string2, string3)",
        value:
          "Converts a datetime string1 (with default ISO timestamp format 'yyyy-MM-dd HH:mm:ss') from time zone string2 to time zone string3. The format of time zone should be either an abbreviation such as \"PST\", a full name such as \"America/Los_Angeles\", or a custom ID such as \"GMT-8:00\".\nE.g., CONVERT('1970-01-01 00:00:00', 'UTC', 'America/Los_Angeles') returns '1969-12-31 16:00:00'.\nOnly supported in blink planner.",
      },
      {
        key: "FROM_UNIXTIME(numeric[, string])",
        value:
          "Returns a representation of the numeric argument as a value in string format (default is 'YYYY-MM-DD hh:mm:ss'). numeric is an internal timestamp value representing seconds since '1970-01-01 00:00:00' UTC, such as produced by the UNIX_TIMESTAMP() function. The return value is expressed in the session time zone (specified in TableConfig).\nE.g., FROM_UNIXTIME(44) returns '1970-01-01 09:00:44' if in UTC time zone, but returns '1970-01-01 09:00:44' if in 'Asia/Tokyo' time zone.\nOnly supported in blink planner.",
      },
      {
        key: "UNIX_TIMESTAMP()",
        value:
          "Gets current Unix timestamp in seconds. This function is not deterministic.\nOnly supported in blink planner.",
      },
      {
        key: "UNIX_TIMESTAMP(string1[, string2])",
        value:
          "Converts date time string string1 in format string2 (by default: yyyy-MM-dd HH:mm:ss if not specified) to Unix timestamp (in seconds), using the specified timezone in table config.\nOnly supported in blink planner.",
      },
      {
        key: "TO_DATE(string1[, string2])",
        value:
          "Converts a date string string1 with format string2 (by default 'yyyy-MM-dd') to a date.\nOnly supported in blink planner.",
      },
      {
        key: "TO_TIMESTAMP(string1[, string2])",
        value:
          "Converts date time string string1 with format string2 (by default: 'yyyy-MM-dd HH:mm:ss') under the session time zone (specified by TableConfig) to a timestamp.\nOnly supported in blink planner.",
      },
      {
        key: "NOW()",
        value:
          "Returns the current SQL timestamp in the UTC time zone. This function is not deterministic.\nOnly supported in blink planner.",
      },
    ],
  },
  {
    title: "Conditional Functions",
    label: ["Conditional functions", "Description"],
    data: [
      {
        key: "CASE value\nWHEN value1_1 [, value1_2 ]* THEN result1\n[ WHEN value2_1 [, value2_2 ]* THEN result2 ]*\n[ ELSE resultZ ]\nEND",
        value:
          "Returns resultX when the first time value is contained in (valueX_1, valueX_2, ...). When no value matches, returns resultZ if it is provided and returns NULL otherwise.",
      },
      {
        key: "CASE\nWHEN condition1 THEN result1\n[ WHEN condition2 THEN result2 ]*\n[ ELSE resultZ ]\nEND",
        value:
          "Returns resultX when the first conditionX is met. When no condition is met, returns resultZ if it is provided and returns NULL otherwise.",
      },
      {
        key: "NULLIF(value1, value2)",
        value:
          "Returns NULL if value1 is equal to value2; returns value1 otherwise.\nE.g., NULLIF(5, 5) returns NULL; NULLIF(5, 0) returns 5.",
      },
      {
        key: "COALESCE(value1, value2 [, value3 ]* )",
        value:
          "Returns the first value that is not NULL from value1, value2, ....\nE.g., COALESCE(NULL, 5) returns 5.",
      },
      {
        key: "IF(condition, true_value, false_value)",
        value:
          "Returns the true_value if condition is met, otherwise false_value.\nOnly supported in blink planner.\nE.g., IF(5 > 3, 5, 3) returns 5.",
      },
      {
        key: "IS_ALPHA(string)",
        value:
          "Returns true if all characters in string are letter, otherwise false.\nOnly supported in blink planner.",
      },
      {
        key: "IS_DECIMAL(string)",
        value:
          "Returns true if string can be parsed to a valid numeric, otherwise false.\nOnly supported in blink planner.",
      },
      {
        key: "IS_DIGIT(string)",
        value:
          "Returns true if all characters in string are digit, otherwise false.\nOnly supported in blink planner.",
      },
    ],
  },
  {
    title: "Type Conversion Functions",
    label: ["Type conversion functions", "Description"],
    data: [
      {
        key: "CAST(value AS type)",
        value:
          "Returns a new value being cast to type type. See the supported types here.\nE.g., CAST('42' AS INT) returns 42; CAST(NULL AS VARCHAR) returns NULL of type VARCHAR.",
      },
    ],
  },
  {
    title: "Collection Functions",
    label: ["Collection functions", "Description"],
    data: [
      {
        key: "CARDINALITY(array)",
        value: "Returns the number of elements in array.",
      },
      {
        key: "array ???[??? integer ???]???",
        value:
          "Returns the element at position integer in array. The index starts from 1.",
      },
      {
        key: "ELEMENT(array)",
        value:
          "Returns the sole element of array (whose cardinality should be one); returns NULL if array is empty. Throws an exception if array has more than one element.",
      },
      {
        key: "CARDINALITY(map)",
        value: "Returns the number of entries in map.",
      },
      {
        key: "map ???[??? value ???]???",
        value: "Returns the value specified by key value in map.",
      },
    ],
  },
  {
    title: "Value Construction Functions",
    label: ["Value construction functions", "Description"],
    data: [
      {
        key: "ROW(value1, [, value2]*)\n(value1, [, value2]*)",
        value:
          "Returns a row created from a list of values (value1, value2,...).",
      },
      {
        key: "ARRAY ???[??? value1 [, value2 ]* ???]???",
        value:
          "Returns an array created from a list of values (value1, value2, ...).",
      },
      {
        key: "MAP ???[??? value1, value2 [, value3, value4 ]* ???]???",
        value:
          "Returns a map created from a list of key-value pairs ((value1, value2), (value3, value4), ...).",
      },
    ],
  },
  {
    title: "Value Access Functions",
    label: ["Value access functions", "Description"],
    data: [
      {
        key: "tableName.compositeType.field",
        value:
          "Returns the value of a field from a Flink composite type (e.g., Tuple, POJO) by name.",
      },
      {
        key: "tableName.compositeType.*",
        value:
          "Returns a flat representation of a Flink composite type (e.g., Tuple, POJO) that converts each of its direct subtype into a separate field. In most cases the fields of the flat representation are named similarly to the original fields but with a dollar separator (e.g., mypojo$mytuple$f0).",
      },
    ],
  },
  {
    title: "Grouping Functions",
    label: ["Grouping functions", "Description"],
    data: [
      {
        key: "GROUP_ID()",
        value:
          "Returns an integer that uniquely identifies the combination of grouping keys.",
      },
      {
        key: "GROUPING(expression1 [, expression2]* )\nGROUPING_ID(expression1 [, expression2]* )",
        value:
          "Returns a bit vector of the given grouping expressions.",
      },
    ],
  },
  {
    title: "Hash Functions",
    label: ["Hash functions", "Description"],
    data: [
      {
        key: "MD5(string)",
        value:
          "Returns the MD5 hash of string as a string of 32 hexadecimal digits; returns NULL if string is NULL.",
      },
      {
        key: "SHA1(string)",
        value:
          "Returns the SHA-1 hash of string as a string of 40 hexadecimal digits; returns NULL if string is NULL.",
      },
      {
        key: "SHA224(string)",
        value:
          "Returns the SHA-224 hash of string as a string of 56 hexadecimal digits; returns NULL if string is NULL.",
      },
      {
        key: "SHA256(string)",
        value:
          "Returns the SHA-256 hash of string as a string of 64 hexadecimal digits; returns NULL if string is NULL.",
      },
      {
        key: "SHA384(string)",
        value:
          "Returns the SHA-384 hash of string as a string of 96 hexadecimal digits; returns NULL if string is NULL.",
      },
      {
        key: "SHA512(string)",
        value:
          "Returns the SHA-512 hash of string as a string of 128 hexadecimal digits; returns NULL if string is NULL.",
      },
      {
        key: "SHA2(string, hashLength)",
        value:
          "Returns the hash using the SHA-2 family of hash functions (SHA-224, SHA-256, SHA-384, or SHA-512). The first argument string is the string to be hashed and the second argument hashLength is the bit length of the result (224, 256, 384, or 512). Returns NULL if string or hashLength is NULL.",
      },
    ],
  },
  {
    title: "Aggregate Functions",
    label: ["Aggregate functions", "Description"],
    data: [
      {
        key: "COUNT([ ALL ] expression | DISTINCT expression1 [, expression2]*)",
        value:
          "By default or with ALL, returns the number of input rows for which expression is not NULL. Use DISTINCT for one unique instance of each value.",
      },
      {
        key: "COUNT(*)\nCOUNT(1)",
        value: "Returns the number of input rows.",
      },
      {
        key: "AVG([ ALL | DISTINCT ] expression)",
        value:
          "By default or with keyword ALL, returns the average (arithmetic mean) of expression across all input rows. Use DISTINCT for one unique instance of each value.",
      },
      {
        key: "SUM([ ALL | DISTINCT ] expression)",
        value:
          "By default or with keyword ALL, returns the sum of expression across all input rows. Use DISTINCT for one unique instance of each value.",
      },
      {
        key: "MAX([ ALL | DISTINCT ] expression)",
        value:
          "By default or with keyword ALL, returns the maximum value of expression across all input rows. Use DISTINCT for one unique instance of each value.",
      },
      {
        key: "MIN([ ALL | DISTINCT ] expression)",
        value:
          "By default or with keyword ALL, returns the minimum value of expression across all input rows. Use DISTINCT for one unique instance of each value.",
      },
      {
        key: "STDDEV_POP([ ALL | DISTINCT ] expression)",
        value:
          "By default or with keyword ALL, returns the population standard deviation of expression across all input rows. Use DISTINCT for one unique instance of each value.",
      },
      {
        key: "STDDEV_SAMP([ ALL | DISTINCT ] expression)",
        value:
          "By default or with keyword ALL, returns the sample standard deviation of expression across all input rows. Use DISTINCT for one unique instance of each value.",
      },
      {
        key: "VAR_POP([ ALL | DISTINCT ] expression)",
        value:
          "By default or with keyword ALL, returns the population variance (square of the population standard deviation) of expression across all input rows. Use DISTINCT for one unique instance of each value.",
      },
      {
        key: "VAR_SAMP([ ALL | DISTINCT ] expression)",
        value:
          "By default or with keyword ALL, returns the sample variance (square of the sample standard deviation) of expression across all input rows. Use DISTINCT for one unique instance of each value.",
      },
      {
        key: "COLLECT([ ALL | DISTINCT ] expression)",
        value:
          "By default or with keyword ALL, returns a multiset of expression across all input rows. NULL values will be ignored. Use DISTINCT for one unique instance of each value.",
      },
      {
        key: "VARIANCE([ ALL | DISTINCT ] expression)",
        value:
          "Synonyms for VAR_SAMP().\nOnly supported in blink planner.",
      },
      {
        key: "RANK()",
        value:
          "Returns the rank of a value in a group of values. The result is one plus the number of rows preceding or equal to the current row in the ordering of the partition. The values will produce gaps in the sequence.\nOnly supported in blink planner.",
      },
      {
        key: "DENSE_RANK()",
        value:
          "Returns the rank of a value in a group of values. The result is one plus the previously assigned rank value. Unlike the function rank, dense_rank will not produce gaps in the ranking sequence.\nOnly supported in blink planner.",
      },
      {
        key: "ROW_NUMBER()",
        value:
          "Assigns a unique, sequential number to each row, starting with one, according to the ordering of rows within the window partition.\nROW_NUMBER and RANK are similar. ROW_NUMBER numbers all rows sequentially (for example 1, 2, 3, 4, 5). RANK provides the same numeric value for ties (for example 1, 2, 2, 4, 5).\nOnly supported in blink planner.",
      },
      {
        key: "LEAD(expression [, offset] [, default] )",
        value:
          "Returns the value of expression at the offsetth row after the current row in the window. The default value of offset is 1 and the default value of default is NULL.\nOnly supported in blink planner.",
      },
      {
        key: "LAG(expression [, offset] [, default])",
        value:
          "Returns the value of expression at the offsetth row after the current row in the window. The default value of offset is 1 and the default value of default is NULL.\nOnly supported in blink planner.",
      },
      {
        key: "FIRST_VALUE(expression)",
        value:
          "Returns the first value in an ordered set of values.\nOnly supported in blink planner.",
      },
      {
        key: "LAST_VALUE(expression)",
        value:
          "Returns the last value in an ordered set of values.\nOnly supported in blink planner.",
      },
      {
        key: "LISTAGG(expression [, separator])",
        value:
          "Concatenates the values of string expressions and places separator values between them. The separator is not added at the end of string. The default value of separator is ','.\nOnly supported in blink planner.",
      },
    ],
  },
  {
    title: "Flink SQL Functions",
    label: ["Flink SQL Functions", "Description"],
    data: [
      {
        key: "TUMBLE(time_attr, interval)",
        value:
          "??????????????????????????????GROUP BY??????????????????????????????????????????????????????????????????????????? ( interval) ????????????????????????????????????????????? 5 ???????????????????????? 5 ????????????????????????????????????",
      },
      {
        key: "TUMBLE_START(time_attr, interval)",
        value: "????????????????????????????????????",
      },
      {
        key: "TUMBLE_END(time_attr, interval)",
        value: "????????????????????????????????????",
      },
      {
        key: "HOP(time_attr, interval, interval)",
        value:
          "???????????????????????????????????? Table API ??????????????????????????????GROUP BY???????????????????????????????????????????????????????????????????????????interval???????????????????????????????????????????????????interval???????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????15 ??????????????? 5 ?????????????????????????????????????????????????????? 3 ???????????? 15 ??????????????????????????????????????? 5 ?????????????????????????????????",
      },
      {
        key: "HOP_START(time_attr, interval, interval)",
        value: "????????????????????????????????????",
      },
      {
        key: "SESSION(time_attr, interval)",
        value:
          "??????????????????????????????GROUP BY???????????????????????????????????????????????????????????????????????????????????????interval??????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????? 30 ????????????????????????????????????????????? 30 ????????????????????????????????????????????????????????????????????????????????????????????? 30 ???????????????????????????????????????",
      },
      {
        key: "SESSION_START(time_attr, interval, interval)",
        value: "????????????????????????????????????",
      },
      {
        key: "TUMBLE_PROCTIME(time_attr, interval, interval)",
        value:
          "?????????????????????????????????proctime ??????????????????????????????????????????????????????????????????????????????????????????????????????",
      },
      {
        key: "HOP_PROCTIME(time_attr, interval, interval)",
        value:
          "???????????????????????????proctime ??????????????????????????????????????????????????????????????????????????????????????????????????????",
      },
      {
        key: "SESSION_PROCTIME(time_attr, interval)",
        value:
          "???????????????????????????proctime ??????????????????????????????????????????????????????????????????????????????????????????????????????",
      },
      {
        key: "TUMBLE_ROWTIME(time_attr, interval)",
        value:
          "???????????????????????????rowtime ?????????????????????????????????????????????????????????????????????????????????????????????",
      },
      {
        key: "HOP_ROWTIME(time_attr, interval, interval)",
        value:
          "???????????????????????????rowtime ?????????????????????????????????????????????????????????????????????????????????????????????",
      },
      {
        key: "SESSION_ROWTIME(time_attr, interval)",
        value:
          "???????????????????????????rowtime ?????????????????????????????????????????????????????????????????????????????????????????????",
      },
    ],
  },
]
