chrome.storage.sync.get(function (data) {
    document.getElementById("background-color").value = data.backgroundColor || "#000000" ;
    document.getElementById("font-color").value = data.fontColor || "F6E93C";
    document.getElementById("checkbox").checked = data.switch;
});

document.getElementById("background-color").addEventListener('change', (e)=>{
    chrome.storage.sync.set({
        backgroundColor : e.target.value
    })
})

document.getElementById("font-color").addEventListener('change', (e)=>{
    chrome.storage.sync.set({
        fontColor : e.target.value
    })
})

document.getElementById("checkbox").addEventListener('click', ()=>{
    chrome.storage.sync.set({
        switch : document.getElementById("checkbox").checked === true ? true : false
    })
})