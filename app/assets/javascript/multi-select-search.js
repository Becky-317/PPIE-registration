// app/assets/javascript/multi-select-search.js
(function() {
  document.documentElement.classList.add("js-enabled");
  var modules = document.querySelectorAll(
    '[data-module="searchable-checkboxes"]'
  );
  if (!modules.length) return;
  modules.forEach(function(container) {
    if (!(container instanceof HTMLElement)) return;
    var searchInput = container.querySelector('input[type="text"]');
    if (!(searchInput instanceof HTMLInputElement)) return;
    var listEl = container.querySelector("[data-js-hidden]");
    if (!(listEl instanceof HTMLElement)) return;
    var tagsList = container.querySelector('ul[id$="-tags"]');
    if (!(tagsList instanceof HTMLElement)) return;
    var noneTextEl = container.querySelector('p[id$="-none"]');
    if (!(noneTextEl instanceof HTMLElement)) return;
    var tagsId = container.getAttribute("data-tags-id");
    if (!tagsId) return;
    var showAllOptions = container.getAttribute("data-show-all-options") === "true";
    var items = container.querySelectorAll(".searchable-item");
    var checkboxes = container.querySelectorAll(
      'input[type="checkbox"]'
    );
    searchInput.addEventListener("input", function() {
      var term = searchInput.value.trim().toLowerCase();
      if (showAllOptions || term.length > 0) {
        listEl.classList.add("is-visible");
      } else {
        listEl.classList.remove("is-visible");
      }
      items.forEach(function(item) {
        if (!(item instanceof HTMLElement)) return;
        var label = item.dataset.label || "";
        item.style.display = label.indexOf(term) !== -1 ? "" : "none";
      });
    });
    function closeListAndReturnFocus() {
      listEl.classList.remove("is-visible");
      searchInput.focus();
      var val = searchInput.value;
      searchInput.value = "";
      searchInput.value = val;
    }
    searchInput.addEventListener("keydown", function(e) {
      if (e.key === "Escape") {
        e.preventDefault();
        closeListAndReturnFocus();
      }
    });
    listEl.addEventListener("keydown", function(e) {
      if (e.key === "Escape") {
        e.preventDefault();
        e.stopPropagation();
        closeListAndReturnFocus();
      }
    });
    function renderTags() {
      tagsList.innerHTML = "";
      var checked = container.querySelectorAll(
        'input[type="checkbox"]:checked'
      );
      var countEl = container.querySelector(
        '[id$="-tags-count"]'
      );
      if (countEl instanceof HTMLElement) {
        countEl.textContent = String(checked.length);
      }
      if (checked.length === 0) {
        noneTextEl.style.display = "";
        tagsList.style.display = "none";
      } else {
        noneTextEl.style.display = "none";
        tagsList.style.display = "";
      }
      checked.forEach(function(checkbox) {
        if (!(checkbox instanceof HTMLInputElement)) return;
        var labelEl = container.querySelector(
          'label[for="' + checkbox.id + '"]'
        );
        if (!(labelEl instanceof HTMLLabelElement)) return;
        var li = document.createElement("li");
        li.className = "nhsuk-tag nhsuk-tag--blue nhsuk-tag--filter nhsuk-u-margin-right-2";
        var text = document.createElement("span");
        text.className = "nhsuk-tag__text";
        text.textContent = labelEl.textContent.trim();
        var btn = document.createElement("button");
        btn.type = "button";
        btn.className = "nhsuk-tag__remove";
        btn.setAttribute(
          "aria-label",
          "Remove " + labelEl.textContent.trim()
        );
        btn.innerHTML = `
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            width="16"
            height="16"
            aria-hidden="true"
            focusable="false">
            <path d="M18.3 5.71a1 1 0 0 0-1.41 0L12 10.59 7.11 5.7A1 1 0 1 0 5.7 7.12L10.59 12l-4.9 4.89a1 1 0 0 0 1.42 1.41L12 13.41l4.89 4.9a1 1 0 0 0 1.41-1.42L13.41 12l4.9-4.89a1 1 0 0 0-.01-1.4z"></path>
          </svg>
        `;
        btn.addEventListener("click", function() {
          checkbox.checked = false;
          renderTags();
          searchInput.focus();
        });
        li.appendChild(text);
        li.appendChild(btn);
        tagsList.appendChild(li);
      });
    }
    checkboxes.forEach(function(cb) {
      if (cb instanceof HTMLInputElement) {
        cb.addEventListener("change", renderTags);
      }
    });
    if (showAllOptions) {
      listEl.classList.add("is-visible");
    }
    renderTags();
  });
})();
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vLi4vLi4vYXBwL2Fzc2V0cy9qYXZhc2NyaXB0L211bHRpLXNlbGVjdC1zZWFyY2guanMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbIihmdW5jdGlvbiAoKSB7XHJcbiAgZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LmNsYXNzTGlzdC5hZGQoJ2pzLWVuYWJsZWQnKTtcclxuXHJcbiAgdmFyIG1vZHVsZXMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFxyXG4gICAgJ1tkYXRhLW1vZHVsZT1cInNlYXJjaGFibGUtY2hlY2tib3hlc1wiXSdcclxuICApO1xyXG5cclxuICBpZiAoIW1vZHVsZXMubGVuZ3RoKSByZXR1cm47XHJcblxyXG4gIG1vZHVsZXMuZm9yRWFjaChmdW5jdGlvbiAoY29udGFpbmVyKSB7XHJcbiAgICBpZiAoIShjb250YWluZXIgaW5zdGFuY2VvZiBIVE1MRWxlbWVudCkpIHJldHVybjtcclxuXHJcbiAgICB2YXIgc2VhcmNoSW5wdXQgPSBjb250YWluZXIucXVlcnlTZWxlY3RvcignaW5wdXRbdHlwZT1cInRleHRcIl0nKTtcclxuXHJcbiAgICBpZiAoIShzZWFyY2hJbnB1dCBpbnN0YW5jZW9mIEhUTUxJbnB1dEVsZW1lbnQpKSByZXR1cm47XHJcblxyXG4gICAgdmFyIGxpc3RFbCA9IGNvbnRhaW5lci5xdWVyeVNlbGVjdG9yKCdbZGF0YS1qcy1oaWRkZW5dJyk7XHJcblxyXG4gICAgaWYgKCEobGlzdEVsIGluc3RhbmNlb2YgSFRNTEVsZW1lbnQpKSByZXR1cm47XHJcblxyXG4gICAgdmFyIHRhZ3NMaXN0ID0gY29udGFpbmVyLnF1ZXJ5U2VsZWN0b3IoJ3VsW2lkJD1cIi10YWdzXCJdJyk7XHJcblxyXG4gICAgaWYgKCEodGFnc0xpc3QgaW5zdGFuY2VvZiBIVE1MRWxlbWVudCkpIHJldHVybjtcclxuXHJcbiAgICB2YXIgbm9uZVRleHRFbCA9IGNvbnRhaW5lci5xdWVyeVNlbGVjdG9yKCdwW2lkJD1cIi1ub25lXCJdJyk7XHJcblxyXG4gICAgaWYgKCEobm9uZVRleHRFbCBpbnN0YW5jZW9mIEhUTUxFbGVtZW50KSkgcmV0dXJuO1xyXG5cclxuICAgIHZhciB0YWdzSWQgPSBjb250YWluZXIuZ2V0QXR0cmlidXRlKCdkYXRhLXRhZ3MtaWQnKTtcclxuXHJcbiAgICBpZiAoIXRhZ3NJZCkgcmV0dXJuO1xyXG5cclxuICAgIC8qXHJcbiAgICAgKiBDb25maWd1cmF0aW9uXHJcbiAgICAgKlxyXG4gICAgICogc2hvd0FsbE9wdGlvbnM6XHJcbiAgICAgKiBmYWxzZSA9IG9wdGlvbnMgcmVtYWluIGhpZGRlbiB1bnRpbCB0aGUgdXNlciBzZWFyY2hlc1xyXG4gICAgICogdHJ1ZSAgPSBvcHRpb25zIGFyZSB2aXNpYmxlIGltbWVkaWF0ZWx5IGFuZCBjYW4gYmUgc2Nyb2xsZWRcclxuICAgICAqL1xyXG4gICAgdmFyIHNob3dBbGxPcHRpb25zID1cclxuICAgICAgY29udGFpbmVyLmdldEF0dHJpYnV0ZSgnZGF0YS1zaG93LWFsbC1vcHRpb25zJykgPT09ICd0cnVlJztcclxuXHJcbiAgICB2YXIgaXRlbXMgPSBjb250YWluZXIucXVlcnlTZWxlY3RvckFsbCgnLnNlYXJjaGFibGUtaXRlbScpO1xyXG5cclxuICAgIHZhciBjaGVja2JveGVzID0gY29udGFpbmVyLnF1ZXJ5U2VsZWN0b3JBbGwoXHJcbiAgICAgICdpbnB1dFt0eXBlPVwiY2hlY2tib3hcIl0nXHJcbiAgICApO1xyXG5cclxuICAgIC8qIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gICAgICAgU0hPVyAvIEZJTFRFUiBMSVNUXHJcbiAgICAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gKi9cclxuXHJcbiAgICBzZWFyY2hJbnB1dC5hZGRFdmVudExpc3RlbmVyKCdpbnB1dCcsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgdmFyIHRlcm0gPSBzZWFyY2hJbnB1dC52YWx1ZS50cmltKCkudG9Mb3dlckNhc2UoKTtcclxuXHJcbiAgICAgIC8qXHJcbiAgICAgICAqIFdoZW4gc2hvd0FsbE9wdGlvbnMgaXMgZW5hYmxlZCwgdGhlIGxpc3QgcmVtYWluc1xyXG4gICAgICAgKiB2aXNpYmxlIHJlZ2FyZGxlc3Mgb2Ygd2hldGhlciB0aGVyZSBpcyBhIHNlYXJjaCB0ZXJtLlxyXG4gICAgICAgKlxyXG4gICAgICAgKiBXaGVuIGRpc2FibGVkLCB0aGUgZXhpc3RpbmcgYmVoYXZpb3VyIGlzIHJldGFpbmVkOlxyXG4gICAgICAgKiB0aGUgbGlzdCBvbmx5IGFwcGVhcnMgb25jZSB0aGUgdXNlciBzdGFydHMgdHlwaW5nLlxyXG4gICAgICAgKi9cclxuICAgICAgaWYgKHNob3dBbGxPcHRpb25zIHx8IHRlcm0ubGVuZ3RoID4gMCkge1xyXG4gICAgICAgIGxpc3RFbC5jbGFzc0xpc3QuYWRkKCdpcy12aXNpYmxlJyk7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgbGlzdEVsLmNsYXNzTGlzdC5yZW1vdmUoJ2lzLXZpc2libGUnKTtcclxuICAgICAgfVxyXG5cclxuICAgICAgaXRlbXMuZm9yRWFjaChmdW5jdGlvbiAoaXRlbSkge1xyXG4gICAgICAgIGlmICghKGl0ZW0gaW5zdGFuY2VvZiBIVE1MRWxlbWVudCkpIHJldHVybjtcclxuXHJcbiAgICAgICAgdmFyIGxhYmVsID0gaXRlbS5kYXRhc2V0LmxhYmVsIHx8ICcnO1xyXG5cclxuICAgICAgICBpdGVtLnN0eWxlLmRpc3BsYXkgPVxyXG4gICAgICAgICAgbGFiZWwuaW5kZXhPZih0ZXJtKSAhPT0gLTEgPyAnJyA6ICdub25lJztcclxuICAgICAgfSk7XHJcbiAgICB9KTtcclxuXHJcbiAgICAvKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICAgICAgIEVTQyBLRVkgPSBFWElUIExJU1RcclxuICAgIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSAqL1xyXG5cclxuICAgIGZ1bmN0aW9uIGNsb3NlTGlzdEFuZFJldHVybkZvY3VzKCkge1xyXG4gICAgICBsaXN0RWwuY2xhc3NMaXN0LnJlbW92ZSgnaXMtdmlzaWJsZScpO1xyXG5cclxuICAgICAgc2VhcmNoSW5wdXQuZm9jdXMoKTtcclxuXHJcbiAgICAgIHZhciB2YWwgPSBzZWFyY2hJbnB1dC52YWx1ZTtcclxuXHJcbiAgICAgIHNlYXJjaElucHV0LnZhbHVlID0gJyc7XHJcblxyXG4gICAgICBzZWFyY2hJbnB1dC52YWx1ZSA9IHZhbDtcclxuICAgIH1cclxuXHJcbiAgICBzZWFyY2hJbnB1dC5hZGRFdmVudExpc3RlbmVyKCdrZXlkb3duJywgZnVuY3Rpb24gKGUpIHtcclxuICAgICAgaWYgKGUua2V5ID09PSAnRXNjYXBlJykge1xyXG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICBjbG9zZUxpc3RBbmRSZXR1cm5Gb2N1cygpO1xyXG4gICAgICB9XHJcbiAgICB9KTtcclxuXHJcbiAgICBsaXN0RWwuYWRkRXZlbnRMaXN0ZW5lcigna2V5ZG93bicsIGZ1bmN0aW9uIChlKSB7XHJcbiAgICAgIGlmIChlLmtleSA9PT0gJ0VzY2FwZScpIHtcclxuICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcclxuICAgICAgICBjbG9zZUxpc3RBbmRSZXR1cm5Gb2N1cygpO1xyXG4gICAgICB9XHJcbiAgICB9KTtcclxuXHJcbiAgICAvKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICAgICAgIFJFTkRFUiBUQUdTICsgQ09VTlRcclxuICAgIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSAqL1xyXG5cclxuICAgIGZ1bmN0aW9uIHJlbmRlclRhZ3MoKSB7XHJcbiAgICAgIHRhZ3NMaXN0LmlubmVySFRNTCA9ICcnO1xyXG5cclxuICAgICAgdmFyIGNoZWNrZWQgPSBjb250YWluZXIucXVlcnlTZWxlY3RvckFsbChcclxuICAgICAgICAnaW5wdXRbdHlwZT1cImNoZWNrYm94XCJdOmNoZWNrZWQnXHJcbiAgICAgICk7XHJcblxyXG4gICAgICB2YXIgY291bnRFbCA9IGNvbnRhaW5lci5xdWVyeVNlbGVjdG9yKFxyXG4gICAgICAgICdbaWQkPVwiLXRhZ3MtY291bnRcIl0nXHJcbiAgICAgICk7XHJcblxyXG4gICAgICBpZiAoY291bnRFbCBpbnN0YW5jZW9mIEhUTUxFbGVtZW50KSB7XHJcbiAgICAgICAgY291bnRFbC50ZXh0Q29udGVudCA9IFN0cmluZyhjaGVja2VkLmxlbmd0aCk7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIC8qIFRvZ2dsZSBlbXB0eSBzdGF0ZSAqL1xyXG5cclxuICAgICAgaWYgKGNoZWNrZWQubGVuZ3RoID09PSAwKSB7XHJcbiAgICAgICAgbm9uZVRleHRFbC5zdHlsZS5kaXNwbGF5ID0gJyc7XHJcbiAgICAgICAgdGFnc0xpc3Quc3R5bGUuZGlzcGxheSA9ICdub25lJztcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICBub25lVGV4dEVsLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XHJcbiAgICAgICAgdGFnc0xpc3Quc3R5bGUuZGlzcGxheSA9ICcnO1xyXG4gICAgICB9XHJcblxyXG4gICAgICAvKiBSZW5kZXIgc2VsZWN0ZWQgdGFncyAqL1xyXG5cclxuICAgICAgY2hlY2tlZC5mb3JFYWNoKGZ1bmN0aW9uIChjaGVja2JveCkge1xyXG4gICAgICAgIGlmICghKGNoZWNrYm94IGluc3RhbmNlb2YgSFRNTElucHV0RWxlbWVudCkpIHJldHVybjtcclxuXHJcbiAgICAgICAgdmFyIGxhYmVsRWwgPSBjb250YWluZXIucXVlcnlTZWxlY3RvcihcclxuICAgICAgICAgICdsYWJlbFtmb3I9XCInICsgY2hlY2tib3guaWQgKyAnXCJdJ1xyXG4gICAgICAgICk7XHJcblxyXG4gICAgICAgIGlmICghKGxhYmVsRWwgaW5zdGFuY2VvZiBIVE1MTGFiZWxFbGVtZW50KSkgcmV0dXJuO1xyXG5cclxuICAgICAgICB2YXIgbGkgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdsaScpO1xyXG5cclxuICAgICAgICBsaS5jbGFzc05hbWUgPVxyXG4gICAgICAgICAgJ25oc3VrLXRhZyBuaHN1ay10YWctLWJsdWUgbmhzdWstdGFnLS1maWx0ZXIgbmhzdWstdS1tYXJnaW4tcmlnaHQtMic7XHJcblxyXG4gICAgICAgIHZhciB0ZXh0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3BhbicpO1xyXG5cclxuICAgICAgICB0ZXh0LmNsYXNzTmFtZSA9ICduaHN1ay10YWdfX3RleHQnO1xyXG5cclxuICAgICAgICB0ZXh0LnRleHRDb250ZW50ID0gbGFiZWxFbC50ZXh0Q29udGVudC50cmltKCk7XHJcblxyXG4gICAgICAgIHZhciBidG4gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdidXR0b24nKTtcclxuXHJcbiAgICAgICAgYnRuLnR5cGUgPSAnYnV0dG9uJztcclxuXHJcbiAgICAgICAgYnRuLmNsYXNzTmFtZSA9ICduaHN1ay10YWdfX3JlbW92ZSc7XHJcblxyXG4gICAgICAgIGJ0bi5zZXRBdHRyaWJ1dGUoXHJcbiAgICAgICAgICAnYXJpYS1sYWJlbCcsXHJcbiAgICAgICAgICAnUmVtb3ZlICcgKyBsYWJlbEVsLnRleHRDb250ZW50LnRyaW0oKVxyXG4gICAgICAgICk7XHJcblxyXG4gICAgICAgIGJ0bi5pbm5lckhUTUwgPSBgXHJcbiAgICAgICAgICA8c3ZnXHJcbiAgICAgICAgICAgIHhtbG5zPVwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIlxyXG4gICAgICAgICAgICB2aWV3Qm94PVwiMCAwIDI0IDI0XCJcclxuICAgICAgICAgICAgd2lkdGg9XCIxNlwiXHJcbiAgICAgICAgICAgIGhlaWdodD1cIjE2XCJcclxuICAgICAgICAgICAgYXJpYS1oaWRkZW49XCJ0cnVlXCJcclxuICAgICAgICAgICAgZm9jdXNhYmxlPVwiZmFsc2VcIj5cclxuICAgICAgICAgICAgPHBhdGggZD1cIk0xOC4zIDUuNzFhMSAxIDAgMCAwLTEuNDEgMEwxMiAxMC41OSA3LjExIDUuN0ExIDEgMCAxIDAgNS43IDcuMTJMMTAuNTkgMTJsLTQuOSA0Ljg5YTEgMSAwIDAgMCAxLjQyIDEuNDFMMTIgMTMuNDFsNC44OSA0LjlhMSAxIDAgMCAwIDEuNDEtMS40MkwxMy40MSAxMmw0LjktNC44OWExIDEgMCAwIDAtLjAxLTEuNHpcIj48L3BhdGg+XHJcbiAgICAgICAgICA8L3N2Zz5cclxuICAgICAgICBgO1xyXG5cclxuICAgICAgICBidG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICBjaGVja2JveC5jaGVja2VkID0gZmFsc2U7XHJcblxyXG4gICAgICAgICAgcmVuZGVyVGFncygpO1xyXG5cclxuICAgICAgICAgIHNlYXJjaElucHV0LmZvY3VzKCk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIGxpLmFwcGVuZENoaWxkKHRleHQpO1xyXG5cclxuICAgICAgICBsaS5hcHBlbmRDaGlsZChidG4pO1xyXG5cclxuICAgICAgICB0YWdzTGlzdC5hcHBlbmRDaGlsZChsaSk7XHJcbiAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIC8qIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gICAgICAgQ0hFQ0tCT1ggQ0hBTkdFXHJcbiAgICAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gKi9cclxuXHJcbiAgICBjaGVja2JveGVzLmZvckVhY2goZnVuY3Rpb24gKGNiKSB7XHJcbiAgICAgIGlmIChjYiBpbnN0YW5jZW9mIEhUTUxJbnB1dEVsZW1lbnQpIHtcclxuICAgICAgICBjYi5hZGRFdmVudExpc3RlbmVyKCdjaGFuZ2UnLCByZW5kZXJUYWdzKTtcclxuICAgICAgfVxyXG4gICAgfSk7XHJcblxyXG4gICAgLyogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAgICAgICBJTklUSUFMSVNFIExJU1RcclxuICAgIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSAqL1xyXG5cclxuICAgIC8qXHJcbiAgICAgKiBJZiBzaG93QWxsT3B0aW9ucyBpcyBlbmFibGVkLCBkaXNwbGF5IHRoZVxyXG4gICAgICogY2hlY2tib3ggbGlzdCBpbW1lZGlhdGVseS5cclxuICAgICAqL1xyXG4gICAgaWYgKHNob3dBbGxPcHRpb25zKSB7XHJcbiAgICAgIGxpc3RFbC5jbGFzc0xpc3QuYWRkKCdpcy12aXNpYmxlJyk7XHJcbiAgICB9XHJcblxyXG4gICAgcmVuZGVyVGFncygpO1xyXG4gIH0pO1xyXG59KSgpOyJdLAogICJtYXBwaW5ncyI6ICI7Q0FBQyxXQUFZO0FBQ1gsV0FBUyxnQkFBZ0IsVUFBVSxJQUFJLFlBQVk7QUFFbkQsTUFBSSxVQUFVLFNBQVM7QUFBQSxJQUNyQjtBQUFBLEVBQ0Y7QUFFQSxNQUFJLENBQUMsUUFBUSxPQUFRO0FBRXJCLFVBQVEsUUFBUSxTQUFVLFdBQVc7QUFDbkMsUUFBSSxFQUFFLHFCQUFxQixhQUFjO0FBRXpDLFFBQUksY0FBYyxVQUFVLGNBQWMsb0JBQW9CO0FBRTlELFFBQUksRUFBRSx1QkFBdUIsa0JBQW1CO0FBRWhELFFBQUksU0FBUyxVQUFVLGNBQWMsa0JBQWtCO0FBRXZELFFBQUksRUFBRSxrQkFBa0IsYUFBYztBQUV0QyxRQUFJLFdBQVcsVUFBVSxjQUFjLGlCQUFpQjtBQUV4RCxRQUFJLEVBQUUsb0JBQW9CLGFBQWM7QUFFeEMsUUFBSSxhQUFhLFVBQVUsY0FBYyxnQkFBZ0I7QUFFekQsUUFBSSxFQUFFLHNCQUFzQixhQUFjO0FBRTFDLFFBQUksU0FBUyxVQUFVLGFBQWEsY0FBYztBQUVsRCxRQUFJLENBQUMsT0FBUTtBQVNiLFFBQUksaUJBQ0YsVUFBVSxhQUFhLHVCQUF1QixNQUFNO0FBRXRELFFBQUksUUFBUSxVQUFVLGlCQUFpQixrQkFBa0I7QUFFekQsUUFBSSxhQUFhLFVBQVU7QUFBQSxNQUN6QjtBQUFBLElBQ0Y7QUFNQSxnQkFBWSxpQkFBaUIsU0FBUyxXQUFZO0FBQ2hELFVBQUksT0FBTyxZQUFZLE1BQU0sS0FBSyxFQUFFLFlBQVk7QUFTaEQs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
