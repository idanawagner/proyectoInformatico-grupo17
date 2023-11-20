document.addEventListener('DOMContentLoaded', function () {
    const table = document.getElementById('editable-table');

    table.addEventListener('click', function (event) {
        const targetCell = event.target;
        if (targetCell.classList.contains('editable')) {
            makeEditable(targetCell);
        }
    });

    table.addEventListener('blur', function (event) {
        const targetCell = event.target;
        if (targetCell.classList.contains('editing')) {
            makeNonEditable(targetCell);
        }
    }, true);

    function makeEditable(cell) {
        const content = cell.textContent;
        cell.innerHTML = `<input class="editing" type="text" value="${content}">`;
        cell.querySelector('input').focus();
    }

    function makeNonEditable(cell) {
        const input = cell.querySelector('input');
        cell.textContent = input.value;
    }
});