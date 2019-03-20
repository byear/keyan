# CNKI爬虫 -- 版本4.0 可实现单页面的搜索，显示题目、作者、期刊、摘要，可翻页；修复摘要显示不全的问题；可将数据存储进MySQL数据库
#
# !usr/bin/env python3
# -*- coding: utf-8 -*-


import requests
from lxml import html
import xlwt
import pandas as pd
def pachong1():
    KeyWords = '凌兴宏'       # 搜索关键词
    MaxPage = 1                 # 爬取的页面数目，即确定爬取第几页
    URL = 'https://www.cn-ki.net/'

    Num_Paper = 0
    data = {
        'keyword': KeyWords,
        'db': 'SCDB'
    }
    def get_html(url, para_data):
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
            e2_title = ei.xpath('h3/a/text()')
            title = ''.join(e2_title)
            e2_author = ei.xpath('div[1]/span[1]/text()')
            author = ''.join(e2_author)
            author=author.replace(',', '')
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
            # Jn_content = get_html(href, '')
            # Jn_tree = html.fromstring(Jn_content.text)
            # e2_abstract = Jn_tree.xpath('//div[@class="mdui-col-xs-12 mdui-text-color-black-text mdui-typo"]/p/text()')

            # print('标题: %s' % title)
            # print('链接: %s' % href)
            # print('作者: %s' % author)
            # print('期刊: %s - %s - %s' % (JnName, JnVol, JnType))
            # print('--------------------------我是分割线------------------------')
            title = '标题: ' + title
            href = '链接: ' + href
            author = '作者: ' + author
            JnName = '期刊: ' + JnName
            global l
            l=[title,href,author,JnName]


            Num_Paper += 1 #将这行注释不改变，甚至可以不要
            page_ii += 1 #将这行注释会一直爬取
            if page_ii==5: #控制爬取次数
                l.append(l)
                l=str(l)
                f = open('1.txt', 'w')
                f.write(l)
                print(l)
                break
            print('l',l)
pachong1()
#excel的操作
# wb=xlwt.Workbook(encoding='utf-8')
# ws=wb.add_sheet('pachong')


        #爬取下一页
        # nextpg = tree.xpath('//div[@class="mdui-col-xs-9 TitleLeftCell mdui-valign"]/a[last()]')
        # if nextpg.__len__() == 0:
        #     break
        # nextpg_text = nextpg[0].text
        # if nextpg_text == '下一页':
        #     page_url = nextpg[0].attrib['href']
        # else:
        #     break
        #
        # if URL not in page_url:
        #     page_url = URL + page_url

    # print('****************************************************************************')
    # print('>>>>>>>>>>>>>>>>  数据导出结束，共导出 %d 篇文献！<<<<<<<<<<<<<<<<<<<<<<<<<<' % Num_Paper)


# if __name__ == '__main__':
#     pachong1()
#     name=['标题','下载地址','作者','期刊']
#     test=pd.DataFrame(columns=name,data=pachong1().datas)
#     test.to_csv(r'C:/Users/lenovo/Desktop/苏大文正科研管理系统/pachong.csv')
    # def data_write(file_path, datas):
    #     f = xlwt.Workbook()
    #     sheet1 = f.add_sheet(u'sheet1', cell_overwrite_ok=True)  # 创建sheet
    #
    #     # 将数据写入第 i 行，第 j 列
    #     i = 0
    #     for data in datas:
    #         for j in range(len(data)):
    #             sheet1.write(i, j, data[j])
    #         i = i + 1
    #     f.save(file_path)
    # data_write()

