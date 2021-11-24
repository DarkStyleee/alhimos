const formEmail = document.getElementById("form-email");
const sendResult = document.getElementById("info");
const formBtn = document.getElementById("form-btn");
const formBtnMain = document.getElementById("form-btn-wrapper");
const email = document.getElementById("email");

const formHtml = `
  <input class="beta-register-form__input" placeholder="Email" type="email" name="email" id="email">
  <div id="form-btn-wrapper" class="form-btn">
    <button id="form-btn" type="submit" class="form-btn__btn">Подать заявку</button>
  </div>
  <div id="info"></div>
`;

const validateEmail = (mail) => {
  if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail)) {
    return true;
  }

  sendResult.innerHTML =
    '<p style="font-size: 1rem; color: #ff7878; text-align: center;">Неправильный электронный адрес!</p>';
  return false;
};

formBtn.addEventListener("click", (e) => {
  e.preventDefault();

  const valid = validateEmail(email.value);

  if (valid) {
    sendResult.innerHTML =
      '<p style="font-size: 1.25rem; color: #8ff88f; text-align: center;">Ваш электронный адрес успешно сохранен!</p>';

    formBtnMain.remove();
    email.remove();
  }
});

let base_state = {
  roulette: false,
  showItems: true,
  btnDisabled: false,
  degree: 0,
  itemDegree: [],
  defaultDeg: 1800,
  delay: 10,
  timeoutDelay: 15,
  minOffset: -20,
  maxOffset: 20,
  itemsLimit: 8,
  reward: null,
  itemsList: [
    {
      id: 0,
      name: "Зелье защиты",
      quality: "common",
      count: 2,
      dropChance: 0.7,
    },
    {
      id: 1,
      name: "Мешочек с золотом",
      quality: "gold",
      count: 2,
      dropChance: 0.75,
    },
    {
      id: 2,
      name: "Мех",
      quality: "common",
      count: 5,
      dropChance: 0.65,
    },
    {
      id: 3,
      name: "Костяной ключ",
      quality: "rare",
      count: 1,
      dropChance: 0.25,
    },
    {
      id: 4,
      name: "Старый сундук",
      quality: "common",
      count: 1,
      dropChance: 0.7,
    },
    {
      id: 5,
      name: "Золотой сундук",
      quality: "rare",
      count: 1,
      dropChance: 0.25,
    },
    {
      id: 6,
      name: "Обрядная маска",
      quality: "uncommon",
      count: 1,
      dropChance: 0.35,
    },
    {
      id: 7,
      name: "Рецепт зелья",
      quality: "legendary",
      count: 1,
      dropChance: 0.01,
    },
    {
      id: 8,
      name: "Чан с кристаллами",
      quality: "mythical",
      count: 1,
      dropChance: 0.085,
    },
    {
      id: 9,
      name: "Турнирные кристаллы",
      quality: "rare",
      count: 5,
      dropChance: 0.3,
    },
    {
      id: 10,
      name: "Желтоцвет",
      quality: "common",
      count: 8,
      dropChance: 0.65,
    },
    {
      id: 11,
      name: "Кровавый лист",
      quality: "common",
      count: 4,
      dropChance: 0.65,
    },
    {
      id: 12,
      name: "Набор зелий",
      quality: "rare",
      count: 1,
      dropChance: 0.3,
    },
    {
      id: 13,
      name: "Набор зелий",
      quality: "mythical",
      count: 1,
      dropChance: 0.085,
    },
    {
      id: 14,
      name: "Зелье уклонения",
      quality: "uncommon",
      count: 3,
      dropChance: 0.45,
    },
    {
      id: 15,
      name: "Зелье оглушения",
      quality: "rare",
      count: 3,
      dropChance: 0.35,
    },
    {
      id: 16,
      name: "Зелье быстрого восстановления",
      quality: "rare",
      count: 3,
      dropChance: 0.3,
    },
    {
      id: 17,
      name: "Зелье мнговенного восстановления",
      quality: "mythical",
      count: 3,
      dropChance: 0.085,
    },
    {
      id: 18,
      name: "Кристаллы",
      quality: "legendary",
      count: 1,
      dropChance: 0.015,
    },
  ],
  items: [],
};

let roulette = document.getElementById("roulette");
let roulette_html = document.getElementById("roulette__wheel");
let items_html = document.getElementById("items");
let roulette_btn = document.getElementById("roulette_btn");
let reward_html = document.getElementById("reward");

let render = () => {
  items_html.innerHTML = "";
  base_state.roulette
    ? (roulette_html.style = `transition: ${base_state.delay}s; transform: rotate(${base_state.degree}deg);`)
    : (roulette_html.style = `transition: 0s; transform: rotate(${
        base_state.degree - base_state.defaultDeg
      }deg);`);

  items_html.style = `transition: 1s opacity; opacity: ${
    base_state.showItems ? 1 : 0
  }`;

  for (const idx in base_state.items) {
    const item = base_state.items[idx];
    items_html.insertAdjacentHTML(
      "afterbegin",
      `
      <div class='roulette__item rl-item-${idx}'>
        <div class="dp-item dp-item--${item.quality}">
          <img src='./img/item-${item.id}.png' />
          ${
            item.count > 1
              ? `<span class="dp-item__count">${item.count}</span>`
              : ""
          }
        </div>
      </div>
    `
    );
  }
};

let checkBtn = () => {
  roulette_btn.blur();
  base_state.btnDisabled
    ? (roulette_btn.disabled = true)
    : (roulette_btn.disabled = false);
};

let checkReward = () => {
  reward_html.innerHTML = "";
  reward_html.insertAdjacentHTML(
    "afterbegin",
    `
    <p> Вы выиграли: <span style='font-weight: 700'>${base_state.reward.name}</span></p>
    <div class="reward-img">
      <img style="width: 100%;" src='./img/item-${base_state.reward.id}.png' />
      <span class="reward_count">x${base_state.reward.count}</span>
    </div>
  `
  );
};

let deleteRoulette = () => {
  roulette.remove();
  formEmail.style.display = "flex";
};

let spinFadeAnimation = () => {
  base_state.showItems = false;
  base_state.btnDisabled = true;
  checkBtn();

  setTimeout(() => {
    base_state.showItems = true;
    spin();
  }, 500);
};

let spin = () => {
  getItems(base_state.itemsList);

  let item = dropItem(base_state.items);
  let itemIndex = base_state.items.indexOf(item);

  let defaultRotationDeg = -45;
  let rand =
    base_state.minOffset +
    Math.random() * (base_state.maxOffset + 1 - base_state.minOffset);

  let itemRotate = defaultRotationDeg * itemIndex;

  base_state.degree = base_state.defaultDeg + itemRotate + Math.floor(rand);

  base_state.roulette = true;

  render();

  setTimeout(() => {
    base_state.reward = item;
    checkReward();
    base_state.roulette = false;
    base_state.btnDisabled = false;
    checkBtn();
    render();
    deleteRoulette();
  }, base_state.delay * 1000);
};

let dropItem = (items) => {
  let lerp = (min, max, value) => (1 - value) * min + value * max;

  let drop = (items) => {
    let total = items.reduce(
      (accumulator, item) => (accumulator += item.dropChance),
      0
    );

    let chance = lerp(0, total, Math.random());

    let current = 0;
    for (let item of items) {
      if (current <= chance && chance < current + item.dropChance) {
        return item;
      }

      current += item.dropChance;
    }
  };

  return drop(items);
};

let getItems = (items) => {
  let newArr = [];
  for (let i = 0; i < base_state.itemsLimit; i++) {
    let item = items[Math.floor(Math.random() * items.length)];
    let findCopy = newArr.find((el) => el.id === item.id);
    findCopy ? i-- : (newArr = [...newArr, item]);
  }
  base_state.items = [...newArr];
};

let testDropItems = () => {
  let testObj = [];

  for (let i = 0; i < 100; i++) {
    let item = dropItem(base_state.items);
    let obj = {
      id: item.id,
      name: item.name,
      quality: item.quality,
    };
    testObj = [...testObj, obj];
  }

  let result = [
    ...testObj
      .reduce((mp, o) => {
        if (!mp.has(o.id))
          mp.set(o.id, {
            ...o,
            count: 0,
          });
        mp.get(o.id).count++;
        return mp;
      }, new Map())
      .values(),
  ];
};
