function loadResource(type, attributes) {
    if (type === 'style') {
        const style = document.createElement('style');
        style.textContent = attributes.css;
        document.head.appendChild(style);
    }
}

function createTOC() {
    const tocElement = document.createElement('div');
    tocElement.className = 'toc';
    //tocElement.classList.add('show'); //禁用默认显示文章导航菜单
        
    const contentContainer = document.querySelector('.markdown-body');
    contentContainer.appendChild(tocElement);

    const headings = contentContainer.querySelectorAll('h1, h2, h3, h4, h5, h6');
    headings.forEach(heading => {
        if (!heading.id) {
            heading.id = heading.textContent.trim().replace(/\s+/g, '-').toLowerCase();
        }
        const link = document.createElement('a');
        link.href = '#' + heading.id;
        link.textContent = heading.textContent;
        
        link.setAttribute('data-id', heading.id);
        
        link.className = 'toc-link';
        link.style.paddingLeft = `${(parseInt(heading.tagName.charAt(1)) - 1) * 10}px`;
        tocElement.appendChild(link);
    });

    //返回顶部改为向上箭头
    //禁用向上按钮的总共三段"toc-end"项目 1-2 CSS内的 .toc-end 不能被禁用否则自动高亮功能失效
    /*
    tocElement.insertAdjacentHTML('beforeend', '<a class="toc-end" onclick="window.scrollTo({top:0,behavior: \'smooth\'});">ᐱ</a>');
    */

    contentContainer.prepend(tocElement);
}

function highlightTOC() {
    const tocLinks = document.querySelectorAll('.toc-link');
    const fromTop = window.scrollY + 10;

    let currentHeading = null;

    tocLinks.forEach(link => {
        const section = document.getElementById(link.getAttribute('data-id'));
        if (section && section.offsetTop <= fromTop) {
            currentHeading = link;
        }
    });

    tocLinks.forEach(link => {
        link.classList.remove('active-toc');
    });

    if (currentHeading) {
        currentHeading.classList.add('active-toc');

        // 确保当前高亮的目录项在可视区域的中间
        currentHeading.scrollIntoView({
            block: 'center',   // 确保当前高亮项滚动到视图中间位置
            inline: 'nearest'  // 可选，保持水平滚动条不动
        });
    }
}

function toggleTOC() {
    const tocElement = document.querySelector('.toc');
    const tocIcon = document.querySelector('.toc-icon');
    if (tocElement) {
        tocElement.classList.toggle('show');
        tocIcon.classList.toggle('active');
        //tocIcon.textContent = tocElement.classList.contains('show') ? '✕' : '☰'; //原 ✖ 符号没法自定义颜色iPhone一直显示黑色！改为另一个符号 ✕ 才可以！但是☰也没法居中，还是用SVG算了
        tocIcon.innerHTML = tocElement.classList.contains('show') 
            ? '<svg viewBox="0 0 24 24"><path d="M18 6L6 18M6 6l12 12"/></svg>' //对应'✕'
            : '<svg viewBox="0 0 24 24"><path d="M3 12h18M3 6h18M3 18h18"/></svg>'; //对应'☰'
    }
}

document.addEventListener("DOMContentLoaded", function() {
    createTOC();
    const css = `
    
       @media (prefers-color-scheme: dark) {
           :root {
               --toc-bg: #21262dcc;
               --toc-border: rgba(240, 246, 252, 0.1);
               --toc-text: #c9d1d9;
               --toc-hover: #002fa7cc;
               --toc-icon-bg: #21262db3;
               --toc-icon-color: rgba(240, 246, 252, 0.1);
               --toc-icon-active-bg: #002fa7b3;
               --toc-icon-active-color: #8b949eb3;
           }
       }        

        .toc {
            position: fixed;
            bottom: 80px;
            right: 60px;
            width: 250px;
            max-height: 70vh;
            background-color: var(--toc-bg);
            border: 1px solid var(--toc-border);
            border-radius: 6px;
            padding: 10px;
            box-shadow: 0 2px 10px rgba(0,0,0,0.1);
            overflow-y: auto;
            z-index: 1000;
            opacity: 0;
            visibility: hidden;
            transform: translateY(20px) scale(0.9);
            transition: opacity 0.1s ease, transform 0.1s ease, visibility 0.1s;
        }
        .toc.show {
            opacity: 1;
            visibility: visible;
            transform: translateY(0) scale(1);
        }
        .toc a {
            display: block;
            border-radius: 6px;
            color: var(--toc-text);
            text-decoration: none;
            padding: 5px 0;
            font-size: 14px;
            line-height: 1.5;
            border-bottom: 1px solid var(--toc-border);
            transition: background-color 0.1s ease, padding-left 0.1s ease;
        }
        .toc a:last-child {
            border-bottom: none;
        }
        .toc a:hover {
            background-color: var(--toc-hover);
            padding-left: 5px;
            border-radius: 6px;
        }
        .toc-icon {
            position: fixed;
            bottom: 60px;
            right: 20px;
            cursor: pointer;
            font-size: 24px;
            background-color: var(--toc-icon-bg);
            color: var(--toc-icon-color);
            border: 2px solid var(--toc-icon-color);
            border-radius: 50%;
            width: 40px;
            height: 40px;
            display: flex;
            align-items: center;
            justify-content: center;
            box-shadow: 0 1px 3px rgba(0,0,0,0.12);
            z-index: 1001;
            transition: all 0.1s ease;
            user-select: none;
            -webkit-tap-highlight-color: transparent;
            outline: none;
        }
        .toc-icon:hover {
            transform: scale(1.1);
            color: var(--toc-icon-active-color);
            background-color: var(--toc-icon-active-bg);
            border-color: var(--toc-icon-active-color);
        }
        .toc-icon:active {
            transform: scale(0.9); /* 按住时缩小 */
        }
        .toc-icon.active {
            color: var(--toc-icon-active-color);
            background-color: var(--toc-icon-active-bg);
            border-color: var(--toc-icon-active-color); /* 激活按钮边框颜色改为白色 */
            transform: rotate(90deg);
        }

        /* 结尾向上按钮参数 */
        //这个不能被禁用否则自动高亮功能失效
        .toc-end {
            /* font-weight: bold;  移除加粗 */
            text-align: center;
            cursor: pointer;
            visibility: hidden;
            background-color: var(--toc-hover);      /* 自定义按钮颜色 */
            padding: 10px;                            /* 可选：增加一些内边距，使按钮更易点击 */
            border-radius: 6px;                       /* 可选：使按钮有圆角 */
            border: 1px solid var(--toc-border);      /* 可选：增加边框，使其更明显 */
        }

        /* 弹出菜单文字参数 */
        .active-toc {
            /* font-weight: bold;  移除加粗 */
            border-radius: 6px;
            background-color: var(--toc-hover);  /* 根据你的设计，可以定制高亮颜色 */
            padding-left: 5px;  /* 可选：增加左边距以突出当前项目 */
        }

       /* 按钮 SVG 图标自定义 */
       .toc-icon svg {
           width: 24px;
           height: 24px;
           fill: none; /* 设置 svg 内部不填充颜色（透明） */
           stroke: currentColor; /* 想要即时切换只能用 currentColor 将描边颜色设置为当前文字颜色（继承父元素的颜色）*/
           stroke-width: 2; /* 设置描边（线条）的宽度为 2 像素 */
           stroke-linecap: round; /* 设置描边端点为圆形，使线条末端圆润 */
           stroke-linejoin: round;  /* 设置线条转角为圆形，使角部更平滑 */
       }

       /* 移动端缩窄一丢丢 */
       @media (max-width: 1249px) {
           .toc {
               width: 200px;
           }
       }
    `;
    loadResource('style', {css: css});

    const tocIcon = document.createElement('div');
    tocIcon.className = 'toc-icon';
    // 移除默认的 active 类
    //tocIcon.classList.add('active');  // 删除这一行
    //tocIcon.textContent = '✖'; //这行改为下面的
    //tocIcon.textContent = '☰';  // 设置默认图标为汉堡菜单，这是符号版的，改为下面的 SVG 图标版保证绝对居中
    tocIcon.innerHTML = '<svg viewBox="0 0 24 24"><path d="M3 12h18M3 6h18M3 18h18"/></svg>'; //初始状态使用 SVG
    tocIcon.onclick = (e) => {
        e.stopPropagation();
        toggleTOC();
    };
    document.body.appendChild(tocIcon);

    //自定义向上按钮颜色
    //禁用向上按钮的总共三段"toc-end"项目 2-2 CSS内的 .toc-end 不能被禁用否则自动高亮功能失效
    /*
    window.onscroll = function() {
        const backToTopButton = document.querySelector('.toc-end');
        if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
            backToTopButton.style="visibility: visible;background-color: var(--toc-hover);"
        } else {
            backToTopButton.style="visibility: hidden;background-color: var(--toc-hover);"
        }
    };
    */

    document.addEventListener('scroll', highlightTOC);
    
    document.addEventListener('click', (e) => {
        const tocElement = document.querySelector('.toc');
        if (tocElement && tocElement.classList.contains('show') && !tocElement.contains(e.target) && e.target.classList.contains('toc-icon')) {
            toggleTOC();
            
        }
    });
});
