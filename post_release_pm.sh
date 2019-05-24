#!/bin/bash
#yarn

level=$1

allowsLevel=("dev" "test" "stage" "beta" "prod")

status=false
for val in "${allowsLevel[@]}"; do
    if [[  "$val" == "$level" ]]
        then
        status=true
        break
    fi
done

if [[ "$status" == "false" ]]; then
    echo "环境参数错误仅仅支持 dev test stage beta prod"
    exit 1
fi

workspace=$2
suffix=$3
statusSuffix=true

if [[ "$level" == "test" ]]; then
    statusSuffix=false
    allowsSuffix=("1" "2" "3" "4" "5" "6" "7" "8" "9" "10" "11" "12" "13" "14" "15" "16" "17" "18" "19" "20" "99")
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

export REACT_APP_API_ENV=$level

cmds=("cd ${workspace}" "pm2 startOrRestart pm2/ecosystem.config.js")

for cmd in "${cmds[@]}"; do
    echo $cmd
    $cmd
    if [[ $? != 0 ]]; then
        echo "$cmd 执行失败"
        exit 1
    fi
done

sleep 5
checkStatus=$(curl -I -m 10 -o /dev/null -s -w %{http_code} https://m.xianghuanji.com/product/category)
if [[ $level == "beta" ]]; then
  checkStatus=$(curl -I -m 10 -o /dev/null -s -w %{http_code} http://m.beta.xianghuanji.com/product/category)
fi
if [[ $level == "test" ]]; then
  checkStatus=$(curl -I -m 10 -o /dev/null -s -w %{http_code} test${suffix}.mm.t.xianghuanji.com/product/category)
fi
if [[ $level == "stage" ]]; then
  checkStatus=$(curl -I -m 10 -o /dev/null -s -w %{http_code} stage${suffix}.m.stage.xianghuanji.com/product/category)
fi

if [[ $checkStatus != 200 ]]; then
    echo $checkStatus
    echo "pm2 自动重启失败，正在强制重启"
    cmds2=("pm2 kill" "pm2 startOrRestart pm2/ecosystem.config.js")
    if [[ $level == "test" ]]; then
        cmds2=("pm2 delete test$suffix" "pm2 startOrRestart pm2/ecosystem.config.js")
    fi
    if [[ $level == "stage" ]]; then
        cmds2=("pm2 delete mobile-stage-$suffix" "pm2 startOrRestart pm2/ecosystem.config.js")
    fi
    for cmd2 in "${cmds2[@]}"; do
    echo $cmd2
    $cmd2
    if [[ $? != 0 ]]; then
        echo "$cmd2 执行失败"
        exit 1
    fi
done
fi
