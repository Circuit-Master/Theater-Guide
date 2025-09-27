document.addEventListener('DOMContentLoaded', () => {
  const tooltip = document.getElementById('tooltip');
  const tipTitle = tooltip.querySelector('.title');
  const tipBody  = tooltip.querySelector('.body');
  const detailPane = document.getElementById('detail-pane');
  const detailTitle = document.getElementById('detail-title');
  const detailText = document.getElementById('detail-text');
  const closeBtn = document.getElementById('close-pane');

  function prettifyId(id) {
    if (!id) return '';
    return id
      .replace(/[_-]+/g, ' ')
      .replace(/\b\w/g, c => c.toUpperCase())
      .trim();
  }

  // Hover tooltips
  document.querySelectorAll('#mixer-svg .hotspot').forEach(el => {
    el.addEventListener('mousemove', e => {
      tooltip.style.left = (e.pageX + 12) + 'px';
      tooltip.style.top  = (e.pageY + 12) + 'px';

      const tt = el.dataset.tooltip || '';
      const fallbackTitle = prettifyId(el.id);

      let title = fallbackTitle;
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
      tooltip.classList.remove('visible');
    });

    // Open detail pane on click
    el.addEventListener('click', e => {
      e.stopPropagation();
      openDetail(el);
    });
  });

  // Open / Close detail pane
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

  // Global listeners
  document.addEventListener('click', e => {
    if (detailPane.classList.contains('active') && !detailPane.contains(e.target)) {
      closeDetail();
    }
  });

  closeBtn.addEventListener('click', closeDetail);

  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') closeDetail();
  });
});
