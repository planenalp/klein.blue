document.addEventListener("DOMContentLoaded", function() {
    // 加载viewImage.js库
    let viewImage = document.createElement('script');
    viewImage.src = 'https://klein.blue/assets/view-image-KleinBlue.js'; //加载上传的地址
    document.body.appendChild(viewImage);

    viewImage.onload = function() {
        let initial = document.createElement('script');
        initial.textContent = 'window.ViewImage && ViewImage.init(\'#content img\');';
        document.body.appendChild(initial);
    };
});
