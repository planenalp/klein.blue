document.addEventListener('DOMContentLoaded', function() {    
    let currentUrl = window.location.pathname;
    //let currentHost = window.location.hostname;

    //主页主题------------------------------------------------------------------------------
    
    if (currentUrl == '/' || currentUrl.includes('/index.html') || currentUrl.includes('/page')) {
        console.log('应用主页主题');
        let style = document.createElement("style");
        style.innerHTML = `

        /* header布局 */
        #header {
            height: 250px;
            position: relative; /* 父元素 #header 设置定位 */
            background-color: #002FA7;
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
            margin-top: 20px; /* 用百分比会崩 */
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
            margin-top: 200px; /* 用百分比会崩 */
            margin-left: 50%;
            transform: translateX(-50%);
            position: absolute;
        }

        `;
        document.head.appendChild(style);
    }


    //文章页主题------------------------------------------------------------------------------
    
    else if (currentUrl.includes('/post/') || currentUrl.includes('/link.html') || currentUrl.includes('/about.html')) {
        console.log('文章页主题');

        let style = document.createElement("style");
        style.innerHTML = `

        /* 顶栏改色 */
        #header {
            background-color: #002FA7;
        }

        /* 顶栏字体缩进10px */
        .postTitle {
            margin-left: 10px;
        }

        /* 文章字体缩进10px */
        #postBody {
            margin: 10px;
        }

        `;
        document.head.appendChild(style);
    } 


    // 搜索页主题--------------------------------------------------------------------
    
    else if (currentUrl.includes('/tag')) {
        console.log('应用搜索页主题');
        let style = document.createElement("style");
        style.innerHTML = `
        
        /* 顶栏改色 */
        #header {
            background-color: #002FA7;
        }

        /* 顶栏字体缩进10px */
        .tagTitle {
            margin-left: 10px;
        }
        
        /* 搜索布局 */
        .subnav-search {
            width: 230px; 
        }
        
        `;
        document.head.appendChild(style);
    }
})
