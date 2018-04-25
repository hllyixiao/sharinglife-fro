export class Article {
    id: number;
    status: number; // 状态 0 删除  1 草稿   2 发布
    title: string; // 文章title
    allowcomments: number; // 是否允许评论 0 1
    contentHtml: string; // 文章内容 html格式
    contentTxt: string; // 文章内容 txt纯文本格式
    contentSize: number; // 文章长度
}
