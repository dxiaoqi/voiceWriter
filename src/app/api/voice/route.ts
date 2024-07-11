import axios from 'axios';
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
    const url = `https://api.minimax.chat/v1/text/chatcompletion_pro?GroupId=${process?.env.MINIMAX_ID}`;
    const res = await axios({
    method: 'post',
    url: url,
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${process?.env.MINIMAX_KEY}`
    },
    data: payload
  }) 
  console.log(111, res.data.reply)
    return Response.json({
      revalidated: false,
      now: Date.now(),
      message: res.data.reply,
    })
  } catch (error: any) {
    return Response.json({
      revalidated: false,
      now: Date.now(),
      message: error.message,
    })
  }
}
