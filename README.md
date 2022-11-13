# Assignment #2

---

## "The Komputer Store"

> Build a dynamic webpage using “vanilla” JavaScript. Follow the guidelines given below, but feel free to customize the app if you want.
>
> **It must meet the minimum requirements prescribed.**

---

_Assignment summarized from provided documents and in-class instructions below_

---

### Permitted languages

- HTML
- CSS
  - libraries/frameworks permitted
- JavaScript
  - vanilla

### Submit

- Create a git repository and give the teacher access
- Additional challenge:
  - Host the website on the internet

---

### The Bank

    An area where you will store funds and make bank loans

- Display **balance** in "my" currency

- Display **outstanding loan**

  - _display **only** if loan present_

- Include button to **apply for loan**

  - _**must** display a "prompt" popup box with amount input_

- Loan amount can **not exceed 2x bank balance**

- Not more than **1 loan permitted** at a given time

### The Workplace

    An area to increase your earnings and deposit cash into your bank balance

- Show **accumulated salary** in "my" currency

  - _accumulated salary is separate from bank account balance_

- Include button for **performing work**

  - _each click yields 100 units of money_

- Include button to **deposit salary** into bank account

  - _if outstanding loan:
    10% of salary is used as interest free downpayment_

- Include button to spend all current earnings on **loan downpayment**

  - _if loan is fully paid as a result:
    transfer remaining to bank account_

### Laptops shop

    An area to select and display information about the merchandise

- Laptops section has **2 parts**

  1. laptop selection area
  2. info section
     - _include image, name and description_
     - _for image: use base URL without path of computer_

- Use a **select box** to show the **available computers**

  - _must display feature list of selected laptop_
  - _selecting a laptop updates UI with information on selected laptop_

- **Populate selection** dropdown with [Noroff Komputer Store API](https://noroff-komputer-store-api.herokuapp.com/computers)

- **"Buy now"** button should be **final action** of website
  - _used for laptop purchase_
  - _validate sufficient balance_
  - if insufficient balance:
    - _display message saying you cannot afford the laptop_
  - if sufficient balance:
    - _deduct amount from bank_
    - _display message saying you are now the owner of the new laptop_
