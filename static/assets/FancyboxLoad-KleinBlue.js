//不同博客记得修改 const fancyboxLink 字段中 fancybox.css 对应的链接位置

document.addEventListener("DOMContentLoaded", function() {
    ////////////////// 增加图片转换, 并适配图片懒加载 start ////////////////
    /**
     * 将原来的正则替换逻辑转为 DOM 操作：
     * 1. 查找 <p><a target="_blank" rel=...><img src="URL" ...></a></p>，
     *    检查 a.href 与 img.src 是否一致，然后用新的结构替换整个 <p>。
     * 2. 查找不在 <p> 中的 <a target="_blank" rel=...><img src="URL" ...></a>，同理替换。
     * 
     * 此处我们将真实图片地址写入 data-src 属性，同时不直接给 img 元素设置 src，
     * 以便于懒加载和让 Fancybox 通过 data-src 获取真实地址。
     */
    function replaceImageLinks() {
        // 处理 <p><a> 包裹的情况
        document.querySelectorAll('p > a[target="_blank"][rel] > img').forEach(function(img) {
            const a = img.parentElement;
            const p = a.parentElement;
            if (a.href && a.href === img.src) {
                const replacementHTML = `<div class="ImgLazyLoad-circle"></div><img data-fancybox="gallery" data-src="${a.href}" alt="">`;
                p.outerHTML = replacementHTML;
            }
        });
        // 处理不在 <p> 中的情况
        document.querySelectorAll('a[target="_blank"][rel] > img').forEach(function(img) {
            const a = img.parentElement;
            if (
                a.parentElement &&
                a.parentElement.tagName.toLowerCase() !== 'p' &&
                a.href &&
                a.href === img.src
            ) {
                const replacementHTML = `<div class="ImgLazyLoad-circle"></div><img data-fancybox="gallery" data-src="${a.href}" alt="">`;
                a.outerHTML = replacementHTML;
            }
        });
    }
    replaceImageLinks();
    ////////////////// 增加图片转换, 并适配图片懒加载 end ////////////////

    ////////////////// 懒加载图片 start ////////////////
    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    const imgContainer = img.previousElementSibling;
                    const handleError = (isError = false) => {
                        if (imgContainer && imgContainer.classList.contains('ImgLazyLoad-circle')) {
                            imgContainer.style.display = 'none';
                        }
                        if (isError) {
                            const errorContainer = document.createElement('div');
                            errorContainer.classList.add('Imgerror-container');
                            errorContainer.innerHTML = `
                                <svg xmlns="http://www.w3.org/2000/svg" style="height:60px;" class="Imgerror" viewBox="0 0 1024 1024">
                                <path fill="#ff5b5b" d="M320 896h-77.833L515.92 622.253a21.333 21.333 0 0 0 3.16-26.133l-89.427-149.053 165.427-330.86A21.333 21.333 0 0 0 576 85.333H96a53.393 53.393 0 0 0-53.333 53.334v746.666A53.393 53.393 0 0 0 96 938.667h224A21.333 21.333 0 0 0 320 896zM96 128h445.48L386.253 438.46a21.333 21.333 0 0 0 .787 20.513L474 603.86l-69.333 69.333-89.62-89.653a53.333 53.333 0 0 0-75.427 0L85.333 737.827v-599.16A10.667 10.667 0 0 1 96 128zM85.333 885.333v-87.166l184.46-184.454a10.667 10.667 0 0 1 15.08 0l89.627 89.62L181.833 896H96a10.667 10.667 0 0 1-10.667-10.667zm192-458.666C336.147 426.667 384 378.813 384 320s-47.853-106.667-106.667-106.667S170.667 261.187 170.667 320s47.853 106.667 106.666 106.667zm0-170.667a64 64 0 1 1-64 64 64.073 64.073 0 0 1 64-64zM928 128H661.333a21.333 21.333 0 0 0-19.08 11.793l-.046.087c-.04.087-.087.173-.127.253L535.587 353.127a21.333 21.333 0 1 0 38.16 19.08l100.773-201.54H928a10.667 10.667 0 0 1 10.667 10.666V652.5L783.713 497.54a53.333 53.333 0 0 0-75.426 0L571.08 634.747a21.333 21.333 0 0 0-3.153 26.153l24.666 41.08-203.646 244.36a21.333 21.333 0 0 0 16.386 34.993H928A53.393 53.393 0 0 0 981.333 928V181.333A53.393 53.393 0 0 0 928 128zm0 810.667H450.88L635.053 717.66a21.333 21.333 0 0 0 1.907-24.667l-23.933-39.886L738.46 527.68a10.667 10.667 0 0 1 15.08 0l185.127 185.153V928A10.667 10.667 0 0 1 928 938.667z"/>
                                </svg>
                                <p class="Imgerror-message">图片错误</p>
                            `;
                            img.parentNode.insertBefore(errorContainer, img.nextSibling);
                            img.style.display = 'none';
                        } else {
                            img.classList.remove('ImgLazyLoad-circle');
                            img.classList.add('ImgLoaded');
                        }
                    };

                    // 当图片进入可视区域时，从 data-src 中获取真实图片地址并赋值给 src
                    img.src = img.getAttribute('data-src');
                    observer.unobserve(img);

                    img.onload = () => handleError(false);
                    img.onerror = () => handleError(true);
                }
            });
        },
        {
            rootMargin: '0px 0px 500px 0px'
        }
    );

    // 观察所有带有 data-src 属性的图片
    document.querySelectorAll('[data-src]').forEach(img => observer.observe(img));
    ////////////////// 懒加载图片 end ////////////////

    ////////////////// Fancybox 绑定及配置 start ////////////////
    // 添加 Fancybox CSS
    const fancyboxLink = Object.assign(document.createElement('link'), {
        rel: 'stylesheet',
        href: 'https://planenalp.github.io/assets/fancybox.css' // 根据实际需要修改此链接
    });
    document.head.appendChild(fancyboxLink);

    // 绑定 Fancybox，并指定选项 srcAttr 为 "data-src"
    // 这样 Fancybox 在切换幻灯片时会优先使用 data-src 中的真实图片地址
    Fancybox.bind('[data-fancybox="gallery"]', {
        srcAttr: 'data-src'
    });
    ////////////////// Fancybox 绑定及配置 end ////////////////

});
