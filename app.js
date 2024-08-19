//TODO : Select all selectors-done
//TODO : Make pick btn functional-done
//TODO : Make copy color functional-done
//TODO : Show color on the DOM
//TODO : local Storage
//TODO : Clear button to clear all the preveious clears


const colorPicker=document.querySelector(".color-picker");
const clearAll=document.querySelector(".clear-all");
const colorList=document.querySelector(".all-colors");
//const pickedColors=[];


//step 05
let pickedColors=JSON.parse(localStorage.getItem("picked-colors") || "[]");

//step 01
 const activeEyeDropper=async ()=>{
  try{
   const eyeDropper=new EyeDropper();
   console.log(eyeDropper);
   // const test=eyeDropper.open();
   // console.log(test);
   const colorCode=await eyeDropper.open();
   console.log(colorCode.sRGBHex);
   
   //copy to clipboard
   navigator.clipboard.writeText(colorCode.sRGBHex);
   //push color empty array
   pickedColors.push(colorCode.sRGBHex);
   //step 04
   localStorage.setItem("picked-colors",JSON.stringify(pickedColors));
   console.log(pickedColors);
    showColor();
  }
  catch(erroe){
   alert("Failed");
  }

 }

 //step 02
 const showColor = () => {
    if(pickedColors.length > 0){
        document.querySelector(".picked-colors").style.display="block";
        colorList.innerHTML=pickedColors
    .map((color)=>`
        
    <li class="color">
                <span id="rect" style="background-color:${color}"></span>
                <span id="value hex">${color}</span>
            </li>
    `).join("");

    //step 06
    let colors=document.querySelectorAll(".color");
    console.log(colors);
    colors.forEach((li)=>{
        li.addEventListener("click",(e)=>{
        let color=e.target.innerText;
        navigator.clipboard.writeText(color);
        e.target.innerText="Copied";
        setTimeout(()=>(e.target.innerText=color),1000);

        })
    });
    
    
    

    }else{
        document.querySelector(".picked-colors").style.display="none";
    }
    
 }

 //step 03
 const clearOfList = () =>{
    //colorList.innerHTML="";
    pickedColors.length=0;
    localStorage.setItem("picked-colors",JSON.stringify(pickedColors));document.querySelector(".picked-colors").style.display="none";
 }

 
 colorPicker.addEventListener("click",activeEyeDropper);
showColor();
clearAll.addEventListener("click",clearOfList);

