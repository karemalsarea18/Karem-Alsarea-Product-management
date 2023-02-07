let title =  document.getElementById('title');
let price =  document.getElementById('price');
let taxes =  document.getElementById('taxes');
let ads =  document.getElementById('ads');
let  discount =  document.getElementById('discount');
let  total =  document.getElementById('total');
let  count =  document.getElementById('count');
let  category =  document.getElementById('category');
let  submit =  document.getElementById('submit');
let mood = 'creat'; 
let tmp;

//get total
function getTotal(){
if(price.value != ''){

let result = (+price.value + +taxes.value + +ads.value) - discount.value;
total.innerHTML = result;
total.style.background = '#040';
}else{

    total.innerHTML = '';
    total.style.background = '#a80404';
}

}



//creat product
let datapro;
if(localStorage.product != null){
    datapro = JSON.parse(localStorage.product)

}else{
   datapro = [];
}

submit.onclick = function creatproduct(){


    let newpro ={
        title:title.value.toLowerCase(),
        price:price.value,
        taxes:taxes.value,
        ads:ads.value,
        discount:discount.value,
        total:total.innerHTML,
        count:count.value,
        category:category.value.toLowerCase(),
    }
if(title.value != '' && price.value != '' &&  newpro.count < 200 ){

    if(mood === 'create'){
if(newpro.count > 1){
        for(let i = 0; i < newpro.count; i++){

           datapro.push(newpro);

        }
}
 
    else{datapro.push(newpro);}
}else{
    datapro[  tmp  ] = newpro;
    mood = 'create';
    submit.innerHTML = 'اضافة';
    count.style.display = 'block';
}
cleardata()
}

//save localastorage
localStorage.setItem('product' ,  JSON.stringify(datapro))

showdata()



}


//clear inputs
function cleardata(){
    title.value = '';
    price.value = '';
    taxes.value = '';
    ads.value = '';
     discount.value = '';
    count.value = '';
     category.value = '';
     total.innerHTML = ''; 
}
 
//read
function showdata(){
    getTotal();
let table = '';
for(let i = 0; i < datapro.length; i++){
    table += `<tr>
    <td>${i+1}</td>
    <td>${datapro[i].title}</td>
    <td>${datapro[i].price}</td>
    <td>${datapro[i].taxes}</td>
    <td>${datapro[i].ads}</td>
    <td>${datapro[i].discount}</td>
    <td>${datapro[i].total}</td>
    <td>${datapro[i].category}</td>
    <td><button onclick="update(${i})" id="update">تحديث</button></td>
    <td><button onclick="deletadata(${i})"  id="delate">حذف</button></td>
</tr>
`
    
}



document.getElementById('tbody').innerHTML = table;
let btn = document.getElementById('delete all')
if(datapro.length>0){

btn.innerHTML  = `<button onclick = "deleteall()"> (${datapro.length}) حذف الكل</button>`

}else{

    btn.innerHTML  = '';
}

}
showdata()







//deleta
function deletadata(i){

datapro.splice(i,1);
localStorage.product = JSON.stringify(datapro);

showdata()

}


//deleta all
function deleteall(){
localStorage.clear
datapro.splice(0)
showdata()
}

 

//update
 function update(i){
 title.value = datapro[i].title
 price.value = datapro[i].price
 taxes.value = datapro[i].taxes
 ads.value = datapro[i].ads
 discount.value = datapro[i].discount
 getTotal()
 count.style.display = 'none';
category.value = datapro[i].category
submit.innerHTML = 'تحديث';
mood =  'update';
tmp = i;
 scroll({
    top:0,
    behavior:'smooth'
 })

 }


//search
let searchmood ='title';
let search = document.getElementById('search');
function getsearchmood(id){
if( id =='searchtaitle'){
    searchmood ='title';
}else{searchmood ='category';
 }
search.focus()
search.value = "";
showdata();
}
function searchdata(value){
     let table = '';
    if(searchmood == 'title'){

        for(let i = 0; i < datapro.length; i++){

            if(datapro[i].title.includes(value.tolowerCase())){
                table += `<tr>
                <td>${i}</td>
                <td>${datapro[i].title}</td>
                <td>${datapro[i].price}</td>
                <td>${datapro[i].taxes}</td>
                <td>${datapro[i].ads}</td>
                <td>${datapro[i].discount}</td>
                <td>${datapro[i].total}</td>
                <td>${datapro[i].category}</td>
                <td><button onclick="update(${i})" id="update">تحديث</button></td>
                <td><button onclick="deletadata(${i})"  id="delate">حذف</button></td>
            </tr>
            `
            document.getElementById('tbody').innerHTML = table;
            }

        }
    }else{

        for(let i = 0; i < datapro.length; i++){

            if(datapro[i].category.includes(value)){
                table += `<tr>
                <td>${i}</td>
                <td>${datapro[i].title}</td>
                <td>${datapro[i].price}</td>
                <td>${datapro[i].taxes}</td>
                <td>${datapro[i].ads}</td>
                <td>${datapro[i].discount}</td>
                <td>${datapro[i].total}</td>
                <td>${datapro[i].category}</td>
                <td><button onclick="update(${i})" id="update">تحديث</button></td>
                <td><button onclick="deletadata(${i})"  id="delate">حذف</button></td>
            </tr>
            `}

    }

    document.getElementById('tbody').innerHTML = table;
}
}



//calen data 
   