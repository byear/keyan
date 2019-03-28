#! /bin/bash
#linux 部署系统
py3=/usr/bin/python3
if [ -e $py3 ]
then
echo "python3存在" >.log 2>&1
else
sudo apt install python3 >.log 2>&1
sudo apt install python3-pip >.log 2>&1
echo "安装安装python3"
fi