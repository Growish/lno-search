# lno-search
Widget di ricerca liste nozze per partners di ListaNozzeOnline.com


### Come usare il widget di ricerca

- Caricare un file JS e un CSS nel proprio sito, si consiglia usare direttamente questi:

> https://s3.eu-central-1.amazonaws.com/growish-partner/widget-network/lno-search.min.css

> https://s3.eu-central-1.amazonaws.com/growish-partner/widget-network/lno-search.min.js

- Inserire il blocco di HTML sottostante dove si vuole far vedere il form di ricerca lista nozze.

```html
<form id="lno_form" class="lno-search-wrapper lno-cf">
    <input type="text" name="lno_filter" id="lno_filter" required="" placeholder="Cognome sposi / codice lista">
    <input id="lno_send_btn" type="submit" value="Cerca">
    <div id="lno_results" class="lno_results"></div>
    <span>powered by <a href="https://listanozzeonline.com">ListaNozzeOnline.com</a></span>
</form>
```

- Inizializzare il widget indicando il codice del network a cui si appartiene.

```javascript
lnoSearch.init('587ca51a7fd05fb2468b4567');
```


### Codici network
- ULOVE: 587ca51a7fd05fb2468b4567