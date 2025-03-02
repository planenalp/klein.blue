document.addEventListener('DOMContentLoaded', function() {    
    let currentUrl = window.location.pathname;
    //let currentHost = window.location.hostname;

    //主页主题------------------------------------------------------------------------------
    
    if (currentUrl == '/' || currentUrl.includes('/index.html') || currentUrl.includes('/page')) {
        console.log('应用主页主题');
        let style = document.createElement("style");
        style.innerHTML = `

        /* 背景图 */
        html {    
                background: url('https://godpan.com/bg.webp') no-repeat center center fixed;
                background-size: cover;
        }

        /* header布局 */
        #header {
            height: 230px;
            position: relative; /* 父元素 #header 设置定位 */
        }

        #header h1 {
            position: absolute;
            left: 50%;
            transform: translateX(-50%);
            display: flex;
            flex-direction: column;
            align-items: center;
        }

        /* avatar尺寸 */
        .avatar {
            width: 120px;
            height: 120px;
        }

        #header h1 a {
            margin-left: unset; /* 重置原参数8px为0 */
            margin-top: 10px; /* 用百分比会崩 */
            font-family:
                "PingFang SC",     /* 苹方（macOS/iOS） */
                "Microsoft YaHei", /* 微软雅黑（Windows） */
                "Noto Sans SC",    /* 思源黑体（Linux/Android） */
                sans-serif;        /* 最终回退到无衬线字体 */
        }

        .blogTitle {
            display: unset; /* 重置属性取消默认屏幕过窄自动隐藏标题 */
        }

        /* 自定义按钮 */
        .title-right {
            margin: unset; /* 重置原参数 */
            margin-top: 180px; /* 用百分比会崩 */
            margin-left: 50%;
            transform: translateX(-50%);
            position: absolute;
        }

        /* 主体布局 */
        body {
            background: rgba(255, 255, 255, 0.7); /* 白色背景，透明度50% */
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.5); /* 添加阴影 */
        }

        /* 主页博客列表透明边框 */
        .SideNav {
            background: rgba(255, 255, 255, 0.8); /* 白色背景，透明度80% */
            min-width: unset;
        }

        /* 鼠标放到博客标题后会高亮 */
        .SideNav-item:hover {
            background-color: #81D8D0; /* 高亮颜色 */
            transform: scale(1.05);
            box-shadow: 0 0 5px rgba(0, 0, 0, 0.5); /* 阴影 */
        }

        /* 弹起动画时长 */
        .SideNav-item {
            transition: 0.1s;
        }

        /* 分页条 */
        .pagination a:hover, .pagination a:focus, .pagination span:hover, .pagination span:focus, .pagination em:hover, .pagination em:focus {
            border-color: rebeccapurple;
        }

        /* 右上角按钮触碰颜色 */
        div.title-right .btn:hover {
            background-color: #81D8D0;
        }

        `;
        document.head.appendChild(style);
    }


    //文章页主题------------------------------------------------------------------------------
    
    else if (currentUrl.includes('/post/') || currentUrl.includes('/link.html') || currentUrl.includes('/about.html')) {
        console.log('文章页主题');

        let style = document.createElement("style");
        style.innerHTML = `

        /* 背景图 */
        html {    
            background: url('https://godpan.com/bg.webp') no-repeat center center fixed;
            background-size: cover;
        }

        /* 主体布局 */
        body {
            background: rgba(255, 255, 255, 0.7); /* 白色背景，透明度70% */
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.5); /* 添加阴影 */
        }

        /* 右上角按钮触碰颜色 */
        div.title-right .btn:hover {
            background-color: #81D8D0;
        }

        `;
        document.head.appendChild(style);
    } 


    // 搜索页主题--------------------------------------------------------------------
    
    else if (currentUrl.includes('/tag')) {
        console.log('应用搜索页主题');
        let style = document.createElement("style");
        style.innerHTML = `
        
        /* 背景图 */
        html {    
            background: url('https://godpan.com/bg.webp') no-repeat center center fixed;
            background-size: cover;
        }

        /* 主体布局 */
        body {
            background: rgba(255, 255, 255, 0.7); /* 白色背景，透明度70% */
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.5); /* 添加阴影 */
        }

        /* 列表透明边框 */
        .SideNav {
            background: rgba(255, 255, 255, 0.8); /* 白色背景，透明度80% */
            min-width: unset;
        }

        /* 鼠标放到博客标题后会高亮 */
        .SideNav-item:hover {
            background-color: #81D8D0; /* 高亮颜色 */
            transform: scale(1.05);
            box-shadow: 0 0 5px rgba(0, 0, 0, 0.5); /* 阴影 */
        }

        /* 弹起动画时长 */
        .SideNav-item {
            transition: 0.1s;
        }
        
        /* 搜索布局 */
        .subnav-search {
            width: 230px; 
        }

        /* 右上角按钮触碰颜色 */
        div.title-right .btn:hover {
            background-color: #81D8D0;
        }
        
        `;
        document.head.appendChild(style);
    }
})
