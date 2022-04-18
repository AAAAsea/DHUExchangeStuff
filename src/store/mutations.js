export default {
  updateData(state, { key, value }) {
    state.data[key] = value;
  },
  updateLikedXXX(state, { name, data }) {
    console.log("liked",name)
    state.liked[name] = data;
  },
}