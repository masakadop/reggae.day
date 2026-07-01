(function () {
  var regionSel = document.getElementById('f-region');
  var prefSel = document.getElementById('f-pref');
  var monthSel = document.getElementById('f-month');
  var weekdaySel = document.getElementById('f-weekday');
  var resetBtn = document.getElementById('f-reset');
  var cards = Array.prototype.slice.call(document.querySelectorAll('.event-card'));
  var resultCount = document.getElementById('result-count');
  var noResultMsg = document.getElementById('no-result-msg');

  if (!regionSel || !cards.length) return;

  var prefOptions = Array.prototype.slice.call(prefSel.querySelectorAll('option'));

  function syncPrefOptionsToRegion() {
    var region = regionSel.value;
    prefOptions.forEach(function (opt) {
      if (!opt.value) { opt.hidden = false; return; }
      var match = !region || opt.getAttribute('data-region') === region;
      opt.hidden = !match;
    });
    if (region && prefSel.value) {
      var current = prefSel.querySelector('option[value="' + prefSel.value + '"]');
      if (current && current.getAttribute('data-region') !== region) {
        prefSel.value = '';
      }
    }
  }

  function applyFilters() {
    var region = regionSel.value;
    var pref = prefSel.value;
    var month = monthSel.value;
    var weekday = weekdaySel.value;
    var visible = 0;

    cards.forEach(function (card) {
      var okRegion = !region || card.getAttribute('data-region') === region;
      var okPref = !pref || card.getAttribute('data-pref') === pref;
      var months = (card.getAttribute('data-months') || '').split(',').filter(Boolean);
      var okMonth = !month || months.indexOf(month) !== -1;
      var okWeekday = !weekday || card.getAttribute('data-weekday') === weekday;
      var show = okRegion && okPref && okMonth && okWeekday;
      card.hidden = !show;
      if (show) visible++;
    });

    resultCount.textContent = visible + ' 件表示中（全 ' + cards.length + ' 件）';
    noResultMsg.hidden = visible !== 0;
  }

  regionSel.addEventListener('change', function () {
    syncPrefOptionsToRegion();
    applyFilters();
  });
  prefSel.addEventListener('change', applyFilters);
  monthSel.addEventListener('change', applyFilters);
  weekdaySel.addEventListener('change', applyFilters);
  resetBtn.addEventListener('click', function () {
    regionSel.value = '';
    prefSel.value = '';
    monthSel.value = '';
    weekdaySel.value = '';
    syncPrefOptionsToRegion();
    applyFilters();
  });

  syncPrefOptionsToRegion();
  applyFilters();
})();
