// RecipeCard.js

class RecipeCard extends HTMLElement {
  // Called once when document.createElement('recipe-card') is called, or
  // the element is written into the DOM directly as <recipe-card>
  constructor() {
    super(); // Inheret everything from HTMLElement

    // EXPOSE - START (All expose numbers start with A)
    // A1. Attach the shadow DOM to this Web Component (leave the mode open)
    let shadowEl = this.attachShadow({ mode: 'open' });

    // A2. Create an <article> element - This will hold our markup once our data is set
    let elementRoot = document.createElement('article');

    // A3. Create a style element - This will hold all of the styles for the Web Component
    let styleEl = document.createElement('style');

    // A4. Insert all of the styles from cardTemplate.html into the <style> element you just made
    styleEl.textContent = `
      * {
        font-family: sans-serif;
        margin: 0;
        padding: 0;
      }

      a {
        text-decoration: none;
      }

      a:hover {
        text-decoration: underline;
      }

      article {
        align-items: center;
        border: 1px solid rgb(223, 225, 229);
        border-radius: 8px;
        display: grid;
        grid-template-rows: 118px 56px 14px 18px 15px 36px;
        height: auto;
        row-gap: 5px;
        padding: 0 16px 16px 16px;
        width: 178px;
      }

      div.rating {
        align-items: center;
        column-gap: 5px;
        display: flex;
      }

      div.rating>img {
        height: auto;
        display: inline-block;
        object-fit: scale-down;
        width: 78px;
      }

      article>img {
        border-top-left-radius: 8px;
        border-top-right-radius: 8px;
        height: 118px;
        object-fit: cover;
        margin-left: -16px;
        width: calc(100% + 32px);
      }

      p.ingredients {
        height: 32px;
        line-height: 16px;
        padding-top: 4px;
        overflow: hidden;
      }

      p.organization {
        color: black !important;
      }

      p.title {
        display: -webkit-box;
        font-size: 16px;
        height: 36px;
        line-height: 18px;
        overflow: hidden;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
      }

      p:not(.title),
      span,
      time {
        color: #70757A;
        font-size: 12px;
      }
    `
    // A5. Append the <style> and <article> elements to the Shadow DOM
    shadowEl.append(styleEl, elementRoot);
  }

  /**
   * Called when the .data property is set on this element.
   *
   * For Example:
   * let recipeCard = document.createElement('recipe-card'); // Calls constructor()
   * recipeCard.data = { foo: 'bar' } // Calls set data({ foo: 'bar' })
   *
   * @param {Object} data - The data to pass into the <recipe-card>, must be of the
   *                        following format:
   *                        {
   *                          "imgSrc": "string",
   *                          "imgAlt": "string",
   *                          "titleLnk": "string",
   *                          "titleTxt": "string",
   *                          "organization": "string",
   *                          "rating": number,
   *                          "numRatings": number,
   *                          "lengthTime": "string",
   *                          "ingredients": "string"
   *                        }
   */
  set data(data) {
    // If nothing was passed in, return
    if (!data) return;

    // A6. Select the <article> we added to the Shadow DOM in the constructor
    const shadowEl = this.shadowRoot;
    const articleEl = shadowEl.querySelector('article');

    // A7. Set the contents of the <article> with the <article> template given in
    //     cardTemplate.html and the data passed in (You should only have one <article>,
    //     do not nest an <article> inside another <article>). You should use Template
    //     literals (tempalte strings) and element.innerHTML for this.
    const { imgSrc, imgAlt, titleLnk, titleTxt, organization,
      rating, numRatings, lengthTime, ingredients } = data;
    
    const imgEl = articleEl.appendChild(document.createElement('img'));
    imgEl.src = imgSrc;
    imgEl.alt = imgAlt;

    const pTitleEl = articleEl.appendChild(document.createElement('p'));
    pTitleEl.className = 'title';
    const pTitleAEl = pTitleEl.appendChild(document.createElement('a'));
    pTitleAEl.href = titleLnk;
    pTitleAEl.innerText = titleTxt;

    const pOrganizationEl = articleEl.appendChild(document.createElement('p'));
    pOrganizationEl.className = 'organization';
    pOrganizationEl.innerText = organization;

    const divEl = articleEl.appendChild(document.createElement('div'));
    divEl.className = 'rating';
    const divSpanRatingEl = divEl.appendChild(document.createElement('span'));
    divSpanRatingEl.innerText = rating;
    const divImgEl = divEl.appendChild(document.createElement('img'));
    switch (rating) {
      case 0:
        divImgEl.src = '/assets/images/icons/0-star.svg';
        divImgEl.alt = '0 stars';
        break;
      case 1:
        divImgEl.src = '/assets/images/icons/1-star.svg';
        divImgEl.alt = '1 star';
        break;
      case 2:
        divImgEl.src = '/assets/images/icons/2-star.svg';
        divImgEl.alt = '2 stars';
        break;
      case 3:
        divImgEl.src = '/assets/images/icons/3-star.svg';
        divImgEl.alt = '3 stars';
        break;
      case 4:
        divImgEl.src = '/assets/images/icons/4-star.svg';
        divImgEl.alt = '4 stars';
        break;
      case 5:
        divImgEl.src = '/assets/images/icons/5-star.svg';
        divImgEl.alt = '5 stars';
        break;
      default:
        divImgEl.src = '/assets/images/icons/0-star.svg';
        divImgEl.alt = '0 stars';
        break;
    }
    const divSpanNumRatingEl = divEl.appendChild(document.createElement('span'));
    divSpanNumRatingEl.innerText = `(${numRatings})`;

    const timeEl = articleEl.appendChild(document.createElement('time'));
    timeEl.innerText = lengthTime;

    const pIngredientsEl = articleEl.appendChild(document.createElement('p'));
    pIngredientsEl.className = 'ingredients';
    pIngredientsEl.innerText = ingredients;
  }
}

// A8. Define the Class as a customElement so that you can create
//     'recipe-card' elements
customElements.define('recipe-card', RecipeCard);
