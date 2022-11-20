import {
  Controller,
  Patch,
  UseGuards,
  Request,
  Post,
  Get,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { exceptionHandler } from 'src/utils/exceptionHandler';
import { MessagesService } from './messages.service';
import { ReadMessageReq, SendMessageReq, GetMessagesReq } from './types';

@Controller('messages')
export class MessagesController {
  constructor(private readonly messagesService: MessagesService) {}

  @UseGuards(JwtAuthGuard)
  @Post('/')
  async sendMessage(@Request() req: SendMessageReq) {
    return exceptionHandler(async () => {
      return this.messagesService.create(
        req.body.content,
        req.user.id,
        req.body.to,
      );
    });
  }

  @UseGuards(JwtAuthGuard)
  @Patch('/read')
  async readMessage(@Request() req: ReadMessageReq) {
    return exceptionHandler(async () => {
      return this.messagesService.read(req.body.id);
    });
  }

  @UseGuards(JwtAuthGuard)
  @Get('/athlete')
  async getMessagesForAthlete(@Request() req: GetMessagesReq) {
    return exceptionHandler(async () => {
      return this.messagesService.findForAthlete(req.user.id);
    });
  }

  @UseGuards(JwtAuthGuard)
  @Get('/coach')
  async getMessagesForCoach(@Request() req: GetMessagesReq) {
    return exceptionHandler(async () => {
      return this.messagesService.findForCoach(req.user.id);
    });
  }
}
