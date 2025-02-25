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

        // 设置初始音量
        bgMusic.volume = 0.7;

        // 添加多个事件监听来触发音频播放
        const playAudio = () => {
            bgMusic.play().then(() => {
                musicToggle.classList.remove('paused');
            }).catch(error => {
                console.log('播放失败:', error);
                musicToggle.classList.add('paused');
            });
        };

        // 监听各种用户交互事件
        const events = ['touchstart', 'click', 'touchend'];
        events.forEach(event => {
            document.addEventListener(event, function startAudio() {
                playAudio();
                events.forEach(e => document.removeEventListener(e, startAudio));
            }, { once: true });
        });

        // 音乐控制按钮点击事件
        musicToggle.addEventListener('click', function(e) {
            e.stopPropagation();
            if (bgMusic.paused) {
                playAudio();
            } else {
                bgMusic.pause();
                musicToggle.classList.add('paused');
            }
        });

        // 自动播放失败时显示提示
        bgMusic.addEventListener('error', () => {
            showPlayTip();
        });
    }

    // 添加播放提示
    function showPlayTip() {
        const tip = document.createElement('div');
        tip.className = 'play-tip';
        tip.textContent = '点击任意处播放音乐';
        document.body.appendChild(tip);
        
        setTimeout(() => {
            tip.remove();
        }, 3000);
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

    // 添加红包和金币生成函数
    function createLuckyItems() {
        const luckyContainer = document.querySelector('.lucky-items');
        const screenWidth = window.innerWidth;
        
        // 生成红包
        for(let i = 0; i < 20; i++) { // 增加数量到20个
            const redPacket = document.createElement('div');
            redPacket.className = 'red-packet';
            // 随机位置和延迟
            const left = Math.random() * 98; // 随机左边距
            const delay = Math.random() * 8; // 随机延迟
            const duration = 5 + Math.random() * 3; // 随机动画持续时间5-8秒
            
            redPacket.style.cssText = `
                left: ${left}%;
                animation-delay: ${delay}s;
                animation-duration: ${duration}s;
                transform: rotate(${Math.random() * 360}deg);
            `;
            
            luckyContainer.appendChild(redPacket);
        }
        
        // 生成金币
        for(let i = 0; i < 25; i++) { // 增加数量到25个
            const goldCoin = document.createElement('div');
            goldCoin.className = 'gold-coin';
            // 随机位置和延迟
            const left = Math.random() * 98;
            const delay = Math.random() * 8;
            const duration = 4 + Math.random() * 3; // 随机动画持续时间4-7秒
            
            goldCoin.style.cssText = `
                left: ${left}%;
                animation-delay: ${delay}s;
                animation-duration: ${duration}s;
                transform: rotate(${Math.random() * 360}deg);
            `;
            
            luckyContainer.appendChild(goldCoin);
        }
    }

    // 在页面加载时创建红包和金币
    createLuckyItems();
});
