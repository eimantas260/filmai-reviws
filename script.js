 const MOVIES_DATA = [
          {
            "id": 1,
            "title": "The Fight Club",
            "year": 1999,
            "genre": "Action, Crime, Drama",
            "rating": 8.9,
            "poster": "https://m.media-amazon.com/images/M/MV5BOTgyOGQ1NDItNGU3Ny00MjU3LTg2YWEtNmEyYjBiMjI1Y2M5XkEyXkFqcGc@._V1_.jpg",
            "description": "An insomniac office worker and a devil-may-care soap maker form an underground fight club that evolves into much more.",
            "director": "David Fisher",
            "cast": ["Edward Norton", "Brad Pitt", "Helena Bonham Carter", "Meat Loaf"],
            "duration": "2h 19m"
          },
          {
            "id": 2,
            "title": "American Psycho",
            "year": 2000,
            "genre": "Dark Comedy, Psychological Drama, Crime",
            "rating": 7.8,
            "poster": "https://m.media-amazon.com/images/M/MV5BNzBjM2I5ZjUtNmIzNy00OGNkLWIwZDMtOTAwYWUwMzA2YjdlXkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg",
            "description": "A wealthy New York City investment banking executive, Patrick Bateman, hides his alternate psychopathic ego from his co-workers and friends as he delves deeper into his violent, hedonistic fantasies.",
            "director": "Mary Harron",
            "cast": ["Christian Bale", "Willem Dafoe", "Jared Leto ", "Josh Lucas"],
            "duration": "1h 42min"
          },
          {
            "id": 3,
            "title": "Warfare",
            "year": 2025,
            "genre": "Action, War",
            "rating": 7.3,
            "poster": "https://musicart.xboxlive.com/7/85136e00-0000-0000-0000-000000000002/504/image.jpg",
            "description": "A platoon of Navy SEALs embark on a dangerous mission in Ramadi, Iraq, with the chaos and brotherhood of war retold through their memories of the event.",
            "director": "Ray Mendoza",
            "cast": ["D’Pharaoh Woon‑A‑Tai", "Will Poulter", "Cosmo Jarvis", "Joseph Quinn"],
            "duration": "1h 32min"
          },
          {
            "id": 4,
            "title": "Damsel",
            "year": 2024,
            "genre": "Action",
            "rating": 6.1,
            "poster": "https://m.media-amazon.com/images/M/MV5BZTAzODc1ZjUtNGQwZS00YTc2LTliNzQtMDdlNzllNmU5Yzk4XkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg",
            "description": "A dutiful damsel agrees to marry a handsome prince, only to find the royal family has recruited her as a sacrifice to repay an ancient debt.",
            "director": "Juan Carlos Fresnadillo",
            "cast": ["Millie Bobby Brown", "Ray Winstone", "Angela Bassett", "Nick Robinson"],
            "duration": "1h 50h"
          },
          {
            "id": 5,
            "title": "The Godfather",
            "year": 1972,
            "genre": "Crime, Drama",
            "rating": 9.2,
            "poster": "https://m.media-amazon.com/images/M/MV5BNGEwYjgwOGQtYjg5ZS00Njc1LTk2ZGEtM2QwZWQ2NjdhZTE5XkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg",
            "description": "The aging patriarch of an organized crime dynasty transfers control of his clandestine empire to his reluctant son.",
            "director": "Francis Ford Coppola",
            "cast": ["Marlon Brando", "Al Pacino", "James Caan", "Diane Keaton"],
            "duration": "2h 55min"
          }
        ];

        const FEATURED_MOVIES = MOVIES_DATA.slice(0, 5);

        // Global 
        let allMovies = MOVIES_DATA;
        let featuredMovies = FEATURED_MOVIES;
        let filteredMovies = [...allMovies];
        let currentPage = 'home';

        // filmai klases
        class MovieCard {
            static create(movie) {
                const card = document.createElement('div');
                card.className = 'movie-card';
                card.innerHTML = this.createHTML(movie);
                return card;
            }

            static createHTML(movie) {
                const stars = this.generateStars(movie.rating);
                
                return `
                    <div class="movie-poster-container">
                        <img src="${movie.poster}" alt="${movie.title}" class="movie-poster" loading="lazy">
                    </div>
                    <div class="movie-info">
                        <h3 class="movie-title">${movie.title}</h3>
                        <div class="movie-year">${movie.year}</div>
                        <div class="movie-rating">
                            <div class="rating-stars">${stars}</div>
                            <span class="rating-value">${movie.rating}</span>
                        </div>
                        <div class="movie-genre">${movie.genre}</div>
                        <p class="movie-description">${movie.description}</p>
                    </div>
                `;
            }

            static generateStars(rating) {
                const fullStars = Math.floor(rating / 2);
                const hasHalfStar = (rating % 2) >= 1;
                const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
                
                let starsHtml = '';
                
                for (let i = 0; i < fullStars; i++) {
                    starsHtml += '<span class="rating-star">★</span>';
                }
                
                if (hasHalfStar) {
                    starsHtml += '<span class="rating-star">☆</span>';
                }
                
                for (let i = 0; i < emptyStars; i++) {
                    starsHtml += '<span class="rating-star empty">☆</span>';
                }
                
                return starsHtml;
            }
        }

        document.addEventListener('DOMContentLoaded', function() {
            initializeNavigation();
            initializeSearch();
            initializeFilters();
            initializeCategoryCards();
            loadFeaturedSlider();
            loadMoviesGrid();
            console.log('MovieDB initialized successfully with', allMovies.length, 'movies');
        });

        function initializeNavigation() {
            const navLinks = document.querySelectorAll('.nav-link');
            navLinks.forEach(link => {
                link.addEventListener('click', (e) => {
                    e.preventDefault();
                    const page = link.dataset.page;
                    showPage(page);
                });
            });
        }

        function initializeSearch() {
            const searchInput = document.getElementById('searchInput');
            
            let searchTimeout;
            searchInput.addEventListener('input', (e) => {
                clearTimeout(searchTimeout);
                searchTimeout = setTimeout(() => {
                    const query = e.target.value.trim();
                    if (query.length > 0) {
                        const results = searchMovies(query);
                        displaySearchResults(results, query);
                        showPage('search');
                    }
                }, 300);
            });
        }

        // filteriai
        function initializeFilters() {
            const genreFilter = document.getElementById('genreFilter');
            const yearFilter = document.getElementById('yearFilter');
            const ratingFilter = document.getElementById('ratingFilter');
            
            [genreFilter, yearFilter, ratingFilter].forEach(filter => {
                if (filter) {
                    filter.addEventListener('change', applyFilters);
                }
            });
        }

        // korteles
        function initializeCategoryCards() {
            const categoryCards = document.querySelectorAll('.category-card');
            categoryCards.forEach(card => {
                card.addEventListener('click', () => {
                    const genre = card.dataset.genre;
                    filterByGenre(genre);
                });
            });
        }

        // futured filmai
        function loadFeaturedSlider() {
            const slider = document.getElementById('featuredSlider');
            if (!slider || !featuredMovies.length) return;
            
            const movieCards = featuredMovies.map(movie => {
                const card = MovieCard.create(movie);
                card.addEventListener('click', () => showMovieDetails(movie));
                return card;
            });
            
            slider.innerHTML = '';
            movieCards.forEach(card => slider.appendChild(card));
        }

        // filmu gridai
        function loadMoviesGrid() {
            const grid = document.getElementById('moviesGrid');
            const loading = document.getElementById('loading');
            
            if (!grid) return;
            
            if (loading) {
                loading.classList.add('show');
            }
            
            setTimeout(() => {
                grid.innerHTML = '';
                
                filteredMovies.forEach(movie => {
                    const card = MovieCard.create(movie);
                    card.addEventListener('click', () => showMovieDetails(movie));
                    grid.appendChild(card);
                });
                
                if (loading) {
                    loading.classList.remove('show');
                }
            }, 500);
        }

        // filmu psk
        function searchMovies(query) {
            const normalizedQuery = query.toLowerCase().trim();
            return allMovies.filter(movie => {
                return movie.title.toLowerCase().includes(normalizedQuery) ||
                       movie.genre.toLowerCase().includes(normalizedQuery) ||
                       movie.director.toLowerCase().includes(normalizedQuery) ||
                       movie.cast.some(actor => actor.toLowerCase().includes(normalizedQuery));
            });
        }

        // Apply filters
        function applyFilters() {
            const genreFilter = document.getElementById('genreFilter');
            const yearFilter = document.getElementById('yearFilter');
            const ratingFilter = document.getElementById('ratingFilter');
            
            let filtered = [...allMovies];
            
            if (genreFilter && genreFilter.value) {
                filtered = filtered.filter(movie => 
                    movie.genre.toLowerCase().includes(genreFilter.value.toLowerCase())
                );
            }
            
            if (yearFilter && yearFilter.value) {
                filtered = filtered.filter(movie => 
                    movie.year.toString() === yearFilter.value
                );
            }
            
            if (ratingFilter && ratingFilter.value) {
                filtered = filtered.filter(movie => 
                    movie.rating >= parseFloat(ratingFilter.value)
                );
            }
            
            filteredMovies = filtered;
            loadMoviesGrid();
        }

        // pagal zandra
        function filterByGenre(genre) {
            const genreFilter = document.getElementById('genreFilter');
            if (genreFilter) {
                genreFilter.value = genre;
            }
            applyFilters();
            showPage('movies');
        }

        // Display 
        function displaySearchResults(results, query) {
            const searchResults = document.getElementById('searchResults');
            if (!searchResults) return;
            
            if (results.length === 0) {
                searchResults.innerHTML = `
                    <div class="no-results">
                        <h2>No Results Found</h2>
                        <p>Sorry, we couldn't find any movies matching "${query}".</p>
                    </div>
                `;
                return;
            }
            
            searchResults.innerHTML = `
                <h2>Search Results for "${query}" (${results.length} found)</h2>
                <div class="movies-grid" style="margin-top: 2rem;">
                    ${results.map(movie => MovieCard.createHTML(movie)).join('')}
                </div>
            `;
            
            const searchCards = searchResults.querySelectorAll('.movie-card');
            searchCards.forEach((card, index) => {
                card.addEventListener('click', () => showMovieDetails(results[index]));
            });
        }

        // rodo filmu details modal
        function showMovieDetails(movie) {
            const modal = document.getElementById('movieModal');
            const detailsContainer = document.getElementById('movieDetails');
            
            if (!modal || !detailsContainer) return;
            
            const stars = MovieCard.generateStars(movie.rating);
            const castList = movie.cast ? movie.cast.join(', ') : 'Not available';
            
            const details = `
                <div style="display: grid; grid-template-columns: 300px 1fr; gap: 2rem; align-items: start;">
                    <div>
                        <img src="${movie.poster}" alt="${movie.title}" style="width: 100%; border-radius: 8px; box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);">
                    </div>
                    <div>
                        <h1 style="font-size: 2.5rem; font-weight: bold; margin-bottom: 1rem; color: var(--gold); line-height: 1.2;">${movie.title}</h1>
                        
                        <div style="display: flex; flex-wrap: wrap; gap: 1.5rem; margin-bottom: 1.5rem; font-size: 0.95rem; color: var(--text-secondary);">
                            <span><strong style="color: var(--text-primary);">Year:</strong> ${movie.year}</span>
                            <span><strong style="color: var(--text-primary);">Duration:</strong> ${movie.duration || 'N/A'}</span>
                            <span><strong style="color: var(--text-primary);">Director:</strong> ${movie.director}</span>
                        </div>
                        
                        <div style="display: flex; align-items: center; gap: 1rem; margin-bottom: 2rem; padding: 1rem; background: rgba(255, 215, 0, 0.1); border-radius: 8px; border: 1px solid rgba(255, 215, 0, 0.2);">
                            <div style="display: flex; gap: 0.2rem;">${stars}</div>
                            <span style="font-size: 1.3rem; font-weight: bold; color: var(--gold);">${movie.rating}/10</span>
                            <span style="font-size: 0.9rem; color: var(--text-muted);">IMDb Rating</span>
                        </div>
                        
                        <div style="margin-bottom: 2rem;">
                            <strong style="display: block; margin-bottom: 0.5rem; color: var(--text-primary);">Genre:</strong>
                            <div style="display: flex; flex-wrap: wrap; gap: 0.5rem;">
                                ${movie.genre.split(',').map(g => `<span style="background: var(--dark-card); color: var(--gold); padding: 0.3rem 0.8rem; border-radius: 20px; font-size: 0.85rem; border: 1px solid var(--border);">${g.trim()}</span>`).join('')}
                            </div>
                        </div>
                        
                        <div style="margin-bottom: 2rem;">
                            <h3 style="font-size: 1.3rem; margin-bottom: 1rem; color: var(--gold);">Plot Summary</h3>
                            <p style="line-height: 1.7; color: var(--text-secondary); font-size: 1rem;">${movie.description}</p>
                        </div>
                        
                        <div style="margin-bottom: 2rem;">
                            <h3 style="font-size: 1.3rem; margin-bottom: 1rem; color: var(--gold);">Cast</h3>
                            <p style="color: var(--text-secondary);">${castList}</p>
                        </div>
                    </div>
                </div>
            `;
            
            detailsContainer.innerHTML = details;
            modal.classList.add('show');
            document.body.style.overflow = 'hidden';
        }

        function closeModal() {
            const modal = document.getElementById('movieModal');
            if (modal) {
                modal.classList.remove('show');
                document.body.style.overflow = '';
            }
        }

        // Show page
        function showPage(pageName) {
            const navLinks = document.querySelectorAll('.nav-link');
            navLinks.forEach(link => {
                link.classList.toggle('active', link.dataset.page === pageName);
            });
            
            const pages = document.querySelectorAll('.page');
            pages.forEach(page => {
                page.classList.toggle('active', page.id === `${pageName}Page`);
            });
            
            currentPage = pageName;
            
            const pageTitles = {
                home: 'MovieDB - Professional Movie Database',
                movies: 'All Movies - MovieDB',
                search: 'Search Results - MovieDB'
            };
            
            document.title = pageTitles[pageName] || 'MovieDB';
        }

        let currentSlideIndex = 0;
        const slidesPerView = 3;

        document.getElementById('prevBtn').addEventListener('click', () => {
            const slider = document.getElementById('featuredSlider');
            const slides = slider.children;
            if (currentSlideIndex > 0) {
                currentSlideIndex--;
                updateSliderPosition();
            }
        });

        document.getElementById('nextBtn').addEventListener('click', () => {
            const slider = document.getElementById('featuredSlider');
            const slides = slider.children;
            if (currentSlideIndex < slides.length - slidesPerView) {
                currentSlideIndex++;
                updateSliderPosition();
            }
        });

        function updateSliderPosition() {
            const slider = document.getElementById('featuredSlider');
            const slideWidth = 320; // 300px + 20px gap
            slider.style.transform = `translateX(-${currentSlideIndex * slideWidth}px)`;
        }