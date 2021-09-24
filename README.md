# PageShare

![downloads](https://img.shields.io/github/downloads/okshortnet/pagesharejs/total?style=for-the-badge)
![codesize](https://img.shields.io/github/languages/code-size/okshortnet/pagesharejs?style=for-the-badge)
![linesofcode](https://img.shields.io/tokei/lines/github/okshortnet/pagesharejs?style=for-the-badge)
![version](https://img.shields.io/github/v/release/okshortnet/pagesharejs?style=for-the-badge)
[![website](https://img.shields.io/badge/website-okshort.net-informational?style=for-the-badge)](https://okshort.net/)

## What is PageShare?

PageShare is a website component that allows users to automatically shorten and share page URLs on your website with the [OkShort API](https://okshort.net/api/). This package is simple, customizable, and easy to get set up. Perfect for blogs, review sites, recipe pages, and anywhere you want a simple way to share your page.

## Quick Start

#### 1. Download Files

> If you intend on using a CDN you can skip over the download step

You can download the `pageshare.js` or `pageshare.min.js` [here](https://github.com/okshortnet/pagesharejs/archive/refs/heads/main.zip), or from this repo and add them to your project directory.

#### 2. Include

Include either `pageshare.js` or `pageshare.min.js` with a `<script>` tag:

```html
<script src="path/to/dist/pageshare.js"></script>
```

Or load the script from a CDN provider:
```html
<script src="https://cdn.jsdelivr.net/gh/okshortnet/pagesharejs/src/pageshare.min.js"></script>
```

After loading the script `oksrt` will be available as a global variable.

#### 3. Use it

To add the share button to your page, add a `<span>` tag with `data-short` attribute where you would like it.

Then using the `oksrt` constant, call the function `onload()` and watch the magic happen.

```html
<script>
  oksrt.onload()
</script>
```

The ```<span>``` tag will be replaced with a the share button.

## Customization

#### 1. Customizing the Button

You can fully customize the button with a few simple lines of code. Make sure you set them before you call for the button to be loaded with `oksrt.onload()`.

Variable | Value(s) | Description
--- | --- | ---
`oksrt.text` | Text for the button | Change the text of the button.
`oksrt.style` | round (default), square, pill  | Change the style of the button from presets.
`oksrt.color` | Color Hex (default is [#4C8BF5](https://www.google.com/search?q=%234C8BF5&sxsrf=AOaemvLXHLsvAzpjI6Tw1JrPWEdEMr-aeA%3A1632392067701&source=hp&ei=g1NMYcunKM3F-gTwr7vYDA&iflsig=ALs-wAMAAAAAYUxhkwXHr6lViXffIkZ5hLNy_mf7f7sV&oq=%234C8BF5&gs_lcp=Cgdnd3Mtd2l6EAMyBAgjECc6BwgjEOoCECc6BQgAEIAEUOwIWOAYYPAaaAFwAHgAgAFPiAGRAZIBATKYAQCgAQKgAQGwAQo&sclient=gws-wiz&ved=0ahUKEwiL9c6q7pTzAhXNop4KHfDXDssQ4dUDCAk&uact=5)) | Change the color of the button.
`oksrt.matchBtn` | True or False | Will find the style of other buttons and match it.

The buttons text will automatically be set to a color that will be seen the best with the given background.

#### Button Text

You can set the text of the button to anything that best fits your style. The default button text is *Shorten & Share*.

```javascript
oksrt.text = "Foobar Button"
```

#### Button Style

There are 3 preset button styles that you can choose from, `round`, `square`, `pill`. By default `round` is set.

Examples:
```javascript
oksrt.style = "round"
```
![roundstyle](https://okshort.net/public/img/okshort-github-style-round.jpg)

```javascript
oksrt.style = "square"
```
![roundstyle](https://okshort.net/public/img/okshort-github-style-square.jpg)

```javascript
oksrt.style = "pill"
```
![roundstyle](https://okshort.net/public/img/okshort-github-style-pill.jpg)

By adding `-lg` to the end of a style, you will get a larger version of the button.

```
round-lg, square-lg, pill-lg
```

#### Button Color

You can change the button color to whatever you desire. Just add the HEX code in and you'll be all set.

> **Note:** The text color is not editable. It's based on the brightness of the buttons background color.

Example:
```javascript
oksrt.color = "#4C8BF5"
```

#### Button Style Matcher

If you want the button to better match with the existing ones on your page, you can use `oksrt.matchBtn` to match them. (By default this variable is set to `false`).

There are 2 ways you can do this. 

First, set the variable to `true` and the button will match the styles of the first `<button>` on the DOM.

```javascript
oksrt.matchBtn = true
```

Lastly, you can specify a DOM selector to match the style.

Example of `id`:
```javascript
oksrt.matchBtn = "#foo-bar"
```

Example of `class`:
```javascript
oksrt.matchBtn = ".foo-bar"
```

Example of `id`:
```javascript
oksrt.matchBtn = ".foo #bar a.btn"
```

#### 5. Customizing the Menu

There is only 1 customizable option for the menu, and that is the theme. You can choose between `light` or `dark`.

Variable | Value(s) | Description
--- | --- | ---
`oksrt.theme` | light, dark (default) | Change the theme of the menu.

## Project To-Do List

- [x] Theme changer (Light and Dark) for the menu
- [ ] Custom button css option to customize the style of the share button completely.
- [x] Button style matcher to match the style of other buttons on the page.

## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.

## License
[MIT](https://choosealicense.com/licenses/mit/)
