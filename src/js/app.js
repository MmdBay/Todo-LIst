let items = getSaveProducts()

const filters = {
    serachItems: '',
    avalible: false,
    sort: 'ByEdit'
}
renderItems(items, filters)

document.querySelector('#search').addEventListener('input', function(even) {
    filters.serachItems = even.target.value;
    items.filter(function(item) {
        if (item.title.includes(filters.serachItems) || even.target.value === '') {
            document.getElementById('not-found').textContent = '';
        } else {
            document.getElementById('not-found').textContent = 'چیزی یافت نشد'
        }
    })
    renderItems(items, filters)

})
renderItems(items, filters)

document.querySelector('#forms').addEventListener('submit', function(even) {
    even.preventDefault()
    if(even.target.elements.addTitles.value === ''){
        document.getElementById('small').textContent = 'لطفا چیزی تایپ کنید!'
    } else if (even.target.elements.addTitles.value !== '') {
        document.getElementById('small').textContent = '';
        const timed = moment().valueOf();
        const id = uuidv4();
        items.push({
            id: id,
            title: even.target.elements.addTitles.value,
            exist: true,
            created: moment().locale('fa').format('h:mm:ss a'),
            updated: timed
        })
    }
    saveProducts(items)
    renderItems(items, filters)
    even.target.elements.addTitles.value = ''
})

renderItems(items, filters)

document.getElementById('avalible-product').addEventListener('change', (e) => {
    filters.avalible = e.target.checked
    checkWorks(items.id)
    renderItems(items, filters)
    console.log(filters.avalible);
})

document.querySelector('#sort').addEventListener('change', (e) => {
    filters.sort = e.target.value
    renderItems(items, filters)
})
// music
let x = document.querySelector('#music')
let box = document.querySelector('.box')
let smallMusic = document.querySelector('.small-m')

smallMusic.textContent = 'Play Music'
box.addEventListener('click', (e) => {
    e.target.classList.toggle('add');
    if (x.paused) {
        x.play();
        smallMusic.textContent = 'Stop Music'
    } else {
        x.pause();
        smallMusic.textContent = 'Play Music'
    }
    x.addEventListener('ended', () => {
        e.target.classList.remove('add');
        smallMusic.textContent = 'Play Music'
    })

})

window.addEventListener('storage', (e) => {
    if (e.key === 'products') {
        items = JSON.parse(e.newValue)
        renderItems(items, filters)
    }
})
