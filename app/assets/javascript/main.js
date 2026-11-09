// app/assets/javascript/main.js
document.addEventListener("DOMContentLoaded", function() {
  const repeatableGroups = document.querySelectorAll("[data-repeatable-group]");
  repeatableGroups.forEach(function(group) {
    const selector = group.dataset.repeatableSelector || "[data-repeatable-item]";
    const addButton = group.querySelector("[data-repeatable-add]");
    const firstItem = group.querySelector(selector);
    if (!addButton || !firstItem) return;
    const getItems = function() {
      return group.querySelectorAll(selector);
    };
    const getTitlePrefix = function(item) {
      const titleEl = item.querySelector("[data-repeatable-title]");
      if (!titleEl) return "Item";
      const raw = titleEl.textContent || "";
      return raw.replace(/\d+\s*$/, "").trim() || "Item";
    };
    const updateLabels = function() {
      const items = getItems();
      items.forEach(function(item, index) {
        const title = item.querySelector("[data-repeatable-title]");
        const removeButton = item.querySelector("[data-repeatable-remove]");
        const titlePrefix = getTitlePrefix(item);
        if (title) {
          title.textContent = titlePrefix + " " + (index + 1);
        }
        if (removeButton) {
          removeButton.disabled = items.length === 1;
          removeButton.setAttribute("aria-label", "Remove " + titlePrefix.toLowerCase() + " " + (index + 1));
          removeButton.hidden = items.length === 1;
        }
        item.querySelectorAll("input, select, textarea").forEach(function(field) {
          if (!field.name) return;
          field.name = field.name.replace(/\[\d+\]/, "[" + index + "]");
        });
      });
    };
    addButton.addEventListener("click", function() {
      const clone = firstItem.cloneNode(true);
      const inputs = clone.querySelectorAll("input, select, textarea");
      const newIndex = getItems().length;
      const titlePrefix = getTitlePrefix(firstItem);
      inputs.forEach(function(field) {
        field.value = "";
        if (!field.name) return;
        field.name = field.name.replace(/\[\d+\]/, "[" + newIndex + "]");
      });
      const title = clone.querySelector("[data-repeatable-title]");
      if (title) {
        title.textContent = titlePrefix + " " + (newIndex + 1);
      }
      group.querySelector("fieldset").appendChild(clone);
      updateLabels();
    });
    group.addEventListener("click", function(event) {
      const removeButton = event.target.closest("[data-repeatable-remove]");
      if (!removeButton) return;
      const item = removeButton.closest(selector);
      const items = getItems();
      if (item && items.length > 1) {
        item.remove();
        updateLabels();
      }
    });
    updateLabels();
  });
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vLi4vLi4vYXBwL2Fzc2V0cy9qYXZhc2NyaXB0L21haW4uanMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ0RPTUNvbnRlbnRMb2FkZWQnLCBmdW5jdGlvbiAoKSB7XG4gIGNvbnN0IHJlcGVhdGFibGVHcm91cHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCdbZGF0YS1yZXBlYXRhYmxlLWdyb3VwXScpXG5cbiAgcmVwZWF0YWJsZUdyb3Vwcy5mb3JFYWNoKGZ1bmN0aW9uIChncm91cCkge1xuICAgIGNvbnN0IHNlbGVjdG9yID0gZ3JvdXAuZGF0YXNldC5yZXBlYXRhYmxlU2VsZWN0b3IgfHwgJ1tkYXRhLXJlcGVhdGFibGUtaXRlbV0nXG4gICAgY29uc3QgYWRkQnV0dG9uID0gZ3JvdXAucXVlcnlTZWxlY3RvcignW2RhdGEtcmVwZWF0YWJsZS1hZGRdJylcbiAgICBjb25zdCBmaXJzdEl0ZW0gPSBncm91cC5xdWVyeVNlbGVjdG9yKHNlbGVjdG9yKVxuXG4gICAgaWYgKCFhZGRCdXR0b24gfHwgIWZpcnN0SXRlbSkgcmV0dXJuXG5cbiAgICBjb25zdCBnZXRJdGVtcyA9IGZ1bmN0aW9uICgpIHtcbiAgICAgIHJldHVybiBncm91cC5xdWVyeVNlbGVjdG9yQWxsKHNlbGVjdG9yKVxuICAgIH1cblxuICAgIGNvbnN0IGdldFRpdGxlUHJlZml4ID0gZnVuY3Rpb24gKGl0ZW0pIHtcbiAgICAgIGNvbnN0IHRpdGxlRWwgPSBpdGVtLnF1ZXJ5U2VsZWN0b3IoJ1tkYXRhLXJlcGVhdGFibGUtdGl0bGVdJylcbiAgICAgIGlmICghdGl0bGVFbCkgcmV0dXJuICdJdGVtJ1xuXG4gICAgICBjb25zdCByYXcgPSB0aXRsZUVsLnRleHRDb250ZW50IHx8ICcnXG4gICAgICByZXR1cm4gcmF3LnJlcGxhY2UoL1xcZCtcXHMqJC8sICcnKS50cmltKCkgfHwgJ0l0ZW0nXG4gICAgfVxuXG4gICAgY29uc3QgdXBkYXRlTGFiZWxzID0gZnVuY3Rpb24gKCkge1xuICAgICAgY29uc3QgaXRlbXMgPSBnZXRJdGVtcygpXG5cbiAgICAgIGl0ZW1zLmZvckVhY2goZnVuY3Rpb24gKGl0ZW0sIGluZGV4KSB7XG4gICAgICAgIGNvbnN0IHRpdGxlID0gaXRlbS5xdWVyeVNlbGVjdG9yKCdbZGF0YS1yZXBlYXRhYmxlLXRpdGxlXScpXG4gICAgICAgIGNvbnN0IHJlbW92ZUJ1dHRvbiA9IGl0ZW0ucXVlcnlTZWxlY3RvcignW2RhdGEtcmVwZWF0YWJsZS1yZW1vdmVdJylcbiAgICAgICAgY29uc3QgdGl0bGVQcmVmaXggPSBnZXRUaXRsZVByZWZpeChpdGVtKVxuXG4gICAgICAgIGlmICh0aXRsZSkge1xuICAgICAgICAgIHRpdGxlLnRleHRDb250ZW50ID0gdGl0bGVQcmVmaXggKyAnICcgKyAoaW5kZXggKyAxKVxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHJlbW92ZUJ1dHRvbikge1xuICAgICAgICAgIHJlbW92ZUJ1dHRvbi5kaXNhYmxlZCA9IGl0ZW1zLmxlbmd0aCA9PT0gMVxuICAgICAgICAgIHJlbW92ZUJ1dHRvbi5zZXRBdHRyaWJ1dGUoJ2FyaWEtbGFiZWwnLCAnUmVtb3ZlICcgKyB0aXRsZVByZWZpeC50b0xvd2VyQ2FzZSgpICsgJyAnICsgKGluZGV4ICsgMSkpXG4gICAgICAgICAgcmVtb3ZlQnV0dG9uLmhpZGRlbiA9IGl0ZW1zLmxlbmd0aCA9PT0gMVxuICAgICAgICB9XG5cbiAgICAgICAgaXRlbS5xdWVyeVNlbGVjdG9yQWxsKCdpbnB1dCwgc2VsZWN0LCB0ZXh0YXJlYScpLmZvckVhY2goZnVuY3Rpb24gKGZpZWxkKSB7XG4gICAgICAgICAgaWYgKCFmaWVsZC5uYW1lKSByZXR1cm5cbiAgICAgICAgICBmaWVsZC5uYW1lID0gZmllbGQubmFtZS5yZXBsYWNlKC9cXFtcXGQrXFxdLywgJ1snICsgaW5kZXggKyAnXScpXG4gICAgICAgIH0pXG4gICAgICB9KVxuICAgIH1cblxuICAgIGFkZEJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uICgpIHtcbiAgICAgIGNvbnN0IGNsb25lID0gZmlyc3RJdGVtLmNsb25lTm9kZSh0cnVlKVxuICAgICAgY29uc3QgaW5wdXRzID0gY2xvbmUucXVlcnlTZWxlY3RvckFsbCgnaW5wdXQsIHNlbGVjdCwgdGV4dGFyZWEnKVxuICAgICAgY29uc3QgbmV3SW5kZXggPSBnZXRJdGVtcygpLmxlbmd0aFxuICAgICAgY29uc3QgdGl0bGVQcmVmaXggPSBnZXRUaXRsZVByZWZpeChmaXJzdEl0ZW0pXG5cbiAgICAgIGlucHV0cy5mb3JFYWNoKGZ1bmN0aW9uIChmaWVsZCkge1xuICAgICAgICBmaWVsZC52YWx1ZSA9ICcnXG5cbiAgICAgICAgaWYgKCFmaWVsZC5uYW1lKSByZXR1cm5cbiAgICAgICAgZmllbGQubmFtZSA9IGZpZWxkLm5hbWUucmVwbGFjZSgvXFxbXFxkK1xcXS8sICdbJyArIG5ld0luZGV4ICsgJ10nKVxuICAgICAgfSlcblxuICAgICAgY29uc3QgdGl0bGUgPSBjbG9uZS5xdWVyeVNlbGVjdG9yKCdbZGF0YS1yZXBlYXRhYmxlLXRpdGxlXScpXG4gICAgICBpZiAodGl0bGUpIHtcbiAgICAgICAgdGl0bGUudGV4dENvbnRlbnQgPSB0aXRsZVByZWZpeCArICcgJyArIChuZXdJbmRleCArIDEpXG4gICAgICB9XG5cbiAgICAgIGdyb3VwLnF1ZXJ5U2VsZWN0b3IoJ2ZpZWxkc2V0JykuYXBwZW5kQ2hpbGQoY2xvbmUpXG4gICAgICB1cGRhdGVMYWJlbHMoKVxuICAgIH0pXG5cbiAgICBncm91cC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uIChldmVudCkge1xuICAgICAgY29uc3QgcmVtb3ZlQnV0dG9uID0gZXZlbnQudGFyZ2V0LmNsb3Nlc3QoJ1tkYXRhLXJlcGVhdGFibGUtcmVtb3ZlXScpXG5cbiAgICAgIGlmICghcmVtb3ZlQnV0dG9uKSByZXR1cm5cblxuICAgICAgY29uc3QgaXRlbSA9IHJlbW92ZUJ1dHRvbi5jbG9zZXN0KHNlbGVjdG9yKVxuICAgICAgY29uc3QgaXRlbXMgPSBnZXRJdGVtcygpXG5cbiAgICAgIGlmIChpdGVtICYmIGl0ZW1zLmxlbmd0aCA+IDEpIHtcbiAgICAgICAgaXRlbS5yZW1vdmUoKVxuICAgICAgICB1cGRhdGVMYWJlbHMoKVxuICAgICAgfVxuICAgIH0pXG5cbiAgICB1cGRhdGVMYWJlbHMoKVxuICB9KVxufSkiXSwKICAibWFwcGluZ3MiOiAiO0FBQUEsU0FBUyxpQkFBaUIsb0JBQW9CLFdBQVk7QUFDeEQsUUFBTSxtQkFBbUIsU0FBUyxpQkFBaUIseUJBQXlCO0FBRTVFLG1CQUFpQixRQUFRLFNBQVUsT0FBTztBQUN4QyxVQUFNLFdBQVcsTUFBTSxRQUFRLHNCQUFzQjtBQUNyRCxVQUFNLFlBQVksTUFBTSxjQUFjLHVCQUF1QjtBQUM3RCxVQUFNLFlBQVksTUFBTSxjQUFjLFFBQVE7QUFFOUMsUUFBSSxDQUFDLGFBQWEsQ0FBQyxVQUFXO0FBRTlCLFVBQU0sV0FBVyxXQUFZO0FBQzNCLGFBQU8sTUFBTSxpQkFBaUIsUUFBUTtBQUFBLElBQ3hDO0FBRUEsVUFBTSxpQkFBaUIsU0FBVSxNQUFNO0FBQ3JDLFlBQU0sVUFBVSxLQUFLLGNBQWMseUJBQXlCO0FBQzVELFVBQUksQ0FBQyxRQUFTLFFBQU87QUFFckIsWUFBTSxNQUFNLFFBQVEsZUFBZTtBQUNuQyxhQUFPLElBQUksUUFBUSxXQUFXLEVBQUUsRUFBRSxLQUFLLEtBQUs7QUFBQSxJQUM5QztBQUVBLFVBQU0sZUFBZSxXQUFZO0FBQy9CLFlBQU0sUUFBUSxTQUFTO0FBRXZCLFlBQU0sUUFBUSxTQUFVLE1BQU0sT0FBTztBQUNuQyxjQUFNLFFBQVEsS0FBSyxjQUFjLHlCQUF5QjtBQUMxRCxjQUFNLGVBQWUsS0FBSyxjQUFjLDBCQUEwQjtBQUNsRSxjQUFNLGNBQWMsZUFBZSxJQUFJO0FBRXZDLFlBQUksT0FBTztBQUNULGdCQUFNLGNBQWMsY0FBYyxPQUFPLFFBQVE7QUFBQSxRQUNuRDtBQUVBLFlBQUksY0FBYztBQUNoQix1QkFBYSxXQUFXLE1BQU0sV0FBVztBQUN6Qyx1QkFBYSxhQUFhLGNBQWMsWUFBWSxZQUFZLFlBQVksSUFBSSxPQUFPLFFBQVEsRUFBRTtBQUNqRyx1QkFBYSxTQUFTLE1BQU0sV0FBVztBQUFBLFFBQ3pDO0FBRUEsYUFBSyxpQkFBaUIseUJBQXlCLEVBQUUsUUFBUSxTQUFVLE9BQU87QUFDeEUsY0FBSSxDQUFDLE1BQU0sS0FBTTtBQUNqQixnQkFBTSxPQUFPLE1BQU0sS0FBSyxRQUFRLFdBQVcsTUFBTSxRQUFRLEdBQUc7QUFBQSxRQUM5RCxDQUFDO0FBQUEsTUFDSCxDQUFDO0FBQUEsSUFDSDtBQUVBLGNBQVUsaUJBQWlCLFNBQVMsV0FBWTtBQUM5QyxZQUFNLFFBQVEsVUFBVSxVQUFVLElBQUk7QUFDdEMsWUFBTSxTQUFTLE1BQU0saUJBQWlCLHlCQUF5QjtBQUMvRCxZQUFNLFdBQVcsU0FBUyxFQUFFO0FBQzVCLFlBQU0sY0FBYyxlQUFlLFNBQVM7QUFFNUMsYUFBTyxRQUFRLFNBQVUsT0FBTztBQUM5QixjQUFNLFFBQVE7QUFFZCxZQUFJLENBQUMsTUFBTSxLQUFNO0FBQ2pCLGNBQU0sT0FBTyxNQUFNLEtBQUssUUFBUSxXQUFXLE1BQU0sV0FBVyxHQUFHO0FBQUEsTUFDakUsQ0FBQztBQUVELFlBQU0sUUFBUSxNQUFNLGNBQWMseUJBQXlCO0FBQzNELFVBQUksT0FBTztBQUNULGNBQU0sY0FBYyxjQUFjLE9BQU8sV0FBVztBQUFBLE1BQ3REO0FBRUEsWUFBTSxjQUFjLFVBQVUsRUFBRSxZQUFZLEtBQUs7QUFDakQsbUJBQWE7QUFBQSxJQUNmLENBQUM7QUFFRCxVQUFNLGlCQUFpQixTQUFTLFNBQVUsT0FBTztBQUMvQyxZQUFNLGVBQWUsTUFBTSxPQUFPLFFBQVEsMEJBQTBCO0FBRXBFLFVBQUksQ0FBQyxhQUFjO0FBRW5CLFlBQU0sT0FBTyxhQUFhLFFBQVEsUUFBUTtBQUMxQyxZQUFNLFFBQVEsU0FBUztBQUV2QixVQUFJLFFBQVEsTUFBTSxTQUFTLEdBQUc7QUFDNUIsYUFBSyxPQUFPO0FBQ1oscUJBQWE7QUFBQSxNQUNmO0FBQUEsSUFDRixDQUFDO0FBRUQsaUJBQWE7QUFBQSxFQUNmLENBQUM7QUFDSCxDQUFDOyIsCiAgIm5hbWVzIjogW10KfQo=
