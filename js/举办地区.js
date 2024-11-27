let currentSlide = 0;
const slides = document.querySelectorAll('.slider img');

function showSlide(index) {
    slides.forEach(slide => slide.classList.remove('active'));
    currentSlide = (index + slides.length) % slides.length;
    slides[currentSlide].classList.add('active');
}

function nextSlide() {
    showSlide(currentSlide + 1);
}

function prevSlide() {
    showSlide(currentSlide - 1);
}

// 自动播放
setInterval(nextSlide, 3000);

// 地区切换功能
document.addEventListener('DOMContentLoaded', function() {
    // 为每个地区按钮添加点击事件
    document.querySelectorAll('.region-list li').forEach(item => {
        item.addEventListener('click', function() {
            // 移除所有按钮的active类
            document.querySelectorAll('.region-list li').forEach(li => {
                li.classList.remove('active');
            });
            
            // 添加active类到当前点击的按钮
            this.classList.add('active');
            
            // 获取当前点击的地区
            const region = this.getAttribute('data-region');
            
            // 隐藏所有地区卡片
            document.querySelectorAll('.region-card').forEach(card => {
                card.classList.remove('active');
            });
            
            // 显示对应地区的卡片
            const targetCard = document.getElementById(`${region}-detail`);
            if (targetCard) {
                targetCard.classList.add('active');
            }
        });
    });
});

// 添加地图交互功能
document.addEventListener('DOMContentLoaded', function() {
    const map = document.getElementById('distribution-map');
    
    // 设置地图背景
    map.style.backgroundImage = "url('./img/china-map.png')";
    map.style.backgroundSize = "contain";
    map.style.backgroundPosition = "center";
    map.style.backgroundRepeat = "no-repeat";
    
    // 添加地标点
    const locations = [
        { city: '长沙', left: '55%', top: '60%' },
        { city: '武汉', left: '58%', top: '55%' },
        { city: '南昌', left: '62%', top: '58%' },
        { city: '成都', left: '45%', top: '58%' }
    ];
    
    locations.forEach(location => {
        const marker = document.createElement('div');
        marker.className = 'map-marker';
        marker.innerHTML = `
            <div class="marker-dot"></div>
            <div class="marker-label">${location.city}</div>
        `;
        marker.style.left = location.left;
        marker.style.top = location.top;
        map.appendChild(marker);
    });
});

// 日历功能
function generateCalendar() {
    const calendar = document.getElementById('calendar-days');
    const date = new Date();
    const year = date.getFullYear();
    const month = date.getMonth();
    const today = date.getDate();
    
    // 更新月份显示
    document.getElementById('current-month').textContent = 
        `${year}年${month + 1}月`;
    
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const firstDay = new Date(year, month, 1).getDay();
    
    let calendarHTML = '<div class="calendar-grid">';
    
    // 添加星期头部
    const weekDays = ['日', '一', '二', '三', '四', '五', '六'];
    weekDays.forEach(day => {
        calendarHTML += `<div class="calendar-cell header">${day}</div>`;
    });
    
    // 添加空白天数
    for(let i = 0; i < firstDay; i++) {
        calendarHTML += '<div class="calendar-cell empty"></div>';
    }
    
    // 模拟一些活动日期和活动内容
    const events = {
        5: { title: '太平街打铁花表演', time: '19:00-21:00' },
        12: { title: '坡子街民俗展演', time: '18:30-20:30' },
        15: { title: '元宵节特别演出', time: '19:30-21:30' },
        20: { title: '非遗传承展示', time: '19:00-20:30' },
        25: { title: '传统艺术汇演', time: '18:00-20:00' }
    };
    
    // 添加月份天数
    for(let i = 1; i <= daysInMonth; i++) {
        let classes = 'calendar-cell';
        if (i === today) {
            classes += ' today';
        }
        if (events[i]) {
            classes += ' has-event';
        }
        calendarHTML += `<div class="${classes}" data-date="${i}" data-event='${events[i] ? JSON.stringify(events[i]) : ""}'>${i}</div>`;
    }
    
    calendarHTML += '</div>';
    calendar.innerHTML = calendarHTML;

    // 添加点击事件监听
    const cells = calendar.querySelectorAll('.calendar-cell:not(.empty):not(.header)');
    cells.forEach(cell => {
        cell.addEventListener('click', function() {
            const eventData = this.dataset.event;
            if (eventData) {
                const event = JSON.parse(eventData);
                showEventDetails(this.dataset.date, event);
            }
        });
    });
}

// 显示活动详情
function showEventDetails(date, event) {
    // 移除已存在的详情框
    const existingPopup = document.querySelector('.event-popup');
    if (existingPopup) {
        existingPopup.remove();
    }

    // 创建详情弹窗
    const popup = document.createElement('div');
    popup.className = 'event-popup';
    popup.innerHTML = `
        <div class="event-popup-content">
            <h4>${currentMonth + 1}月${date}日活动详情</h4>
            <p class="event-title">${event.title}</p>
            <p class="event-time">时间：${event.time}</p>
            <button class="close-popup">关闭</button>
        </div>
    `;

    // 添加到页面
    document.querySelector('.calendar-container').appendChild(popup);

    // 添加关闭按钮事件
    popup.querySelector('.close-popup').addEventListener('click', () => {
        popup.remove();
    });
}

// 添加月份切换功能
let currentMonth = new Date().getMonth();
let currentYear = new Date().getFullYear();

document.querySelector('.prev-month').addEventListener('click', () => {
    currentMonth--;
    if (currentMonth < 0) {
        currentMonth = 11;
        currentYear--;
    }
    updateCalendar();
});

document.querySelector('.next-month').addEventListener('click', () => {
    currentMonth++;
    if (currentMonth > 11) {
        currentMonth = 0;
        currentYear++;
    }
    updateCalendar();
});

function updateCalendar() {
    const date = new Date(currentYear, currentMonth);
    document.getElementById('current-month').textContent = 
        `${date.getFullYear()}年${date.getMonth() + 1}月`;
    generateCalendar();
}

// 预约表单提交处理
document.getElementById('experience-form').addEventListener('submit', function(e) {
    e.preventDefault();
    alert('预约提交成功！我们会尽快与您联系确认。');
    this.reset();
});

// 页面加载时初始化日历
document.addEventListener('DOMContentLoaded', function() {
    generateCalendar();
});