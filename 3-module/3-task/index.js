function camelize(str) {
    return str.split('-').map((elem, index) => 
        index === 0 ? elem : elem.charAt(0).toUpperCase() + elem.slice(1))
        .join('');
}
