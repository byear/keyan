# !usr/bin/env python3
#-*- coding: utf-8 -*-
from tkinter import *
import webbrowser
import urllib
from bs4 import BeautifulSoup
import re
import sys
import pachongnew
import urllib.request
from urllib.request import urlopen
import requests
import mysql.connector
from lxml import html



root=Tk()
root.title("论文爬虫功能雏形")
root.geometry("+500+150")
root.geometry("400x300")
root.resizable(0, 0)

lab = Label(root,text = '请输入要搜索的关键词:',font=('微软雅黑',13))
lab.place(relx = 0.5,rely = 0.3,anchor = CENTER)
ent = Entry(root)
ent.place(relx = 0.5,rely = 0.5,anchor = CENTER)


#控制函数
def qingkong():
    ent.delete(0, END)

def pachong():
    
    KeyWords = ent.get()  # 搜索关键词
    MaxPage = 1  # 爬取的页面数目
    URL = 'https://www.cn-ki.net/'

    Num_Paper = 0

    data = {
        'keyword': KeyWords,
        'db': 'SCDB'
    }
    def get_html(url, para_data):
        content = requests.get(url, params=para_data)
        return content

    # 链接mysql数据库
    # conn = mysql.connector.connect(user='root', password='root', database='db_mycnki')
    # cur = conn.cursor()

    content = get_html(URL + 'search', data)
    page_url = content.url

    page_ii = 0
    while page_ii < MaxPage:
        content = get_html(page_url, '')
        tree = html.fromstring(content.text)

        e1 = tree.xpath('//div[@class="mdui-col-xs-12 mdui-col-md-9 mdui-typo"]')
        for ei in e1:
            e2_title = ei.xpath('h3/a/text()')
            title = ''.join(e2_title)

            e2_author = ei.xpath('div[1]/span[1]/text()')
            author = ''.join(e2_author)
            e2_JnName = ei.xpath('div[1]/span[3]/text()')
            JnName = ''.join(e2_JnName)
            e2_JnVol = ei.xpath('div[1]/span[4]/text()')
            JnVol = ''.join(e2_JnVol)
            e2_JnType = ei.xpath('div[1]/span[5]/text()')
            JnType = ''.join(e2_JnType)

            e2_href = ei.xpath('h3/a/@href')
            href = ''.join(e2_href)
            if URL not in href:
                href = URL + href

            Jn_content = get_html(href, '')
            Jn_tree = html.fromstring(Jn_content.text)

            # 这是之前的代码
            # e2_abstract = Jn_tree.xpath('//div[@class="mdui-col-md-11 mdui-col-xs-9 mdui-text-color-black-text"]/p/text()')
            # 修改后的代码
            e2_abstract = Jn_tree.xpath('//div[@class="mdui-col-xs-12 mdui-text-color-black-text mdui-typo"]/p/text()')

            abstract = (''.join(e2_abstract)).strip()

            # print('********************' + href)

            print('标题: >>>>>>>>>>> %s' % title)
            print('下载地址:>>>>>>>>>>>  %s' % href)
            print('作者: >>>>>>>>>>> %s' % author)
            print('期刊名称: ---- %s ---- %s ---- %s' % (JnName, JnVol, JnType))
            print('--------------------------我是分割线------------------------')
            print('%s' % abstract)
            datas = [title, author, href,abstract]
            fo = open('1.txt', 'w')
            for ip in datas:
                fo.write(ip)
                fo.write('\n')
            fo.close()

            # 保存数据记录
            # cur.execute('insert into tb_mycnki (id, title, author, JnName, JnVol, JnType, Abstract, href) VALUES (%s, %s, %s, %s, %s, %s, %s, %s)',
            #             [Num_Paper, title, author, JnName, JnVol, JnType, abstract, href])



            Num_Paper += 1#这段代码并不是单纯的做循环，还有限制爬取次数的作用，限制次数为20次并将其放在一页当中。
        page_ii += 1
        nextpg = tree.xpath('//div[@class="mdui-col-xs-9 TitleLeftCell mdui-valign"]/a[last()]')
        if nextpg.__len__() == 0:
            break
        nextpg_text = nextpg[0].text
        if nextpg_text == '下一页':
            page_url = nextpg[0].attrib['href']
        else:
            break
        if URL not in page_url:
            page_url = URL + page_url

    print('****************************************************************************')
    print('>>>>>>>>>>>>>>>>  数据导出结束，共导出 %d 篇文献！<<<<<<<<<<<<<<<<<<<<<<<<<<' % Num_Paper)

    
    # webbrowser.open('http://search.cnki.com.cn/search.aspx?q='+ent.get())
    # page = urllib.request.urlopen('http://search.cnki.com.cn/search.aspx?q='+ent.get())  # 打开网页
    # htmlcode = page.read().decode("utf-8") # 读取页面源码
    # pp1 = 'http://cdmd.cnki.com.cn/Article/.*?.htm'
    # pp2='<span class="descriptor">Title:</span>(.*?)</div>'
    # ppp1 = re.compile(pp1)
    # ppp2=re.compile(pp2)
    # article=re.findall(ppp1,htmlcode)
    # title=re.findall(ppp2,htmlcode)
    # print(title)  # 在控制台输出


button = Button(root, text="确定", font=('微软雅黑',12),command=pachong)
button.place(relx=0.3, rely=0.7, anchor="w")
button3 = Button(root, text="清空", font=('微软雅黑',12),command=qingkong)
button3.place(relx=0.5, rely=0.7, anchor="w")


root.mainloop()
