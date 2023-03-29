// Declare and initialize the page variable to keep track of the current page number
let page = 1;

// Get the HTML elements for the "Back" and "Next" buttons by their IDs
const btnBack = document.getElementById("btnBack");
const btnNext = document.getElementById("btnNext");

// Add an event listener to the "Next" button that calls the loadMovie function and increments the page number if the current page is less than 1000
btnNext.addEventListener("click", () => {
  if (page < 1000) {
    page += 1;
    loadMovie();
  }
});

// Add an event listener to the "Back" button that calls the loadMovie function and decrements the page number if the current page is greater than 1
btnBack.addEventListener("click", () => {
  if (page > 1) {
    page -= 1;
    loadMovie();
  }
});

// Declare and initialize an asynchronous function called loadMovie that retrieves data from an external API and displays it on the web page
const loadMovie = async () => {
  try {
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/popular?api_key=24b57e022160bdbda23f2aca6fa16730&language=en-US&page=${page}`
    );

    // Make a fetch request to the specified API endpoint with the current page number as a parameter
    console.log(response);

    // If the answer is positive
    if (response.status === 200) {
      // Parse the response body as JSON
      const datos = await response.json();

      // Create an empty string called "movies"
      let movies = "";

      // For each movie in the response results array
      datos.results.forEach((movie) => {
        // Add a string of HTML to "movies" with the movie's title and poster path
        movies += `
					<div class="movie">
						<img class="poster" src="https://image.tmdb.org/t/p/w500/${movie.poster_path}">
						<h3 class="title">${movie.original_title}</h3>
					</div>
				`;
      });

      // Set the innerHTML of the element with the ID "container" to the "movies" string
      document.getElementById("container").innerHTML = movies;
    } else if (response.status === 401) {
      console.log("Wrong Key");
    } else if (response.status === 404) {
      console.log("Movie does not exist ");
    } else {
      console.log("Unexpected error");
    }
  } catch (error) {
    console.log(error);
  }
};

// Call the "loadMovie" function to load the initial page of movies
loadMovie();
