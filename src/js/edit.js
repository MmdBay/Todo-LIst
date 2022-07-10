const editWork = document.querySelector('#edit-work');
const removeWork = document.querySelector('#remove-work');
const time = document.querySelector('#time')

const workId = location.hash.substring(1)

let items = getSaveProducts();

let itemEl = items.find(item => {
    return item.id === workId
})

if (itemEl === undefined) {
    location.assign('./index.html')
}

editWork.value = itemEl.title
time.textContent = `آخرین ویرایش : ${moment(itemEl.updated).locale('fa').fromNow()}`

editWork.addEventListener('input', (e) => {
    itemEl.title = e.target.value
    itemEl.updated = moment().valueOf()
    time.textContent = `آخرین ویرایش : ${moment(itemEl.updated).locale('fa').fromNow()}`
    saveProducts(items)
})

removeWork.addEventListener('click', (e) => {
    removeProducts(itemEl.id)
    saveProducts(items)
    location.assign('./index.html')
})

window.addEventListener('storage', (e) => {
    if (e.key === 'products') {
        items = JSON.parse(e.newValue)
        itemEl = items.find(item => {
            return item.id === workId
        })
        if (itemEl === undefined) {
            location.assign('./index.html')
        }
        editWork.value = itemEl.title
        time.textContent = `آخرین ویرایش : ${moment(itemEl.updated).locale('fa').fromNow()}`
    }
})