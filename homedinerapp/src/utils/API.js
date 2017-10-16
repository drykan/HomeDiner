import axios from "axios";

// The getRecipes method retrieves recipes from the server
// It accepts a "query" or term to search the recipe api for
export default {
  getRecipes: function(query) {
    return axios.get("https://api.edamam.com/search?q="+query+"&app_id=f07cd4ab&app_key=89ea0a417eeef00bdfce5330e650f22e");
  }
 
};