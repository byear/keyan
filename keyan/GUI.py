# encoding: utf-8
#先用GUI做科研管理系统雏形，之后在移植到flask框架
from tkinter import *
import random
from tkinter import messagebox
from PIL import Image,ImageTk
import tkinter.font as tkFont

#subroot窗体的一些设置
subroot=Tk()
subroot.title("苏州大学文正学院科研管理系统雏形")
subroot.geometry("+500+150")
subroot.geometry("600x400")
subroot.resizable(0, 0)

#画板
# canvas = Canvas(subroot, bg = 'black')
# canvas.pack(expand = YES, fill = BOTH)
# image = ImageTk.PhotoImage(file = r"C:\Users\lenovo\Desktop\pynew\bg.jpg")
# canvas.create_image(3, 3, image = image, anchor = NW)#设置背景图片



#标签、输入框和按钮
lab1 = Label(subroot,text = '用户名',font=('微软雅黑',13))
lab1.place(relx = 0.32,rely = 0.3,anchor = CENTER)
ent1 = Entry(subroot)
ent1.place(relx = 0.5,rely = 0.3,anchor = CENTER)

lab2 = Label(subroot,text = '密码',font=('微软雅黑',13))
lab2.place(relx = 0.33,rely = 0.5,anchor = CENTER)
ent2 = Entry(subroot)
ent2.place(relx = 0.5,rely = 0.5,anchor = CENTER)
ent2['show']='*'

lab3= Label(subroot,text = '(只允许为英文和数字)',font=('微软雅黑',9))
lab3.place(relx = 0.76,rely = 0.3,anchor = CENTER)

#一些控制函数
# def __init__(self, parent):
#     frame = subroot.Frame(parent)
#     frame.pack()
#     btn = subroot.Button(frame,text="22", command=self.button)
#     btn.pack(side=subroot.LEFT)
def cmd():
    a = ent1.get()
    b = ent2.get()
    if (a,b)==('byear','123'):
        messagebox.showinfo("恭喜", "登录成功！")
        subroot.destroy()
        import pachong


    elif (a, b) == ('', ''):
        messagebox.showinfo("出错了！！", "请输入用户名或密码！")
    elif not re.match('^[0-9a-z]+$', a):
        messagebox.showinfo("出错了！！", "有非法字符！")
    else:
        messagebox.showinfo("出错了！！", "您输入的密码不正确！")


#按钮
button1 = Button(subroot, text="登录", font=('微软雅黑',12),command=cmd, bg='pink',fg='MidnightBlue',activeforeground='Tomato')
button1.place(relx=0.35, rely=0.7, anchor="w")
button2 = Button(subroot, text="注册", font=('微软雅黑',12),command=0, bg='pink',fg='MidnightBlue',activeforeground='Tomato')
button2.place(relx=0.5, rely=0.7, anchor="w")

# 进入消息循环（必需组件）
subroot.mainloop()