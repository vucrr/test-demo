#!/bin/bash
#yarn

level=$1

allowsLevel=("dev" "test" "stage" "beta" "prod")

status=false
for val in "${allowsLevel[@]}"; do
    if [[ "$val" == "$level" ]]
        then
        status=true
        break
    fi
done

if [[ "$status" == "false" ]]; then
    echo "环境参数错误仅仅支持 dev test beta prod"
    exit 1
fi

workspace=$2
suffix=$3
statusSuffix=true

if [[ "$level" == "test" ]]; then
    statusSuffix=false
    allowsSuffix=("1" "2" "3" "4" "5" "6" "7" "8" "9" "10" "11" "12" "13" "14" "15" "16" "17" "18" "19" "20" "21" "22" "23" "24" "25" "26" "27" "28" "29" "30" "31" "32" "33" "34" "35" "36" "99")
    export TEST=$suffix
fi

if [[ "$level" == "stage" ]]; then
    statusSuffix=false
    allowsSuffix=("1" "2" "3" "4" "5")
    export TEST=$suffix
fi


for val in "${allowsSuffix[@]}"; do
    if [[ "$val" == "$suffix" ]]
        then
        statusSuffix=true
        break
    fi
done

if [[ "$statusSuffix" == "false" ]]; then
    allowsText=""
    for val in "${allowsSuffix[@]}"; do
        allowsText="$allowsText $val"
    done
    echo "${level}环境的suffix参数错误仅仅支持:$allowsText"
    exit 1
fi

export PATH=$PATH

echo $PATH

cmds=("cd ${workspace}" "yarn" "yarn run build:${level}")

for cmd in "${cmds[@]}"; do
    echo $cmd
    $cmd
    if [[ $? != 0 ]]; then
        echo "$cmd 执行失败"
        exit 1
    fi
done
