export default {
  mode: "sql",
  keywords: [
    {
      text: "ADD",
      description: "Adds a column in an existing table",
    },
    {
      text: "ADD_CONSTRAINT",
      description:
        "Adds a constraint after a table is already created",
    },
    {
      text: "ALTER",
      description:
        "Adds, deletes, or modifies columns in a table, or changes the data type of a column in a table",
    },
    {
      text: "ALTER_COLUMN",
      description: "Changes the data type of a column in a table",
    },
    {
      text: "ALTER_TABLE",
      description: "Adds, deletes, or modifies columns in a table",
    },
    {
      text: "ALL",
      description:
        "Returns true if all of the subquery values meet the condition",
    },
    {
      text: "AND",
      description: "Only includes rows where both conditions is true",
    },
    {
      text: "ANY",
      description:
        "Returns true if any of the subquery values meet the condition",
    },
    {
      text: "AS",
      description: "Renames a column or table with an alias",
    },
    {
      text: "ASC",
      description: "Sorts the result set in ascending order",
    },
    {
      text: "BACKUP_DATABASE",
      description: "Creates a back up of an existing database",
    },
    {
      text: "BETWEEN",
      description: "Selects values within a given range",
    },
    {
      text: "CASE",
      description: "Creates different outputs based on conditions",
    },
    {
      text: "CHECK",
      description:
        "A constraint that limits the value that can be placed in a column",
    },
    {
      text: "COLUMN",
      description:
        "Changes the data type of a column or deletes a column in a table",
    },
    {
      text: "CONSTRAINT",
      description: "Adds or deletes a constraint",
    },
    {
      text: "CREATE",
      description:
        "Creates a database, index, view, table, or procedure",
    },
    {
      text: "CREATE_DATABASE",
      description: "Creates a new SQL database",
    },
    {
      text: "CREATE_INDEX",
      description:
        "Creates an index on a table (allows duplicate values)",
    },
    {
      text: "CREATE_OR",
      description: "REPLACE VIEW\tUpdates a view",
    },
    {
      text: "CREATE_TABLE",
      description: "Creates a new table in the database",
    },
    {
      text: "CREATE_PROCEDURE",
      description: "Creates a stored procedure",
    },
    {
      text: "CREATE_UNIQUE",
      description:
        "INDEX\tCreates a unique index on a table (no duplicate values)",
    },
    {
      text: "CREATE_VIEW",
      description:
        "Creates a view based on the result set of a SELECT statement",
    },
    {
      text: "DATABASE",
      description: "Creates or deletes an SQL database",
    },
    {
      text: "DEFAULT",
      description:
        "A constraint that provides a default value for a column",
    },
    {
      text: "DELETE",
      description: "Deletes rows from a table",
    },
    {
      text: "DESC",
      description: "Sorts the result set in descending order",
    },
    {
      text: "DISTINCT",
      description: "Selects only distinct (different) values",
    },
    {
      text: "DROP",
      description:
        "Deletes a column, constraint, database, index, table, or view",
    },
    {
      text: "DROP_COLUMN",
      description: "Deletes a column in a table",
    },
    {
      text: "DROP_CONSTRAINT",
      description:
        "Deletes a UNIQUE, PRIMARY KEY, FOREIGN KEY, or CHECK constraint",
    },
    {
      text: "DROP_DATABASE",
      description: "Deletes an existing SQL database",
    },
    {
      text: "DROP_DEFAULT",
      description: "Deletes a DEFAULT constraint",
    },
    {
      text: "DROP_INDEX",
      description: "Deletes an index in a table",
    },
    {
      text: "DROP_TABLE",
      description: "Deletes an existing table in the database",
    },
    {
      text: "DROP_VIEW",
      description: "Deletes a view",
    },
    {
      text: "EXEC",
      description: "Executes a stored procedure",
    },
    {
      text: "EXISTS",
      description:
        "Tests for the existence of any record in a subquery",
    },
    {
      text: "FOREIGN",
      description:
        "KEY\tA constraint that is a key used to link two tables together",
    },
    {
      text: "FROM",
      description:
        "Specifies which table to select or delete data from",
    },
    {
      text: "FULL_OUTER_JOIN",
      description:
        "Returns all rows when there is a match in either left table or right table",
    },
    {
      text: "GROUP_BY",
      description:
        "Groups the result set (used with aggregate functions: COUNT, MAX, MIN, SUM, AVG)",
    },
    {
      text: "HAVING",
      description: "Used instead of WHERE with aggregate functions",
    },
    {
      text: "IN",
      description:
        "Allows you to specify multiple values in a WHERE clause",
    },
    {
      text: "INDEX",
      description: "Creates or deletes an index in a table",
    },
    {
      text: "INNER_JOIN",
      description:
        "Returns rows that have matching values in both tables",
    },
    {
      text: "INSERT_INTO",
      description: "Inserts new rows in a table",
    },
    {
      text: "INSERT_INTO",
      description:
        "SELECT\tCopies data from one table into another table",
    },
    {
      text: "IS_NULL",
      description: "Tests for empty values",
    },
    {
      text: "IS_NOT",
      description: "NULL\tTests for non-empty values",
    },
    {
      text: "JOIN",
      description: "Joins tables",
    },
    {
      text: "LEFT_JOIN",
      description:
        "Returns all rows from the left table, and the matching rows from the right table",
    },
    {
      text: "LIKE",
      description: "Searches for a specified pattern in a column",
    },
    {
      text: "LIMIT",
      description:
        "Specifies the number of records to return in the result set",
    },
    {
      text: "NOT",
      description: "Only includes rows where a condition is not true",
    },
    {
      text: "NOT_NULL",
      description:
        "A constraint that enforces a column to not accept NULL values",
    },
    {
      text: "OR",
      description: "Includes rows where either condition is true",
    },
    {
      text: "ORDER_BY",
      description:
        "Sorts the result set in ascending or descending order",
    },
    {
      text: "OUTER_JOIN",
      description:
        "Returns all rows when there is a match in either left table or right table",
    },
    {
      text: "PRIMARY_KEY",
      description:
        "A constraint that uniquely identifies each record in a database table",
    },
    {
      text: "PROCEDURE",
      description: "A stored procedure",
    },
    {
      text: "RIGHT_JOIN",
      description:
        "Returns all rows from the right table, and the matching rows from the left table",
    },
    {
      text: "ROWNUM",
      description:
        "Specifies the number of records to return in the result set",
    },
    {
      text: "SELECT",
      description: "Selects data from a database",
    },
    {
      text: "SELECT_DISTINCT",
      description: "Selects only distinct (different) values",
    },
    {
      text: "SELECT_INTO",
      description: "Copies data from one table into a new table",
    },
    {
      text: "SELECT_TOP",
      description:
        "Specifies the number of records to return in the result set",
    },
    {
      text: "SET",
      description:
        "Specifies which columns and values that should be updated in a table",
    },
    {
      text: "TABLE",
      description:
        "Creates a table, or adds, deletes, or modifies columns in a table, or deletes a table or data inside a table",
    },
    {
      text: "TOP",
      description:
        "Specifies the number of records to return in the result set",
    },
    {
      text: "TRUNCATE_TABLE",
      description:
        "Deletes the data inside a table, but not the table itself",
    },
    {
      text: "UNION",
      description:
        "Combines the result set of two or more SELECT statements (only distinct values)",
    },
    {
      text: "UNION_ALL",
      description:
        "Combines the result set of two or more SELECT statements (allows duplicate values)",
    },
    {
      text: "UNIQUE",
      description:
        "A constraint that ensures that all values in a column are unique",
    },
    {
      text: "UPDATE",
      description: "Updates existing rows in a table",
    },
    {
      text: "VALUES",
      description: "Specifies the values of an INSERT INTO statement",
    },
    {
      text: "VIEW",
      description: "Creates, updates, or deletes a view",
    },
    {
      text: "WHERE",
      description:
        "Filters a result set to include only records that fulfill a specified condition",
    },
  ],
}
