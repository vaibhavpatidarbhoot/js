
document.addEventListener("DOMContentLoaded", function () {
  const _0xd6e8eb = document.getElementById("extract-form");
  const _0x46237d = document.getElementById("extract-error-area");
  const _0xff5235 = document.getElementById("backup-details");
  const _0x4b2f09 = document.getElementById("download-backup-btn");
  const _0x2afeb1 = document.getElementById("total-size");
  const _0x21bd8b = document.getElementById("total-images");
  const _0x37a8cf = document.getElementById("total-comments");
  _0xd6e8eb.addEventListener("submit", async function (_0x1607ab) {
    _0x1607ab.preventDefault();
    const _0x33faa9 = document.getElementById("post-url-input").value.trim();
    if (!_0x33faa9) {
      _0x46237d.textContent = "Please enter a valid Blogger URL!";
      return;
    }
    _0x46237d.textContent = '';
    const _0x3d5dd3 = _0xd6e8eb.querySelector(".btn-submit");
    _0x3d5dd3.disabled = true;
    _0x3d5dd3.innerHTML = "<i class=\"fas fa-spinner fa-spin\"></i> Generating...";
    try {
      let _0x1f7d63 = _0x33faa9;
      if (!_0x1f7d63.endsWith('/')) {
        _0x1f7d63 += '/';
      }
      _0x1f7d63 += "feeds/posts/default";
      const _0x4ced25 = await fetch("https://api.codetabs.com/v1/proxy?quest=" + encodeURIComponent(_0x1f7d63));
      if (!_0x4ced25.ok) {
        throw new Error("Failed to fetch data.");
      }
      const _0x52fe62 = await _0x4ced25.text();
      const _0x3d88f0 = new Blob([_0x52fe62], {
        'type': "application/xml"
      });
      const _0x7d1603 = URL.createObjectURL(_0x3d88f0);
      const _0x1f0e83 = _0x3d88f0.size / 1024;
      _0x2afeb1.textContent = _0x1f0e83 < 1024 ? _0x1f0e83.toFixed(2) + " KB" : (_0x1f0e83 / 1024).toFixed(2) + " MB";
      const _0x59ab69 = (_0x52fe62.match(/<img\s+[^>]*>/gi) || []).length;
      _0x21bd8b.textContent = _0x59ab69;
      const _0x4df464 = new DOMParser();
      const _0x316fa5 = _0x4df464.parseFromString(_0x52fe62, "application/xml");
      const _0xf65b3e = _0x316fa5.getElementsByTagName("thr:total").length;
      _0x37a8cf.textContent = _0xf65b3e;
      _0x4b2f09.href = _0x7d1603;
      _0xff5235.style.display = "block";
    } catch (_0x4732dc) {
      _0x46237d.textContent = _0x4732dc.message;
    } finally {
      _0x3d5dd3.disabled = false;
      _0x3d5dd3.innerHTML = "<i class=\"fas fa-download\"></i> Backup";
    }
  });
});
