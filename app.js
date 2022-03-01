// GLOBAL VARIABLES

// ALERT
const myAlert = document.querySelector('.alert')

// DATA
const platform = document.querySelector('#platform')
const copy = document.querySelector('#copy')
let data = []

// TABLE
const loopData = document.querySelector('#loopData')

// ENCODE DECODE
const encodeInput = document.querySelector('#encode')
const decodeText = document.querySelector('.decodeText')

// MISC
let longTextCopy = decodeText.innerText
let htmlData = ''


// FUNCTIONS
const copyText = (val, isDecode = false) => {
    if(isDecode){
        navigator.clipboard.writeText(longTextCopy)
    }

    else navigator.clipboard.writeText(val.innerText)

    myAlert.style.display = 'block'
    setTimeout(() => {
        myAlert.style.display = 'none'
    }, 5000)
}

const checkId = (val) => {
    setLocalStorage(val.value)
    data = JSON.parse(window.atob(val.value))
    setTable()
}

const checkLocalStorage = () => {
    const ls = localStorage.getItem('uniqueId')
    if(ls){
        data = JSON.parse(window.atob(ls))
        setTable()
    }
}

const setUniqueId = () => {
    const ls = localStorage.getItem('uniqueId')
    longTextCopy = ls

    if(ls){
        decodeText.innerHTML = `
            <h3>
            ${ls.length >= 50 ? ls.slice(0, 50) + '. . .' : ls}
            <h3>
            `
    } else {
        decodeText.innerHTML = '<h3>Input Your ID</h3>'
    }
}

const setDefault = () => {
    encodeInput.value = ''
    platform.value = ''
    copy.value = ''
}

const setTable = () => {
    htmlData = ''
    data.forEach(el => {
        htmlData += `<tr>
        <td>
            <button disabled class="tdBtn disabledBtn">${el.platform}</button>
        </td>
        <td>
            <button onclick="copyText(this)" class="tdBtn copyBtn">${el.copy}</button>
        </td>
        <td>
            <button onclick="del('${el.id}')" class="delete">Delete</button>
        </td>
    </tr>`
    })

    loopData.innerHTML = htmlData

    if(data.length === 0){
        localStorage.removeItem('uniqueId')
    } else {
        setUniqueId()
    }
}

const setLocalStorage = (data) => {
    localStorage.setItem('uniqueId', data)
}

const search = () => {
    const input = document.getElementById('search')
    const filter = input.value.toLowerCase()
    const table = document.getElementById('table')
    const tr = table.getElementsByTagName('tr')

    for (let i = 0; i < tr.length; i++) {
        let td = tr[i].getElementsByTagName('td')
        for (let j = 0; j < td.length; j++) {
            let tdata = td[j];
            if (tdata) {
                if (tdata.innerHTML.toLowerCase().indexOf(filter) > -1) {
                    tr[i].style.display = "";
                    break;
                } else {
                    tr[i].style.display = "none";
                }
            }
        }
    }
}

const submit = () => {
    data.push(
        {
            id: `ID${Date.now()}`,
            platform: platform.value,
            copy: copy.value
        }
    )


    const encode = window.btoa(JSON.stringify(data))

    setLocalStorage(encode)
    setDefault()
    setTable()
}

const del = (_id) => {
    data = data.filter(el => {
        return el.id != _id
    })

    const encode = window.btoa(JSON.stringify(data))
    setLocalStorage(encode)
    setDefault()
    setTable()
}

setUniqueId()
checkLocalStorage()