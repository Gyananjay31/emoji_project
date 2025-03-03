
import { emojiList } from "./emoji.js";


const buttons = document.querySelectorAll("button");
const input = document.querySelector("input");
const emojiContainer = document.querySelector("#emoji-Container");

window.addEventListener("load", displayEmojis(emojiList))

window.addEventListener("keyup", searchEmojis);

buttons.forEach((btn) => {
    btn.addEventListener("click", () => clickButtonFilterEmoji(btn.value))
});

function searchEmojis(e){
    let filterArray;
    const inputValue = input.value.toLowerCase();
    if(inputValue == "all"){
        filterArray = emojiList;
    }else{
        filterArray = emojiList.filter((obj) => {
            return (
                obj.description.includes(inputValue) ||
                // obj.aliases.toString().includes(inputValue) ||
                // obj.tags.toString().includes(inputValue) 
                obj.aliases.some(alias => alias.toLowerCase().startsWith(inputValue)) ||
                obj.tags.some(tag => tag.toLowerCase().startsWith(inputValue))
            )
        });
    }
    displayEmojis(filterArray);
}

function clickButtonFilterEmoji(value){
    let buttonFilterArray;
    if(value == "all"){
        buttonFilterArray = emojiList;
    }else{
        buttonFilterArray = emojiList.filter((obj) => {
            return(
                obj.description.includes(value) ||
                obj.aliases.some(alias => alias.toLowerCase().startsWith(value)) ||
                obj.tags.some(tag => tag.toLowerCase().startsWith(value))
            )
        });
    }
    
    displayEmojis(buttonFilterArray);
}

function displayEmojis(arr){
    emojiContainer.innerText = "";
    const fregment = document.createDocumentFragment();
    arr.forEach((obj) => {
        const span = document.createElement("span");
        span.innerText = obj.emoji;
        span.classList.add("emojiSpan");

        span.addEventListener("click", ()=> copyToClipBoard(span.innerText));

        fregment.append(span);
    });
    emojiContainer.append(fregment);
}

function copyToClipBoard(text){
    window.navigator.clipboard.writeText(text)
    .then(response => {
        alert("Emoji Copied ");
    })
    .catch(e => {
        alert("Something went wrong!");
    })
}