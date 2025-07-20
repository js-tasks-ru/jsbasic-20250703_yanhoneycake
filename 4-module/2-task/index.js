function makeDiagonalRed(table) {
    const rows = table.rows;

    for (let i = 0; i < rows.length; i++) {
        const cell = rows[i].cells[i];
        cell.style.backgroundColor = 'red';
    }
}
