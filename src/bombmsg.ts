import { Channel, Message, TextChannel } from "discord.js";

export class BombMSG {
    msg: Message;
    c: number = 0;
    timer: number = 0;
    timeout: NodeJS.Timeout;
    originalContent: string;
    alsoDelete: Message[] = [];

    static async send(channel: TextChannel, msg: string, timer: number = 5, alsoDelete: Message[] = []): Promise<BombMSG> {
        const b = new BombMSG();
        b.timer = timer;
        b.msg = await channel.send(msg.replace('%s', timer.toString()));
        b.originalContent = msg;
        b.alsoDelete = alsoDelete;
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
            this.msg.edit(this.originalContent.replace('%s', (this.timer - this.c).toString()))
        }
    }
}