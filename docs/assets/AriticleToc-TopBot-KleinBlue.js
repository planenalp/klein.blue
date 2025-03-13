(() => {
  // 内联注入 CSS 样式
  const injectStyles = css => {
    const style = document.createElement('style');
    style.textContent = css;
    document.head.appendChild(style);
  };

  // 创建目录（TOC）
  const createTOC = () => {
    const contentContainer = document.querySelector('.markdown-body');
    if (!contentContainer) return;
    const toc = document.createElement('div');
    toc.className = 'toc';
    contentContainer.prepend(toc);

    const headings = contentContainer.querySelectorAll('h1, h2, h3, h4, h5, h6');
    headings.forEach(heading => {
      if (!heading.id) {
        heading.id = heading.textContent.trim().replace(/\s+/g, '-').toLowerCase();
      }
      const link = document.createElement('a');
      link.href = '#' + heading.id;
      link.textContent = heading.textContent;
      link.dataset.id = heading.id;
      link.className = 'toc-link';
      link.style.paddingLeft = `${(parseInt(heading.tagName[1]) - 1) * 10}px`;
      toc.appendChild(link);
    });
  };

  // 高亮当前滚动区域对应的目录项
  const highlightTOC = () => {
    const tocLinks = document.querySelectorAll('.toc-link');
    const fromTop = window.scrollY + 10;
    let current = null;
    tocLinks.forEach(link => {
      const section = document.getElementById(link.dataset.id);
      if (section && section.offsetTop <= fromTop) {
        current = link;
      }
    });
    tocLinks.forEach(link => link.classList.remove('active-toc'));
    if (current) {
      current.classList.add('active-toc');
      current.scrollIntoView({ block: 'center', inline: 'nearest' });
    }
  };

  // 切换目录显示
  const toggleTOC = () => {
    const toc = document.querySelector('.toc');
    const tocIcon = document.querySelector('.toc-icon');
    if (toc) {
      toc.classList.toggle('show');
      tocIcon.classList.toggle('active');
      tocIcon.innerHTML = toc.classList.contains('show')
        ? '<svg viewBox="0 0 24 24"><path d="M18 6L6 18M6 6l12 12"/></svg>'
        : '<svg viewBox="0 0 24 24"><path d="M3 12h18M3 6h18M3 18h18"/></svg>';
    }
  };

  document.addEventListener('DOMContentLoaded', () => {
    createTOC();

    const css = `
        :root {
            --toc-bg: #21262dcc;
            --toc-border: rgba(240, 246, 252, 0.1);
            --toc-hover: #002fa7cc;
            --toc-icon-bg: #21262db3;
            --toc-icon-color: rgba(240, 246, 252, 0.1);
            --toc-icon-active-bg: #002fa7b3;
            --toc-icon-active-color: #8b949eb3;
            --toc-text: #c9d1d9;
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
            opacity: 0;
            visibility: hidden;
            transform: translateY(20px) scale(0.9);
            transition: all 0.1s ease;
        }
        .toc.show {
            opacity: 1;
            visibility: visible;
            transform: translateY(0) scale(1);
        }
        .toc a {
            display: block;
            padding: 5px 0;
            border-radius: 6px;
            border-bottom: 1px solid var(--toc-border);
            font-size: 14px;
            line-height: 1.5;
            color: var(--toc-text);
            text-decoration: none;
            transition: all 0.1s ease;
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
            bottom: 130px;
            right: 20px;
            z-index: 1001;
            display: flex;
            align-items: center;
            justify-content: center;
            width: 40px;
            height: 40px;
            font-size: 24px;
            cursor: pointer;
            color: var(--toc-icon-color);
            background-color: var(--toc-icon-bg);
            border: 2px solid var(--toc-icon-color);
            border-radius: 50%;
            box-shadow: 0 1px 3px rgba(0,0,0,0.12);
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
            transform: scale(0.9);
        }
        .toc-icon.active {
            color: var(--toc-icon-active-color);
            background-color: var(--toc-icon-active-bg);
            border-color: var(--toc-icon-active-color);
            transform: rotate(90deg);
        }
        .active-toc {
            padding-left: 5px;
            border-radius: 6px;
            background-color: var(--toc-hover);
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
            display: flex;
            align-items: center;
            justify-content: center;
            width: 40px;
            height: 40px;
            padding: 0;
            margin: 0;
            font-size: 24px;
            cursor: pointer;
            color: var(--toc-icon-color);
            background-color: var(--toc-icon-bg);
            border: 2px solid var(--toc-icon-color);
            border-radius: 50%;
            box-shadow: 0 1px 3px rgba(0,0,0,0.12);
            transition: all 0.1s ease;
            user-select: none;
            -webkit-tap-highlight-color: transparent;
            outline: none;
            opacity: 0;
            visibility: hidden;
        }
        .back-to-top {
            bottom: 190px;
        }
        .back-to-bot {
            bottom: 70px;
        }
        .back-to-top.show, .back-to-bot.show {
            opacity: 1;
            visibility: visible;
        }
        .back-to-top:hover, .back-to-bot:hover {
            transform: scale(1.1);
            color: var(--toc-icon-active-color);
            background-color: var(--toc-icon-active-bg);
            border-color: var(--toc-icon-active-color);
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
    injectStyles(css);

    // 创建目录切换按钮
    const tocIcon = document.createElement('div');
    tocIcon.className = 'toc-icon';
    tocIcon.innerHTML =
      '<svg viewBox="0 0 24 24"><path d="M3 12h18M3 6h18M3 18h18"/></svg>';
    tocIcon.addEventListener('click', e => {
      e.stopPropagation();
      toggleTOC();
    });
    document.body.appendChild(tocIcon);

    // 创建滚动按钮的辅助函数
    const createButton = (className, innerHTML, onClick) => {
      const btn = document.createElement('button');
      btn.className = className;
      btn.innerHTML = innerHTML;
      btn.addEventListener('click', onClick);
      document.body.appendChild(btn);
      return btn;
    };

    const btnTop = createButton(
      'back-to-top',
      '<svg viewBox="0 0 24 24"><path d="M12 19V5M5 12l7-7 7 7"/></svg>',
      () => window.scrollTo({ top: 0, behavior: 'smooth' })
    );
    const btnBot = createButton(
      'back-to-bot',
      '<svg viewBox="0 0 24 24"><path d="M12 5v14M5 12l7 7 7-7"/></svg>',
      () =>
        window.scrollTo({
          top: document.documentElement.scrollHeight,
          behavior: 'smooth'
        })
    );

    // 更新滚动按钮显示状态
    const updateButtons = () => {
      const scrollTop = window.pageYOffset;
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      btnTop.classList.toggle('show', scrollTop > 100);
      btnBot.classList.toggle('show', scrollTop + windowHeight < documentHeight - 100);
    };

    window.addEventListener('scroll', () => {
      highlightTOC();
      updateButtons();
    });
    window.addEventListener('resize', updateButtons);
    updateButtons();

    // 点击页面其他区域时关闭目录
    document.addEventListener('click', e => {
      const toc = document.querySelector('.toc');
      if (toc?.classList.contains('show') && !toc.contains(e.target) && !e.target.classList.contains('toc-icon')) {
        toggleTOC();
      }
    });
  });
})();
