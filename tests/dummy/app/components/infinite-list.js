import Ember from "ember";
import _ from "lodash";

function isEmpty(results) {
  if (!results || results.length === 0) {
    return true;
  }
  if (_.isFunction(results.get) && results.get("length") === 0) {
    return true; // Ember array
  }
  return false;
}

export default Ember.Component.extend({
  height: "100vh",
  isLoadingMore: false,

  didInsertElement() {
    this._super(...arguments);
    this.set("items", Ember.A());
    this.set("pageNo", 1);
    this.set("isLoadingMore", false);
    this.set("isFinished", false);
    this.set("destroyed", false);
    this.fetchMoreRecords();

    this.listElement = Ember.$(this.element).find(".infinite-list-container");

    let _this = this;
    this.listElement.on("scroll", function() {
      _this.detectPosition(this);
    });
  },

  detectPosition(elem) {
    if (this.get("isLoadingMore") || this.get("isFinished")) {
      return;
    }

    if (
      $(elem).scrollTop() + $(elem).innerHeight() >=
      $(elem)[0].scrollHeight - 100
    ) {
      Ember.run.debounce(this, this.fetchMoreRecords, 300);
    }
  },

  _safeCb(fn) {
    return (...args) => {
      if (this.get("destroyed")) {
        return;
      }
      return fn.apply(this, args);
    };
  },

  fetchMoreRecords() {
    this.set("isLoadingMore", true);
    Ember.run.later(()=> {
      Ember.RSVP.resolve(this.get("loadMore")(this.pageNo))
        .then(
          this._safeCb(newItems => {
            if (isEmpty(newItems)) {
              this.set("isFinished", true);
              return;
            }
            this.pageNo++;
            this.get("items").addObjects(newItems);
          })
        )
        .finally(
          this._safeCb(() => {
            this.set("isLoadingMore", false);
          })
        );
    }, 500);    
  },

  willDestroyElement() {
    this.set("destroyed", true);
    Ember.$(this.listElement).unbind();
  }
});
