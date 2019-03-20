# !usr/bin/env python3
# -*- coding: utf-8 -*-
import requests
from lxml import html

def pc():
    KeyWords = '凌兴宏'       # 搜索关键词
    MaxPage = 1                 # 爬取的页面数目，即确定爬取第几页
    URL = 'https://www.cn-ki.net/'
    # Num_Paper = 0
    data = {'keyword': KeyWords}

    def get_html(url, para_data):#获取网页源码
        content = requests.get(url, params=para_data)
        return content
    content = get_html(URL+'search', data)
    page_url = content.url
    page_ii = 0

    while page_ii < MaxPage:
        content = get_html(page_url, '')
        tree = html.fromstring(content.text)
        e1 = tree.xpath('//div[@class="mdui-col-xs-12 mdui-col-md-9 mdui-typo"]')
        for ei in e1:
            title = '标题:'+''.join(ei.xpath('h3/a/text()'))
            author = '   作者:'+''.join(ei.xpath('div[1]/span[1]/text()'))
            href = ''.join(ei.xpath('h3/a/@href'))
            if URL not in href:#优化下载地址内容爬取
                href = URL + href
            href = '   链接: ' + href
            JnName = '   期刊:'+''.join(ei.xpath('div[1]/span[3]/text()'))

            # Num_Paper += 1 #将这行注释不改变，甚至可以不要
            page_ii += 1 #将这行注释会一直爬取
            if page_ii==15: #控制爬取次数
                break

            #写入txt文件操作，我佛了，搞了半天只要把w模式(覆盖)换成a模式(不覆盖)就ok了
            f=open(KeyWords+'.txt','a')
            f.write("{}{}{}{}\n".format(title,author,href,JnName))
            f.close()
        f = open(KeyWords + '.txt', 'r')
        layout=f.readlines()
        for line in layout:
            print(line)
        # print(layout)
        f.close()

pc()
