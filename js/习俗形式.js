// 道具展示轮播
let currentTool = 0;
const tools = document.querySelectorAll('.tool-item');

function showTool(index) {
    tools.forEach(tool => tool.classList.remove('active'));
    currentTool = (index + tools.length) % tools.length;
    tools[currentTool].classList.add('active');
}

document.querySelector('.next-tool').addEventListener('click', () => {
    showTool(currentTool + 1);
});

document.querySelector('.prev-tool').addEventListener('click', () => {
    showTool(currentTool - 1);
});

// 技巧解析标签页
document.querySelectorAll('.tab-btn').forEach(button => {
    button.addEventListener('click', () => {
        // 移除所有活动状态
        document.querySelectorAll('.tab-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        document.querySelectorAll('.tab-pane').forEach(pane => {
            pane.classList.remove('active');
        });
        
        // 添加活动状态到当前项
        button.classList.add('active');
        const tabId = button.getAttribute('data-tab');
        document.getElementById(tabId).classList.add('active');
    });
});

// 自动轮播道具展示
setInterval(() => {
    showTool(currentTool + 1);
}, 4000);
