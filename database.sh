#!/bin/bash
PS3="Please Enter Your Choice <3 "
directory="./directory"
mkdir -p $directory
curDatabase=""
export nameDatabase=""

function menu() {
    while true; do
        choice=$(zenity --list \
            --title="Main Menu" \
            --text="Please select an option:" \
            --column="Choice" \
            "Create Database" \
            "List Databases" \
            "Connect To Database" \
            "Drop Database" \
            "Exit")
  if [[ -z $choice ]]; then
            zenity --error --text="No option selected. Please select an option or click Cancel to exit."
            continue
        fi

        case $choice in
            "Create Database") CreateDatabase ;;
            "List Databases") ListDatabase ;;
            "Connect To Database") ConnectDatabase ;;
            "Drop Database") DropDatabase ;;
            "Exit") exit ;;
            *) zenity --error --text="Unknown choice. Please select a valid option." ;;
        esac
    done
}


function menu2() {
    while true; do
        select ch in "Create Table" "List Tables" "Drop Table" "Insert Into Table" "Select From Table" "Delete From Table" "Update Table" "Return To Main Menu" "Exit"; do
            case $REPLY in
            1) createTable ;;
            2) ListTable ;;
            3) DropTable ;;
            4) InsertTable ;;
            5) selectTable ;;
            6) DeleteTable ;;
            7) UpdateTable ;;
            8) menu ;;
            9) exit ;;
            *)
                echo $REPLY is an unknown choice, Please Enter Valid Choice!!
                ;;
            esac
            break
        done
    done
}

function CreateDatabase() {
    nameDatabase=$(zenity --entry --title="Create Database" --text="Enter the name of the database:")
    nameDatabase=$(echo "$nameDatabase" | tr " " "_")
    path="$directory/$nameDatabase"
  if [[ -z $nameDatabase ]]; then
            zenity --error --text="the Name is empty."
            
       

    elif [[ "$nameDatabase" =~ ^[A-Za-z][A-Za-z0-9]*$ ]]; then
        if [[ ! -d $path ]]; then
            mkdir "$path"
            zenity --info --text="The Database '$nameDatabase' was created successfully."
        else
            zenity --error --text="The Database already exists."
        fi
        curDatabase="$path"
    else
        zenity --error --text="Invalid Database name."
    fi
}

function ListDatabase() {
    databases=$(ls "$directory")
    zenity --info --text="Databases:\n$databases"
}

function ConnectDatabase() {
    nameDatabase=$(zenity --entry --title="Connect To Database" --text="Enter the name of the database:")
    path="$directory/$nameDatabase"
    if [[ -d $path ]]; then
        curDatabase="$path"
        zenity --info --text="Connected to database '$nameDatabase'."
        menu2
    else
        zenity --error --text="Database not found."
    fi
}

function DropDatabase() {
    nameDatabase=$(zenity --entry --title="Drop Database" --text="Enter the name of the database:")
    path="$directory/$nameDatabase"
    if [[ -d $path ]]; then
        rm -r "$path"
        zenity --info --text="Database '$nameDatabase' deleted successfully."
        curDatabase=""
    else
        zenity --error --text="Database not found."
    fi
}

function createTable() {
    read -p "Enter The Name of Table: " nameTable
    # Replace spaces with underscores
    nameTable=$(echo "$nameTable" | tr " " "_")
    curTable=$curDatabase/$nameTable

    if [[ "$nameTable" =~ ^[A-Za-z][A-Za-z0-9_]*$ ]]; then
        read -p "Enter The Number of Columns: " num_column

        # Check if the number of columns is valid
        if [[ "$num_column" -lt 0 ]]; then
            echo "Error: The number of columns cannot be negative."
            return
        fi

        if [[ "$num_column" -eq 0 ]]; then
            echo "Error: The table must have at least one column."
            return
        fi

        if [[ ! "$num_column" =~ ^[0-9]+$ ]]; then
            echo "Error: Please enter a valid positive integer for the number of columns."
            return
        fi

        if [[ ! -d $curTable ]]; then
            mkdir $curTable
            touch $curTable/metadata
            touch $curTable/data
            for ((clm = 1; clm <= num_column; clm++)); do
                read -p "Enter The Name of Column $clm: " name_clm
               
                name_clm=$(echo "$name_clm" | tr " " "_")
                if [[ "$name_clm" =~ ^[A-Za-z][A-Za-z0-9_]*$ ]]; then
                    while true; do
                        read -p "Enter Your Datatype (int/boolean/varchar): " ch
                        case $ch in
                        "int" | "boolean" | "varchar" )
                            echo "$name_clm|$ch " >>"$curTable/metadata"
                            break
                            ;;
                        *)
                            echo "Invalid datatype. Please enter a valid datatype."
                            ;;
                        esac
                    done
                else
                    echo "Invalid Name for Column."
                    return
                fi
            done
            echo "The Table $nameTable is Created Successfully :)"
        else
            echo "The Table is Already Exist."
        fi
    else
        echo "Invalid Table Name."
    fi
}






function CreateTable() {
    read -p "Enter The Name of Table: " nameTable
    nameTable=$(echo "$nameTable" | tr " " "_")
    curTable=$curDatabase/$nameTable

    if [[ "$nameTable" =~ ^[A-Za-z][A-Za-z0-9]*$ ]]; then
        if [[ ! -d $curTable ]]; then
            mkdir $curTable
            touch $curTable/metadata
            touch $curTable/data
            read -p "Enter The Number of Columns: " num_column
            for ((clm = 1; clm <= num_column; clm++)); do
                read -p "Enter The Name of Column $clm: " name_clm
                if [[ "$name_clm" =~ ^[A-Za-z][A-Za-z0-9]*$ ]]; then
                    while true; do
                        read -p "Enter Your Datatype (int/boolean/varchar): " ch
                        case $ch in
                        "int" | "boolean" | "varchar" )
                            echo "$name_clm|$ch " >>"$curTable/metadata"
                            break
                            ;;
                        *)
                            echo "Invalid datatype. Please enter a valid datatype."
                            ;;
                        esac
                    done
                else
                    echo "Invalid Name for Column."
                    return
                fi
            done
            echo "The Table $nameTable is Created Successfully :)"
        else
            echo "The Table is Already Exist."
        fi
    else
        echo "Invalid Table Name."
    fi
}

function ListTable() {
    for dir in "$curDatabase"/*; do
        echo $(basename "$dir")
    done
}
function InsertTable() {
    if [ -z "$curDatabase" ]; then
        echo "No database selected. Please connect to a database first."
        return
    fi

    echo "Tables in the current database:"
    ListTable

    echo -n "Enter the table name to insert into: "
    read nameTable

    curTable="$curDatabase/$nameTable"

    if [ -d "$curTable" ]; then
        # Read metadata from the metadata file
        metadata=$(<"$curTable/metadata")
        IFS=$'\n' read -rd '' -a metadataArray <<<"$metadata"

        declare -a values=()
        for meta in "${metadataArray[@]}"; do
            IFS='|' read -ra metaArray <<<"$meta"
            column="${metaArray[0]}"
            columnType="${metaArray[1]}"  
            while true; do
                read -p "Enter value for $column ($columnType): " value
                
                # Validate input based on column type
                case $columnType in
                    "int ")
                        if [[ ! $value =~ ^[0-9]+$ ]]; then
                            echo "Invalid input for $column. Please enter a valid integer."
                            continue
                        fi
                        ;;
                    "varchar "|"char ")
                        if [[ -z "$value" ]]; then
                            echo "Invalid input for $column. Please enter a non-empty string."
                            continue
                        fi
                        ;;
                    "boolean ")
                        if [[ $value != "0" && $value != "1"  ]]; then
                            echo "Invalid input for $column. Please Enter 0 or 1. "
                            continue
                        fi
                        ;;
                    *)
                        echo "Invalid input for $column. Please check metadata for $column."
                        continue
                        ;;
                esac

          # Check for uniqueness of primary key (assuming it's column 1)
if grep -q "^$value|" "$curTable/data"; then
    echo "Error: Value in column 1 must be unique. This value is already taken."
    continue
fi


                values+=("$value")
                break
            done
        done

        # Combine values into a '|' separated string
        valuesString=$(
            IFS='|'
            echo "${values[*]}"
        )

        # Append values to the data file
        echo "$valuesString" >>"$curTable/data"

        echo "Values inserted successfully into table '$nameTable'."
    else
        echo "Table '$nameTable' not found in the current database."
    fi
}

function DropTable() {
    read -p "Enter The Table Name you need to drop: " nameTable
    path=$curDatabase/$nameTable
    if [[ -d $path ]]; then
        rm -r $path
        echo "Table $nameTable Deleted Successfully."
    else
        echo "Table Name is not Found :("
    fi
}


function selectTable {
    read -p "Enter the table name to select from: " nameTable
    curTable="$curDatabase/$nameTable"

    if [ -d "$curTable" ]; then
        metadata=$(<"$curTable/metadata")
        IFS=$'\n' read -rd '' -a metadataArray <<<"$metadata"

        # Display columns for user selection
        echo "Columns in table '$nameTable':"
        for meta in "${metadataArray[@]}"; do
            IFS='|' read -ra metaArray <<<"$meta"
            echo "- ${metaArray[0]}"
        done

        read -p "Enter * if you need to select all columns, or enter a column number: " value

        if [[ "$value" == '*' ]]; then
            cat "$curTable/data"
        elif [[ "$value" =~ ^[0-9]+$ ]]; then
            awk -F'|' -v col="$value" '{ if (col <= NF) printf "%s ", $col; print "" }' "$curTable/data"
        else
            echo "Invalid Column Number!"
        fi
    else
        echo "Table '$nameTable' not found in the current database."
    fi
}

function DeleteTable() {
    if [ -z "$curDatabase" ]; then
        echo "No database selected. Please connect to a database first."
        return
    fi

    echo "Tables in the current database:"
    ListTable

    echo -n "Enter the table name to delete from: "
    read nameTable

    curTable="$curDatabase/$nameTable"

    if [ -d "$curTable" ]; then
        echo "Select deletion option:"
        select option in "Delete Specific Record" "Clear All Data" "Cancel"; do
            case $REPLY in
                1)
                    read -p "Enter the record ID to delete: " recordID
                    sed -i "${recordID}d" "$curTable/data"
                    echo "Record $recordID deleted successfully from table '$nameTable'."
                    ;;
                2)
                    > "$curTable/data"
                    echo "All data cleared from table '$nameTable'."
                    ;;
                3)
                    echo "Operation canceled."
                    ;;
                *)
                    echo "Invalid option. Please select a valid option."
                    continue
                    ;;
            esac
            break
        done
    else
        echo "Table '$nameTable' not found in the current database."
    fi
} 

function UpdateTable() {
    if [ -z "$curDatabase" ]; then
        echo "No database selected. Please connect to a database first."
        return
    fi

    echo "Tables in the current database:"
    ListTable

    echo -n "Enter the table name to update: "
    read nameTable

    curTable="$curDatabase/$nameTable"

    if [ -d "$curTable" ]; then
        # Read metadata from the metadata file
        metadata=$(<"$curTable/metadata")
        IFS=$'\n' read -rd '' -a metadataArray <<<"$metadata"

        echo "Columns in table '$nameTable':"
        for meta in "${metadataArray[@]}"; do
            IFS='|' read -ra metaArray <<<"$meta"
            echo "- ${metaArray[0]}"
        done

        read -p "Enter the record ID to update: " recordID

        # Validate the record ID
        if [[ ! $recordID =~ ^[0-9]+$ ]]; then
            echo "Invalid record ID. Please enter a valid integer."
            return
        fi

        # Check if the record exists
        if [ "$(sed -n "${recordID}p" "$curTable/data")" ]; then
            declare -a values=()
            declare -a columns=()

            for meta in "${metadataArray[@]}"; do
                IFS='|' read -ra metaArray <<<"$meta"
                column="${metaArray[0]}"
                columnType="${metaArray[1]}"

                columns+=("$column")

                while true; do
                    read -p "Enter new value for $column ($columnType): " newValue

                    # Validate input based on column type
                    case $columnType in
                        "int ")
                            if [[ ! $newValue =~ ^[0-9]+$ ]]; then
                                echo "Invalid input for $column. Please enter a valid integer."
                                continue
                            fi
                            ;;
                        "varchar "|"char ")
                            if [[ -z "$newValue" ]]; then
                                echo "Invalid input for $column. Please enter a non-empty string."
                                continue
                            fi
                            ;;
                        "boolean ")
                            if [[ $newValue != "0" && $newValue != "1" ]]; then
                                echo "Invalid input for $column. Please enter 0 or 1."
                                continue
                            fi
                            ;;
                        *)
                            echo "Invalid input for $column. Please check metadata for $column."
                            continue
                            ;;
                    esac

                    values+=("$newValue")
                    break
                done
            done

            # Combine values into a '|' separated string
            valuesString=$(
                IFS='|'
                echo "${values[*]}"
            )

            # Get the old primary key value
            oldPrimaryKey=$(awk -F'|' -v recordID="$recordID" '{if (NR == recordID) print $1}' "$curTable/data")

            # Update the record in the data file
            sed -i "${recordID}s/.*/$valuesString/" "$curTable/data"

#            sed -i "${recordID}s/^[^|]*/$valuesString/; ${recordID}s/[^|]*|/$valuesString|/" "$curTable/data"

            # Check uniqueness of the new primary key value
            newPrimaryKey=${values[0]}
            if [ "$oldPrimaryKey" != "$newPrimaryKey" ] && grep -qw "$newPrimaryKey" "$curTable/data"; then
                echo "Error: Value in column '${columns[0]}' must be unique. The updated value is already taken."
                # Revert the update
                sed -i "${recordID}s/.*/$oldPrimaryKey|${values[*]:1}/" "$curTable/data"
                return
            fi

            echo "Record $recordID updated successfully in table '$nameTable'."
        else
            echo "Record $recordID not found in table '$nameTable'."
        fi
    else
        echo "Table '$nameTable' not found in the current database."
    fi
}


menu
