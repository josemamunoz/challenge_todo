const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			people: [],
			planets: [],
			previouspeople: "",
			nextpeople: "",
			previousplanet: "",
			nextplanet: "",		
			favorites: [],	
		},
		actions: {
			getPeople: async url => {
				const response = await fetch(url);
				const data = await response.json();
				setStore({
					people: data.results,
					previouspeople: data.previous,
					nextpeople: data.next
				})
				
			},
			getPlanets: async url => {
				const response = await fetch(url);
				const data = await response.json();
				setStore({
					planets: data.results,
					previousplanet: data.previous,
					nextplanet: data.next
				})
			},
			getFavorites: favorito =>{
				const store = getStore();
				store.favorites.push(favorito)
				setStore({
					...store.favorites
				})
				/* console.log(store.favorites) */
			},
			removeFavorites: (favorito, indice) => {
				const store = getStore();
				store.favorites = store.favorites.filter((favorito)=> favorito.favorite !== store.favorites[indice].favorite)
				setStore({
					...store.favorites
				})
				/* console.log(store.favorites) */
			}
			
	},
};
}

export default getState;
