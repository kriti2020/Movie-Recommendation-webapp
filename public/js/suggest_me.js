
const main = document.getElementById('mainall');
const rating_container = document.querySelector('.rating-container');
const filterBtn = document.querySelector('#filterUp');

//URL from Postman based on popularity, vote-count, year of release and language. For both the LANGUAGES year of release range, vote count is different, It's because en-Us movies generally are more popular and seen worldwde!
//GENRES ARRAY based on Age group- 1) Kids= Animation n Family 2)Adults= Top 5 Genres as per google and after studying data= Action,Comedy,Romance,Adventure,Mystery


let genresnow=[];
let langnow=[];
let url='';
let tAge='';
let tLang='';

function getAge(id){
    
//    if(tLang !=''){
//     document. location.reload();
//    }

    //TO RESET SUGGESTIONS EACH TIME BTN IS CHANGED INSTEAD OF RELOADING THE ENTIRE PAGE
    if(main.innerHTML != ''){
        mainall.innerHTML='';
        if(tLang !=''){
            //console.log(tLang);
            document.querySelector(tLang).classList.remove("focus");
            tLang='';
        } 
    }
    
    
   if(tAge != ''){
    //console.log(tAge);
    document.querySelector(tAge).classList.remove("focus");   
    tAge=''; 
   }

    if(id=="kid"){
        document.querySelector("#kid").classList.toggle("focus");
        tAge="#kid";
       genresnow=[];
      genresnow.push(genres[2]);
      genresnow.push(genres[8]);

    }
    else{
        document.querySelector("#adult").classList.toggle("focus");
        tAge="#adult";
        genresnow=[];
        genresnow.push(genres[12]);
        genresnow.push(genres[3]);
        genresnow.push(genres[13]);
        genresnow.push(genres[1]);
        genresnow.push(genres[0]);

    }
}


function getLang(id){
    mainall.innerHTML='';
    langnow=[];
    url='';

    if(tLang != ''){
     document.querySelector(tLang).classList.toggle("focus");   
     tLang=''; 
    }

if (id=="hi"){
    langnow.push(id);
   document.querySelector("#hi").classList.toggle("focus");
   tLang="#hi";
    
    if(genresnow.length==0){
        alert("Choose Age Group First and then select Language");
        document. location.reload();
    }
    
    else{
        url=hindi_sort_url;
        resultsFromSelectedBtn();
        //combine(hindi_sort_url);
    }
    
}
else{

    langnow.push(id);
    document.querySelector("#en").classList.toggle("focus");
    tLang="#en";
    
    if(genresnow.length==0){
     alert("Choose Age Group First and then select Language");
     document.location.reload();
     //NOW APPLY TOGGLE
    }

    else{
        url=eng_sort_url;
        resultsFromSelectedBtn();
        //combine(eng_sort_url);
    }
    
}
}


let filteredItems=[];

//TO GET DATA FROM EACH OF THE GENRES AND MAKE ONE MOVIE'S CARD OUT OF EACH
filtertime=()=>{
    if( tLang ==''){
    alert("Select Age and Region and then try again!");
    }
   else{
    rating_container.innerHTML='';
    genresnow.forEach(item =>{
           fetchMovieNow(url,item);
       })
    }
}


const fetchMovieNow = (urlNow, genreItem) => {

    fetch(urlNow + new URLSearchParams({
        api_key: api_key,
        with_genres:genreItem.id
        // page: n
          }))
.then(res => res.json())
.then(data => {
  //console.log(data);
   

    data.results.forEach( (item) => {
        filteredItems.push(item);
    })

//TO GET ONLY 1 RANDOM ITEM FROM EACH GENRE
 let k=Math.floor(Math.random() * filteredItems.length/2)*2;
  
    makeRatingCard(filteredItems[k],genreItem.id);


})
.catch(err =>  console.log(err));

}


   
const makeRatingCard= (item,genre_id )=> {
//     console.log("FILTERED ITEMS->")
// console.log(filteredItems);

    if(item.backdrop_path == null){
        item.backdrop_path = item.poster_path;
        if(item.backdrop_path == null){
            return;
        }
    }
    rating_container.innerHTML += `
  
    <div class="rateCard" onclick="location.href = '/${item.id}'">
    <h3>${item.title.substring(0,50) }</h3>
    <img src="${img_url}${item.backdrop_path}"alt=""  >
   <div class="card_des">
       <p class="">${item.overview.substring(0, 100) + '...'}</p>
   </div>
   </div>
`;
   filteredItems=[];
//  console.log(filteredItems);
//   console.log("END ");
}



//SUGGESTIONS FROM SELECTED BUTTONS
resultsFromSelectedBtn=()=>{
     genresnow.forEach(item =>{
        displayNow(url,item);
    })
}
const displayNow = (urlNow, genreItem) => {
    fetch(urlNow + new URLSearchParams({
        api_key: api_key,
        with_genres:genreItem.id
        // page: n
          }))
.then(res => res.json())
.then(data => {
    // console.log("genre begins");
    data.results.forEach(item =>{
    showMovies(item);
    })

})
.catch(err =>  console.log(err));

}



 //DISPLAY MOVIE    
 const showMovies = (item) =>{

let container = document.querySelector('#mainall');

            if(item.backdrop_path == null){
                item.backdrop_path = item.poster_path;
                if(item.backdrop_path == null){
                    return;
                }
            }
            

        container.innerHTML += `
        <div class="movieall" onclick="location.href = '/${item.id}'">
            <img src="${img_url}${item.backdrop_path}" alt="">
            <p class="movie-title">${item.title}</p>
        </div>
        `;
    
}






