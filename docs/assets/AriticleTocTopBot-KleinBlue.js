function loadResource(type, attributes) {
    if (type === 'style') {
        const style = document.createElement('style');
        style.textContent = attributes.css;
        document.head.appendChild(style);
    }
}

function createTOC() {
    const contentContainer = document.querySelector('.markdown-body');
    if (!contentContainer) return;
    
    const tocElement = document.createElement('div');
    tocElement.className = 'toc';
    contentContainer.appendChild(tocElement);

    const headings = contentContainer.querySelectorAll('h1, h2, h3, h4, h5, h6');
    headings.forEach(heading => {
        if (!heading.id) {
            heading.id = heading.textContent.trim().replace(/\s+/g, '-').toLowerCase();
        }
        const link = document.createElement('a');
        link.href = '#' + heading.id;
        link.textContent = heading.textContent;
        // 根据标题级别增加内边距
        link.style.paddingLeft = `${(parseInt(heading.tagName.charAt(1)) - 1) * 10}px`;
        link.addEventListener('click', e => {
            e.preventDefault();
            document.getElementById(heading.id)?.scrollIntoView({ behavior: 'smooth' });
        });
        tocElement.appendChild(link);
    });
}

function toggleTOC() {
    const tocElement = document.querySelector('.toc');
    const tocIcon = document.querySelector('.toc-icon');
    if (tocElement && tocIcon) {
        tocElement.classList.toggle('show');
        tocIcon.classList.toggle('active');
        tocIcon.innerHTML = tocElement.classList.contains('show')
            ? '<svg viewBox="0 0 24 24"><path d="M18 6L6 18M6 6l12 12"/></svg>'
            : '<svg viewBox="0 0 24 24"><path d="M3 12h18M3 6h18M3 18h18"/></svg>';
    }
}

document.addEventListener("DOMContentLoaded", function() {
    // 初始化目录
    createTOC();

    // 合并TOC和返回按钮的样式
    const combinedCss = `
        :root {
            --toc-bg: rgba(255, 255, 255, 0.8);
            --toc-border: #e1e4e8;
            --toc-text: #1F2328;
            --toc-hover: #81D8D0CC;
            --toc-icon-bg: #FFFFFFB3;
            --toc-icon-color: #656d76b3;
            --toc-icon-active-bg: #81D8D0B3;
            --toc-icon-active-color: #FFFFFFB3;
        }
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
            bottom: 150px;
            right: 60px;
            z-index: 1000;
            width: 250px;
            max-height: 70vh;
            padding: 10px;
            overflow-y: auto;
            border: 1px solid var(--toc-border);
            border-radius: 6px;
            background-color: var(--toc-bg);
            box-shadow: 0 2px 10px rgba(0,0,0,0.1);
            transform: translateY(20px) scale(0.9);
            opacity: 0;
            visibility: hidden;
            transition: all 0.1s ease;
        }
        .toc.show {
            transform: translateY(0) scale(1);
            opacity: 1;
            visibility: visible;
        }
        .toc a {
            display: block;
            padding: 5px 0;
            border-radius: 6px;
            border-bottom: 1px solid var(--toc-border);
            color: var(--toc-text);
            transition: all 0.1s ease;
            font-size: 14px;
            line-height: 1.5;
            text-decoration: none;
        }
        .toc a:last-child {
            border-bottom: none;
        }
        .toc a:hover {
            padding-left: 5px;
            border-radius: 6px;
            background-color: var(--toc-hover);
        }
        .toc-icon {
            position: fixed;
            bottom: 130px;
            right: 20px;
            z-index: 1001;
            width: 40px;
            height: 40px;
            display: flex;
            align-items: center;
            justify-content: center;
            border: 2px solid var(--toc-icon-color);
            border-radius: 50%;
            background-color: var(--toc-icon-bg);
            color: var(--toc-icon-color);
            box-shadow: 0 1px 3px rgba(0,0,0,0.12);
            transition: all 0.1s ease;
            cursor: pointer;
            user-select: none;
            -webkit-tap-highlight-color: transparent;
            outline: none;
        }
        .toc-icon:hover {
            border-color: var(--toc-icon-active-color);
            background-color: var(--toc-icon-active-bg);
            color: var(--toc-icon-active-color);
            transform: scale(1.1);
        }
        .toc-icon:active {
            transform: scale(0.9);
        }
        .toc-icon.active {
            border-color: var(--toc-icon-active-color);
            background-color: var(--toc-icon-active-bg);
            color: var(--toc-icon-active-color);
            transform: rotate(90deg);
        }
        .toc-icon svg {
            width: 24px;
            height: 24px;
            fill: none;
            stroke: currentColor;
            stroke-width: 2;
            stroke-linecap: round;
            stroke-linejoin: round;
        }
        .back-to-top, .back-to-bot {
            position: fixed;
            right: 20px;
            z-index: 10000;
            width: 40px;
            height: 40px;
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 0;
            margin: 0;
            border: 2px solid var(--toc-icon-color);
            border-radius: 50%;
            background-color: var(--toc-icon-bg);
            color: var(--toc-icon-color);
            box-shadow: 0 1px 3px rgba(0,0,0,0.12);
            opacity: 0;
            visibility: hidden;
            transition: all 0.1s ease;
            font-size: 24px;
            cursor: pointer;
            user-select: none;
            -webkit-tap-highlight-color: transparent;
            outline: none;
        }
        .back-to-top { bottom: 190px; }
        .back-to-bot { bottom: 70px; }
        .back-to-top.show, .back-to-bot.show {
            opacity: 1;
            visibility: visible;
        }
        .back-to-top:hover, .back-to-bot:hover {
            border-color: var(--toc-icon-active-color);
            background-color: var(--toc-icon-active-bg);
            color: var(--toc-icon-active-color);
            transform: scale(1.1);
        }
        .back-to-top:active, .back-to-bot:active {
            transform: scale(0.9);
        }
        .back-to-top svg, .back-to-bot svg {
            width: 24px;
            height: 24px;
            fill: none;
            stroke: currentColor;
            stroke-width: 2;
            stroke-linecap: round;
            stroke-linejoin: round;
        }
        @media (max-width: 768px) {
            .toc {
                width: 200px;
            }
        }
    `;
    loadResource('style', { css: combinedCss });

    // 创建TOC切换图标
    const tocIcon = document.createElement('div');
    tocIcon.className = 'toc-icon';
    tocIcon.innerHTML = '<svg viewBox="0 0 24 24"><path d="M3 12h18M3 6h18M3 18h18"/></svg>';
    tocIcon.addEventListener('click', e => {
        e.stopPropagation();
        toggleTOC();
    });
    document.body.appendChild(tocIcon);

    // 点击页面其他位置时隐藏目录
    document.addEventListener('click', e => {
        const tocElement = document.querySelector('.toc');
        if (tocElement && tocElement.classList.contains('show') && !tocElement.contains(e.target) && !e.target.closest('.toc-icon')) {
            toggleTOC();
        }
    });

    // 创建返回顶部和返回底部按钮
    const btnTop = document.createElement('button');
    btnTop.className = 'back-to-top';
    btnTop.innerHTML = '<svg viewBox="0 0 24 24"><path d="M12 19V5M5 12l7-7 7 7"/></svg>';
    document.body.appendChild(btnTop);

    const btnBot = document.createElement('button');
    btnBot.className = 'back-to-bot';
    btnBot.innerHTML = '<svg viewBox="0 0 24 24"><path d="M12 5v14M5 12l7 7 7-7"/></svg>';
    document.body.appendChild(btnBot);

    btnTop.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
    btnBot.addEventListener('click', () => {
        window.scrollTo({ top: document.documentElement.scrollHeight, behavior: 'smooth' });
    });

    // 根据滚动位置显示/隐藏按钮
    function updateButtons() {
        const scrollTop = window.pageYOffset;
        const windowHeight = window.innerHeight;
        const documentHeight = document.documentElement.scrollHeight;
        scrollTop > 100 ? btnTop.classList.add('show') : btnTop.classList.remove('show');
        (scrollTop + windowHeight < documentHeight - 100) ? btnBot.classList.add('show') : btnBot.classList.remove('show');
    }
    window.addEventListener('scroll', updateButtons);
    window.addEventListener('resize', updateButtons);
    updateButtons();
});
