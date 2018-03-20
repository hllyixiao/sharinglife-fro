export class Article {
    id: number;
    state: string; // 状态
    title: string; // 文章title
    content: string; // 文章内容 html格式
    contentTxt: string; // 文章内容 txt纯文本格式
    length: number; // 文章长度
    userId: number; // 文章所属用户Id
}
