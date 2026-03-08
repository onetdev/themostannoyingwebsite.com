import type { CommentsI18nShape } from '../types';

export default {
  sectionTitle: '评论',
  formTitle: '添加评论',
  reply: '回复',
  showReplies: '显示 {count} 条回复',
  hideReplies: '隐藏回复',
  disclaimer:
    '所有评论仅出于娱乐目的生成，并非真实评论。你无法真正发布任何评论。',
  loginRequired: {
    title: '需要登录',
    description: '你需要登录才能执行此操作。请登录或创建账户以继续。',
    login: '登录',
    cancel: '取消',
  },
  form: {
    name: '姓名',
    comment: '评论',
    submit: '提交评论',
  },
} satisfies CommentsI18nShape;
