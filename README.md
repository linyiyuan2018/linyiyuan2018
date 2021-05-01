# v86_linux 基于浏览器的 Linux 教学实验用虚拟机

在学校机房电脑上部署新的软件非常麻烦和困难(电脑有还原卡或还原系统)，但一般都装有Chrome浏览器
，直接在 Chrome 浏览器中运行 Linux 系统就可以非常方便的提供Linux实践环境。

> 之前也有类似在浏览器中运行windows 95的程序[https://github.com/felixrieseberg/windows95](https://github.com/felixrieseberg/windows95)


这个应用使用KOA做为HTTP服务器，在局域网环境
提供其他电脑在浏览器中运行 

项目基于[V86](https://github.com/copy/v86) , 编译出需要的 js 文件，并准备好 Linux 镜像。

使用Electron打包成一个应用程序，直接运行即启动http服务，其他电脑chrome浏览器输入对应地址即可使用，避免繁琐的搭建操作。

#### 下一步计划
* [ ] 集成webssh，实现从浏览器通过ssh访问Linux服务器，提供更丰富的Linux实践环境。

----

## 安装

下载对应的操作系统版本，解压后直接运行。

> 测试版本暂时只提供MAC和Windows（只支持64位）版本
* [下载地址](https://gitee.com/formatkm/v86_Linux/releases)


## 使用

* `Chrome`浏览器中输入程序显示的url地址。

    > 非本机访问注意打开防火墙的对应端口

* 点击`测试虚拟机`按钮，在新窗口运行虚拟机。

## 二次开发

#### 打包项目

```sh
git clone https://gitee.com/formatkm/v86_Linux
cd v86_Linux
npm install
```

#### 国内下载eletron比较慢，可以使用taobao镜像

```sh
npm config set registry https://registry.npm.taobao.org/
npm config set ELECTRON_MIRROR http://npm.taobao.org/mirrors/electron/
```

#### www目录结构描述


```
├── bios                     // bios二进制文件
│   ├── COPYING.LESSER
│   ├── bochs-bios.bin
│   ├── bochs-vgabios.bin
│   ├── seabios-debug.bin
│   ├── seabios.bin
│   ├── vgabios-debug.bin
│   └── vgabios.bin
├── build                    // 编译后的js
│   └── libv86.js
├── images                   // 镜像文件目录
│   ├── linux.iso            // Linux 2
│   └── linux3.iso           // Linux 3
└── index.html               // 入口页面

```

#### 单独运行koa服务

electron实际提供一个nodejs和chrome环境，服务程序可单独运行
```sh
npm run serverdev
```

## 使用组件

* V86 – [https://github.com/copy/v86](https://github.com/copy/v86)
* Electron – [https://github.com/electron/electron](https://github.com/electron/electron)
* Koa2 - [https://github.com/demopark/koa-docs-Zh-CN](https://github.com/demopark/koa-docs-Zh-CN)
* koa-static - [https://github.com/koajs/static](https://github.com/koajs/static)
