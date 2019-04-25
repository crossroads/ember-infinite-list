import Ember from "ember";

export default Ember.Controller.extend({
  count: 1,

  generateFakeData() {
    let data = [];
    const NAMES = ["Bruce Banner", "Captain America", "Agent Fury", "Tony Stark", "Clint", "Natasha", "Sam Wilson", "Thor", "Thanos", "Rocket", "Col. Rhodes"];
    
    for (var i = 1; i <= 25; i++) {
      data.push({ id: this.count++, name: NAMES[Math.floor(Math.random() * NAMES.length)] });
    }
    return data;
  },

  actions: {
    loadMoreData() {
      return this.generateFakeData();
    }
  }
});
