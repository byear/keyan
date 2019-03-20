from flask import  Flask,render_template,redirect,request,session,flash
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import Column, String,Integer
from lxml import html
import requests
import csv
app=Flask(__name__)
app.secret_key='123'

#配置数据库
app.config['SQLALCHEMY_DATABASE_URI']='mysql+pymysql://root:19970719@127.0.0.1/keyan'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS']=False
db=SQLAlchemy(app)

class User(db.Model):
    __tablename__='users'
    id = Column(String(20), primary_key=True)#注意这里py2和py3的区别，py2再用Column的时候需要用db.Column而py3则不需要
    password=Column(String(20), unique=True)
#开始页面
@app.route('/index/',methods=['POST','GET'])
def login():
     if request.method=='GET':
         return render_template('index.html')
     else:
         userid = request.form.get('userid')
         password = request.form.get('password')
         usr=User.query.filter(User.id==userid,User.password==password).first()
         if usr:
             session['userid']=userid
             session.permanet=True
             return redirect('/zhu')
         elif not all([userid, password]):
            return render_template('index.html', error='用户名或密码不能为空')
         else:
             return render_template('index.html', error='用户名或密码错误')

#主页面
@app.route('/zhu',methods=['POST','GET'])
def zhu():
    return render_template('zhu.html')

#爬虫页面
@app.route('/main/',methods=['POST','GET'])
def pachong():
    if request.method == 'GET':
        return render_template('main.html')
    else:
        guanjianzi=request.form.get('guanjianzi')

        KeyWords = guanjianzi  # 搜索关键词
        MaxPage = 1  # 爬取的页面数目，即确定爬取第几页
        #URL = 'https://www.cn-ki.net/'
        URL = 'https://http://cnki.cn-ki.net//'
        # Num_Paper = 0
        data = {'keyword': KeyWords}

        def get_html(url, para_data):  # 获取网页源码
            content = requests.get(url, params=para_data)
            return content

        content = get_html(URL + 'search', data)
        page_url = content.url
        page_ii = 0

        while page_ii < MaxPage:
            content = get_html(page_url, '')
            tree = html.fromstring(content.text)
            e1 = tree.xpath('//div[@class="mdui-col-xs-12 mdui-col-md-9 mdui-typo"]')
            for ei in e1:
                title = '标题:' + ''.join(ei.xpath('h3/a/text()'))
                author = '   作者:' + ''.join(ei.xpath('div[1]/span[1]/text()'))
                href = ''.join(ei.xpath('h3/a/@href'))
                if URL not in href:  # 优化下载地址内容爬取
                    href = URL + href
                href = '   链接: ' + href
                JnName = '   期刊:' + ''.join(ei.xpath('div[1]/span[3]/text()'))

                # Num_Paper += 1 #将这行注释不改变，甚至可以不要
                page_ii += 1  # 将这行注释会一直爬取
                # if page_ii == 16:  # 控制爬取次数
                #     break
                # 写入txt文件操作，我佛了，搞了半天只要把w模式(覆盖)换成a模式(不覆盖)就ok了
                f = open(KeyWords + '.txt', 'a')
                f.write("{}{}{}{}\n".format(title, author, href, JnName))
                f.close()

    #读取txt文件操作，并将其展示到前端
    f = open(KeyWords + '.txt', 'r')
    layout = f.readlines()
    for line in layout:
        # print(line)
        return render_template('show.html', line=line,layout=layout)

#展示页面
@app.route('/show',methods=['POST','GET'])
def show():
    return render_template('show.html')

#想搞个验证码
# import yanzhengma
# from io import BytesIO
# from flask import make_response
# @app.route('/code')
# def get_code():
#     image, str = yanzhengma.validate_picture()
#     # 将验证码图片以二进制形式写入在内存中，防止将图片都放在文件夹中，占用大量磁盘
#     buf = BytesIO()
#     image.save(buf, 'jpeg')
#     buf_str = buf.getvalue()
#     # 把二进制作为response发回前端，并设置首部字段
#     response = make_response(buf_str)
#     response.headers['Content-Type'] = 'image/gif'
#     # 将验证码字符串储存在session中
#     session['image'] = str
#     return response

#登录以及注销函数
# @app.context_processor
# def my_context_processor():
#     user = session.get('username')
#     if user:
#         return {'login_user': user}
#     return {}
# @app.route('/logout/')
# def logout():
#     session.clear()
#     return render_template('index.html')
#主函数
if __name__ =='__main__':
    app.run(debug=True)








