import type { ContentI18nShape } from '../types';

export default {
  paywall: {
    overlay: {
      title:
        '你必须支付 {price}/小时 并承诺订阅 24 个月才能查看下一段内容，或者你需要不断点击次要按钮。',
      disclaimer:
        '它可能不那么安全和合法，但这没关系，因为你实际上无法在这个网站上支付。',
      confirm: '支付！100% 合法且安全',
      cancel: '免费给我免费的东西',
    },
  },
  article: {
    coverImage: '封面图片',
    published: '发布于 {date}',
    moreContentScroll: '过去还有更多内容，向下滚动！',
  },
  search: {
    placeholder: '搜索...',
    noResults: '未找到结果',
    resultMeta: '搜索 “{query}” 耗时 {time}ms，找到 {count} 个结果',
    searching: '搜索中',
    error: '搜索失败，请稍后再试',
    peopleAlsoSearched: '大家还在搜：',
    topSearchVariants: {
      variant_001: '鱼会口渴吗',
      variant_002: '意面歌词',
      variant_003: '汽车的喇叭声会用完吗',
      variant_004: '网络不通',
      variant_005: '脸书会通过手机偷听吗',
      variant_006: '为什么我闻起来像便士',
      variant_007: '能在果冻里游泳吗',
      variant_008: '如何礼貌地告诉别人他们闻起来像洋葱',
      variant_009: '在镜子里看不到倒影',
      variant_010: '电的发明',
      variant_011: '擦他的面包',
      variant_012: '迷因与蟾蜍',
      variant_013: '沼泽大哥',
    },
  },
  hotThings: {
    playVideo: '播放视频',
    videoPlaybackFailed: '视频播放失败',
    pictureOfYou: '你的照片',
    hotThingsVtt: '中文',
  },
} satisfies ContentI18nShape;
