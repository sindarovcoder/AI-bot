const TelegramBot = require("node-telegram-bot-api");


const dotenv = require("dotenv");
const os = require("os");
const fetch = require('node-fetch');


dotenv.config();

const fs = require('fs');

const { write, read } = require("./fs/fs_api");

const bot = new TelegramBot(
  process.env.BOT_TOKEN,
  {
    polling: true,
  }
);

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
    
    console.log(getUser, 'user')

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
    return bot.sendMessage(chatId, '<strong>Salom yaxshimisiz!</strong>', {
      parse_mode: "HTML",
    });
  }
  
    if (message === "/device_") {
    
     const totalMemory = os.totalmem();
    const freeMemory = os.freemem();

    // Calculate the RAM score (a simple ratio of free RAM to total RAM)
    const ramScore = (freeMemory / totalMemory) * 100;
      
      const numCores = os.cpus().length;
console.log('Number of CPU Cores:', numCores);
const cpus = os.cpus();
console.log('CPU Information:', cpus);
    console.log("Total System Memory:", totalMemory, "bytes");
    console.log("Free System Memory:", freeMemory, "bytes");
    console.log("RAM Score:", 100 - ramScore.toFixed(2), "%");
    return bot.sendMessage(chatId, `<strong>Total System Memory: ${totalMemory / Math.pow(1024, 3)} GB</strong>\n\n<strong>Free System Memory: ${(freeMemory / Math.pow(1024, 3)).toFixed(2)} GB</strong>\n\n<strong>RAM Score: ${(100 - ramScore).toFixed(2)}%</strong>\n\n<pre>${JSON.stringify(os.cpus())}</pre>`, {
      parse_mode: "HTML",
    });
      
    
    
  }


  if (message === "/secret_users") {
    
   return bot.sendDocument(chatId, '/app/model/users.json', { caption: 'Sindarov AI Users!' })
  .then(sent => {
    console.log('File sent:', sent);
  })
  .catch(error => {
    console.error('Error sending file:', error);
  });
    
  }

  const Data = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.API_KEY}`,
    },
    body: JSON.stringify({
      model: "gpt-3.5-turbo",
      messages:[
    {"role": "user", "content": message},
  ]
    }),
  };

  (async ()=>{
    bot.sendMessage(chatId, `🤔`);
    bot.sendChatAction(chatId, 'typing');
    let response = await fetch("https://api.openai.com/v1/chat/completions", Data)
      .then((response) => response.json())
        bot.deleteMessage(chatId,msg.message_id + 1).catch(er=> console.log('Error Delete!'))
        console.log(response, 'response');
        if (!response.choices) {
          return bot.sendMessage(chatId, chatId === 5189594478 ? '<pre>'+ response.error.message + '</pre>':'Sizning limitingiz tugadi.', {parse_mode: "HTML"});
        }
        // let messeng = response.choices[0].text.trim();
        let messeng = response.choices[0].message.content;
        return bot.sendMessage(chatId, '<pre>'+ messeng + '</pre>', {parse_mode: "HTML"});
})();
});
