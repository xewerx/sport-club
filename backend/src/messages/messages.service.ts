import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UsersService } from 'src/users/users.service';
import { Repository } from 'typeorm';
import { MessageEntity } from './message.entity';
import { groupBy } from 'lodash';

@Injectable()
export class MessagesService {
  constructor(
    @InjectRepository(MessageEntity)
    private messagesRepository: Repository<MessageEntity>,
    private readonly usersService: UsersService,
  ) {}

  async create(content: string, senderId: number, recipientNames: string[]) {
    const messagesPromise = recipientNames.map(async (recipientName) => {
      const recipient = await this.usersService.findOne(recipientName);
      const sender = await this.usersService.getUser(senderId);

      const message = await this.messagesRepository.save({
        content,
        sender,
        recipient,
        isRead: false,
        createdAt: new Date().toISOString(),
      });

      return {
        id: message.id,
        content: message.content,
      };
    });

    const messages = await Promise.all(messagesPromise);

    return messages;
  }

  async read(messageId: number) {
    await this.messagesRepository.update({ id: messageId }, { isRead: true });

    return messageId;
  }

  async findForAthlete(recipientId: number) {
    const messages = await this.messagesRepository.findBy({
      recipient: { id: recipientId },
    });

    return messages;
  }

  async findForCoach(senderId: number) {
    const messages = await this.messagesRepository.findBy({
      sender: { id: senderId },
    });

    const byDate = groupBy(messages, (message) => message.createdAt);

    const messagesFiltered = [];
    for (const message in byDate) {
      if (byDate[message].every((mess) => mess.isRead)) {
        messagesFiltered.push({ ...byDate[message][0], isReadByAll: true });
      } else {
        messagesFiltered.push({ ...byDate[message][0], isReadByAll: false });
      }
    }

    return messagesFiltered;
  }
}
