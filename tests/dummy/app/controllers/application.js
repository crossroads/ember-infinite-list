import Ember from "ember";
import _ from "lodash";

export default Ember.Controller.extend({
  
  generateFakeData() {
    let data = [];
    const NAMES = ["Bruce Banner", "Captain America", "Agent Fury", "Tony Stark", "Clint", "Natasha", "Sam Wilson", "Thor", "Thanos", "Rocket", "Col. Rhodes"];
    
    for (var i = 1; i <= 25; i++) {
      data.push({ name: NAMES[_.random(0, NAMES.length-1)] });
    }
    return data;
  },

  actions: {
    loadMoreData() {
      return this.generateFakeData();
    }
  }
});
