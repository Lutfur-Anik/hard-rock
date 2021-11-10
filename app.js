const btn=document.getElementById('submit')
btn.addEventListener('click',()=>{
    const searchText=document.getElementById('search-field').value;
 
    document.getElementById('search-field').value=''
    const url=`https://api.lyrics.ovh/suggest/${searchText}`
    fetch(url)
    .then(res=>res.json())
    .then(data=>{
  
        const user=document.getElementById('song');
        user.innerHTML=''
       for (let i = 0; i < data.data.length; i++) {
           const song = data.data[i];
           const songDiv=document.createElement('div');
           songDiv.innerHTML=` <div class="single-result row align-items-center my-3 p-3">
           <div class="col-md-9">
               <h3 class="lyrics-name">${song.title}</h3>
               <p class="author lead">Album by <span>${song.artist.name}</span></p>
           </div>
           <div class="col-md-3 text-md-right text-center">
           <button onclick="getLyric('${song.artist.name}','${song.title}')" class="btn btn-success">Get Lyrics</button>
           </div>
       </div>`
       user.appendChild(songDiv)
         
       }
        
    })
})
function getLyric(artist,title){
    const url = `https://api.lyrics.ovh/v1/${artist}/${title}`
    fetch(url)
    .then(res=>res.json())
    .then(data=>{
        const singer=document.getElementById('lyrics');
        singer.innerHTML=`<p class="lyric">${data.lyrics}</p>`
    })

}