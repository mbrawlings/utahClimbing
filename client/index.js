const climbSubmitBtn = document.getElementById('submitClimbBtn')
const submitChangesBtn = document.getElementById('submitEdit')

function createFavClimb(e) {
    e.preventDefault()
    document.getElementById('climbsContainer').innerHTML = ''
    let climbObj = {
        fName: document.getElementById('fName').value,
        lName: document.getElementById('lName').value,
        climbName: document.getElementById('climbName').value,
        grade: document.getElementById('grade').value,
        location: document.getElementById('location').value,
        forumImage: document.getElementById('forumImage').value,
        info: document.getElementById('info').value
    }
    if (checkInputs(climbObj)) {
        axios.post('/forumPost', climbObj)
        .then(res => {
            data = res.data
            // console.log(data)
        })
        document.getElementById('fName').value = ''
        document.getElementById('lName').value = ''
        document.getElementById('climbName').value = ''
        document.getElementById('grade').value = 'V0'
        document.getElementById('location').value = ''
        document.getElementById('forumImage').value = ''
        document.getElementById('info').value = ''
    
        // document.getElementById('climbSubmit').classList.add('hidden') // hides data entry form
    }
    getClimbs(e)
}

function getClimbs(e) {
    e.preventDefault()
    axios.get('/getClimbs')
    .then(res => {
        data = res.data
        printToBrowser(data)
    })
}

function checkInputs(climbObj) {
    let { fName, lName, climbName, location, forumImage, info } = climbObj
    let message = `Your favorite climb is still missing:`
    let response = true
    if (fName === '') {
        message += `\na first name`
        response = false
    }
    if (lName === '') {
        message += `\na last name`
        response = false
    }
    if (climbName === '') {
        message += `\na climb name`
        response = false
    }
    if (location === '') {
        message += `\na location`
        response = false
    }
    if (forumImage === '') {
        message += `\na picture`
        response = false
    }
    if (info === '') {
        message += `\nsome info`
        response = false
    }
    if (response === false) {
        alert(message)
    }
    return response
}

function deleteClimb(e) {
    e.preventDefault()
    document.getElementById('climbsContainer').innerHTML = ''
    let id = e.target.getAttribute('backendId')
    axios.delete(`/deleteClimb/${id}`)
    .then(res => {
        data = res.data
        // printToBrowser(data)
    })
    // document.getElementById('climbSubmit').classList.remove('hidden') // shows data entry form
    document.getElementById('submitClimbBtn').classList.remove('hidden') // shows submit btn
    document.getElementById('submitEdit').classList.add('hidden') // hides submit changes btn

    document.getElementById('fName').value = ''
    document.getElementById('lName').value = ''
    document.getElementById('climbName').value = ''
    document.getElementById('grade').value = 'V0'
    document.getElementById('location').value = ''
    document.getElementById('forumImage').value = ''
    document.getElementById('info').value = ''

    getClimbs(e)
}

function editClimb(e) {
    e.preventDefault()
    let id = e.target.getAttribute('backendIdToEdit')
    axios.get(`/editClimb/?id= ${id}`)
    .then(res => {
        data = res.data
        // document.getElementById('climbSubmit').classList.remove('hidden') // shows data entry form

        document.getElementById('fName').value = `${data[0].first_name}`
        document.getElementById('lName').value = `${data[0].last_name}`
        document.getElementById('climbName').value = `${data[0].climb_name}`
        document.getElementById('grade').value = `${data[0].grade}`
        document.getElementById('location').value = `${data[0].location}`
        document.getElementById('forumImage').value = `${data[0].image}`
        document.getElementById('info').value = `${data[0].info}`

        document.getElementById('submitClimbBtn').classList.add('hidden') // hides submit btn
        document.getElementById('submitEdit').classList.remove('hidden') // shows submit changes btn
        document.getElementById(`edit${id}`).classList.add('hidden') // hides edit btn

        document.getElementById('submitEdit').setAttribute('current-id', id)
    })
    document.body.scrollTop = document.documentElement.scrollTop = 0;
}

function submitEdits(e) {
    e.preventDefault()
    document.getElementById('climbsContainer').innerHTML = ''
    let id = e.target.getAttribute('current-id')
    let climbObj = {
        fName: document.getElementById('fName').value,
        lName: document.getElementById('lName').value,
        climbName: document.getElementById('climbName').value,
        grade: document.getElementById('grade').value,
        location: document.getElementById('location').value,
        forumImage: document.getElementById('forumImage').value,
        info: document.getElementById('info').value
    }
    axios.put(`/submitEdits/${id}`, climbObj)
    .then(res => {
        data = res.data
        document.getElementById('fName').value = ''
        document.getElementById('lName').value = ''
        document.getElementById('climbName').value = ''
        document.getElementById('grade').value = 'V0'
        document.getElementById('location').value = ''
        document.getElementById('forumImage').value = ''
        document.getElementById('info').value = ''

        document.getElementById('submitClimbBtn').classList.remove('hidden') // shows submit btn
        document.getElementById('submitEdit').classList.add('hidden') // hides submit changes btn
        
        // document.getElementById('climbSubmit').classList.add('hidden') // hides data entry form
    })
    getClimbs(e)
}

function printToBrowser(data) {
    for (let i = 0; i < data.length; i++) {
        let loggedClimb = document.createElement('div')
        loggedClimb.setAttribute('class', 'favDivs')
        loggedClimb.innerHTML = `
        <div id="innerCardTop">
            <p id="cardName">${data[i].first_name} ${data[i].last_name}</p>
        </div>
        <div id="innerCardMid">
            <h2 id="cardClimbName">${data[i].climb_name}</h2><br>
            <p id="cardGrade">${data[i].grade}</p><br>
            <p id="cardLocation">${data[i].location}</p>
        </div>
        <div id="innerCardImage">
            <img id='cardImage' src="${data[i].image}" alt='user image here' style='max-width:100%;max-height:100%;'>
        </div>
        <div id="innerCardBottom">
            <p id="cardInfo">Info: ${data[i].info}</p>
        </div>
        <div class="innerCardBtns" id="innerCardBtns${data[i].id}">
        </div>
        `
        document.getElementById('climbsContainer').appendChild(loggedClimb)

        let editBtn = document.createElement('button')
        editBtn.id='edit' + data[i].id
        editBtn.setAttribute('backendIdToEdit', data[i].id) // backendId="data[i].id"
        editBtn.innerHTML = 'Edit'
        editBtn.addEventListener('click', editClimb)
        // loggedClimb.appendChild(editBtn)
        document.getElementById(`innerCardBtns${data[i].id}`).appendChild(editBtn)

        let deleteBtn = document.createElement('button')
        deleteBtn.id='delete' + data[i].id
        deleteBtn.setAttribute('backendId', data[i].id)
        deleteBtn.innerHTML = 'Delete'
        deleteBtn.addEventListener('click', deleteClimb)
        document.getElementById(`innerCardBtns${data[i].id}`).appendChild(deleteBtn)
        // loggedClimb.appendChild(deleteBtn)
    }
}

climbSubmitBtn.addEventListener('click', createFavClimb)
submitChangesBtn.addEventListener('click', submitEdits)
window.addEventListener('load', getClimbs)