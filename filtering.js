
'use strict';

document.addEventListener('DOMContentLoaded', () => {
  const scope = document.querySelector('.main.filters');
  if (!scope) return; 

  const filterKeyTranslations = {
    genres: 'Genre',
    countries: 'Country',
    year: 'Year',
    rating: 'Rating',
  };

  const filterSystem = scope.querySelector('.filter-controls');
  const activeFiltersDisplay = scope.querySelector('#active-filters-display');
  const noFiltersMsg = scope.querySelector('#no-filters-msg');

  if (!filterSystem || !activeFiltersDisplay) return;

  const allSelects = Array.from(filterSystem.querySelectorAll('.filter-select'));

  const list =
    scope.querySelector('#series-list') ||
    scope.querySelector('#movies-list') ||
    scope.querySelector('#cartoons-list') ||
    scope.querySelector('.series-list') ||
    scope.querySelector('.cards-container');

  if (!list) return;

  const cards = Array.from(list.querySelectorAll('.series-card, .media-card'));
  if (!cards.length) return;

  const currentFilters = {};
  const norm = (v) => (v ?? '').toString().trim().toLowerCase();

  function normalizeYearFilter(raw) {
    const v = norm(raw);
    if (/^\d{4}$/.test(v)) {
      const decade = Math.floor(parseInt(v, 10) / 10) * 10;
      return `${decade}s`;
    }
    return v;
  }

  function applyFilters() {
    cards.forEach((card) => {
      let visible = true;

      for (const key in currentFilters) {
        const rawVal = currentFilters[key];
        if (!rawVal) continue;

        if (key === 'rating') {
          const required = parseFloat(rawVal);
          const actual = parseFloat(card.getAttribute('data-imdb-rating'));
          if (isNaN(actual) || actual < required) { visible = false; break; }
          continue;
        }

        const required = key === 'year' ? normalizeYearFilter(rawVal) : norm(rawVal);
        const attr = card.getAttribute(`data-${key}`);
        if (!attr) { visible = false; break; }

        const listVals = attr.split(',').map(norm).filter(Boolean);
        if (!listVals.includes(required)) { visible = false; break; }
      }

      card.classList.toggle('hidden', !visible);
    });
  }

  function updateActiveFiltersDisplay() {
    activeFiltersDisplay.innerHTML = '';
    let count = 0;

    for (const key in currentFilters) {
      const val = currentFilters[key];
      if (!val) continue;

      const selectEl = scope.querySelector(`#filter-${key}`);
      const keyText = filterKeyTranslations[key] || key;
      let text = val;

      if (selectEl) {
        const opt = selectEl.querySelector(`option[value="${val}"]`);
        if (opt) text = `${keyText}: ${opt.textContent}`;
      }

      const tag = document.createElement('span');
      tag.className = 'filter-tag';
      tag.innerHTML = `${text} <span data-filter-remove="${key}" aria-label="Remove filter" title="Remove filter">&times;</span>`;
      tag.querySelector('[data-filter-remove]').addEventListener('click', () => removeFilter(key));
      activeFiltersDisplay.appendChild(tag);
      count++;
    }

    if (noFiltersMsg) noFiltersMsg.style.display = count === 0 ? 'inline' : 'none';
    applyFilters();
  }

  function setFilter(key, value) {
    if (value) currentFilters[key] = value;
    else delete currentFilters[key];
    updateActiveFiltersDisplay();
  }

  function removeFilter(key) {
    delete currentFilters[key];
    const select = scope.querySelector(`#filter-${key}`);
    if (select) select.value = '';
    updateActiveFiltersDisplay();
  }

  allSelects.forEach((select) => {
    const key = select.getAttribute('data-filter-key');
    if (!key) return;
    if (select.value) currentFilters[key] = select.value;
    select.addEventListener('change', function () { setFilter(key, this.value); });
  });

  const resetBtn = scope.querySelector('#reset-filters-btn');
  if (resetBtn) {
    resetBtn.addEventListener('click', () => {
      for (const k in currentFilters) delete currentFilters[k];
      allSelects.forEach((s) => (s.value = ''));
      updateActiveFiltersDisplay();
    });
  }

  updateActiveFiltersDisplay();
});
