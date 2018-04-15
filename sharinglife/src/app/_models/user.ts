export class User {
    obsUserId: number;
    name: string;
    phone: string;
    password: string;
    email?: string;
    type: string; // 用户类型
    shareCoin: number; // 分享币
    motto?: string; // 座右名
    avatarUrl?: string; // 头像图片路径
    lastLoginIp?: string; // 最后登录的ip
    createTime?: Date; // 创建时间
    updateTime?: Date; // 更新时间
}
