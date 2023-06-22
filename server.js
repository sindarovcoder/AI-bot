const TelegramBot = require("node-telegram-bot-api");

const bot = new TelegramBot("5866561097:AAGyv_Iz7cj8KG-vP-35q5lyoQyODP2o3Ew", {
  polling: true,
});

bot.on("message", (msg) => {
  const chatId = msg.chat.id;
  const message = msg.text;
  console.log(message);
  if (message === "/start") {
    return bot.sendMessage(
      chatId,
      `Assalomu alaykum <b>${msg.from.first_name}</b>  men Sindarov AI botman sizga qanday yordam berolaman! ✋\nMenga iltimos ingliz tilida yozing misol: <i>How are you?</i>`,
      { parse_mode: "HTML" }
    );
  }

  if (message === "/yordam") {
    return bot.sendMessage(
      chatId,
      `Yordam olish uchun yozing: <a href="t.me/sardorcode">Salom</a>`,
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
  if (message === "Men Sardorman") {
    return bot.sendMessage(
      chatId,
      "Assalomu alaykum keling Sardor aka sizni <i>tanimabman!</i>",
      { parse_mode: "HTML" }
    );
  }

  const API_KEY = `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`;
  const Data = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${API_KEY}`,
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
    fetch("https://api.openai.com/v1/completions", Data)
      .then((response) => response.json())
      .then((response) => {
        console.log(response);
        if (!response.choices) {
          return bot.sendMessage(chatId, "Serverda", {});
        }
        let messeng = response.choices[0].text.trim();
        return bot.sendMessage(chatId, messeng, {});
      });
  } catch (error) {
    console.log(error);
  }
});
