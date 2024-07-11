import axios from 'axios'
 let key = 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJHcm91cE5hbWUiOiLkuIHnu7TmtpsiLCJVc2VyTmFtZSI6IuS4gee7tOa2myIsIkFjY291bnQiOiIiLCJTdWJqZWN0SUQiOiIxNzU5NDg1ODgzOTg1MTcwNzk4IiwiUGhvbmUiOiIxNTg1NTQwNTI1NyIsIkdyb3VwSUQiOiIxNzU5NDg1ODgzOTc2NzgyMTkwIiwiUGFnZU5hbWUiOiIiLCJNYWlsIjoiIiwiQ3JlYXRlVGltZSI6IjIwMjQtMDctMTEgMTQ6MzA6MjYiLCJpc3MiOiJtaW5pbWF4In0.dS8FbN2gY69LsTwoXrEVCSCUXQujsm5da9xWCWup0Sl65IrkMhGp7zuD1doKe9aOtEuybjevRX9NlEFDqYfMPb2KHqduaqHW4ZgP93Ll_EJZmPgx1t2U7oXL1QbjZRoPDng6H0moHNpZfmyzjKTWb5yjAH_fQzazNX1_2QRjFu2hU1JFyeXoRgIqX3lGrUK5peBUh2gQuZ6u2PhSsi83evq_H9YCDlIoxU1ffYpOlcjUn2ueXfxsnuYr80sQ2-ykHhAUvnsA0G6LozEdsGhe9KtM-ZVEdQndXjxsHgewtFCw7VQGk7oRvATRv8TKNo_vnX5vWKssNgTwRX3wLGqWrw'
 let groupID = '1759485883976782190'
export async function POST(request: any) {
 const res = await request.json()
const payload = {
  "model": "abab6.5s-chat",
  "tokens_to_generate": 2048,
  "temperature": 0.1,
  "top_p": 0.95,
  "stream": false,
  "reply_constraints": {
    "sender_type": "BOT",
    "sender_name": "MM智能助理"
  },
  "sample_messages": [],
  "plugins": [],
  "messages": [
    {
      "sender_type": "USER",
      "sender_name": "用户",
      "text": res.text
    },
  ],
  "bot_setting": [
    {
      "bot_name": "MM智能助理",
      "content": `请提取用户输入的内容的标题并且润色文本内容，请勿过多修改原文内容，标题与正文之间用{ "title": '', "content": ''}的方式组合`
    }
  ]
};
  try {
    const url = `https://api.minimax.chat/v1/text/chatcompletion_pro?GroupId=${groupID}`;
  //   const res = await axios({
  //   method: 'post',
  //   url: url,
  //   headers: {
  //     'Content-Type': 'application/json',
  //     'Authorization': `Bearer ${key}`
  //   },
  //   data: payload
  // })  
    return Response.json({
      revalidated: false,
      now: Date.now(),
      message: `{ "title": "西红柿炒鸡蛋的烹饪体验", "content": "今天我尝试了制作西红柿炒鸡蛋这道经典菜肴。主要的食材包括新鲜的西红柿和鸡蛋。在调味方面，我感觉盐的用量稍微偏少，可能下次需要适量增加以达到最佳口感。" }`//res.data.reply,
    })
  } catch (error: any) {
    return Response.json({
      revalidated: false,
      now: Date.now(),
      message: error.message,
    })
  }
}
