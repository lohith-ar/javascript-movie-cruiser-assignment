// let movies = [];
// let favmovies = [];

// function getMovies() {
// 	return fetch('http://localhost:3000/movies')
// 		.then(res => {
// 			if (res.ok) {
// 				return Promise.resolve(res.json());
// 			} else {
// 				return Promise.reject(new Error('Error in retrieving movie data')); 
// 			}
// 		}).then(data => {
// 			movies = data
// 			data.map(item => {
// 				const li = document.createElement(`li`);
// 				li.innerHTML = `<li> <button type="button" style="font-size: 10px;" onclick="addFavourite(${item.id})"> <i class="far fa-star" ></i> AddToFavourite</button> ${item.title}</li>`;
// 				document.getElementById('moviesList').appendChild(li);
// 			});
// 			return Promise.resolve(data);
// 		}).catch(error => {
// 			return error;
// 		});
// }

// function getFavourites() {
// 	return fetch('http://localhost:3000/favourites')
// 		.then(res => {
// 			if (res.ok) {
// 				return Promise.resolve(res.json());
// 			} else {
// 				return Promise.reject(new Error('Error in retrieving movie data'));
// 			}
// 		}).then(data => {
// 			favmovies = data;
// 			data.map(item => {
// 				const li = document.createElement(`li`);
// 				li.innerHTML = `<li>${item.title}</li>`
// 				document.getElementById('favouritesList').appendChild(li);
// 			});
// 			return Promise.resolve(data);
// 		})
// 		.catch(error => {
// 			return error;
// 		})
// }

// function addFavourite(favid) {
// 	if (favmovcheck(favid)) {
// 		let newmovie = movies.filter(id1 => id1.id == favid)
// 		newmovie = newmovie[0] 
// 		return fetch('http://localhost:3000/favourites', {
// 			method: 'POST',
// 			headers: {
// 				'content-type': 'application/json'
// 			},
// 			body: JSON.stringify(
// 				newmovie
// 			)			
// 			})
// 			.then((result) => {
// 				if (result.ok) {
// 					return Promise.resolve(result.json());
// 				} else {
// 					return Promise.reject('error from fetch api');
// 				}
// 			})
// 			.then((favmovies) => {
// 				favmovies.push(newmovie);
// 				return favmovies; 
// 			})
// 			.catch(err => {
// 				return new Error(err);
// 			});
// 	} else {
// 		throw new Error('Movie is already added to favourites');
// 	}
// }



// function favmovcheck(newid) {
// 	let newfavmovie = favmovies.filter(id1 => id1.id == newid)
// 	if(newfavmovie.length != 0 ){
// 		return false
// 	}else return true;
// }



// module.exports = {
// 	getMovies,
// 	getFavourites,
// 	addFavourite
// };







//working part
let myMovies=[];
let favMovies=[];
function getMovies() {
    return fetch('http://localhost:3000/movies')
        .then(res => {
            // console.log(res)
            if (res.status == 200) {
                return Promise.resolve(res.json())
            }
            else {
                return Promise.reject(new Error('Error'))
            }
        })
        .then(movieData => {
            document.getElementById('moviesList').innerHTML = " ";
            movieData.forEach((movieData) => {
                myMovies.push(movieData)
                let listHTML = document.createElement('li');
                listHTML.className = "list-group-item";
                // listHTML += `<li>${movieData.name}<span class="float-end"><i onclick="addFavourite(${movieData.id})" class="fas fa-star"></i></span></li>`
                listHTML.innerHTML = movieData.title + `<span class="float-end"><i onclick="addFavourite(${movieData.id})" class="fas fa-star"></i></span>`;
                document.getElementById('moviesList').appendChild(listHTML);
                // console.log(movieData.id)
            });
            return movieData
        })
        .catch(error => {
            return error
        })
}
function getFavourites() {
    return fetch('http://localhost:3000/favourites')
    .then(res => {
        // console.log(res)
        if (res.ok) {
            return Promise.resolve(res.json())
        }
        else {
            return Promise.reject(new Error('Error'))
        }
    })
    .then(faMovieData => {
    favMovies = faMovieData;
    displayFavMovies(favMovies)
        return Promise.resolve(faMovieData)
    })
    .catch(error => {
        return error
    })
}
function addFavourite(id) {
    let findMovie = myMovies.find(movie=>{
        if(movie.id == id){
            return movie;
        }
    });
    let findFav = favMovies.find(fav=>{
        if(fav.id == findMovie.id){
            return fav;
        }
    });
    if(findFav){
        return Promise.reject(new Error('Movie is already added to favourites'));
    }else{
        return fetch('http://localhost:3000/favourites',{
            method: 'POST',
            headers: {
                'content-type' : 'application/json'
            },
            body: JSON.stringify(findMovie)
        }
        ).then(response=> {
            if(response.ok){
                return Promise.resolve(response.json())
            }
            else {
                return Promise.reject(new Error('Error'))
            }
        }).then(movieData =>{
            favMovies.push(movieData);
            displayFavMovies(favMovies)
            return favMovies;
        })
    }
}
function displayFavMovies(favMovies){
    //DOM manipulation
    document.getElementById('favouritesList').innerHTML = " ";
    favMovies.forEach((faMovie) => {
        let listHTML = document.createElement('li');
        listHTML.className = "list-group-item";
        listHTML.innerHTML = faMovie.title;
        document.getElementById('favouritesList').appendChild(listHTML);
    });
}
module.exports = {
    getMovies,
    getFavourites,
    addFavourite
};
