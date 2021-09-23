/* -------------------------------
          PageShare.js v1.0
       Created by OkShort.net
            MIT Licenced
   ------------------------------- */
const oksrt = {
    // Set the text of the button
    text: "Shorten & Share",
    // Set the style of the button
    style: "round", // round, square, round-big, square-big. pill, pill-big
    // Choose your own color (If null blue will be default)
    color: null,
    // To control if the link has already been shortened
    shortened: false,
    // The function is called to load the scripts
    onload: async function() {
        // Inject the CSS into the site
        this.injectCSS().catch(e => { throw e; });
        // Create the HTML we need
        this.createHTML()
        .then((b) => {
            // If the button is not in the dom then return
            if(b == null)
                return;
            // Set the text of the button
            b.innerHTML = this.text;
            // Set the background (If the user input is left null then use default blue)
            ((this.color == null) ? b.style.backgroundColor = "#4C8BF5" : b.style.backgroundColor = this.color);
            // Convert the hex to rgb (If the user input is left null then use default blue)
            let rgb = ((this.color == null) ? this.toRGB("#4C8BF5") : this.toRGB(this.color));
            // Get the brightness of the rgb values
            let bright = Math.round(((parseInt(rgb.r) * 299) +
                                    (parseInt(rgb.g) * 587) +
                                    (parseInt(rgb.b) * 114)) / 1000);
            // If the brightness is over 150 then use black, if it is not then use white text
            let tc = (bright > 150) ? 'black' : 'white';
            // Set the text
            b.style.color = tc;
        })
        .then(() => {
            // Create the onclick event for the button
            this.btnEvent();
        })
        .catch(e => { throw e; });
    },
    // Create the HTML for shortener
    createHTML: async function() {
        // Get the container (span)
        let c = document.querySelector('span[data-short]');
        let p = c.parentElement;
        // Create the content that we need
        let d = document.createElement('div');
        d.classList.add('oksrt-con');
        let b = document.createElement('button');
        d.appendChild(b);
        p.appendChild(d);
        p.replaceChild(d,c);
        // Remove the span
        // Return the button so we can use it later
        return b;
    },
    toRGB: function(hex) {
        var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
        return result ? {
            r: parseInt(result[1], 16),
            g: parseInt(result[2], 16),
            b: parseInt(result[3], 16)
        } : null;
    },
    injectCSS: async function() {
        // Create a style element to contain our styles
        let s = document.createElement('style');
        // Add the styles for the container
        s.innerHTML = ".oksrt-con{margin:16px;padding:2px;background:inherit;color:inherit;}";
        // Choose the right styles to inject for the button
        switch(this.style) {
            case 'round':
                s.innerHTML += ".oksrt-con button{text-decoration: none;border: none;outline: none;font-family:'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;font-weight: 200;-webkit-filter: brightness(100%);padding: 10px 16px;border-radius: 10px;font-size: 20px;}";
                break;
            case 'round-lg':
                s.innerHTML += ".oksrt-con button{text-decoration: none;border: none;outline: none;font-family:'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;font-weight: 200;-webkit-filter: brightness(100%);padding: 12px 20px;border-radius: 15px;font-size: 24px;}";
                break;
            case 'square':
                s.innerHTML += ".oksrt-con button{text-decoration: none;border: none;outline: none;font-family:'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;font-weight: 200;-webkit-filter: brightness(100%);padding: 10px 16px;font-size: 20px;}";
                break;
            case 'square-lg':
                s.innerHTML += ".oksrt-con button{text-decoration: none;border: none;outline: none;font-family:'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;font-weight: 200;-webkit-filter: brightness(100%);padding: 12px 20px;font-size: 24px;}";
                break;
            case 'pill':
                s.innerHTML += ".oksrt-con button{text-decoration: none;border: none;outline: none;font-family:'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;font-weight: 200;-webkit-filter: brightness(100%);padding: 10px 20px;border-radius: 32px;font-size: 20px;}";
                break;
            case 'pill-lg':
                s.innerHTML += ".oksrt-con button{text-decoration: none;border: none;outline: none;font-family:'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;font-weight: 200;-webkit-filter: brightness(100%);padding: 10px 24px;border-radius: 32px;font-size: 24px;}";
                break;                                       
            default:
                // Default is round
                s.innerHTML += ".oksrt-con button{text-decoration: none;border: none;outline: none;font-family:'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;font-weight: 200;-webkit-filter: brightness(100%);padding: 10px 16px;border-radius: 10px;font-size: 20px;}";
                break;
        }
        s.innerHTML += ".oksrt-con button:hover{-webkit-filter: brightness(110%);-webkit-transition: all 500ms ease;-moz-transition: all 500ms ease;-o-transition: all 500ms ease;-ms-transition: all 500ms ease;transition: all 500ms ease;cursor: pointer;}";
        s.innerHTML += ".oksrt-overlay{position:absolute;top:0;left:0;bottom:0;right:0;background:rgba(0,0,0,.5);z-index:888}.oksrt-share{display:flex;flex-direction:column;width:500px;height:auto;position:absolute;left:50%;top:50%;transform:translate(-50%,-50%);background:#212121;color:#f4f4f4;font-family:'Gill Sans','Gill Sans MT',Calibri,'Trebuchet MS',sans-serif;font-size:16px;padding:18px;font-weight:200;z-index:999}.oksrt-share span{position:absolute;top:0;right:0;padding:8px}.oksrt-share span button{background:0 0;border:none;outline:0;color:#f4f4f4;font-size:42px;transition:color 250ms ease}.oksrt-share span button:hover{cursor:pointer;color:#c83232}.oksrt-share h1{font-size:24px;font-weight:200;margin-top:0;margin-bottom:20px}.oksrt-share hr{width:100%;background:#f4f4f4;opacity:.1}.oksrt-row{display:flex;flex-direction:row;width:100%}.oksrt-row .oksrt-col{display:flex;flex-direction:column;justify-content:center;text-align:center;flex:0 0 25%;-ms-flex:0 0 25%;width:25%}.oksrt-row .oksrt-col svg{width:32px;height:32px}.oksrt-row .oksrt-col p{margin-top:4px;font-size:16px}.oksrt-circle{display:flex;align-items:center;justify-content:center;margin:auto;padding:16px;width:40px;height:40px;border-radius:50%;transform:translateY(0);transition:transform 250ms ease}.oksrt-circle:hover{cursor:pointer;transform:translateY(-3px)}.oksrt-copybox{margin-top:16px;padding:8px;display:flex;flex-direction:row;background:#181818}.oksrt-copybox input[type=text]{background:0 0;border:none;outline:0;color:#f4f4f4;width:80%;padding-left:16px;font-size:15px}.oksrt-copybox button{border:none;outline:0;background:0 0;color:#4c8bf5;padding:auto;width:20%;text-transform:uppercase;font-weight:700;font-size:16px;transition:color 250ms ease}.oksrt-loader{width:50px;height:50px;margin:16px auto;border-radius:50%;border:3px solid;border-top-color:#4c8bf5;border-left-color:rgba(76,139,245,.25);border-bottom-color:#4c8bf5;border-right-color:rgba(76,139,245,.25);animation:1s oksrt-spin infinite}@keyframes oksrt-spin{from{transform:rotate(0)}to{transform:rotate(360deg)}}.oksrt-copybox button:hover{cursor:pointer;color:#296bdf}.oksrt-err{margin-top:0;margin-bottom:5px;color:rgb(75,75,75);}";
        // Add the style element to the head
        let h = ((document.head == null) ? document.body : document.head);
        h.appendChild(s);
        let sc = document.createElement('script');
        sc.src = "https://unpkg.com/feather-icons";
        h.appendChild(sc);
        // When the FeatherIcons script loads run the feather.replace function
        sc.addEventListener('load', () => { feather.replace(); });
    },
    // Create the menu we need to display the content
    createMenu: function() {
        // Create the overlay component
        let o = document.createElement('div');
        o.classList.add('oksrt-overlay');
        // Create the menu div
        let m = document.createElement('div');
        m.classList.add('oksrt-share');
        // Create the elements for the close button
        let s = document.createElement('span');
        let b = document.createElement('button');
        let i = document.createElement('i');
        i.dataset.feather = "x";
        // Create the title for the menu
        let t = document.createElement('h1');
        t.innerText = "Getting your Link...";
        // Create the loading spinner
        let l = document.createElement('div');
        l.classList.add('oksrt-loader');
        // Append them all together
        b.appendChild(i); // Add the <i> to the <button>
        s.appendChild(b); // Add the <button> to the <span>
        m.appendChild(s); // Add the <span> to the menu div
        m.appendChild(t); // Add the <h1> to the menu div
        m.appendChild(l); // Add the load spinner to the menu div
        o.appendChild(m); // Add the menu div to the overlay
        // Initialize the close event on the close button
        this.closeEvent('btn', b);
        // Initialize the close event on the background overlay
        this.closeEvent('overlay', o);
        // Add the overlay to the DOM
        document.body.appendChild(o);
        // Call FeatherIcons replace function to have the close button show
        feather.replace();
    },
    // Creates the listeners for closing the menu
    closeEvent: function(type, b) {
        // Add a click listener to the close button
        switch(type) {
            case 'btn':
                // Close button
                b.addEventListener('click', (e) => {
                    // Prevent default browser action
                    e.preventDefault();
                    // Get the menu
                    let m = document.querySelector('.oksrt-overlay');
                    // Remove it from the DOM
                    if (this.shortened === true) {
                        // If the url has already been shortened, show it instead of creating a new one
                        this.hideMenu();
                    } else {
                        // If it hasn't been shortened already, create the menu
                        m.remove();
                    }
                });
                break;
            case 'overlay':
                // When clicked on overlay
                b.addEventListener('click', (e) => {
                    // Prevent default browser action
                    e.preventDefault();
                    // Check if we clicked the right element and not a child
                    if (e.target !== b)
                        return;
                    // Get the menu
                    let m = document.querySelector('.oksrt-overlay');
                    // Remove it from the DOM
                    if (this.shortened === true) {
                        // If the url has already been shortened, show it instead of creating a new one
                        this.hideMenu();
                    } else {
                        // If it hasn't been shortened already, create the menu
                        m.remove();
                    }
                });
                break;
            default:
                return;
        }
    },
    // Creates the listener for the shortening button
    btnEvent: function() {
        // Set up the button onclick event
        document.querySelector('.oksrt-con button').addEventListener('click', async (e) => {
            // Prevent default browser action
            e.preventDefault();
            // Query the OkShort API with the current URL
            let u = window.location.href;
            // Create the menu and overlay
            if (this.shortened === true) {
                // If the url has already been shortened, show it instead of creating a new one
                this.showMenu();
            } else {
                // If it hasn't been shortened already, create the menu
                this.createMenu();
                // Create the query to the OkShort API
                const query = await fetch("https://api.okshort.net/?url=" + encodeURIComponent(u))
                .catch(e => { throw e; });
                // Handle the response
                this.swapMenu(await query.json());
            }
        });
    },
    // Changes the menu from waiting to the result
    swapMenu: function(res) {
        // Check the state of the response
        if(res.response.status == 200) {
            // Set the shortened variable to true because it worked
            this.shortened = true;
            // Response was good
            let s = document.querySelector('.oksrt-loader');
            let p = s.parentNode;
            // Change the title
            let t = p.querySelector('h1');
            t.innerText = "Ready to Share";
            // Create the share button containers
            let r = document.createElement('div');
            r.classList.add('oksrt-row');
            let c1 = document.createElement('div');
            let c2 = document.createElement('div');
            let c3 = document.createElement('div');
            let c4 = document.createElement('div');
            c1.classList.add('oksrt-col');
            c2.classList.add('oksrt-col');
            c3.classList.add('oksrt-col');
            c4.classList.add('oksrt-col');
            // Create the share buttons
            let sb1 = document.createElement('div');
            let sb2 = document.createElement('div');
            let sb3 = document.createElement('div');
            let sb4 = document.createElement('div');
            sb1.classList.add('oksrt-circle');
            sb1.style.backgroundColor = "#f4f4f4";
            sb1.style.color = "#888888";
            sb2.classList.add('oksrt-circle');
            sb2.style.backgroundColor = "#ff4500";
            sb3.classList.add('oksrt-circle');
            sb3.style.backgroundColor = "#1da1f2";
            sb4.classList.add('oksrt-circle');
            sb4.style.backgroundColor = "#888888";
            // Create the icons for the share buttons
            let i1 = document.createElement('i');
            i1.dataset.feather = "code";
            let i2 = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
            i2.setAttribute('width', '24');
            i2.setAttribute('height', '24');
            i2.setAttribute('viewBox', '0 0 24 24');
            let pth = document.createElementNS('http://www.w3.org/2000/svg', 'path');
            pth.setAttribute('d', 'M24 11.779c0-1.459-1.192-2.645-2.657-2.645-.715 0-1.363.286-1.84.746-1.81-1.191-4.259-1.949-6.971-2.046l1.483-4.669 4.016.941-.006.058c0 1.193.975 2.163 2.174 2.163 1.198 0 2.172-.97 2.172-2.163s-.975-2.164-2.172-2.164c-.92 0-1.704.574-2.021 1.379l-4.329-1.015c-.189-.046-.381.063-.44.249l-1.654 5.207c-2.838.034-5.409.798-7.3 2.025-.474-.438-1.103-.712-1.799-.712-1.465 0-2.656 1.187-2.656 2.646 0 .97.533 1.811 1.317 2.271-.052.282-.086.567-.086.857 0 3.911 4.808 7.093 10.719 7.093s10.72-3.182 10.72-7.093c0-.274-.029-.544-.075-.81.832-.447 1.405-1.312 1.405-2.318zm-17.224 1.816c0-.868.71-1.575 1.582-1.575.872 0 1.581.707 1.581 1.575s-.709 1.574-1.581 1.574-1.582-.706-1.582-1.574zm9.061 4.669c-.797.793-2.048 1.179-3.824 1.179l-.013-.003-.013.003c-1.777 0-3.028-.386-3.824-1.179-.145-.144-.145-.379 0-.523.145-.145.381-.145.526 0 .65.647 1.729.961 3.298.961l.013.003.013-.003c1.569 0 2.648-.315 3.298-.962.145-.145.381-.144.526 0 .145.145.145.379 0 .524zm-.189-3.095c-.872 0-1.581-.706-1.581-1.574 0-.868.709-1.575 1.581-1.575s1.581.707 1.581 1.575-.709 1.574-1.581 1.574z');
            pth.setAttribute('fill', '#FFFFFF');
            i2.appendChild(pth);
            let i3 = document.createElement('i');
            i3.dataset.feather = "twitter";
            let i4 = document.createElement('i');
            i4.dataset.feather = "mail";
            // Create the text for each share button
            let t1 = document.createElement('p');
            t1.innerText = "Embed";
            let t2 = document.createElement('p');
            t2.innerText = "Reddit";
            let t3 = document.createElement('p');
            t3.innerText = "Twitter";
            let t4 = document.createElement('p');
            t4.innerText = "Email";
            // Append and order the share buttons
            c1.appendChild(sb1);
            sb1.appendChild(i1);
            c1.appendChild(t1);
            c2.appendChild(sb2);
            sb2.appendChild(i2);
            c2.appendChild(t2);
            c3.appendChild(sb3);
            sb3.appendChild(i3);
            c3.appendChild(t3);
            c4.appendChild(sb4);
            sb4.appendChild(i4);
            c4.appendChild(t4);
            // Add event listeners to each of the share buttons
            this.setShareBtn('embed', sb1, "https://okshort.net/" + res.response.body.code);
            this.setShareBtn('reddit', sb2, "https://okshort.net/" + res.response.body.code);
            this.setShareBtn('twitter', sb3, "https://okshort.net/" + res.response.body.code);
            this.setShareBtn('email', sb4, "https://okshort.net/" + res.response.body.code);
            // Append share buttons to the row
            r.appendChild(c1);
            r.appendChild(c2);
            r.appendChild(c3);
            r.appendChild(c4);
            // Append the row to the menu
            p.replaceChild(r, s);
            // Create the seperating line with an <hr>
            let hr = document.createElement('hr');
            // Add it to the menu
            p.appendChild(hr);
            // Create the link copy box
            let cb = document.createElement('div');
            cb.classList.add('oksrt-copybox');
            // Create the input for the short url to go
            let inp = document.createElement('input');
            inp.type = "text";
            inp.id = "okshort-url";
            inp.value = "https://okshort.net/" + res.response.body.code;
            inp.readOnly = true;
            // Create the copy button
            let cbtn = document.createElement('button');
            cbtn.innerText = "Copy";
            // Append them in order
            cb.appendChild(inp);
            cb.appendChild(cbtn);
            // Append the copy box to the menu
            p.appendChild(cb);
            // Add a click listener to the copy box
            this.setCopyBtn(cbtn);
            // Use FeatherIcons replace function to show all the new icons
            feather.replace();
        } else {
            // Reponse was bad so show the error
            let s = document.querySelector('.oksrt-loader');
            // Replace the title to reflect the error
            let t = s.parentNode.querySelector('h1');
            t.innerText = "Something went wrong"
            // Create the error text
            let e = document.createElement('p');
            e.innerText = "There was an error processing the link. Please try again later.";
            // Create <p> tags to show what the error was
            let c = document.createElement('p');
            c.classList.add('oksrt-err');
            c.innerText = "Code: " + res.response.status;
            let m = document.createElement('p');
            m.classList.add('oksrt-err');
            m.innerText = "Message: " + res.response.status_text;
            // Replace the spinner with the error message
            s.parentNode.replaceChild(e, s);
            // Append the error text
            e.parentNode.appendChild(c);
            e.parentNode.appendChild(m);
        }
    },
    setShareBtn: function(type, b, u) {
        // Find which share button we are working on
        switch(type) {
            case 'embed':
                b.addEventListener('click', () => {
                    let i = document.querySelector('#okshort-url');
                    i.readOnly = false;
                    i.value = '<iframe width="560" height="315" src="' + u + '" title="' + document.title + '" frameborder="0"></iframe>';
                    i.readOnly = true;
                });
                break;
            case 'reddit':
                b.addEventListener('click', () => {
                    window.open('https://www.reddit.com/submit?url=' + encodeURIComponent(u) + '&title=' + encodeURIComponent(document.title));
                });
                break;
            case 'twitter':
                b.addEventListener('click', () => {
                    window.open('https://twitter.com/intent/tweet?text=' + encodeURIComponent(document.title + ". Here's the link: ") + '&url=' + encodeURIComponent(u));
                });
                break;
            case 'email':
                b.addEventListener('click', () => {
                    window.open('mailto:username@emample.com?subject=' + encodeURIComponent(document.title) + '&subject=Subject&body=' + encodeURIComponent(document.title + "Here's the link, take a look at it: " + u));
                });
                break;
            default:
                return;
        }
    },
    // Set the listener to the copy button
    setCopyBtn: async function(b) {
        // Add a click listener to the button
        b.addEventListener('click', (e) => {
            // Prevent default browser action
            e.preventDefault();
            // Get and copy the text from the input
            let u = document.querySelector('#okshort-url');
            // Show the text being highlighted (This is more of a cosmetic thing)
            u.select();
            // Add the short url to the clipboard
            navigator.clipboard.writeText(u.value);
            // Set a timeout to change the text back to normal
            b.innerText = "Copied";
            setTimeout(() => {
                b.innerText = "Copy";
            }, 3000);
        });
    },
    // Shows the menu when it has been hidden
    showMenu: function() {
        // Get the menu
        let m = document.querySelector('.oksrt-overlay');
        // Hide it
        m.style.display = "block";
    },
    // Hides the menu as an alternative to removing it and needing to shorten a new link
    hideMenu: function() {
        // Get the menu
        let m = document.querySelector('.oksrt-overlay');
        // Hide it
        m.style.display = "none";
    }
}
