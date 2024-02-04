import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

interface Post {
  author: string;
  title: string;
  content: string;
  likeCount: number;
  commentCount: number;
}

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getPost(): Post {
    return {
      author: 'newjeans_official',
      title: '뉴진스 민지',
      content: '민지는 예쁘다',
      likeCount: 10000000,
      commentCount: 99999,
    };
  }
}
