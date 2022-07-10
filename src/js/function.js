const getSaveProducts = () => {
    const productsJSON = localStorage.getItem('products');
if (productsJSON !== null) {
   return JSON.parse(productsJSON)
} else {
    return []
}
}

const saveProducts = (item) => {
    localStorage.setItem('products', JSON.stringify(item))
}

const removeProducts = (id) => {
    const indexValue = items.findIndex(function(item) {
        return item.id === id
    })
    if (indexValue > -1) {
        items.splice(indexValue, 1)
    }
}

const checkWorks = (id) => {
    const backCheck = items.find((item) => {
        return item.id === id
    })
    if (backCheck !== undefined) {
        backCheck.exist = !backCheck.exist
    }
}

const sortWork = (items, sortBy) =>  {
    if (sortBy === 'ByEdit') {
        return items.sort((a, b) => {
            if (a.updated > b.updated) {
                return -1
            } else if (a.updated < b.updated) {
                return 1
            } else {
                return 0
            } 
        })
    } else if (sortBy === 'ByCreated') {
        return items.sort((a, b) => {
            if (a.created > b.created) {
                return -1
            } else if (a.created < b.created) {
                return 1
            } else {
                return 0
            } 
        })
    }
}

const renderItems = function(items, filters) {
    sortWork(items, filters.sort)
    let filteredItems = items.filter(function(item) {
        return item.title.toLowerCase().includes(filters.serachItems.toLowerCase())
    })

    filteredItems = filteredItems.filter((item) => {
        if(filters.avalible) {
            return item.exist
        } else {
            return true
        }
    })
    document.querySelector('#title').innerHTML = ''
    filteredItems.forEach(function (item) {
        document.querySelector('#title').appendChild(creatElements(item))
    });

}

const creatElements = function(element) {
    const itemEl = document.createElement('div');
    const checkWork = document.createElement('input')
    const textWork = document.createElement('span')
    const time = document.createElement('small')
    const editWork = document.createElement('a')
    const removeWork = document.createElement('button')


    checkWork.setAttribute('type', 'checkbox')
    checkWork.checked = !element.exist
    itemEl.appendChild(checkWork)
    checkWork.addEventListener('change', () => {
        checkWorks(element.id)
        saveProducts(items)
        renderItems(items, filters)
    })
    time.textContent = element.created
    itemEl.appendChild(time)

    textWork.textContent = element.title
    itemEl.appendChild(textWork)

    editWork.textContent = 'ویرایش'
    editWork.setAttribute('href',`./edit.html#${element.id}`)
    itemEl.appendChild(editWork)

    removeWork.textContent = 'X'
    itemEl.appendChild(removeWork)
    removeWork.addEventListener('click', function() {
        removeProducts(element.id)
        saveProducts(items)
        renderItems(items, filters)
    })
    return itemEl
}




const st = `background-color:rgb(136, 136, 255); color: greenyellow; padding: 8px; letter-spacing:5px; font-size:32px`
console.log('%c hi im Mmad Bay Js Developers', st);