const listTweets = document.querySelector('#list-tweets');
const form = document.querySelector('#form');
let tweets = [];

eventListeners();

function eventListeners() {
     
     form.addEventListener('submit', addTweet);

     listTweets.addEventListener('click', deleteTweet);

     document.addEventListener('DOMContentLoaded', () => {
          tweets = JSON.parse( localStorage.getItem('tweets') ) || []  ;
          createHTML();
     });
}

function addTweet(e) {
     e.preventDefault();
    
     const tweet = document.querySelector('#tweet').value;
     
     if(tweet === '') {
          showError('Un mensaje no puede ir vacio');
          return;
     }

     const tweetObj = {
          id: Date.now(),
          texto: tweet
     }

     tweets = [...tweets, tweetObj];
     
     createHTML();

     form.reset();
}

function showError(error) {
     const messageError = document.createElement('p');
     messageError.textContent = error;
     messageError.classList.add('error');

     const container = document.querySelector('#container');
     container.appendChild(messageError);

     setTimeout(() => {
        messageError.remove();
     }, 3000);
}

function createHTML() {
     cleanHTML();
     
     if(tweets.length > 0 ) {
          tweets.forEach( tweet =>  {
               // crear boton de eliminar
               const deleteButton = document.createElement('a');
               deleteButton.classList = 'delete-tweet';
               deleteButton.innerText = 'X';

               deleteButton.onclick = () => {
                deleteTweet(tweet.id);
               }
     
               const li = document.createElement('li');

               li.innerText = tweet.texto;

               li.appendChild(deleteButton);

               listTweets.appendChild(li);
          });
     }

     syncStorage();
}

function deleteTweet(id) {

     tweets = tweets.filter( tweet => tweet.id !== id  );
     createHTML();
}

function syncStorage() {
     localStorage.setItem('tweets', JSON.stringify(tweets));
}

function cleanHTML() {
     while(listTweets.firstChild) {
          listTweets.removeChild(listTweets.firstChild);
     }
}