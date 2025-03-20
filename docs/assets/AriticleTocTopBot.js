//允许移动端实现图标按压特效
document.addEventListener('touchstart', function() {}, false);

////////// 动态加载 CSS 样式 start //////////
function loadResource(type, attributes) {
    if (type === 'style') {
        const style = document.createElement('style');
        style.textContent = attributes.css;
        document.head.appendChild(style);
    }
}
////////// 动态加载 CSS 样式 end //////////

////////// 创建目录 start //////////
function createTOC() {
    const tocElement = document.createElement('div');
    tocElement.className = 'toc';
    document.body.appendChild(tocElement); // 将目录 <div> 插入到 <body> 中

    const markdownBody = document.querySelector('.markdown-body');
    const headings = markdownBody.querySelectorAll('h1, h2, h3, h4, h5, h6');
    headings.forEach(heading => {
        if (!heading.id) {
            heading.id = heading.textContent.trim().replace(/\s+/g, '-').toLowerCase();
        }
        const link = document.createElement('a');
        link.href = '#' + heading.id;
        link.textContent = heading.textContent;
        // 添加公共类名 'toc-link'
        link.className = 'toc-link';
        // 根据标题标签动态添加不同的类名
        link.classList.add('toc-' + heading.tagName.toLowerCase());
        // 获取标题级别并计算 margin-left
        if (heading.tagName !== 'H1') {
            const level = parseInt(heading.tagName.charAt(1)); // 获取标题级别
            link.style.marginLeft = `${(level - 1) * 10}px`;  // 计算缩进
        }
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetElement = document.getElementById(heading.id);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
            }
            //toggleTOC(); // 点击后关闭目录-已注释
        });
        tocElement.appendChild(link);
    });
}
////////// 创建目录 end //////////

////////// 目录按钮切换功能 start //////////
function toggleTOC() {
    const tocElement = document.querySelector('.toc');
    const tocIcon = document.querySelector('.toc-icon');
    if (tocElement) {
        tocElement.classList.toggle('show');
        tocIcon.classList.toggle('active');
        tocIcon.innerHTML = tocElement.classList.contains('show') ?
            '<svg viewBox="0 0 24 24"><path d="M4 4l16 16M4 20L20 4"/></svg>' : //X图标
            '<svg viewBox="0 0 24 24"><path d="M3 12h18M3 6h18M3 18h18"/></svg>'; //汉堡图标
    }
}
////////// 目录按钮切换功能 end //////////

document.addEventListener("DOMContentLoaded", function() {
    createTOC();
    const combinedCss = `
        /* light 主题颜色 */
        :root {
            --color-toc-a-text: #24292fcc;
            --color-toc-bg: #ffffffcc;
            --color-toc-border: rgba(31, 35, 40, 0.15);
            --color-toc-box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
            --color-toc-hover-bg: #f3f4f6;
            --color-toc-hover-border: rgba(31, 35, 40, 0.15);
            --color-toc-icon-bg: #f6f8fab3;
            --color-toc-icon-color: #656d76b3;
            --color-toc-icon-hover-color: #656d76;
            --color-toc-highlightText: #24292f;
        }
        /* dark 主题颜色 */
        [data-color-mode=light][data-light-theme=dark],
        [data-color-mode=light][data-light-theme=dark]::selection,
        [data-color-mode=dark][data-dark-theme=dark],
        [data-color-mode=dark][data-dark-theme=dark]::selection {
            --color-toc-a-text: #c9d1d9cc;
            --color-toc-bg: #21262dcc;
            --color-toc-border: rgba(240, 246, 252, 0.1);
            --color-toc-box-shadow: 0 0 transparent;
            --color-toc-hover-bg: #30363d;
            --color-toc-hover-border: #8b949e;
            --color-toc-icon-bg: #21262db3;
            --color-toc-icon-color: #8b949eb3;
            --color-toc-icon-hover-color: #8b949e;
            --color-toc-highlightText: #c9d1d9;
        }
        /* 弹出菜单主体 */
        .toc {
            position: fixed;
            bottom: 100px;
            right: 60px;
            z-index: 1000;
            width: 250px;
            max-height: 70vh;
            padding: 10px;
            overflow-y: auto;
            border: 1px solid var(--color-toc-border);
            border-radius: 6px;
            background-color: var(--color-toc-bg);
            box-shadow: var(--color-toc-box-shadow);
            transform: translateY(20px) scale(0.9);
            opacity: 0;
            transition: opacity 0.1s ease, transform 0.1s ease, visibility 0.1s;
            visibility: hidden;
            /* backdrop-filter: blur(15px); 模糊弹出菜单背景 */
        }
        /* 弹出菜单动画 */
        .toc.show {
            transform: translateY(0);
            opacity: 1;
            visibility: visible;
        }
        /* 弹出菜单主体 */
        .toc a {
            display: block;
            padding: 5px;
            border: 1px solid transparent; /* 初始状态设置透明边框占位-防止菜单选项乱跳 */
            border-radius: 6px;
            color: var(--color-toc-a-text);
            transition: background-color 0.3s ease, border-color 0.3s ease, color 0.3s ease; /* 适当延长过渡动画缓冲滚动动效 */
            font-size: 14px;
            line-height: 1.5;
            text-decoration: none;
        }
        /* 弹出菜单鼠标悬停高亮+弹出菜单滚动高亮 */
        .toc a:hover, .toc-link.toc-active {
            border-color: var(--color-toc-hover-border); /* 只修改边框颜色-防止菜单选项乱跳 */
            background-color: var(--color-toc-hover-bg);
            color: var(--color-toc-highlightText);
        }
        /* 弹出菜单图标 */
        .toc-icon {
            position: fixed;
            bottom: 80px;
            right: 20px;
            z-index: 1000;
            width: 40px;
            height: 40px;
            display: flex;
            align-items: center;
            justify-content: center;
            border: 1px solid var(--color-toc-border);
            border-radius: 50%;
            background-color: var(--color-toc-icon-bg);
            color: var(--color-toc-icon-color);
            box-shadow: var(--color-toc-box-shadow);
            transition: transform 0.1s ease, opacity 0.1s ease;
            cursor: pointer;
            user-select: none;
            -webkit-tap-highlight-color: transparent;
            outline: none;
        }
        /* 弹出菜单图标悬停状态 */
        .toc-icon:hover {
            background-color: var(--color-toc-hover-bg);
            color: var(--color-toc-icon-hover-color);
            border: 1px solid var(--color-toc-hover-border);
        }
        /* 弹出菜单图标按压状态 */
        .toc-icon:active {
            transform: scale(0.9);
        }
        /* 弹出菜单图标激活状态 */
        .toc-icon.active {
            background-color: var(--color-toc-hover-bg);
            color: var(--color-toc-icon-hover-color);
            border: 1px solid var(--color-toc-hover-border);
            transform: rotate(90deg);
        }
        /* 弹出菜单图标样式 */
        .toc-icon svg {
            width: 24px;
            height: 24px;
            fill: none;
            stroke: currentColor;
            stroke-width: 2;
            stroke-linecap: round;
            stroke-linejoin: round;
        }
        /* 弹出菜单左侧 h1 高亮竖条位置 */
        .toc-h1 {
            position: relative;
            padding-left: 10px;
        }
        /* 弹出菜单左侧 h1 高亮竖条样式 */
        .toc-h1::after {
            position: absolute;
            top: 50%;
            left: 0;
            width: 3px;
            height: 60%;
            background-color: var(--color-toc-icon-hover-color);
            transform: translateY(-50%);
            content: '';
        }
        /* 向上向下按钮 */
        .back-to-top, .back-to-bot {
            position: fixed;
            right: 20px;
            z-index: 1000;
            width: 40px;
            height: 40px;
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 0;
            margin: 0;
            border: 1px solid var(--color-toc-border);
            border-radius: 50%;
            background-color: var(--color-toc-icon-bg);
            color: var(--color-toc-icon-color);
            box-shadow: var(--color-toc-box-shadow);
            opacity: 0;
            transition: transform 0.1s ease, opacity 0.1s ease;
            font-size: 24px;
            visibility: hidden;
            cursor: pointer;
            user-select: none;
            -webkit-tap-highlight-color: transparent;
            outline: none;
        }
        /* 向上按钮位置 */
        .back-to-top {
            bottom: 140px;
        }
        /* 向下按钮位置 */
        .back-to-bot {
            bottom: 20px;
        }
        /* 向上向下按钮动画 */
        .back-to-top.show, .back-to-bot.show {
            opacity: 1;
            visibility: visible;
        }
        /* 向上向下按钮悬停状态 */
        .back-to-top:hover, .back-to-bot:hover {
            background-color: var(--color-toc-hover-bg);
            color: var(--color-toc-icon-hover-color);
            border: 1px solid var(--color-toc-hover-border);
        }
        /* 弹出菜单图标按压状态 */
        .back-to-top:active, .back-to-bot:active {
            transform: scale(0.9);
        }
        /* 弹出菜单图标样式 */
        .back-to-top svg, .back-to-bot svg {
            width: 24px;
            height: 24px;
            fill: none;
            stroke: currentColor;
            stroke-width: 2;
            stroke-linecap: round;
            stroke-linejoin: round;
        }
        /* 移动端微调菜单尺寸 */
        @media (max-width: 768px) {
            .toc {
                width: 200px;
                max-height: 50vh;
            }
        }
    `;
    loadResource('style', { css: combinedCss });

    //////// 创建目录按钮 TOC 切换图标 start //////////
    const tocIcon = document.createElement('div');
    tocIcon.className = 'toc-icon';
    tocIcon.innerHTML = '<svg viewBox="0 0 24 24"><path d="M3 12h18M3 6h18M3 18h18"/></svg>'; //初始化加载汉堡图标
    tocIcon.onclick = (e) => {
        e.stopPropagation();
        toggleTOC();
    };
    document.body.appendChild(tocIcon);
    //////// 创建目录按钮 TOC 切换图标 end //////////

    //////// 点击页面其他区域时隐藏目录 start //////////
    document.addEventListener('click', (e) => {
        const tocElement = document.querySelector('.toc');
        if (tocElement && tocElement.classList.contains('show') && !tocElement.contains(e.target) && !e.target.classList.contains('toc-icon')) {
            toggleTOC();
        }
    });
    //////// 点击页面其他区域时隐藏目录 end //////////

    //////// 创建滚动页面高亮菜单 start //////////
    function highlightTOC() {
        const tocLinks = document.querySelectorAll('.toc-link');
        const fromTop = window.scrollY + 10;
        let currentHeading = null;
        tocLinks.forEach(link => {
            const href = link.getAttribute('href'); // 获取 href 属性
            const sectionId = href.substring(1); // 去掉 # 得到 ID
            const section = document.getElementById(sectionId); // 根据 ID 获取元素
            if (section && section.offsetTop <= fromTop) {
                currentHeading = link;
            }
        });

        tocLinks.forEach(link => {
            link.classList.remove('toc-active');
        });
        if (currentHeading) {
            currentHeading.classList.add('toc-active');
            // 确保当前高亮的目录项在可视区域的中间
            currentHeading.scrollIntoView({
                block: 'center',   // 确保当前高亮项滚动到视图中间位置
                inline: 'nearest'  // 可选，保持水平滚动条不动
            });
        }
    }
    document.addEventListener('scroll', highlightTOC);
    //////// 创建滚动页面高亮菜单 end //////////

    //////// 创建返回顶部和返回底部按钮 start //////////
    const btnTop = document.createElement('button');
    btnTop.className = 'back-to-top';
    btnTop.innerHTML = '<svg viewBox="0 0 24 24"><path d="M4 14l8-8 8 8"/></svg>';
    document.body.appendChild(btnTop);

    const btnBot = document.createElement('button');
    btnBot.className = 'back-to-bot';
    btnBot.innerHTML = '<svg viewBox="0 0 24 24"><path d="M4 10l8 8 8-8"/></svg>';
    document.body.appendChild(btnBot);

    btnTop.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
    btnBot.addEventListener('click', () => {
        window.scrollTo({ top: document.documentElement.scrollHeight, behavior: 'smooth' });
    });

    function updateButtons() {
        const scrollTop = window.pageYOffset;
        const windowHeight = window.innerHeight;
        const dynamicThreshold = Math.min(500, windowHeight * 0.5); // 最大 500px，最小视口高度的 50%
        // 控制 btnTop
        scrollTop > dynamicThreshold
            ? btnTop.classList.add('show')
            : btnTop.classList.remove('show');
        // 控制 btnBot
        const remainingSpace = document.documentElement.scrollHeight - (scrollTop + windowHeight);
        remainingSpace > dynamicThreshold
            ? btnBot.classList.add('show')
            : btnBot.classList.remove('show');
    }
    
    window.addEventListener('scroll', updateButtons);
    window.addEventListener('resize', updateButtons);
    updateButtons();
    //////// 创建返回顶部和返回底部按钮 end //////////
});
