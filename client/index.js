const climbSubmitBtn = document.getElementById('submitClimbBtn')
const submitChangesBtn = document.getElementById('submitEdit')

// why isn't this working?
// let climbObj = {
//     fName: document.getElementById('fName').value,
//     lName: document.getElementById('lName').value,
//     climbName: document.getElementById('climbName').value,
//     grade: document.getElementById('grade').value,
//     location: document.getElementById('location').value,
//     forumImage: document.getElementById('forumImage').value,
//     info: document.getElementById('info').value
// }

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
    axios.post('/forumPost', climbObj)
    .then(res => {
        data = res.data
        printToBrowser(data)
    })
    document.getElementById('fName').value = ''
    document.getElementById('lName').value = ''
    document.getElementById('climbName').value = ''
    document.getElementById('grade').value = 'V0'
    document.getElementById('location').value = ''
    document.getElementById('forumImage').value = ''
    document.getElementById('info').value = ''

    document.getElementById('climbSubmit').hidden = true // hide data entry form
}

function deleteClimb(e) {
    e.preventDefault()
    document.getElementById('climbsContainer').innerHTML = ''
    let id = e.target.getAttribute('backendId')
    axios.delete(`/deleteClimb/${id}`)
    .then(res => {
        data = res.data
        printToBrowser(data)
    })
}

function editClimb(e) {
    e.preventDefault()
    // document.getElementById('climbsContainer').innerHTML = ''
    let id = e.target.getAttribute('backendIdToEdit')
    axios.get(`/editClimb/?id=${id}`)
    .then(res => {
        data = res.data
        // printToBrowser(data)
        document.getElementById('climbSubmit').hidden = false // show data entry form

        document.getElementById('fName').value = `${data.fName}`
        document.getElementById('lName').value = `${data.lName}`
        document.getElementById('climbName').value = `${data.climbName}`
        document.getElementById('grade').value = `${data.grade}`
        document.getElementById('location').value = `${data.location}`
        document.getElementById('forumImage').value = `${data.forumImage}`
        document.getElementById('info').value = `${data.info}`
        document.getElementById('submitClimbBtn').hidden = true // hide submit btn
        document.getElementById('submitEdit').hidden = false // show submit changes btn
        document.getElementById(`edit${id}`).hidden = true // hide edit button
        document.getElementById('submitEdit').setAttribute('current-id', id)
    })
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
        printToBrowser(data)
        document.getElementById('fName').value = ''
        document.getElementById('lName').value = ''
        document.getElementById('climbName').value = ''
        document.getElementById('grade').value = 'V0'
        document.getElementById('location').value = ''
        document.getElementById('forumImage').value = ''
        document.getElementById('info').value = ''
        
        document.getElementById('climbSubmit').hidden = true // hides data entry form
    })
}

function printToBrowser(data) {
    for (let i = 0; i < data.length; i++) {
        let loggedClimb = document.createElement('div')
        loggedClimb.innerHTML = `
        <p>${data[i].fName} ${data[i].lName}</p><br>
        <p>${data[i].climbName}</p><br>
        <p>${data[i].grade}</p><br>
        <p>${data[i].location}</p><br>
        <p>${data[i].forumImage}</p><br>
        <p>Info: ${data[i].info}</p>
        `
        // <button onclick="deleteClimb(event)" id="delete${data[i].id}" backendId="${data[i].id}">Delete</button>
        
        let deleteBtn = document.createElement('button')
        deleteBtn.id='delete' + data[i].id
        deleteBtn.setAttribute('backendId', data[i].id)
        deleteBtn.innerHTML = 'Delete'
        deleteBtn.addEventListener('click', deleteClimb)
        loggedClimb.appendChild(deleteBtn)

        let editBtn = document.createElement('button')
        editBtn.id='edit' + data[i].id
        editBtn.setAttribute('backendIdToEdit', data[i].id) // backendId="data[i].id"
        editBtn.innerHTML = 'Edit'
        editBtn.addEventListener('click', editClimb)
        loggedClimb.appendChild(editBtn)
        document.getElementById('climbsContainer').appendChild(loggedClimb)
    }
}

climbSubmitBtn.addEventListener('click', createFavClimb)
submitChangesBtn.addEventListener('click', submitEdits)