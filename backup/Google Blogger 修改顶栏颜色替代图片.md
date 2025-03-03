<!-- ##{"timestamp":1715460960}## -->

==================================================
## //废话

原视频教程出处
Live Blogger - 《How To Customize BG Image In Blogger Contempo Theme | Theme Editor》
[https://www.youtube.com/watch?v=zMB0XeMcRZg&ab_channel=LiveBlogger](https://www.blogger.com/blog/post/edit/8151877248081093597/8992707372004594223#)

因为 Blogger 默认顶栏只能设置添加图片，不能单独自定义颜色，klein.blue 的顶栏的风格只需要颜色不需要图像，之前就是曲线救国做了一张蓝色纯色图上传上去，正常来说没什么问题，但是国内直连所有图片都没法正确加载导致顶栏变成了当前主题默认的深灰色，所以就想研究怎么通过修改 CSS 代码之类将这个默认的深灰色像其余模块那样可以自定义为 #002FA7，问题很小众找了半天终于在 YouTube 搜到1个视频教程
这样即使加载不了图片也还能显示出网站的背景颜色了

==================================================
## 移除图片

虽然后续代码会禁用这个图片，但是为了减少不必要的资源浪费如备份模板不用带这个多余的图片打包在里面，这里还是提前删了好

Blogger - Theme - CUSTOMIZE
Background image - Remove Image

==================================================
## 查找对应 Background image 项目代码

根据网页F12查到对应位置为
<div class="bg-photo-container">

==================================================
## 禁用 Background image 模块

Blogger - Theme - CUSTOMIZE 旁的小三角 - Edit HTML
Ctrl+F 搜索来到2973行
class='bg-photo-container'
的内容为
```
      <div class='bg-photo-container'>
        <div class='bg-photo'/>
      </div>
```
在中间添加两行将其注释掉改为
```
      <div class='bg-photo-container'>
        <!--
        <div class='bg-photo'/>
        -->
      </div>
```

//禁用后 Background image 添加任何图片都不会再显示

==================================================
## 添加 CSS 颜色代码（只推荐用第一种）

Ctrl+F 搜索来到2655行
```
]]></b:skin>`
```

将这行往后移动并在其前面添加
```
/* Custom BG */

.bg-photo-container {
    background: #002fa7;
}
```

右上角保存
--------------------------------------------------
或是在设置内添加 CSS
不推荐，Restore 后效果还在，但是 Add CSS 设置内代码丢失会被自动合并进 Edit HTML 的代码 ]]></b:skin> 前面成为重复代码
这里列出只是说明有这么一种方法
也可以通过这个办法代替第一种方法作为首次添加，备份恢复后自动导入进代码，没必要
顺便通过这个办法确认了第一种方法的代码格式和位置都正确

Blogger - Theme - CUSTOMIZE - Advanced - Page Text 下拉最底下 - Add CSS

然后复制下面代码进去
```
/* Custom BG */

.bg-photo-container {
    background: #002fa7;
}
```

右下角按钮保存

==================================================
## 导出备份

Blogger - Theme - CUSTOMIZE旁的小三角 - Backup - DOWNLOAD

同样位置 Restore 按需恢复备份

==================================================
## 最终效果
![Image](https://github.com/user-attachments/assets/3f8ac211-a663-40cf-9533-f69969d2e4be)
