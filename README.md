# TodoList-with-drag-and-drop-

## HTML 
``` HTML
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <div class="container" >

        
            <div class="addTaskContainer" id="todo-form">
                <input type="text" id="todo-input" class="text" placeholder="Enter Your Task">
                <button type="submit" class="addButton">Add Task</button>
            </div>
        

        <div class="blockContainer">
            <div class="box" id="leftBox">
                <h2 class="heading">TODO</h2>
                
            </div>
    
            <div class="box" id="midBox">
                <h2 class="heading">Doing</h2>
                
            </div>
    
            <div class=" box" id="rightBox">
                <h2 class="heading">Done</h2>
                
            </div>
        </div>
    </div>
    <script src="script.js"></script>
</body>
</html>
```

## CSS
``` CSS
@import url('https://fonts.googleapis.com/css2?family=Roboto+Condensed:ital,wght@0,100..900;1,100..900&display=swap');
*{
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

.container{
    min-height: 100vh;
    max-width: 100vw;
    background-image: url(benjamin-voros-phIFdC6lA4E-unsplash.jpg);
    background-size: cover;
    background-position: center;
    padding: 50px 106px;
    display: flex;
    flex-direction: column;
    gap: 20px;
    /* overflow: scroll; */
}
.addTaskContainer{
    padding: 0;
    border-radius: 30px;
    display: flex;
    justify-content: center;
    gap: 1rem;
    max-width: 1100px;
    /* border: 2px solid black; */
    background-color: white;
}

.text{
    width: 90%;
    height: 50px;
    border: none;
    outline-style:none;
    border-radius: 30px;
    padding: 20px;
    font-size: larger;
    cursor: text;
}
.addButton{
    width: 10rem;
    border: none;
    border-radius: 30px;
    /* background-color: #fa6400; */
    background-image: linear-gradient(144deg,#AF40FF, #5B42F3 50%,#00DDEB);
    color: #FFFFFF;
    font-size: larger;
    font-weight: 550;
    cursor: pointer;
    
}
.addButton:hover{
    background-image: linear-gradient(144deg, #5B42F3 50%,#AF40FF,#00DDEB);
}
.blockContainer{
    max-width: 1100px;
    min-height: 10rem;
    display: flex;
    gap: 1rem;
    padding: 1rem 0.7rem;
    /* border: 2px solid black; */
}
.box{
    background-color:white;
    width: 33%;
    height: 70%;
    border-radius: 10px;
    padding: 8px;
    
}
.heading{
    text-align: center;
    font-weight: 600;
    border-bottom: 2px solid white;
    padding-bottom: 3px;
}
.para{
    /* border: 2px solid black; */
    font-size:large;
    padding: 5px 5px 4px 10px ;
    margin-top: 3px;
    margin-top: 10px;
    display: flex;
    justify-content: space-between;
    cursor:move;
    position: relative;
    /* background-color:  rgb(238, 234, 234); */
    background-color: white;
    border-radius: 8px;
    box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
}
span{
    width: 30px;
    height: 30px;
    border-radius: 20px;
    font-size: large;
    text-align: center;
    font-size: 18px;
    transition: all .2s ease;
}
span:hover{
    background-color: #c9c9c9;
    color: #fff;
    cursor: pointer;
}
.isDragging{
    scale: 1.05;
    box-shadow: 0px 5px 15px rgba(0,0,0,0.25);
    background-color: rgb(50,50,50);
    color: white;
}
#leftBox{
    background-color: #51e2f5;
}
#midBox{
    background-color:  #9df9ef;
}
#rightBox{
    background-color: #ffa8B6;
}
```

## JavaScript

```javascript
let text=document.querySelector("#todo-input");
let button=document.querySelector(".addButton");
let todoContainer=document.querySelector("#leftBox");


button.addEventListener('click',()=>{
    if(text.value===""){
        alert("Please Enter the Valid Value");
    }else{


    let newP=document.createElement('p');
    newP.textContent=text.value;
    newP.setAttribute('class','para')
    newP.setAttribute('draggable','true');
    
    todoContainer.appendChild(newP);
    text.value="";
    let span=document.createElement('span');
    span.innerText="x";
    newP.appendChild(span);

    span.addEventListener('click',(e)=>{
        e.target.parentElement.remove();
    })

    newP.addEventListener('dragstart',()=>{
        newP.classList.add("isDragging");
    })
    
    newP.addEventListener('dragend',()=>{
        newP.classList.remove("isDragging");
    })
    }
})


let droppables=document.querySelectorAll('.box');
droppables.forEach((zone)=>{
    
    zone.addEventListener('dragover',(e)=>{
        e.preventDefault();
        const closestTask=findClosestTask(zone,e.clientY);


        const curr=document.querySelector('.isDragging');
        if(!closestTask){
            zone.appendChild(curr);
        }else{
            zone.insertBefore(curr, closestTask);
        }        
    });
    
});

const findClosestTask=(Zone, yAxis)=>{
    const allTasks=Zone.querySelectorAll(".para:not(.isDragging)");
    let closeTask=null;
    let closestOffset=Number.NEGATIVE_INFINITY;
    allTasks.forEach((task)=>{
        
        const  { top } =task.getBoundingClientRect();
        const offSet=yAxis-top;

        if(offSet<0 && offSet>closestOffset){
            closeTask=task;
            closestOffset=offSet;
        }
        
    });
    return closeTask;
};
```