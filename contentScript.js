const originData = document.querySelector("body").innerHTML;
const previousState = [originData];

const clearSelect = ()=>{
    document.querySelector("body").innerHTML = originData;
}
const previousSelect = ()=>{
    if(previousState.length !== 1){
        previousState.pop();
        document.querySelector("body").innerHTML = previousState[previousState.length-1];
    }
}

const makeMark = () => {
    const mark = document.createElement('mark');
    chrome.storage.sync.get(function (data) {
        mark.style.backgroundColor = data.backgroundColor || "#000000" ;
        mark.style.color = data.fontColor || "F6E93C";
    });
    return mark;
}

const selectText = () => {
    const selectionText = document.getSelection();
    const rangeText = selectionText.getRangeAt(0);

    let nodeType = true;
    selectionText.anchorNode.childNodes.forEach((node)=>typeof node === "object" ? nodeType = false : null)

    if(selectionText.type !== "Caret" && nodeType){
        if(rangeText.startContainer === rangeText.endContainer){
            rangeText.surroundContents(makeMark());
        }else{
            const list = [...rangeText.commonAncestorContainer.children];
            const startNode = rangeText.startContainer;
            const endNode = rangeText.endContainer;

            let startIdx, endIdx = 0;
            list.forEach((item, idx)=>{
                if(item === startNode.parentNode) startIdx = idx;
                if(item === endNode.parentNode) endIdx = idx;
            })
            const middleList = list.filter((_, x)=>startIdx < x && x < endIdx);

            if(middleList.length !== 0){
                middleList.forEach((element)=>{
                    const middleRange = document.createRange();
                    middleRange.setStart(element, 0);
                    middleRange.setEnd(element, 1);
                    middleRange.surroundContents(makeMark());
                })
            }

            const startRange = document.createRange();
            startRange.setStart(startNode, rangeText.startOffset);
            startRange.setEnd(startNode, startNode.parentNode.innerHTML.split("").length);
            startRange.surroundContents(makeMark());

            const endRange = document.createRange();
            endRange.setStart(endNode, 0);
            endRange.setEnd(endNode, rangeText.endOffset);
            endRange.surroundContents(makeMark());
        }
        previousState.push(document.querySelector("body").innerHTML)
    }
}

document.onkeydown = function(e){
    if(e.code === "KeyV" && e.shiftKey){
        chrome.storage.sync.get(function (data) {
            chrome.storage.sync.set({
                switch : !data.switch
            })
        });
    }

    if(e.code === "KeyX" && e.shiftKey){
        clearSelect();
    }

    if(e.code === "KeyZ" && e.shiftKey){
        previousSelect();
    }
}

let onOffIs = true;

document.onmouseup = async function() {
    await chrome.storage.sync.get(function (data) {
        onOffIs = data.switch;
    });

    onOffIs === true ? selectText() : null
}