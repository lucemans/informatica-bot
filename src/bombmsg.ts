import { Channel, Message, TextChannel } from "discord.js";

export class BombMSGInfo {
    alsoDelete: Message[] = [];
    timeUntilDeletion: number = 5;
    timeUntilUpdate: number = 1;
    channel: TextChannel;
    msg: string;
}

export class BombMSG {
    msg: Message;
    c: number = 0;
    timer: number = 0;
    timeout: NodeJS.Timeout;
    originalContent: string;
    alsoDelete: Message[] = [];
    updateTimer = 0;
    updateTimerMax = 1;

    static async send(info: BombMSGInfo): Promise<BombMSG> {
        const b = new BombMSG();
        b.timer = info.timeUntilDeletion;
        b.msg = await info.channel.send(info.msg.replace('%s', info.timeUntilDeletion.toString()));
        b.originalContent = info.msg;
        b.alsoDelete = info.alsoDelete;
        b.updateTimerMax = info.timeUntilUpdate;
        b.setup();
        return b;
    }
    setup() {
        this.timeout = setInterval(() => {
            this.count();
        }, 1000);
    }
    count() {
        if (this.msg == undefined) {
            console.log('undefined msg');
            return;
        }
        this.c++;
        if (this.c >= this.timer) {
            clearInterval(this.timeout);
            this.msg.delete();
            this.alsoDelete.forEach((msg) => {
                if (!msg.deleted)
                    msg.delete();
            });
        } else {
            if (this.originalContent.includes('%s')) {
                this.updateTimer++;
                if (this.updateTimer >= this.updateTimerMax) {
                    this.msg.edit(this.originalContent.replace('%s', (this.timer - this.c).toString()))
                    this.updateTimer = 0;
                }
            }
        }
    }
}