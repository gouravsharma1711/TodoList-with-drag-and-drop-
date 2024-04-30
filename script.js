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