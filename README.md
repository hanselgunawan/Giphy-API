# Superheroes GIF-Generator

Basic useful feature list:

 * Add superhero name
 * Add new button to generate GIFs based on the button's value
 * Display 10 GIFs when button is clicked
 * Pause and play the displayed GIF

The code below calls the [Giphy API](https://developers.giphy.com/):

```javascript
let query = {
        text: $(event.target).text(),
        offset: 0,
        request() {
            return `${BASE_URL}${ENDPOINT}?	q=${this.text}&limit=${LIMIT}&offset=${this.offset}&api_key=${PUBLIC_KEY}`;
        },
        fetch(callback) {
            $.getJSON(this.request())
                .success(data => {
                    results = data.data;
                    if (results.length) {
                        callback(results);
                    } else {
                        callback('');
                    }
                })
                .fail(error => {
                    console.log(error);
                });
        }
    };
```

### Stuff used to make this:

 * [Giphy API](https://developers.giphy.com/)
 * [jQuery](https://api.jquery.com/)
 * [JavaScript](https://www.w3schools.com/js/)

### Here's the link to my app:

[https://hanselgunawan.github.io/Giphy-API](https://hanselgunawan.github.io/Giphy-API)
