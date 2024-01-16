#!/bin/bash

UNAMEOUT="$(uname -s)"

main=$1
secondary=$2
helper=$3

function runContainer() {
    # Running container script

    ARGS=""
    if [ "$secondary" == "-d" ] || [ "$helper" == "-d" ]; then
        ARGS="${ARGS}-d"

    elif [ "$secondary" == "--build" ] || [ "$helper" == "--build" ]; then
        ARGS="${ARGS}--build"

    else
        ARGS="${ARGS}--remove-orphans"
    fi

    echo "${ARGS[@]}"
    docker-compose up "${ARGS[@]}"

}

function closeContainer() {
    #Closing down the container

    docker-compose down
}

function runMigration() {
    # Running migration script

    docker-compose exec -it app npx prisma migrate dev --name init
    docker-compose exec -it app npx prisma generate
}

case $main in
    up)
        runContainer
        ;;

    down)
        closeContainer
        ;;
    
    migrate)
        runMigration
        ;;
    seed)
        docker-compose exec -it app npm run seed
        ;;
    esac