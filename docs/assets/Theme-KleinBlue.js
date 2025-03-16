document.addEventListener('DOMContentLoaded', function() {    
    let currentUrl = window.location.pathname;
    //let currentHost = window.location.hostname;

    //主页主题------------------------------------------------------------------------------
    
    if (currentUrl == '/' || currentUrl.includes('/index.html') || currentUrl.includes('/page')) {
        console.log('应用主页主题');
        let style = document.createElement("style");
        style.innerHTML = `

        /* 主体布局 */
        body {
            background-color: #002FA7B3;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.5); /* 添加阴影 */
        }
        
        /* header布局 */
        #header {
            height: 50px;
            position: relative; /* 父元素 #header 设置定位 */
            //background-color: #002FA7B3; /* 70%透明度 */
            border-bottom: unset;
            margin-bottom: unset;
        }

        #header h1 {
            position: absolute;
            left: 50%;
            transform: translateX(-50%);
        }

        .avatar {
            display: none;
        }

        #header h1 a {
            margin-left: unset; /* 无Avatar状态去除左侧间隔保证标题居中 */
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
            margin-top: 75px; /* 用百分比会崩 */
            margin-left: 50%;
            transform: translateX(-50%);
            position: absolute;
        }

        /* 副标题居中+移位 */
        #content > div {
            margin-bottom: unset !important;
            text-align: center;  /* 子元素（副标题）水平居中 */
            //background-color: #002FA7B3;
            height: 75px;
        }
        
        /* 重新定义 max-width: 768px 参数下的值，原为 600px */
        @media (max-width: 768px) {
            body {
                padding: 8px !important;
            }
            .blogTitle{
                display:unset !important;
                }
            #buttonRSS{
                display:unset !important;
            }
            .LabelTime{
                display:unset !important;
            }
            .LabelName{
                display:none !important;
            }
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
            background-color: #002FA7B3; /* 70%透明度 */
            padding-bottom: unset;
            border-bottom: unset;
        }

        /* 顶栏字体缩进5px */
        .postTitle {
            margin-left: 5px;
        }

        /* 文章字体缩进5px */
        #postBody {
            margin: 5px;
        }

        /* 重新定义 max-width: 768px 参数下的值，原为 600px */
        @media (max-width: 768px) {
            body {
                padding: 8px !important;
            }
            .postTitle{
                font-size:24px !important;
            }
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
            background-color: #002FA7B3; /* 70%透明度 */
            padding-bottom: unset;
            border-bottom: unset;
        }

        /* 顶栏字体缩进5px */
        .tagTitle {
            margin-left: 5px;
        }
        
        /* 搜索布局 */
        .subnav-search {
            width: 230px; 
        }

        /* 重新定义 max-width: 768px 参数下的值，原为 600px */
        @media (max-width: 768px) {
            body {
                padding: 8px !important;
            }
            .tagTitle {
                display: unset !important;
                font-size: 14px !important;
            }
            .LabelTime{
                display:unset !important;
            }
            .LabelName{
                display:none !important;
            }
        }
        
        `;
        document.head.appendChild(style);
    }
})
