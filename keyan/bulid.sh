#! /bin/bash
#linux 部署系统
sudo apt install python  > /dev/null 2>&1
sudo apt install python3  > /dev/null 2>&1
pip install flask  > /dev/null 2>&1
pip install flask  SQLAlchemy  > /dev/null 2>&1
pip install flask  flask_SQLAlchemy  > /dev/null 2>&1
pip install flask  lxml  > /dev/null 2>&1
pip install flask  html  > /dev/null 2>&1
echo "应用马上执行"
python app.py 