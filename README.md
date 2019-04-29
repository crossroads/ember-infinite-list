Ember Infinite List
==============================================================================

Ember Infinite List is very easy and flexible to use addon for pagination on scrolling.

Compatibility
------------------------------------------------------------------------------

* Ember.js v2.18 or above
* Ember CLI v2.13 or above


Installation
------------------------------------------------------------------------------

```
ember install infinite-list
```


Usage
------------------------------------------------------------------------------

It's very easy to use addon. You have flexibility to display and fetch data according to your will. You have to use this addon as a block component. It expects 3 things to be passed:
- Display logic 
- `loadMore` action to trigger pagination on reaching bottom of the page.
- height of the list (optional)

```
**template.hbs**:
{{#infinite-list height="75vh" loadMore=(action "loadMoreData") as |items| }}
  <div class="list">
    <ol>
      {{#each items as |item|}}
        <li>
          <a>{{item.name}}</a>
        </li>
      {{/each}}
    </ol>
  </div>  
{{/infinite-list}}

**controller.js**:
actions: {
  loadMore() {
    /**
      return data on each pagination.
      Example: 
      return this.store.query("user", {page: page});
    **/   
  }
}
```

Contributing
------------------------------------------------------------------------------

See the [Contributing](CONTRIBUTING.md) guide for details.


License
------------------------------------------------------------------------------

This project is licensed under the [MIT License](LICENSE.md).
