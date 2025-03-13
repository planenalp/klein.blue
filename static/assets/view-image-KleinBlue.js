/**
 * ViewImage gzip compressed to just 2K, small and superb native Native JavaScript lightbox plugin
 *
 * @name ViewImage.js
 * @version 2.0.2
 * @author Tokinx
 * @license MIT License - http://www.opensource.org/licenses/mit-license.php
 *
 * For usage and examples, visit:
 * https://tokinx.github.io/ViewImage/
 *
 * Copyright (c) 2017, biji.io
 */
(() => {
    window.ViewImage = new function() {
        this.target = '[view-image] img';

        this.listener = (e) => {
            if (e.ctrlKey || e.metaKey || e.shiftKey || e.altKey) return;
            
            const _class = String(
                this.target.split(',').map(_ => `${_.trim()}:not([no-view])`)
            );
            const el = e.target.closest(_class);
            if (!el) return;

            const contain = el.closest('[view-image]') || document.body;
            const images = [...contain.querySelectorAll(_class)].map(_ => _.href || _.src);
            
            this.display(images, el.href || el.src);
            e.stopPropagation();
            e.preventDefault();
        };

        this.init = (val) => {
            if (val) this.target = val;
            
            ['removeEventListener', 'addEventListener'].forEach(method => {
                document[method]('click', this.listener, false);
            });
        };

        this.display = (images, src) => {
            let index = images.indexOf(src);
            
            const $el = new DOMParser().parseFromString(`
                <div class="view-image">
                    <style>
                        .view-image {
                            position: fixed;
                            inset: 0;
                            z-index: 500;
                            padding: 1rem;
                            display: flex;
                            flex-direction: column;
                            animation: view-image-in 300ms;
                            backdrop-filter: blur(20px);
                            -webkit-backdrop-filter: blur(20px);
                        }
                        .view-image__out {
                            animation: view-image-out 300ms;
                        }
                        @keyframes view-image-in {
                            0% { opacity: 0; }
                        }
                        @keyframes view-image-out {
                            100% { opacity: 0; }
                        }
                        .view-image-btn {
                            width: 32px;
                            height: 32px;
                            display: flex;
                            justify-content: center;
                            align-items: center;
                            cursor: pointer;
                            border-radius: 50%;
                            color: rgba(240, 246, 252, 0.1);
                            background-color: #21262db3;
                            border: 2px solid rgba(240, 246, 252, 0.1);
                            transition: transform 0.1s ease, opacity 0.1s ease;
                        }
                        .view-image-btn:hover {
                            transform: scale(1.1);
                            color: #8b949eb3;
                            background-color: #002fa7b3;
                            border-color: #8b949eb3;
                        }
                        .view-image-btn:active {
                            transform: scale(0.9); /* 按住时缩小 */
                        }
                        .view-image-btn svg{
                            width: 20px;
                            height: 20px;
                            fill: none; /* 设置 svg 内部不填充颜色（透明） */
                            stroke: currentColor; /* 想要即时切换只能用 currentColor 将描边颜色设置为当前文字颜色（继承父元素的颜色）*/
                            stroke-width: 4; /* 设置描边（线条）的宽度为 4 像素 */
                            stroke-linecap: round; /* 设置描边端点为圆形，使线条末端圆润 */
                            stroke-linejoin: round;  /* 设置线条转角为圆形，使角部更平滑 */
                        }
                        .view-image-close__full {
                            position: absolute;
                            inset: 0;
                            background-color: rgba(48, 55, 66, 0.3);
                            z-index: unset;
                            cursor: zoom-out;
                            margin: 0;
                        }
                        .view-image-container {
                            height: 0;
                            flex: 1;
                            display: flex;
                            align-items: center;
                            justify-content: center;
                        }
                        .view-image-lead {
                            display: contents;
                        }
                        .view-image-lead img {
                            position: relative;
                            z-index: 1;
                            max-width: 100%;
                            max-height: 100%;
                            object-fit: contain;
                            border-radius: 6px;
                        }
                        .view-image-lead__in img {
                            animation: view-image-lead-in 300ms;
                        }
                        .view-image-lead__out img {
                            animation: view-image-lead-out 300ms forwards;
                        }
                        @keyframes view-image-lead-in {
                            0% {
                                opacity: 0;
                                transform: translateY(-20px);
                            }
                        }
                        @keyframes view-image-lead-out {
                            100% {
                                opacity: 0;
                                transform: translateY(20px);
                            }
                        }
                        [class*="__out"] ~ .view-image-loading {
                            display: block;
                        }
                        .view-image-loading {
                            position: absolute;
                            inset: 50%;
                            width: 8rem;
                            height: 2rem;
                            color: #aab2bd;
                            overflow: hidden;
                            text-align: center;
                            margin: -1rem -4rem;
                            z-index: 1;
                            display: none;
                        }
                        .view-image-loading::after {
                            content: "";
                            position: absolute;
                            inset: 50% 0;
                            width: 100%;
                            height: 3px;
                            background: rgba(255, 255, 255, 0.5);
                            transform: translateX(-100%) translateY(-50%);
                            animation: view-image-loading 800ms -100ms ease-in-out infinite;
                        }
                        @keyframes view-image-loading {
                            0% { transform: translateX(-100%); }
                            100% { transform: translateX(100%); }
                        }
                        .view-image-tools {
                            position: relative;
                            display: flex;
                            justify-content: space-between;
                            align-content: center;
                            color: #fff;
                            max-width: 300px;
                            position: fixed;
                            bottom: 20px;
                            left: 1rem;
                            right: 1rem;
                            /* backdrop-filter: blur(5px); */
                            margin: 0 auto;
                            padding: 5px;
                            border-radius: 6px;
                            /* background: rgba(0, 0, 0, 0.1); */
                            background-color: #21262dcc;
                            border: 1px solid rgba(240, 246, 252, 0.1);
                            margin-bottom: constant(safe-area-inset-bottom);
                            margin-bottom: env(safe-area-inset-bottom);
                            z-index: 1;
                        }
                        .view-image-tools__count {
                            width: 60px;
                            display: flex;
                            align-items: center;
                            justify-content: center;
                            color: #8b949eb3;
                        }
                        .view-image-tools__flip {
                            display: flex;
                            gap: 10px;
                        }
                        .view-image-tools [class*="-close"] {
                            margin: 0 10px;
                        }
                    </style>
                    <div class="view-image-container">
                        <div class="view-image-lead"></div>
                        <div class="view-image-loading"></div>
                        <div class="view-image-close view-image-close__full"></div>
                    </div>
                    <div class="view-image-tools">
                        <div class="view-image-tools__count">
                            <span>
                                <b class="view-image-index">${index + 1}</b>/${images.length}
                            </span>
                        </div>
                        <div class="view-image-tools__flip">
                            <div class="view-image-btn view-image-tools__flip-prev">
                                <svg viewBox="0 0 48 48"><path d="M31 36L19 24L31 12"/></svg>
                            </div>
                            <div class="view-image-btn view-image-tools__flip-next">
                                <svg viewBox="0 0 48 48"><path d="M19 12L31 24L19 36"/></svg>
                            </div>
                        </div>
                        <div class="view-image-btn view-image-close">
                            <svg viewBox="0 0 48 48"><path d="M8 8L40 40M40 8L8 40"/></svg>
                        </div>
                    </div>
                </div>
            `, 'text/html').body.firstChild;

            const keyFn = (e) => {
                const keyMap = {
                    Escape: 'close',
                    ArrowLeft: 'tools__flip-prev',
                    ArrowRight: 'tools__flip-next'
                };
                if (keyMap[e.key]) {
                    $el.querySelector(`.view-image-${keyMap[e.key]}`).click();
                }
            };

            const loadImage = (src) => {
                const img = new Image();
                const $lead = $el.querySelector('.view-image-lead');
                
                $lead.className = "view-image-lead view-image-lead__out";
                
                setTimeout(() => {
                    $lead.innerHTML = "";
                    img.onload = () => {
                        setTimeout(() => {
                            $lead.innerHTML = `<img src="${img.src}" alt="ViewImage" no-view/>`;
                            $lead.className = "view-image-lead view-image-lead__in";
                        }, 100);
                    };
                    img.src = src;
                }, 300);
            };

            document.body.appendChild($el);
            loadImage(src);

            window.addEventListener("keydown", keyFn);
            
            $el.onclick = (e) => {
                if (e.target.closest('.view-image-close')) {
                    window.removeEventListener("keydown", keyFn);
                    $el.onclick = null;
                    $el.classList.add('view-image__out');
                    setTimeout(() => $el.remove(), 290);
                } else if (e.target.closest('.view-image-tools__flip')) {
                    index = e.target.closest('.view-image-tools__flip-prev') 
                        ? (index === 0 ? images.length - 1 : index - 1)
                        : (index === images.length - 1 ? 0 : index + 1);
                    
                    loadImage(images[index]);
                    $el.querySelector('.view-image-index').textContent = index + 1;
                }
            };
        };
    };
})();
