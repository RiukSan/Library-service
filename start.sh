usage() {
    cat <<EOF
Usage: $0 [options]

Arguments:

  -h, --help
    Calls help.

  -p <val>, --port <val>, --port=<val>
    Port value.

  -dbt <val>, --db_type <val>, --db_type=<val>
    Describes database type. Possible values: mongo, filesystem.

  -libf <val>, --lib_folder <val>, --lib_folder=<val>
    Path to folder with books in filesystem.

  -usrf <val>, --user_folder <val>, --user_folder=<val>
    Path to user folder in filesystem.

  -lib <val>, --lib_path <val>, --lib_path=<val>
    Path to folder with library objects on filesystem.
EOF
}

PORT=8080
DB_TYPE=mongo
LIBRARY_FOLDER=./Libraries_folder
USER_FOLDER=./Users
LIB=./Libraries 

while [ "$#" -gt 0 ]; do
    arg=$1
    case $1 in
        # convert "--opt=the value" to --opt "the value".
        # the quotes around the equals sign is to work around a
        # bug in emacs' syntax parsing
        --*'='*) shift; set -- "${arg%%=*}" "${arg#*=}" "$@"; continue;;
        -p|--port) shift; PORT=$1;;
        -dbt|--db_type) shift; DB_TYPE=$1;;
        -libf|--lib_folder) shift; LIBRARY_FOLDER=$1;;
        -usrf|--user_folder) shift; USER_FOLDER=$1;;
        -lib|--lib_path) shift; LIB=$1;;
        -h|--help) usage; exit 0;;
        --) shift; break;;
        -*) usage_fatal "unknown option: '$1'";;
        *) break;;
    esac
    shift || usage_fatal "option '${arg}' requires a value"
done
node index.js --port=$PORT --db_type=$DB_TYPE --lib_folder=$LIBRARY_FOLDER --usr_folder=$USER_FOLDER --lib=$LIB
