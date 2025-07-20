function highlight(table) {
    const rows = table.tBodies[0].rows;
    for (let i = 0; i < rows.length; i++) {
        const row = rows[i];
        const cells = row.cells;
        
        const statusCell = cells[3];
        const genderCell = cells[2];
        const ageCell = cells[1];

        const available = statusCell.dataset.available;
        if (available === 'true') {
            row.classList.add('available');
        } else if (available === 'false') {
            row.classList.add('unavailable');
        } else {
            row.hidden = true;
        }
        
        const gender = genderCell.textContent;
        if (gender === 'm') {
            row.classList.add('male');
        } else if (gender === 'f') {
            row.classList.add('female');
        }
        
        const age = parseInt(ageCell.textContent, 10);
        if (!isNaN(age) && age < 18) {
            row.style.textDecoration = 'line-through';
        }
    }
}
