'use client'

import { Icon } from "@iconify/react/dist/iconify.js";
import Conatiner from "../components/Container";
import { Sidebar } from "../components/Sidebar";
const StortList = [{
  icon: <Icon icon="fluent:record-32-regular" width="1.2rem" height="1.2rem" style={{ color: 'black' }} />,
  msg: '记录新想法、家庭时刻、会议、播客外卖，任何事情。'
}, {
  icon: <Icon icon="eos-icons:ai-healing" width="1.2rem" height="1.2rem" style={{ color: 'black' }} />,
  msg: '让你的 AI 复习过去的笔记或集思广益新想法。它有完美的记忆力。'
}, {
  icon: <Icon icon="iconoir:emoji-think-right" width="1.2rem" height="1.2rem" style={{ color: 'black' }} />,
  msg: '使用笔记创建摘要、博客文章等，以后会有更多可能'
}, {
  icon: <Icon icon="gravity-ui:box" width="1.2rem" height="1.2rem" style={{ color: 'black' }} />,
  msg: '我们会有很多有趣的小东西'
}, {
  icon: <Icon icon="akar-icons:watch-device" width="1.2rem" height="1.2rem" style={{ color: 'black' }} />,
  msg: '可在 Web、iOS、Android 上使用，并很快在智能手表上使用'
}, {
  icon: <Icon icon="arcticons:kakao-story" width="1.2rem" height="1.2rem" style={{ color: 'black' }} />,
  msg: '致力于隐私、长寿和美丽。看背景故事 我们的背景故事'
}]
export default function Shared() {
  return (
    <>
      <Sidebar />
      <Conatiner className="pt-6">
        <h3 className="text-lg font-bold text-gray-800 dark:text-white">
          一个倾倒你想法的地方
        </h3>
        {
          StortList.map((story, i) => (<p key={i} className="mt-2 gap-2 flex text-gray-500 dark:text-neutral-400">
            <span className="mt-1">{story.icon}</span>
            {story.msg}
          </p>))
        }

      </Conatiner>
    </>
  );
}
