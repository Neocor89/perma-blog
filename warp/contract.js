export function handle(state, action) {
  if (action.input.function === "initialize") {
    state.author = action.caller;
  }

  if (
    action.input.function === "createPost" &&
    action.caller === state.author
  ) {
    const posts = state.posts;
    posts[action.input.post.id] = action.input.post;
    state.posts = posts;
  }

  //: UPDATE

  if (
    action.input.function === "updatePost" &&
    action.caller === state.author
  ) {
    const posts = state.posts;
    const postToUpdate = action.input.posts;
    posts[postToUpdate.id] = postToUpdate;
    state.posts = posts;
  }
  //: DELETE

  if (
    action.input.function === "deletePost" &&
    action.caller === state.author
  ) {
    const posts = state.posts;
    delete posts[action.input.post.id];
    state.posts = posts;
  }

  return {
    state,
  };
}
