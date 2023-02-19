const bands = [
    { genre: 'Rap', band: 'Migos', albums: 2},
    { genre: 'Pop', band: 'Coldplay', albums: 4},
    { genre: 'Rock', band: 'Breaking Benjamins', albums: 1}
];
function compare(a, b) {
    // Dùng toUpperCase() để không phân biệt ký tự hoa thường
    const genreA = a.genre.toUpperCase();
    const genreB = b.genre.toUpperCase();

    let comparison = 0;
    if (genreA > genreB) {
        comparison = 1;
    } else if (genreA < genreB) {
        comparison = -1;
    }
    return comparison;
}

bands.sort(compare);

/* returns [
{ genre: 'Pop', band: 'Coldplay', albums: 4 },
{ genre: 'Rap', band: 'Migos', albums: 2 },
{ genre: 'Rock', band: 'Breaking Benjamins', albums: 1 }
] */
