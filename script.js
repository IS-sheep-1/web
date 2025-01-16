document.addEventListener('DOMContentLoaded', () => {
    // 年份和生肖判断
    const year = new Date().getFullYear();
    const zodiacTitle = getZodiacTitle(year);
    document.querySelector('.title-box h1').textContent = zodiacTitle;
    document.getElementById('currentYear').textContent = year;

    // 获取生肖年份标题
    function getZodiacTitle(year) {
        const zodiacAnimals = ['鼠', '牛', '虎', '兔', '龙', '蛇', '马', '羊', '猴', '鸡', '狗', '猪'];
        const zodiacIndex = (year - 4) % 12; // 以4年为鼠年起始
        return `${zodiacAnimals[zodiacIndex]}年大吉`;
    }

    // 祝福语切换效果
    const blessingItems = document.querySelectorAll('.blessing-item');
    let currentIndex = 0;

    function showBlessing(index) {
        blessingItems.forEach(item => item.classList.remove('active'));
        blessingItems[index].classList.add('active');
    }

    function nextBlessing() {
        currentIndex = (currentIndex + 1) % blessingItems.length;
        showBlessing(currentIndex);
    }

    // 初始显示
    showBlessing(0);
    setInterval(nextBlessing, 4000);

    // 时间显示
    function updateTime() {
        const now = new Date();
        
        // 格式化日期和时间
        const dateStr = now.toLocaleDateString('zh-CN', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit'
        }).replace(/\//g, '-');
        
        const timeStr = now.toLocaleTimeString('zh-CN', {
            hour: '2-digit',
            minute: '2-digit',
            hour12: false
        });
        
        // 添加3D效果的时间显示
        const solarTimeElement = document.querySelector('.solar-time');
        solarTimeElement.innerHTML = `
            <div class="time-unit">${dateStr}</div>
            <span class="time-separator">|</span>
            <div class="time-unit">${timeStr}</div>
        `;
    }

    updateTime();
    setInterval(updateTime, 1000);

    // 音乐播放初始化
    function initAudio() {
        const bgMusic = document.getElementById('bgMusic');
        const musicToggle = document.getElementById('musicToggle');

        // 尝试播放音乐
        function tryPlayMusic() {
            bgMusic.volume = 0.5;
            let playPromise = bgMusic.play();
            
            if (playPromise !== undefined) {
                playPromise.then(() => {
                    musicToggle.classList.remove('paused');
                }).catch(() => {
                    musicToggle.classList.add('paused');
                    // 添加点击播放提示
                    showPlayTip();
                });
            }
        }

        // 添加音乐播放提示
        function showPlayTip() {
            const tip = document.createElement('div');
            tip.className = 'play-tip';
            tip.textContent = '点击任意处播放音乐';
            document.body.appendChild(tip);

            // 点击任意处播放
            function playOnClick() {
                bgMusic.play();
                musicToggle.classList.remove('paused');
                tip.remove();
                document.removeEventListener('click', playOnClick);
            }

            document.addEventListener('click', playOnClick);
        }

        // 音乐控制
        musicToggle.addEventListener('click', (e) => {
            e.stopPropagation();
            if (bgMusic.paused) {
                bgMusic.play();
                musicToggle.classList.remove('paused');
            } else {
                bgMusic.pause();
                musicToggle.classList.add('paused');
            }
        });

        // 页面加载完成后尝试播放
        window.addEventListener('load', tryPlayMusic);
    }

    // 初始化
    document.addEventListener('DOMContentLoaded', initAudio);

    // 添加开始屏幕处理
    const startScreen = document.querySelector('.start-screen');
    startScreen.addEventListener('click', function() {
        // 播放音乐
        bgMusic.play();
        musicToggle.classList.remove('paused');
        // 隐藏开始屏幕
        startScreen.style.opacity = '0';
        setTimeout(() => {
            startScreen.style.display = 'none';
        }, 500);
    });

    // 添加加载状态检测
    window.addEventListener('load', () => {
        document.body.classList.add('loaded');
    });

    // 优化图片加载
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        if (img.complete) {
            img.classList.add('loaded');
        } else {
            img.addEventListener('load', () => {
                img.classList.add('loaded');
            });
        }
    });
});
