const list = document.querySelector(".sorted-list");
const items = document.querySelectorAll(".item");

items.forEach(item => {
  item.addEventListener("dragstart", () => {
    item.classList.add("dragging");
  });

  item.addEventListener("dragend", () => {
    item.classList.remove("dragging");
  });
});

list.addEventListener("dragover", e => {
  e.preventDefault(); // allow drop
  const draggingItem = document.querySelector(".dragging");
  const afterElement = getDragAfterElement(list, e.clientY);

  if (afterElement == null) {
    list.appendChild(draggingItem);
  } else {
    list.insertBefore(draggingItem, afterElement);
  }
});

function getDragAfterElement(container, y) {
  const draggableElements = [...container.querySelectorAll(".item:not(.dragging)")];

  return draggableElements.reduce((closest, child) => {
    const box = child.getBoundingClientRect();
    const offset = y - box.top - box.height / 2;
    if (offset < 0 && offset > closest.offset) {
      return { offset: offset, element: child };
    } else {
      return closest;
    }
  }, { offset: Number.NEGATIVE_INFINITY }).element;
}
