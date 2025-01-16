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

        // 设置初始状态
        if (bgMusic.paused) {
            musicToggle.classList.add('paused');
        }

        // 音乐控制按钮点击事件
        musicToggle.addEventListener('click', function(e) {
            e.stopPropagation();
            if (bgMusic.paused) {
                bgMusic.volume = 1.0;
                bgMusic.play().then(() => {
                    musicToggle.classList.remove('paused');
                }).catch(error => {
                    console.log('播放失败:', error);
                    musicToggle.classList.add('paused');
                });
            } else {
                bgMusic.pause();
                musicToggle.classList.add('paused');
            }
        });

        // 添加音频加载错误处理
        bgMusic.addEventListener('error', (e) => {
            console.error('音频加载错误:', e);
            musicToggle.classList.add('paused');
        });
    }

    // 初始化音频
    initAudio();

    // 修改开始屏幕处理
    const startScreen = document.querySelector('.start-screen');
    if (startScreen) {
        startScreen.addEventListener('click', function() {
            const bgMusic = document.getElementById('bgMusic');
            const musicToggle = document.getElementById('musicToggle');
            
            // 使用用户交互来触发音频播放
            const playAudio = () => {
                bgMusic.volume = 1.0;
                bgMusic.play().then(() => {
                    musicToggle.classList.remove('paused');
                    document.removeEventListener('touchstart', playAudio);
                }).catch(error => {
                    console.log('播放失败:', error);
                    musicToggle.classList.add('paused');
                });
            };

            // 同时监听触摸和点击事件
            document.addEventListener('touchstart', playAudio, { once: true });
            playAudio();
            
            // 隐藏开始屏幕
            startScreen.style.opacity = '0';
            setTimeout(() => {
                startScreen.style.display = 'none';
            }, 500);
        });
    }

    // 添加页面可见性变化处理
    document.addEventListener('visibilitychange', () => {
        const bgMusic = document.getElementById('bgMusic');
        const musicToggle = document.getElementById('musicToggle');
        
        if (document.hidden) {
            // 页面隐藏时暂停音乐
            if (!bgMusic.paused) {
                bgMusic.pause();
                musicToggle.classList.add('paused');
            }
        }
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
