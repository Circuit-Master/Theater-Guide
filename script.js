document.addEventListener('DOMContentLoaded', () => {
  const tooltip = document.getElementById('tooltip');
  const tipTitle = tooltip?.querySelector('.title');
  const tipBody  = tooltip?.querySelector('.body');
  const detailPane = document.getElementById('detail-pane');
  const detailTitle = document.getElementById('detail-title');
  const detailText = document.getElementById('detail-text');
  const closeBtn = document.getElementById('close-pane');

  function prettifyId(id) {
    if (!id) return '';
    return id.replace(/[_-]+/g, ' ')
             .replace(/\b\w/g, c => c.toUpperCase())
             .trim();
  }

  document.querySelectorAll('#mixer-svg .hotspot').forEach(el => {
    el.addEventListener('mousemove', e => {
      if (!tooltip) return;
      tooltip.style.left = (e.pageX + 12) + 'px';
      tooltip.style.top  = (e.pageY + 12) + 'px';

      const tt = el.dataset.tooltip || '';
      let title = prettifyId(el.id);
      let body = tt;

      if (tt.includes('—') || tt.includes(':')) {
        const parts = tt.split(/—|:/);
        title = parts[0].trim();
        body = parts.slice(1).join(':').trim();
      }

      tipTitle.textContent = title;
      tipBody.textContent = body;
      tooltip.classList.add('visible');
    });

    el.addEventListener('mouseleave', () => {
      tooltip?.classList.remove('visible');
    });

    el.addEventListener('click', e => {
      e.stopPropagation();
      openDetail(el);
    });
  });

  function openDetail(el) {
    detailTitle.textContent = prettifyId(el.id);
    detailText.textContent = el.dataset.detail || el.dataset.tooltip || '';
    detailPane.classList.add('active');
    detailPane.setAttribute('aria-hidden', 'false');
  }

  function closeDetail() {
    detailPane.classList.remove('active');
    detailPane.setAttribute('aria-hidden', 'true');
  }

  closeBtn?.addEventListener('click', closeDetail);

  document.addEventListener('click', e => {
    if (detailPane.classList.contains('active') && !detailPane.contains(e.target)) {
      closeDetail();
    }
  });

  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') closeDetail();
  });
});
document.addEventListener('DOMContentLoaded', () => {
  const mixingContainer = document.getElementById('mixing-guide');

  if (mixingContainer) {
    fetch('resources/mixing-guide.txt')
      .then(res => res.text())
      .then(text => {
        // Parse Discord-style Markdown to HTML
        mixingContainer.innerHTML = marked.parse(text);
      })
      .catch(err => {
        mixingContainer.textContent = 'Error loading mixing guide.';
        console.error(err);
      });
  }
});
