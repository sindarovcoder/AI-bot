const TelegramBot = require("node-telegram-bot-api");

const dotenv = require("dotenv");

dotenv.config();

const { write, read } = require("./fs/fs_api");

const bot = new TelegramBot(process.env.BOT_TOKEN, {
  polling: true,
});

let users = read("users.json");

bot.on("message", async (msg) => {
  const chatId = msg.chat.id;

  const message = msg.text;

  console.log(message);

  if (message === "/start") {
    bot.sendMessage(
      chatId,
      `Assalomu alaykum <b>${msg.from.first_name}</b>  men Sindarov AI botman sizga qanday yordam berolaman! ✋\n\nMenga iltimos ingliz tilida yozing! \n\n Misol:   <i>How are you?</i> \n\n\n Buyruqlar: \n /start - Botni qayta boshlash! \n /yordam - botdan yordam olish!`,
      { parse_mode: "HTML" }
    );

    let data = new Date();

    let getUser = users.find((e) => e.id === chatId);

    if (getUser) {
      return;
    }

    users.push({ ...msg.from, vaqti: data });

    return write("users.json", users);
  }

  if (message === "/yordam") {
    return bot.sendMessage(
      chatId,
      ` <b>${msg.from.first_name}</b> foydalanish uchun shunchaki savolingizni botga yozish kifoya. \n\n\n<b>Foydalanish qo’llanmasi:</b>\nBot bilan haqiqiy suhbatdoshdek, har xil tillarda so’zlashishingiz mumkin. E’tibor bering, ba’zida bot savolga xato javob berishi mumkin, bot faqat 2021 yilgacha ma’lumotlarga ega. Maksimal to’g’ri javob olish uchun savolingizni iloji boricha batafsilroq yozing. \n\n\n <b>Buyruqlar:</b> \n /start - Botni qayta boshlash! \n /yordam - botdan yordam olish! \n\n\n <b>Taklif yoki murojaatlar uchun:</b> @sardorcode`,
      { parse_mode: "HTML" },
      {}
    );
  }

  if (
    message === "Hello" ||
    message === "hello" ||
    message === "Salom" ||
    message === "salom"
  ) {
    return bot.sendMessage(chatId, `Salom yaxshimisiz!`, {
      parse_mode: "HTML",
    });
  }
  if (
    message === "Men Sardorman" ||
    message === "Men Sardor" ||
    (message === "Sardorman" && chatId === 5189594478)
  ) {
    return bot.sendMessage(
      chatId,
      "Assalomu alaykum keling Sardor aka sizni <i>tanimabman!</i>",
      { parse_mode: "HTML" }
    );
  }

  if (message === "/2005_secret") {
    return bot.sendMessage(
      chatId,
      JSON.stringify(users),
      { parse_mode: "HTML" },
      {}
    );
  }

  const Data = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.API_KEY}`,
    },
    body: JSON.stringify({
      model: "text-davinci-003",
      max_tokens: 2048,
      temperature: 0.2,
      n: 1,
      stop: null,
      prompt: message,
    }),
  };

  try {
    bot.sendMessage(chatId, `Kuting...`);
    fetch(process.env.CHAT_URL, Data)
      .then((response) => response.json())
      .then((response) => {
        console.log(response);
        if (!response.choices) {
          return bot.sendMessage(chatId, "Serverda muammo bor!", {});
        }
        let messeng = response.choices[0].text.trim();
        return bot.sendMessage(chatId, messeng, {});
      });
  } catch (error) {
    console.log(error);
  }
});
