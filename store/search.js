export default {
	state() {
		return {
			datasets: undefined,
		};
	},
	getters: {
		datasets(state) {
			return state.datasets;
		},
	},
	mutations: {
		setDatasets(state, datasets) {
			state.datasets = datasets;
		},
	},
	actions: {
		async search(context, url) {
			// TODO, make this actually search based on parameters (place, type)
			// For now, just get 'em all!
			url = process.env.strapiUrl + "/api/datasets?populate[0]=tags,references&populate[2]=tools.preview";
			let results = await this.$axios.$get(url);
			context.commit("setDatasets", results.data);
		},
	},
};
