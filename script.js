// 1. 初始化LeanCloud（替换成你自己的AppID、AppKey、服务器地址）
AV.init({
  appId: "zlyZA4RrlXy7xAeJTKpd7bTk-gzGzoHsz",
  appKey: "cEiz2mEe4h1dU0oQJ95ShRcM",
  serverURL: "https://zlyza4rr.lc-cn-n1-shared.com"
});

// 2. 提交打卡
document.getElementById('submitBtn').addEventListener('click', () => {
  const nickname = document.getElementById('nickname').value;
  const content = document.getElementById('content').value;

  if (!nickname || !content) {
    alert('昵称和内容都要填哦~');
    return;
  }

  // 创建打卡记录
  const CheckIn = AV.Object.extend('CheckIn');
  const checkIn = new CheckIn();
  checkIn.set('nickname', nickname);
  checkIn.set('content', content);

  // 保存到LeanCloud
  checkIn.save().then(() => {
    alert('打卡成功！');
    document.getElementById('nickname').value = '';
    document.getElementById('content').value = '';
    loadRecords(); // 刷新记录
  }).catch(err => {
    alert('提交失败：' + err.message);
  });
});

// 3. 加载历史打卡记录
function loadRecords() {
  const query = new AV.Query('CheckIn');
  query.descending('createdAt'); // 按时间倒序
  query.find().then(records => {
    const list = document.getElementById('recordList');
    list.innerHTML = records.map(item => {
      const time = item.get('createdAt').toLocaleString();
      return `<div class="record">
        <strong>${item.get('nickname')}</strong>（${time}）：
        <p>${item.get('content')}</p >
      </div>`;
    }).join('');
  });
}

// 页面加载时自动加载记录
window.onload = loadRecords;